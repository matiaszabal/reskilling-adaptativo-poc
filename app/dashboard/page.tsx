'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchLatestContent, getTimeAgo, type ContentUpdate } from '@/lib/content-manager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AssessmentResult, LearningModule } from '@/lib/assessment-engine';
import {
    ArrowRight,
    Clock,
    Target,
    TrendingUp,
    BookOpen,
    Shield,
    AlertCircle,
    Database,
    RefreshCw
} from 'lucide-react';

export default function DashboardPage() {
    const router = useRouter();
    const [results, setResults] = useState<AssessmentResult[]>([]);
    const [learningPath, setLearningPath] = useState<LearningModule[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [contentUpdates, setContentUpdates] = useState<ContentUpdate | null>(null);

    useEffect(() => {
        const storedResults = localStorage.getItem('assessmentResults');
        const storedPath = localStorage.getItem('learningPath');

        if (!storedResults || !storedPath) {
            router.push('/assessment');
            return;
        }

        setResults(JSON.parse(storedResults));
        setLearningPath(JSON.parse(storedPath));
        setIsLoading(false);

        // Load content updates
        fetchLatestContent().then(setContentUpdates);
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p>Cargando tu dashboard...</p>
                </div>
            </div>
        );
    }

    const totalTime = learningPath.reduce((sum, module) => sum + module.estimatedTime, 0);
    const traditionalTime = 40 * 60; // 40 hours in minutes
    const timeSaved = traditionalTime - totalTime;
    const timeSavedPercentage = (timeSaved / traditionalTime) * 100;

    const overallScore = results.reduce((sum, r) => sum + r.percentage, 0) / results.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">Tu Dashboard Personalizado</h1>
                    <p className="text-muted-foreground text-lg">
                        Plan de aprendizaje optimizado basado en tu assessment
                    </p>
                </div>

                {/* Key Metrics */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="border-2 border-purple-200 dark:border-purple-800">
                        <CardHeader>
                            <Clock className="w-10 h-10 text-purple-600 mb-2" />
                            <CardTitle>Tiempo Total Estimado</CardTitle>
                            <CardDescription>Tu ruta personalizada</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-purple-600 mb-2">
                                {Math.round(totalTime / 60)}h {totalTime % 60}min
                            </div>
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <TrendingUp className="w-4 h-4" />
                                {Math.round(timeSavedPercentage)}% menos que método tradicional ({Math.round(traditionalTime / 60)}h)
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <Target className="w-10 h-10 text-blue-600 mb-2" />
                            <CardTitle>Score Actual</CardTitle>
                            <CardDescription>Nivel promedio de competencia</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-blue-600 mb-2">
                                {Math.round(overallScore)}%
                            </div>
                            <Progress value={overallScore} className="h-2" />
                        </CardContent>
                    </Card>

                    <Card className="border-2 border-green-200 dark:border-green-800">
                        <CardHeader>
                            <BookOpen className="w-10 h-10 text-green-600 mb-2" />
                            <CardTitle>Módulos Recomendados</CardTitle>
                            <CardDescription>En tu ruta de aprendizaje</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold text-green-600 mb-2">
                                {learningPath.length}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Basados en tus brechas identificadas
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Skills Breakdown */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Análisis de Competencias por Categoría</CardTitle>
                        <CardDescription>
                            Identificación precisa de fortalezas y áreas de mejora
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {results.map((result) => (
                            <div key={result.category}>
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-primary" />
                                        <span className="font-medium">{result.category}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {result.gapIdentified && (
                                            <div className="flex items-center gap-1 text-orange-600 text-sm">
                                                <AlertCircle className="w-4 h-4" />
                                                Brecha identificada
                                            </div>
                                        )}
                                        <span className="font-bold text-lg">{Math.round(result.percentage)}%</span>
                                    </div>
                                </div>
                                <Progress value={result.percentage} className="h-3" />
                                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                                    <span>Nivel: {result.level}</span>
                                    <span>{result.score} / {result.maxScore} puntos</span>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Learning Path */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Tu Ruta de Aprendizaje Personalizada</CardTitle>
                        <CardDescription>
                            Módulos seleccionados específicamente para llenar tus brechas de conocimiento
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {learningPath.length === 0 ? (
                            <div className="text-center py-12">
                                <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">¡Excelente Desempeño!</h3>
                                <p className="text-muted-foreground">
                                    No se identificaron brechas significativas en tu conocimiento.
                                    Considera módulos avanzados adicionales para profundizar.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {learningPath.map((module, index) => (
                                    <Card key={module.id} className="border-2 hover:border-primary transition-colors">
                                        <CardHeader>
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="text-sm font-medium text-primary mb-1">
                                                        Módulo {index + 1} • {module.category}
                                                    </div>
                                                    <CardTitle className="text-xl">{module.title}</CardTitle>
                                                    <CardDescription className="mt-2">
                                                        {module.description}
                                                    </CardDescription>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${module.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                                        module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {module.difficulty}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                        <Clock className="w-4 h-4" />
                                                        {module.estimatedTime} min
                                                    </div>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <Link href={`/learn/${module.id}`}>
                                                <Button className="w-full">
                                                    Comenzar Módulo
                                                    <ArrowRight className="ml-2" />
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Content Updates Notification */}
                {contentUpdates?.success && (
                    <Card className="mt-8 border-2 border-blue-200 dark:border-blue-800">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Database className="w-5 h-5 text-blue-600" />
                                        Actualizaciones de Contenido
                                    </CardTitle>
                                    <CardDescription>
                                        Última sincronización: {contentUpdates.timestamp ? getTimeAgo(contentUpdates.timestamp) : 'Nunca'}
                                    </CardDescription>
                                </div>
                                <Link href="/admin/content-sync">
                                    <Button variant="outline" size="sm">
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Sincronizar
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                ✅ Los módulos de aprendizaje están actualizados con las últimas investigaciones en seguridad de IA
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4 justify-center">
                    <Link href="/practice">
                        <Button size="lg" variant="outline">
                            Ir a Simulaciones de Seguridad
                        </Button>
                    </Link>
                    <Link href="/tutor">
                        <Button size="lg" variant="outline">
                            Hablar con el Tutor Socrático
                        </Button>
                    </Link>
                    <Link href="/analytics">
                        <Button size="lg" variant="outline">
                            Ver Analytics Empresarial
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
