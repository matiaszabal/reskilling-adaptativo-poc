# Adaptive Learning Platform - Implementation Plan

## Vision

Build a proof-of-concept platform that demonstrates adaptive learning for corporate reskilling in **Agentic AI Security**. The platform showcases how AI-driven personalization can reduce training time while maximizing skill acquisition and ROI.

## User Review Required

> [!IMPORTANT]
> **Technology Stack Decision**
> 
> I'm proposing to build this as a **Next.js web application** with the following stack:
> - **Next.js 14** (App Router) - Modern React framework with server components
> - **TypeScript** - Type safety and better DX
> - **Tailwind CSS** - Rapid, modern UI development
> - **shadcn/ui** - High-quality component library
> - **Python backend services** - For AI/ML integration and NotebookLM MCP connection
> 
> This will be a functional POC that demonstrates all core features locally.

> [!IMPORTANT]
> **NotebookLM Integration**
> 
> The platform will use your configured NotebookLM MCP server to:
> - Fetch latest research and technical updates on Agentic AI Security
> - Auto-generate learning content from curated sources
> - Keep training materials synchronized with industry developments
> 
> We'll create a dedicated notebook in your NotebookLM for this purpose with relevant security papers and resources.

## Proposed Changes

### Core Platform Structure

#### [NEW] [package.json](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/package.json)
Next.js application with all dependencies

#### [NEW] [tsconfig.json](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/tsconfig.json)
TypeScript configuration

#### [NEW] [tailwind.config.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/tailwind.config.ts)
Tailwind CSS configuration with custom design tokens

---

### Design System & UI Components

#### [NEW] [src/app/globals.css](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/globals.css)
Global styles and CSS variables for theming

#### [NEW] [src/components/ui/](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/components/ui/)
Reusable UI components (Button, Card, Input, Progress, etc.)

---

### Landing & Executive Presentation

#### [NEW] [src/app/page.tsx](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/page.tsx)
Executive presentation landing page showcasing:
- Value proposition (time savings, precision, ROI)
- Adaptive learning concept visualization
- Platform capabilities overview
- CTA to start assessment

---

### Skills Assessment Module

#### [NEW] [src/app/assessment/page.tsx](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/assessment/page.tsx)
Interactive skills assessment interface for Agentic AI Security topics:
- AI security fundamentals
- Threat modeling for AI systems
- Prompt injection & jailbreaking
- Model safety & alignment
- AI governance & compliance

#### [NEW] [src/lib/assessment-engine.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/lib/assessment-engine.ts)
Assessment logic and scoring algorithm

---

### Personalized Learning Path

#### [NEW] [src/app/dashboard/page.tsx](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/dashboard/page.tsx)
Personalized dashboard showing:
- Skills gap analysis
- Recommended learning path
- Progress visualization
- Time-to-competency estimates

#### [NEW] [src/lib/learning-path-generator.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/lib/learning-path-generator.ts)
AI-powered learning path generation based on assessment results

---

### Micro-Learning Content

#### [NEW] [src/app/learn/[moduleId]/page.tsx](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/learn/[moduleId]/page.tsx)
Bite-sized learning modules with:
- Concise explanations (5-10 min)
- Interactive examples
- Knowledge checks
- Real-time difficulty adjustment

#### [NEW] [src/lib/content-updater.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/lib/content-updater.ts)
Automated content synchronization with NotebookLM for latest security research

---

### Security Simulation Environment

#### [NEW] [src/app/practice/page.tsx](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/practice/page.tsx)
Interactive security scenarios:
- Prompt injection challenges
- Model safety evaluations
- Threat detection exercises
- Red team simulations

#### [NEW] [src/lib/simulator.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/lib/simulator.ts)
Simulation engine with instant feedback

---

### Socratic Tutor

#### [NEW] [src/app/tutor/page.tsx](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/tutor/page.tsx)
AI tutor interface using Socratic method:
- Asks guiding questions
- Provides hints, not answers
- Adapts questioning based on learner responses
- Tracks conceptual understanding

#### [NEW] [src/lib/socratic-tutor.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/lib/socratic-tutor.ts)
Socratic dialogue engine

---

### Analytics & Metrics

#### [NEW] [src/app/analytics/page.tsx](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/analytics/page.tsx)
Corporate dashboard showing:
- Time savings vs traditional training
- Skills gap closure metrics
- Employee engagement analytics
- ROI calculation

#### [NEW] [src/lib/analytics-engine.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/lib/analytics-engine.ts)
Metrics collection and analysis

---

### Backend Integration

#### [NEW] [src/app/api/assessment/route.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/api/assessment/route.ts)
Assessment submission and processing

#### [NEW] [src/app/api/learning-path/route.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/api/learning-path/route.ts)
Generate personalized learning paths

#### [NEW] [src/app/api/content-update/route.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/api/content-update/route.ts)
Trigger content updates from NotebookLM

#### [NEW] [src/app/api/tutor/route.ts](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/src/app/api/tutor/route.ts)
Socratic tutor conversation endpoint

#### [NEW] [python-services/notebooklm_client.py](file:///home/matias/.gemini/antigravity/playground/prime-armstrong/python-services/notebooklm_client.py)
Python service to interact with NotebookLM MCP server

## Verification Plan

### Automated Tests
- Run development server: `npm run dev`
- Test all user flows interactively
- Verify NotebookLM integration with real content fetching

### Manual Verification
1. **Landing Page**: Verify executive presentation is compelling and clear
2. **Assessment Flow**: Complete skills assessment and verify accurate scoring
3. **Learning Path**: Check that recommendations are personalized and relevant
4. **Content Updates**: Trigger NotebookLM sync and verify fresh content appears
5. **Practice Environment**: Test security simulations and verify instant feedback
6. **Socratic Tutor**: Have dialogue and verify it uses guiding questions effectively
7. **Analytics**: Review metrics dashboard for accurate calculations

### Demo Walkthrough
Create a complete walkthrough artifact showing:
- Executive presentation
- Assessment completion
- Personalized dashboard
- Learning path navigation
- Practice scenario
- Tutor interaction
- Progress analytics
