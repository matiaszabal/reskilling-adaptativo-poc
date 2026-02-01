'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
    BookOpen,
    ArrowLeft,
    ArrowRight,
    CheckCircle,
    Play,
    FileText,
    Award,
    Clock,
    Shield
} from 'lucide-react';
import { learningModules, LearningModule } from '@/lib/assessment-engine';

export default function LearnPage() {
    const params = useParams();
    const router = useRouter();
    const [module, setModule] = useState<LearningModule | null>(null);
    const [progress, setProgress] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const moduleId = params.id as string;
        const foundModule = learningModules.find(m => m.id === moduleId);

        if (!foundModule) {
            router.push('/dashboard');
            return;
        }

        setModule(foundModule);

        // Reset progress when module changes
        setProgress(10);
        setCompleted(false);
    }, [params.id, router]);

    if (!module) return null;

    const handleComplete = () => {
        setCompleted(true);
        setProgress(100);

        // In a real app, we would update the user's progress in DB/localStorage
        const completedModules = JSON.parse(localStorage.getItem('completedModules') || '[]');
        if (!completedModules.includes(module.id)) {
            localStorage.setItem('completedModules', JSON.stringify([...completedModules, module.id]));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Navigation */}
                <Link href="/dashboard" className="flex items-center gap-2 text-primary hover:underline mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Dashboard
                </Link>

                {/* Module Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2 text-primary font-medium">
                        <Shield className="w-5 h-5" />
                        {module.category}
                    </div>
                    <h1 className="text-4xl font-bold mb-4">{module.title}</h1>
                    <div className="flex items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {module.estimatedTime} minutos
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${module.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                module.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                            }`}>
                            {module.difficulty}
                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <Card className="mb-8 overflow-hidden">
                    <div className="p-4 border-b flex justify-between items-center bg-muted/30">
                        <span className="text-sm font-medium">Progreso del Módulo</span>
                        <span className="text-sm font-bold text-primary">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2 rounded-none" />
                </Card>

                {/* Content Area */}
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8 text-lg leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-primary" />
                                Contenido Principal
                            </h2>
                            <p className="mb-4">
                                Este módulo está diseñado para profundizar en <strong>{module.title}</strong>.
                                En esta sección, aprenderás sobre los conceptos fundamentales de seguridad en IA
                                que son críticos para proteger los activos de la organización.
                            </p>

                            <Card className="bg-primary/5 border-primary/20 p-6 mb-6">
                                <h3 className="font-bold mb-2">Objetivos de Aprendizaje:</h3>
                                <ul className="list-disc list-inside space-y-2 text-base">
                                    <li>Comprender la anatomía de un ataque en {module.category}</li>
                                    <li>Identificar vectores de amenaza comunes en sistemas agentic</li>
                                    <li>Implementar defensas proactivas y monitoreo reactivo</li>
                                    <li>Evaluar el impacto de una brecha de seguridad en LLMs</li>
                                </ul>
                            </Card>

                            <h3 className="text-xl font-bold mb-4">Análisis del Escenario</h3>
                            <p className="mb-4">
                                Considera el despliegue de un agente autónomo que tiene acceso a herramientas internas (email, bases de datos).
                                Sin las protecciones adecuadas discutidas en este curso, un atacante podría manipular la lógica del agente
                                mediante una técnica conocida como <em>indirect injection</em>.
                            </p>

                            <div className="bg-gray-900 text-white p-6 rounded-xl font-mono text-sm mb-8">
                                <div className="flex items-center gap-2 mb-4 text-green-400">
                                    <FileText className="w-4 h-4" />
                                    <span>Ejemplo de Vulnerabilidad</span>
                                </div>
                                <p className="text-gray-400 mb-2"># Simulación de detección</p>
                                <p>const input = payload.message;</p>
                                <p>if (detectionEngine.scan(input).isMalicious) {"{"}</p>
                                <p className="text-green-400">  blockRequest(input);</p>
                                <p className="text-green-400">  alertSecOps("Potential Injection Detected");</p>
                                <p>{"}"} else {"{"}</p>
                                <p>  processAgentLogic(input);</p>
                                <p>{"}"}</p>
                            </div>
                        </section>

                        {!completed ? (
                            <Button size="lg" className="w-full py-8 text-xl" onClick={handleComplete}>
                                <CheckCircle className="mr-2 h-6 w-6" />
                                Marcar como Completado
                            </Button>
                        ) : (
                            <div className="text-center p-8 bg-green-50 dark:bg-green-900/20 rounded-2xl border-2 border-green-200 dark:border-green-800">
                                <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">¡Módulo Completado!</h3>
                                <p className="text-muted-foreground mb-6">
                                    Has dominado los conceptos básicos de {module.title}. Tu perfil de competencias ha sido actualizado.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/dashboard" className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Volver al Dashboard
                                        </Button>
                                    </Link>
                                    <Link href="/practice" className="flex-1">
                                        <Button className="w-full">
                                            Practicar en Simulador
                                            <Play className="ml-2 w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Recursos Adicionales</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="ghost" className="w-full justify-start text-sm underline px-0">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Whitepaper: Security in Agentic AI
                                </Button>
                                <Button variant="ghost" className="w-full justify-start text-sm underline px-0">
                                    <Shield className="w-4 h-4 mr-2" />
                                    OWASP LLM Top 10 Guide
                                </Button>
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/50">
                            <CardHeader>
                                <CardTitle className="text-sm">Próximos Pasos</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground mb-4">
                                    Después de este módulo, te recomendamos completar la simulación de red teaming para poner a prueba tus habilidades.
                                </p>
                                <Link href="/practice">
                                    <Button variant="secondary" size="sm" className="w-full">
                                        Explorar Simulaciones
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
