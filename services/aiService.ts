import { GoogleGenAI } from "@google/genai";

// Initialize the API with a key from environment variables
// Supports both VITE_GOOGLE_API_KEY and GEMINI_API_KEY (from vite.config.ts)
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : "") || "";

if (!API_KEY || API_KEY.includes("your-google-api-key") || API_KEY.includes("PLACEHOLDER")) {
    console.warn("DIAGNOSTIC: AI Service detected missing or placeholder API Key.");
} else {
    console.log("DIAGNOSTIC: AI Service detected a potential API Key.");
}

interface AIConfig {
    modelName?: string;
    temperature?: number;
    maxOutputTokens?: number;
}

export class AIService {
    private genAI: GoogleGenAI | null = null;
    private model: any | null = null;
    private config: AIConfig;

    constructor(config: AIConfig = {}) {
        this.config = config;
    }

    private initialize() {
        if (!this.genAI) {
            const isPlaceholder = API_KEY.includes("your-google-api-key");
            if (!API_KEY || isPlaceholder) {
                console.error("VITE_GOOGLE_API_KEY is missing or invalid placeholder. AI features will fail.");
                throw new Error("Invalid API Key: Please set a valid Gemini API Key in your .env file.");
            }
            this.genAI = new GoogleGenAI({ apiKey: API_KEY });
        }
    }

    async generateText(prompt: string): Promise<string> {
        this.initialize();
        if (!this.genAI) throw new Error("AI Service not initialized");

        try {
            const result = await this.genAI.models.generateContent({
                model: this.config.modelName || "gemini-2.0-flash-exp",
                contents: [{ role: 'user', parts: [{ text: prompt }] }],
                config: {
                    temperature: this.config.temperature || 0.7,
                    maxOutputTokens: this.config.maxOutputTokens || 2048,
                }
            });
            return result.text ? result.text.toString() : "";
        } catch (error) {
            console.error("Error generating text:", error);
            throw new Error("Failed to generate text from AI service. Check your API Key.");
        }
    }

    async generateStructuredJSON<T>(prompt: string, schemaDescription: string): Promise<T> {
        this.initialize();
        if (!this.genAI) throw new Error("AI Service not initialized");

        const jsonPrompt = `
        ${prompt}

        You must respond with valid JSON matching this schema description:
        ${schemaDescription}

        Do not include markdown formatting (like \`\`\`json). Just return the raw JSON string.
        `;

        try {
            const result = await this.genAI.models.generateContent({
                model: this.config.modelName || "gemini-2.0-flash-exp",
                contents: [{ role: 'user', parts: [{ text: jsonPrompt }] }],
                config: {
                    temperature: this.config.temperature || 0.7,
                    maxOutputTokens: this.config.maxOutputTokens || 2048,
                }
            });

            const content = result.text ? result.text.toString() : "";
            const text = content.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(text) as T;
        } catch (error) {
            console.error("Error generating JSON:", error);
            // Simple retry logic could be added here
            throw new Error("Failed to generate valid JSON from AI service.");
        }
    }
}

export const defaultAIService = new AIService();


