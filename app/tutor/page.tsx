'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Send, Lightbulb, HelpCircle } from 'lucide-react';

interface Message {
    role: 'user' | 'tutor';
    content: string;
    timestamp: Date;
}

export default function TutorPage() {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'tutor',
            content: '¡Hola! Soy tu tutor socrático en Agentic AI Security. Mi objetivo no es darte respuestas directas, sino guiarte con preguntas para que descubras el conocimiento por ti mismo. ¿Sobre qué tema de seguridad de IA te gustaría reflexionar hoy?',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    // Simulated Socratic responses (in a real app, this would call an AI API)
    const generateSocraticResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        if (lowerMessage.includes('prompt injection') || lowerMessage.includes('inyección')) {
            return '¿Interesante pregunta sobre prompt injection! Antes de profundizar, déjame hacerte una pregunta: ¿Por qué crees que los LLMs son vulnerables a este tipo de ataques en primer lugar? ¿Qué característica fundamental de su funcionamiento lo permite?';
        }

        if (lowerMessage.includes('jailbreak') || lowerMessage.includes('escapar')) {
            return 'Entiendo que quieres comprender el jailbreaking. Piensa en esto: si tú estuvieras diseñando un sistema para prevenir jailbreaks, ¿qué enfoque tomarías? ¿Cuáles serían tus primeros 3 controles de seguridad?';
        }

        if (lowerMessage.includes('alignment') || lowerMessage.includes('alineamiento')) {
            return 'El alignment es fundamental. Reflexiona: ¿Qué diferencia existe entre un modelo que "entiende" una instrucción y un modelo que está "alineado" con los valores humanos? ¿Son conceptos equivalentes?';
        }

        if (lowerMessage.includes('threat model') || lowerMessage.includes('modelo de amenazas')) {
            return 'Excelente tema. Considera esto: cuando haces threat modeling para una aplicación tradicional vs un sistema de IA, ¿qué nuevas superficies de ataque aparecen? ¿Puedes identificar al menos 3 vectores que no existirían en software convencional?';
        }

        if (lowerMessage.includes('sí') || lowerMessage.includes('si') || lowerMessage.includes('exacto') || lowerMessage.includes('correcto')) {
            return 'Muy bien, veo que estás en el camino correcto. Ahora profundicemos: ¿Podrías explicar el "por qué" detrás de esa respuesta? ¿Qué principios fundamentales la sustentan?';
        }

        if (lowerMessage.includes('no sé') || lowerMessage.includes('no estoy seguro')) {
            return 'Está bien no saber la respuesta inmediatamente. Intentemos otro enfoque: ¿Qué información adicional necesitarías para responder esta pregunta? ¿Qué analogías de otros dominios podrían ayudarte?';
        }

        // Default Socratic response
        return 'Esa es una observación interesante. Antes de darte mi perspectiva, me gustaría que reflexiones: ¿Cuáles podrían ser las implicaciones de seguridad de lo que acabas de mencionar? ¿Qué casos extremos (edge cases) deberíamos considerar?';
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI thinking time
        setTimeout(() => {
            const tutorResponse: Message = {
                role: 'tutor',
                content: generateSocraticResponse(input),
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, tutorResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleQuickQuestion = (question: string) => {
        setInput(question);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <MessageCircle className="w-10 h-10 text-primary" />
                        <h1 className="text-4xl font-bold">Tutor Socrático</h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Aprende a través del cuestionamiento guiado. El tutor no te da respuestas, te ayuda a descubrirlas.
                    </p>
                </div>

                {/* Quick Questions */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            Preguntas Sugeridas
                        </CardTitle>
                        <CardDescription>Haz clic para comenzar una conversación sobre estos temas</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="justify-start h-auto py-3 px-4 text-left"
                                onClick={() => handleQuickQuestion('¿Cómo funcionan los ataques de prompt injection?')}
                            >
                                <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                ¿Cómo funcionan los ataques de prompt injection?
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start h-auto py-3 px-4 text-left"
                                onClick={() => handleQuickQuestion('¿Qué es AI alignment y por qué es importante?')}
                            >
                                <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                ¿Qué es AI alignment y por qué es importante?
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start h-auto py-3 px-4 text-left"
                                onClick={() => handleQuickQuestion('¿Cómo hago threat modeling para un AI agent?')}
                            >
                                <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                ¿Cómo hago threat modeling para un AI agent?
                            </Button>
                            <Button
                                variant="outline"
                                className="justify-start h-auto py-3 px-4 text-left"
                                onClick={() => handleQuickQuestion('¿Cuáles son las mejores defensas contra jailbreaking?')}
                            >
                                <HelpCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                ¿Cuáles son las mejores defensas contra jailbreaking?
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Chat Interface */}
                <Card className="h-[600px] flex flex-col">
                    <CardHeader className="border-b">
                        <CardTitle>Conversación</CardTitle>
                        <CardDescription>
                            El tutor usa el método socrático: te guía con preguntas en lugar de darte respuestas directas
                        </CardDescription>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                        }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    <p className="text-xs opacity-70 mt-1">
                                        {message.timestamp.toLocaleTimeString('es-ES', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-muted">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    {/* Input */}
                    <div className="border-t p-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Escribe tu pregunta o respuesta..."
                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                                <Send className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </Card>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>💡 Tip: El tutor socrático te hará reflexionar sobre tus respuestas para profundizar tu comprensión</p>
                </div>
            </div>
        </div>
    );
}
