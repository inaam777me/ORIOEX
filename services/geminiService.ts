
import { GoogleGenAI, Type } from "@google/genai";
import { LeadFormData, LeadScoreResult } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async scoreLead(data: LeadFormData): Promise<LeadScoreResult> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this potential software sales lead:
          Name: ${data.name}
          Company: ${data.company}
          Budget: ${data.budget}
          Message: ${data.message}`,
        config: {
          systemInstruction: "You are an expert sales operations analyst. Score the lead from 0-100 based on potential value, intent, and company fit. Provide a priority (LOW, MEDIUM, HIGH) and a short summary.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              priority: { type: Type.STRING, description: "LOW, MEDIUM, or HIGH" },
              summary: { type: Type.STRING }
            },
            required: ["score", "priority", "summary"]
          }
        }
      });

      const text = response.text.trim();
      return JSON.parse(text) as LeadScoreResult;
    } catch (error) {
      console.error("Lead scoring failed:", error);
      return { score: 0, priority: 'LOW', summary: "Scoring unavailable." };
    }
  }
}

export const geminiService = new GeminiService();
