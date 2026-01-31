'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    fetchLatestContent,
    refreshContent,
    getTimeAgo,
    isContentStale,
    type ContentUpdate,
} from '@/lib/content-manager';
import { RefreshCw, Database, CheckCircle, AlertCircle, Clock } from 'lucide-react';

export default function ContentSyncPage() {
    const [content, setContent] = useState<ContentUpdate | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastSync, setLastSync] = useState<string | null>(null);

    useEffect(() => {
        loadContent();
    }, []);

    const loadContent = async () => {
        const data = await fetchLatestContent();
        setContent(data);
        if (data.timestamp) {
            setLastSync(data.timestamp);
        }
    };

    const handleSync = async () => {
        setIsLoading(true);
        try {
            const data = await refreshContent();
            setContent(data);
            if (data.timestamp) {
                setLastSync(data.timestamp);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Database className="w-10 h-10 text-primary" />
                        <h1 className="text-4xl font-bold">Content Sync</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Manage automatic content updates from NotebookLM
                    </p>
                </div>

                {/* Sync Controls */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Sync Status</CardTitle>
                        <CardDescription>
                            Last synchronized: {lastSync ? getTimeAgo(lastSync) : 'Never'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={handleSync}
                                disabled={isLoading}
                                size="lg"
                                className="flex items-center gap-2"
                            >
                                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                                {isLoading ? 'Syncing...' : 'Sync Now'}
                            </Button>

                            {lastSync && (
                                <div className="flex items-center gap-2">
                                    {isContentStale(lastSync) ? (
                                        <>
                                            <AlertCircle className="w-5 h-5 text-orange-500" />
                                            <span className="text-sm text-orange-600">Content may be stale</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                            <span className="text-sm text-green-600">Content is fresh</span>
                                        </>
                                    )}
                                </div>
                            )}

                            {content?.cached && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-blue-500" />
                                    <span className="text-sm text-blue-600">
                                        Using cached data ({content.cacheAge}s old)
                                    </span>
                                </div>
                            )}
                        </div>

                        {content?.warning && (
                            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                                    ⚠️ {content.warning}
                                </p>
                            </div>
                        )}

                        {content?.error && (
                            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-700 dark:text-red-300">
                                    ❌ {content.error}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Content Preview */}
                {content?.success && content.updates && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold">Latest Security Updates</h2>

                        {Object.entries(content.updates).map(([category, data]) => (
                            <Card key={category}>
                                <CardHeader>
                                    <CardTitle className="capitalize">
                                        {category.replace(/_/g, ' ')}
                                    </CardTitle>
                                    <CardDescription>
                                        {data.citations.length} source{data.citations.length !== 1 ? 's' : ''}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm leading-relaxed mb-4">{data.summary}</p>

                                    {data.citations.length > 0 && (
                                        <div className="border-t pt-4">
                                            <h4 className="text-sm font-semibold mb-2">Sources:</h4>
                                            <ul className="text-xs space-y-1 text-muted-foreground">
                                                {data.citations.map((citation: any, idx: number) => (
                                                    <li key={idx}>
                                                        {citation.source || citation.title || `Source ${idx + 1}`}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
