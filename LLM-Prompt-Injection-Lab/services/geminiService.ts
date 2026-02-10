
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { TUTOR_SYSTEM_INSTRUCTION } from "../constants";
import { LevelConfig } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable is not set");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async queryAgent(userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[], level: LevelConfig): Promise<string> {
    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: level.agentInstruction,
        temperature: 0.7,
      },
    });
    return response.text || "No response received.";
  }

  async queryTutor(
    studentInput: string, 
    agentOutput: string, 
    history: { role: 'user' | 'model', parts: { text: string }[] }[],
    level: LevelConfig
  ): Promise<string> {
    const contextPrompt = `
      ESTADO DEL LABORATORIO:
      Nivel Actual: ${level.id} (${level.name})
      Mecánica de Defensa: ${level.defenseMechanism}
      Flag Objetivo: ${level.flag}
      
      ÚLTIMO INTERCAMBIO:
      Estudiante: "${studentInput}"
      Agente: "${agentOutput}"
      
      Proporciona feedback pedagógico. Si el estudiante logró extraer el FLAG "${level.flag}", confirma el éxito y explica la vulnerabilidad explotada.
    `;

    const response: GenerateContentResponse = await this.ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: contextPrompt }] }
      ],
      config: {
        systemInstruction: TUTOR_SYSTEM_INSTRUCTION,
        temperature: 0.2,
      },
    });
    return response.text || "No feedback available.";
  }
}
