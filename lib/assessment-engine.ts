// Assessment types and questions for Agentic AI Security

export interface AssessmentQuestion {
    id: string;
    category: string;
    question: string;
    options: {
        text: string;
        score: number; // 0-10, where 10 is expert level
    }[];
}

export interface AssessmentResult {
    category: string;
    score: number;
    maxScore: number;
    percentage: number;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    gapIdentified: boolean;
}

export const assessmentQuestions: AssessmentQuestion[] = [
    // AI Security Fundamentals
    {
        id: 'ai-sec-1',
        category: 'AI Security Fundamentals',
        question: '¿Cuál es tu nivel de comprensión sobre los riesgos de seguridad específicos de sistemas de IA?',
        options: [
            { text: 'No tengo conocimiento previo', score: 0 },
            { text: 'He leído artículos pero no he trabajado con ello', score: 3 },
            { text: 'Puedo identificar riesgos básicos (bias, privacy)', score: 6 },
            { text: 'Puedo diseñar controles de seguridad para sistemas de IA', score: 10 },
        ],
    },
    {
        id: 'ai-sec-2',
        category: 'AI Security Fundamentals',
        question: '¿Has implementado o auditado medidas de seguridad en modelos de machine learning en producción?',
        options: [
            { text: 'Nunca he trabajado con ML en producción', score: 0 },
            { text: 'Solo en entornos de desarrollo/sandbox', score: 4 },
            { text: 'He implementado algunas medidas básicas', score: 7 },
            { text: 'He liderado auditorías completas de seguridad de ML', score: 10 },
        ],
    },

    // Prompt Injection & Jailbreaking
    {
        id: 'prompt-1',
        category: 'Prompt Injection & Jailbreaking',
        question: '¿Qué tan familiarizado estás con técnicas de prompt injection?',
        options: [
            { text: 'No sé qué es prompt injection', score: 0 },
            { text: 'Entiendo el concepto teórico', score: 4 },
            { text: 'He probado ataques básicos en entornos controlados', score: 7 },
            { text: 'Puedo diseñar defensas robustas contra prompt injection', score: 10 },
        ],
    },
    {
        id: 'prompt-2',
        category: 'Prompt Injection & Jailbreaking',
        question: '¿Has trabajado con técnicas de jailbreaking de LLMs?',
        options: [
            { text: 'No tengo experiencia', score: 0 },
            { text: 'He leído sobre casos famosos (DAN, etc.)', score: 3 },
            { text: 'He replicado ataques conocidos', score: 6 },
            { text: 'Desarrollo contramedi das y pruebas red team', score: 10 },
        ],
    },

    // Model Safety & Alignment
    {
        id: 'safety-1',
        category: 'Model Safety & Alignment',
        question: '¿Comprendes los conceptos de AI alignment y model safety?',
        options: [
            { text: 'Son términos nuevos para mí', score: 0 },
            { text: 'Entiendo la importancia pero no los detalles técnicos', score: 4 },
            { text: 'Conozco técnicas como RLHF y constitutional AI', score: 7 },
            { text: 'He implementado estrategias de alignment en proyectos reales', score: 10 },
        ],
    },
    {
        id: 'safety-2',
        category: 'Model Safety & Alignment',
        question: '¿Qué experiencia tienes evaluando modelos para comportamientos adversos?',
        options: [
            { text: 'Ninguna', score: 0 },
            { text: 'He usado herramientas de evaluación básicas', score: 4 },
            { text: 'Diseño casos de prueba personalizados', score: 7 },
            { text: 'Lidero programas de red teaming de modelos', score: 10 },
        ],
    },

    // Threat Modeling for AI
    {
        id: 'threat-1',
        category: 'Threat Modeling for AI',
        question: '¿Puedes aplicar threat modeling específico para sistemas de IA?',
        options: [
            { text: 'No sé cómo adaptarlo a IA', score: 0 },
            { text: 'Uso frameworks tradicionales (STRIDE, PASTA)', score: 4 },
            { text: 'Adapto frameworks para considerar riesgos de ML', score: 7 },
            { text: 'Desarrollo modelos de amenazas específicos para AI agents', score: 10 },
        ],
    },
    {
        id: 'threat-2',
        category: 'Threat Modeling for AI',
        question: '¿Conoces las amenazas específicas de AI agents autónomos?',
        options: [
            { text: 'No estoy familiarizado con AI agents', score: 0 },
            { text: 'Entiendo sus capacidades básicas', score: 3 },
            { text: 'Puedo identificar vectores de ataque específicos', score: 7 },
            { text: 'Diseño arquitecturas seguras para agentic AI', score: 10 },
        ],
    },

    // AI Governance & Compliance
    {
        id: 'gov-1',
        category: 'AI Governance & Compliance',
        question: '¿Qué tan familiarizado estás con regulaciones de IA (EU AI Act, etc.)?',
        options: [
            { text: 'No conozco las regulaciones actuales', score: 0 },
            { text: 'Sé que existen pero no los detalles', score: 3 },
            { text: 'Puedo explicar requisitos principales', score: 7 },
            { text: 'Implemento programas de compliance completos', score: 10 },
        ],
    },
    {
        id: 'gov-2',
        category: 'AI Governance & Compliance',
        question: '¿Has implementado frameworks de gobernanza de IA en tu organización?',
        options: [
            { text: 'No tenemos gobernanza de IA', score: 0 },
            { text: 'Estamos evaluando opciones', score: 3 },
            { text: 'Tenemos políticas básicas implementadas', score: 6 },
            { text: 'Lidero el programa de gobernanza de IA', score: 10 },
        ],
    },
];

