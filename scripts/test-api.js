import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, '.env.local'), override: true });

const API_KEY = process.env.VITE_GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

async function listModels() {
    if (!API_KEY) {
        console.error("No API key found.");
        return;
    }
    const genAI = new GoogleGenerativeAI(API_KEY);
    try {
        console.log("Checking models...");
        // This might not work in all SDK versions, but let's try a simple generation with a fallback model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("Success with gemini-1.5-flash");
    } catch (e) {
        console.error("Error with gemini-1.5-flash:", e.message);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("test");
            console.log("Success with gemini-pro");
        } catch (e2) {
            console.error("Error with gemini-pro:", e2.message);
        }
    }
}

listModels();
