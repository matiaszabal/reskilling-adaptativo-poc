/**
 * Content Manager
 * Utilities for managing learning content updates from NotebookLM
 */

export interface ContentUpdate {
    success: boolean;
    timestamp: string;
    updates?: {
        threats?: CategoryUpdate;
        vulnerabilities?: CategoryUpdate;
        best_practices?: CategoryUpdate;
        research?: CategoryUpdate;
    };
    error?: string;
    cached?: boolean;
    cacheAge?: number;
    warning?: string;
}

export interface CategoryUpdate {
    summary: string;
    citations: Citation[];
}

export interface Citation {
    source: string;
    url?: string;
    excerpt?: string;
}

export interface ModuleContentUpdate {
    moduleId: string;
    title: string;
    newContent: string;
    sources: Citation[];
    timestamp: string;
}

/**
 * Fetch latest content updates from NotebookLM
 */
export async function fetchLatestContent(): Promise<ContentUpdate> {
    try {
        const response = await fetch('/api/content-update', {
            method: 'GET',
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return {
            success: false,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Failed to fetch content',
        };
    }
}

/**
 * Force refresh content from NotebookLM (bypass cache)
 */
export async function refreshContent(): Promise<ContentUpdate> {
    try {
        const response = await fetch('/api/content-update?refresh=true', {
            method: 'GET',
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        return {
            success: false,
            timestamp: new Date().toISOString(),
            error: error instanceof Error ? error.message : 'Failed to refresh content',
        };
    }
}

/**
 * Query NotebookLM with custom question
 */
export async function queryNotebook(
    query: string,
    notebookId?: string
): Promise<{ success: boolean; content?: any[]; citations?: any[]; error?: string }> {
    try {
        const response = await fetch('/api/notebook/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query, notebook_id: notebookId }),
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Query failed',
        };
    }
}

/**
 * Get cached content updates (if available)
 */
export function getCachedUpdates(): ContentUpdate | null {
    if (typeof window === 'undefined') return null;

    try {
        const cached = localStorage.getItem('notebooklm_updates');
        if (!cached) return null;

        const data = JSON.parse(cached);
        const age = Date.now() - new Date(data.timestamp).getTime();

        // Return null if cache is older than 5 minutes
        if (age > 5 * 60 * 1000) return null;

        return data;
    } catch {
        return null;
    }
}

/**
 * Cache content updates in localStorage
 */
export function cacheUpdates(updates: ContentUpdate): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem('notebooklm_updates', JSON.stringify(updates));
    } catch (error) {
        console.warn('Failed to cache updates:', error);
    }
}

/**
 * Format update summary for display
 */
export function formatUpdateSummary(update: CategoryUpdate): string {
    // Truncate long summaries
    const maxLength = 300;
    const summary = update.summary;

    if (summary.length <= maxLength) return summary;

    return summary.substring(0, maxLength) + '...';
}

/**
 * Get time ago string from timestamp
 */
export function getTimeAgo(timestamp: string): string {
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const seconds = Math.floor((now - then) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

/**
 * Check if content is stale (older than 24 hours)
 */
export function isContentStale(timestamp: string): boolean {
    const now = Date.now();
    const then = new Date(timestamp).getTime();
    const hours = (now - then) / (1000 * 60 * 60);

    return hours > 24;
}

/**
 * Extract module updates from content
 */
export function extractModuleUpdates(content: ContentUpdate): ModuleContentUpdate[] {
    if (!content.success || !content.updates) return [];

    const updates: ModuleContentUpdate[] = [];

    // Map content categories to module IDs
    const categoryToModule = {
        threats: 'threat-landscape',
        vulnerabilities: 'vulnerability-management',
        best_practices: 'security-best-practices',
        research: 'research-insights',
    };

    for (const [category, moduleId] of Object.entries(categoryToModule)) {
        const categoryData = content.updates[category as keyof typeof content.updates];

        if (categoryData && categoryData.summary) {
            updates.push({
                moduleId,
                title: formatCategoryTitle(category),
                newContent: categoryData.summary,
                sources: categoryData.citations || [],
                timestamp: content.timestamp,
            });
        }
    }

    return updates;
}

/**
 * Format category name to title
 */
function formatCategoryTitle(category: string): string {
    return category
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
