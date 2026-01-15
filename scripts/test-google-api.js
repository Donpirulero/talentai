
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env
dotenv.config({ path: path.join(rootDir, '.env') });

const apiKey = process.env.VITE_GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ NO API KEY FOUND!");
    process.exit(1);
}

console.log(`🔑 Key found (starts with): ${apiKey.substring(0, 5)}...`);

async function testKey() {
    try {
        console.log("⏳ Testing connection to Google Generative AI...");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "Hello! Please reply with 'API IS WORKING' if you can read this.";
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("\n✅ SUCCESS! API Response received:");
        console.log("------------------------------------------------");
        console.log(text);
        console.log("------------------------------------------------");
    } catch (error) {
        console.error("\n❌ FAILED to connect or generate content.");
        console.error("Error details:", error.message);
        if (error.message.includes("403")) {
            console.error("-> 403 usually means the API key is invalid or lacks permissions.");
        }
    }
}

testKey();
