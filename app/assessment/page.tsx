'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { assessmentQuestions, calculateAssessmentResults, generateLearningPath } from '@/lib/assessment-engine';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

export default function AssessmentPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number>>({});
    const [isComplete, setIsComplete] = useState(false);

    const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100;
    const question = assessmentQuestions[currentQuestion];

    const handleAnswer = (score: number) => {
        const newAnswers = { ...answers, [question.id]: score };
        setAnswers(newAnswers);

        if (currentQuestion < assessmentQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Assessment complete
            const results = calculateAssessmentResults(newAnswers);
            const learningPath = generateLearningPath(results);

            // Store in localStorage for demo
            localStorage.setItem('assessmentResults', JSON.stringify(results));
            localStorage.setItem('learningPath', JSON.stringify(learningPath));

            setIsComplete(true);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    if (isComplete) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
                <Card className="max-w-2xl w-full">
                    <CardHeader className="text-center">
                        <div className="flex justify-center mb-4">
                            <CheckCircle className="w-20 h-20 text-green-500" />
                        </div>
                        <CardTitle className="text-3xl">¡Assessment Completado!</CardTitle>
                        <CardDescription className="text-lg">
                            Hemos analizado tus respuestas y generado un plan de aprendizaje personalizado
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                        <p className="text-muted-foreground">
                            Tu ruta de aprendizaje está optimizada para llenar precisamente las brechas identificadas,
                            ahorrándote tiempo valioso.
                        </p>
                        <Button size="lg" onClick={() => router.push('/dashboard')} className="w-full">
                            Ver Mi Dashboard Personalizado
                            <ArrowRight className="ml-2" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="max-w-4xl mx-auto pt-8">
                {/* Header */}
                <div className="mb-8">
                    <Button variant="ghost" onClick={() => router.push('/')} className="mb-4">
                        <ArrowLeft className="mr-2" />
                        Volver
                    </Button>
                    <h1 className="text-4xl font-bold mb-2">Skills Assessment</h1>
                    <p className="text-muted-foreground">
                        Evaluación de competencias en Agentic AI Security - {assessmentQuestions.length} preguntas
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Pregunta {currentQuestion + 1} de {assessmentQuestions.length}</span>
                        <span>{Math.round(progress)}% Completado</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                </div>

                {/* Question Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <div className="text-sm font-medium text-primary mb-2">
                            {question.category}
                        </div>
                        <CardTitle className="text-2xl">{question.question}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.score)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5 ${answers[question.id] === option.score
                                        ? 'border-primary bg-primary/10'
                                        : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mt-0.5 flex-shrink-0">
                                        {answers[question.id] === option.score && (
                                            <div className="w-3 h-3 rounded-full bg-primary" />
                                        )}
                                    </div>
                                    <span className="text-base">{option.text}</span>
                                </div>
                            </button>
                        ))}
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                    >
                        <ArrowLeft className="mr-2" />
                        Anterior
                    </Button>

                    {answers[question.id] !== undefined && (
                        <Button onClick={() => handleAnswer(answers[question.id])}>
                            {currentQuestion < assessmentQuestions.length - 1 ? (
                                <>
                                    Siguiente
                                    <ArrowRight className="ml-2" />
                                </>
                            ) : (
                                <>
                                    Finalizar Assessment
                                    <CheckCircle className="ml-2" />
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
