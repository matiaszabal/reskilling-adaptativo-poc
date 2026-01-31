'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Users, Clock, DollarSign, Target, BarChart3, CheckCircle } from 'lucide-react';

export default function AnalyticsPage() {
    // Simulated company data
    const companyData = {
        totalEmployees: 250,
        employeesInProgram: 180,
        averageTraditionalTime: 40, // hours
        averageAdaptiveTime: 12, // hours
        timeSavedPerEmployee: 28, // hours
        totalTimeSaved: 5040, // hours (28 * 180)
        averageHourlyCost: 75, // USD
        totalCostSaved: 378000, // USD (5040 * 75)
        programCost: 90000, // USD
        roi: 4.2,
        averageCompletionRate: 92, // percentage
        averageEngagementScore: 8.7, // out of 10
        skillGapClosure: 78, // percentage
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="w-10 h-10 text-primary" />
                        <h1 className="text-4xl font-bold">Analytics Empresarial</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Dashboard ejecutivo con métricas de impacto en tiempo real
                    </p>
                </div>

                {/* ROI Hero Card */}
                <Card className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white">
                    <CardContent className="p-8">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-90" />
                                <div className="text-5xl font-bold mb-2">${companyData.totalCostSaved.toLocaleString()}</div>
                                <div className="text-lg opacity-90">Ahorro Total en Costos</div>
                                <div className="text-sm opacity-75 mt-1">
                                    vs. ${companyData.programCost.toLocaleString()} invertido
                                </div>
                            </div>
                            <div className="text-center">
                                <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-90" />
                                <div className="text-5xl font-bold mb-2">{companyData.roi}x</div>
                                <div className="text-lg opacity-90">Retorno de Inversión</div>
                                <div className="text-sm opacity-75 mt-1">
                                    en el primer trimestre
                                </div>
                            </div>
                            <div className="text-center">
                                <Clock className="w-12 h-12 mx-auto mb-3 opacity-90" />
                                <div className="text-5xl font-bold mb-2">{companyData.totalTimeSaved.toLocaleString()}</div>
                                <div className="text-lg opacity-90">Horas Ahorradas</div>
                                <div className="text-sm opacity-75 mt-1">
                                    {companyData.timeSavedPerEmployee}h promedio por empleado
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Key Metrics Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card>
                        <CardHeader>
                            <Users className="w-8 h-8 text-blue-600 mb-2" />
                            <CardTitle>Participación</CardTitle>
                            <CardDescription>Empleados en el programa</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {companyData.employeesInProgram}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                de {companyData.totalEmployees} empleados ({Math.round((companyData.employeesInProgram / companyData.totalEmployees) * 100)}%)
                            </div>
                            <Progress
                                value={(companyData.employeesInProgram / companyData.totalEmployees) * 100}
                                className="mt-2 h-2"
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
                            <CardTitle>Tasa de Completitud</CardTitle>
                            <CardDescription>Módulos finalizados</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                {companyData.averageCompletionRate}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                +32% vs. métodos tradicionales
                            </div>
                            <Progress value={companyData.averageCompletionRate} className="mt-2 h-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <Target className="w-8 h-8 text-purple-600 mb-2" />
                            <CardTitle>Cierre de Brechas</CardTitle>
                            <CardDescription>Skills gap cerrado</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-600 mb-2">
                                {companyData.skillGapClosure}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Promedio across todas las categorías
                            </div>
                            <Progress value={companyData.skillGapClosure} className="mt-2 h-2" />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <TrendingUp className="w-8 h-8 text-orange-600 mb-2" />
                            <CardTitle>Engagement Score</CardTitle>
                            <CardDescription>Satisfacción y motivación</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-600 mb-2">
                                {companyData.averageEngagementScore}/10
                            </div>
                            <div className="text-sm text-muted-foreground">
                                87% de empleados altamente satisfechos
                            </div>
                            <Progress value={companyData.averageEngagementScore * 10} className="mt-2 h-2" />
                        </CardContent>
                    </Card>
                </div>

                {/* Comparison: Traditional vs Adaptive */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl">Comparación: Entrenamiento Tradicional vs Adaptativo</CardTitle>
                        <CardDescription>
                            Demostración del impacto de personalización en tiempo y resultados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                                    Método Tradicional
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Tiempo promedio por empleado</span>
                                            <span className="font-bold">{companyData.averageTraditionalTime}h</span>
                                        </div>
                                        <Progress value={100} className="h-2 bg-gray-200" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Tasa de completitud</span>
                                            <span className="font-bold">60%</span>
                                        </div>
                                        <Progress value={60} className="h-2 bg-gray-200" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Engagement score</span>
                                            <span className="font-bold">5.8/10</span>
                                        </div>
                                        <Progress value={58} className="h-2 bg-gray-200" />
                                    </div>
                                    <div className="pt-3 border-t">
                                        <div className="flex justify-between font-semibold">
                                            <span>Costo total (180 empleados)</span>
                                            <span className="text-red-600">$540,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <div className="w-4 h-4 bg-primary rounded"></div>
                                    Método Adaptativo (AI-Powered)
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Tiempo promedio por empleado</span>
                                            <span className="font-bold text-green-600">{companyData.averageAdaptiveTime}h (-70%)</span>
                                        </div>
                                        <Progress value={(companyData.averageAdaptiveTime / companyData.averageTraditionalTime) * 100} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Tasa de completitud</span>
                                            <span className="font-bold text-green-600">{companyData.averageCompletionRate}% (+32%)</span>
                                        </div>
                                        <Progress value={companyData.averageCompletionRate} className="h-2" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Engagement score</span>
                                            <span className="font-bold text-green-600">{companyData.averageEngagementScore}/10 (+50%)</span>
                                        </div>
                                        <Progress value={companyData.averageEngagementScore * 10} className="h-2" />
                                    </div>
                                    <div className="pt-3 border-t">
                                        <div className="flex justify-between font-semibold">
                                            <span>Costo total (180 empleados)</span>
                                            <span className="text-green-600">$162,000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-green-200 dark:border-green-800">
                            <div className="flex items-center gap-3 mb-3">
                                <DollarSign className="w-8 h-8 text-green-600" />
                                <h4 className="text-xl font-bold text-green-700 dark:text-green-400">
                                    Ahorro Neto: ${companyData.totalCostSaved.toLocaleString()}
                                </h4>
                            </div>
                            <p className="text-sm text-green-700 dark:text-green-300">
                                Con el método adaptativo, la empresa ahorra {companyData.totalTimeSaved.toLocaleString()} horas-hombre,
                                equivalentes a ${companyData.totalCostSaved.toLocaleString()} en costos de personal.
                                La inversión inicial de ${companyData.programCost.toLocaleString()} se recupera en menos de 3 meses.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Skills Progress by Category */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Progreso por Categoría de Skills</CardTitle>
                        <CardDescription>
                            Cierre de brechas de conocimiento medido en tiempo real
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { name: 'AI Security Fundamentals', before: 45, after: 82, employees: 150 },
                            { name: 'Prompt Injection & Jailbreaking', before: 35, after: 78, employees: 120 },
                            { name: 'Model Safety & Alignment', before: 52, after: 85, employees: 95 },
                            { name: 'Threat Modeling for AI', before: 48, after: 81, employees: 110 },
                            { name: 'AI Governance & Compliance', before: 58, after: 88, employees: 140 },
                        ].map((category) => (
                            <div key={category.name}>
                                <div className="flex justify-between items-center mb-2">
                                    <div>
                                        <span className="font-medium">{category.name}</span>
                                        <span className="text-sm text-muted-foreground ml-2">
                                            ({category.employees} empleados)
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-muted-foreground">
                                            {category.before}% → <span className="font-bold text-green-600">{category.after}%</span>
                                        </span>
                                        <span className="text-sm font-bold text-green-600">
                                            +{category.after - category.before}%
                                        </span>
                                    </div>
                                </div>
                                <div className="relative h-8 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className="absolute h-full bg-gray-300 dark:bg-gray-700 rounded-full"
                                        style={{ width: `${category.before}%` }}
                                    />
                                    <div
                                        className="absolute h-full bg-primary rounded-full transition-all duration-1000"
                                        style={{ width: `${category.after}%` }}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white mix-blend-difference">
                                        {category.after}% competencia
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