export function calculateAssessmentResults(
    answers: Record<string, number>
): AssessmentResult[] {
    const categories = Array.from(
        new Set(assessmentQuestions.map((q) => q.category))
    );

    return categories.map((category) => {
        const categoryQuestions = assessmentQuestions.filter(
            (q) => q.category === category
        );

        const totalScore = categoryQuestions.reduce((sum, q) => {
            return sum + (answers[q.id] || 0);
        }, 0);

        const maxScore = categoryQuestions.length * 10;
        const percentage = (totalScore / maxScore) * 100;

        let level: AssessmentResult['level'];
        if (percentage < 25) level = 'beginner';
        else if (percentage < 50) level = 'intermediate';
        else if (percentage < 75) level = 'advanced';
        else level = 'expert';

        return {
            category,
            score: totalScore,
            maxScore,
            percentage,
            level,
            gapIdentified: percentage < 70, // Gap if below 70%
        };
    });
}

export interface LearningModule {
    id: string;
    title: string;
    description: string;
    category: string;
    estimatedTime: number; // in minutes
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    prerequisites: string[];
}

export const learningModules: LearningModule[] = [
    {
        id: 'ai-sec-101',
        title: 'Fundamentos de Seguridad en IA',
        description: 'Introducción a riesgos y vectores de ataque en sistemas de IA',
        category: 'AI Security Fundamentals',
        estimatedTime: 15,
        difficulty: 'beginner',
        prerequisites: [],
    },
    {
        id: 'ai-sec-201',
        title: 'Arquitecturas Seguras de ML',
        description: 'Diseño de sistemas de ML resistentes a ataques',
        category: 'AI Security Fundamentals',
        estimatedTime: 30,
        difficulty: 'intermediate',
        prerequisites: ['ai-sec-101'],
    },
    {
        id: 'prompt-101',
        title: 'Introducción a Prompt Injection',
        description: 'Conceptos básicos y ejemplos de ataques de prompt injection',
        category: 'Prompt Injection & Jailbreaking',
        estimatedTime: 20,
        difficulty: 'beginner',
        prerequisites: [],
    },
    {
        id: 'prompt-201',
        title: 'Defensas contra Prompt Injection',
        description: 'Técnicas y mejores prácticas para mitigar prompt injection',
        category: 'Prompt Injection & Jailbreaking',
        estimatedTime: 35,
        difficulty: 'advanced',
        prerequisites: ['prompt-101'],
    },
    {
        id: 'safety-101',
        title: 'Conceptos de AI Alignment',
        description: 'RLHF, Constitutional AI y técnicas de alineamiento',
        category: 'Model Safety & Alignment',
        estimatedTime: 25,
        difficulty: 'intermediate',
        prerequisites: [],
    },
    {
        id: 'safety-201',
        title: 'Red Teaming de Modelos',
        description: 'Metodologías para evaluar comportamientos adversos en LLMs',
        category: 'Model Safety & Alignment',
        estimatedTime: 40,
        difficulty: 'advanced',
        prerequisites: ['safety-101'],
    },
    {
        id: 'threat-101',
        title: 'Threat Modeling para IA',
        description: 'Adaptación de STRIDE y PASTA para sistemas de IA',
        category: 'Threat Modeling for AI',
        estimatedTime: 30,
        difficulty: 'intermediate',
        prerequisites: [],
    },
    {
        id: 'threat-201',
        title: 'Seguridad de AI Agents Autónomos',
        description: 'Amenazas específicas y arquitecturas seguras para agentic AI',
        category: 'Threat Modeling for AI',
        estimatedTime: 45,
        difficulty: 'advanced',
        prerequisites: ['threat-101'],
    },
    {
        id: 'gov-101',
        title: 'Introducción a Gobernanza de IA',
        description: 'Frameworks y regulaciones (EU AI Act, NIST AI RMF)',
        category: 'AI Governance & Compliance',
        estimatedTime: 20,
        difficulty: 'beginner',
        prerequisites: [],
    },
    {
        id: 'gov-201',
        title: 'Implementación de Compliance de IA',
        description: 'Programa completo de gobernanza y auditoría de IA',
        category: 'AI Governance & Compliance',
        estimatedTime: 50,
        difficulty: 'advanced',
        prerequisites: ['gov-101'],
    },
];

export function generateLearningPath(results: AssessmentResult[]): LearningModule[] {
    const path: LearningModule[] = [];

    results.forEach((result) => {
        if (result.gapIdentified) {
            // Add modules for this category based on current level
            const categoryModules = learningModules.filter(
                (m) => m.category === result.category
            );

            if (result.level === 'beginner') {
                // Add all modules starting from beginner
                path.push(...categoryModules.sort((a, b) => {
                    const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                }));
            } else if (result.level === 'intermediate') {
                // Skip beginner, add intermediate and advanced
                path.push(...categoryModules.filter((m) => m.difficulty !== 'beginner'));
            } else if (result.level === 'advanced') {
                // Only add advanced modules
                path.push(...categoryModules.filter((m) => m.difficulty === 'advanced'));
            }
        }
    });

    return path;
}
