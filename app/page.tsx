import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Brain, Target, TrendingUp, Clock, Shield, Zap, Users, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              Powered by Adaptive AI Technology
            </div>

            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
              Reskilling Corporativo
              <br />
              en Agentic AI Security
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              No vendemos cursos de 40 horas. Vendemos <span className="font-bold text-purple-600">tiempo</span> y <span className="font-bold text-blue-600">precisión</span>.
              El sistema detecta que el Empleado A solo necesita 5 horas, mientras el Empleado B necesita una ruta completa.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/assessment">
                <Button size="lg" className="text-lg px-8 py-6 h-auto">
                  Comenzar Assessment
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link href="/analytics">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                  Ver ROI Estimado
                  <BarChart3 className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-purple-500 transition-colors">
            <CardHeader>
              <Clock className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle className="text-2xl">Reducción de Tiempo</CardTitle>
              <CardDescription className="text-base">
                Ahorra miles de horas-hombre con rutas de aprendizaje personalizadas que omiten lo que ya saben
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600 mb-2">-75%</div>
              <p className="text-sm text-muted-foreground">Tiempo promedio de capacitación vs métodos tradicionales</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-blue-500 transition-colors">
            <CardHeader>
              <Target className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle className="text-2xl">Precisión Quirúrgica</CardTitle>
              <CardDescription className="text-base">
                IA detecta brechas de conocimiento en tiempo real y ajusta contenido segundo a segundo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-sm text-muted-foreground">Precisión en detección de competencias actuales</p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-500 transition-colors">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle className="text-2xl">ROI Maximizado</CardTitle>
              <CardDescription className="text-base">
                Empleados productivos en menor tiempo con confianza y motivación incrementadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600 mb-2">4.2x</div>
              <p className="text-sm text-muted-foreground">Retorno de inversión vs programas tradicionales</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl">
        <h2 className="text-4xl font-bold text-center mb-16">Cómo Funciona</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Diagnóstico Dinámico</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Assessment inicial identifica fortalezas y brechas de conocimiento
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Ruta Personalizada</h3>
            <p className="text-gray-600 dark:text-gray-300">
              IA genera micro-rutas que llenan exclusivamente los vacíos detectados
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Práctica Inmersiva</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Simulaciones de seguridad con feedback instantáneo y tutor socrático
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">4</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Métricas de Impacto</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Dashboard ejecutivo con tiempo ahorrado y cierre de brechas en tiempo real
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Características de la Plataforma</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <Brain className="w-10 h-10 text-purple-600 mb-2" />
              <CardTitle>Actualización Automática de Contenido</CardTitle>
              <CardDescription>
                Integración con NotebookLM para sincronizar contenido con las últimas investigaciones y amenazas en Agentic AI Security
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="w-10 h-10 text-blue-600 mb-2" />
              <CardTitle>Entornos de Simulación</CardTitle>
              <CardDescription>
                Práctica hands-on con escenarios reales: prompt injection, model safety, threat detection, y red teaming
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-green-600 mb-2" />
              <CardTitle>Tutor Socrático con IA</CardTitle>
              <CardDescription>
                Asistente que guía con preguntas en lugar de respuestas, acelerando la comprensión profunda
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="w-10 h-10 text-orange-600 mb-2" />
              <CardTitle>Analytics Empresarial</CardTitle>
              <CardDescription>
                Dashboard ejecutivo con métricas de productividad, engagement y ROI medible en tiempo real
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Listo para Transformar tu Programa de Reskilling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Comienza con un assessment de 10 minutos y descubre cuánto tiempo puedes ahorrar
            </p>
            <Link href="/assessment">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 h-auto">
                Iniciar Assessment Ahora
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600 dark:text-gray-400">
          <p>© 2026 Adaptive AI Security Learning Platform | Powered by NotebookLM & Next.js</p>
        </div>
      </footer>
    </div>
  );
}
