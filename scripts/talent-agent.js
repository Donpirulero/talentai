import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { execSync } from 'child_process';

/**
 * TalentAI Agentic Team - Core CLI Agent
 * This script orchestrates a team of AI agents to analyze, design, and implement 
 * features for the TalentAI platform.
 */

// Setup environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env files
dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, '.env.local'), override: true });

const API_KEY = process.env.VITE_GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.error("❌ Error: VITE_GOOGLE_API_KEY or GEMINI_API_KEY not found in .env or .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Using Flash for cost-efficiency and speed

// Utils
const log = (agent, msg) => console.log(`\n[\x1b[36m${agent.toUpperCase()}\x1b[0m] ${msg}`);
const writeFile = (p, c) => {
    const fullPath = path.join(rootDir, p);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, c);
};

const generate = async (agent, prompt) => {
    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        if (!text) {
            log(agent, "⚠️ Warning: Received empty response from AI.");
            return "(No output generated)";
        }
        return text;
    } catch (e) {
        log(agent, `❌ AI Error: ${e.message}`);
        return `(Error generated: ${e.message})`;
    }
};

async function main() {
    const task = process.argv[2];
    const shouldApply = process.argv.includes('--apply');

    if (!task) {
        console.log("Usage: node scripts/talent-agent.js \"Your Task\" [--apply]");
        process.exit(0);
    }

    console.log(`\n🚀 \x1b[1mTalentAI Agentic Evolution Engine\x1b[0m`);
    console.log(`🎯 Task: ${task}`);
    console.log(`⚙️  Apply Changes: ${shouldApply ? 'YES' : 'NO'}\n`);

    // 0. GATHER CONTEXT
    let codebase = "";
    const codebasePath = path.join(rootDir, 'project_codebase.txt');
    try {
        if (fs.existsSync(codebasePath)) {
            // Increase character limit to ~300k (Gemini 1.5 Pro handles 1M+ tokens)
            codebase = fs.readFileSync(codebasePath, 'utf-8').substring(0, 300000);
            log("SYSTEM", `Loaded ${codebase.length} chars of codebase context.`);
        } else {
            log("SYSTEM", "⚠️ project_codebase.txt not found. agents may lack context.");
            log("SYSTEM", "💡 Run 'node generate_context.js' first.");
        }
    } catch (e) {
        log("SYSTEM", `❌ Error reading codebase context: ${e.message}`);
    }

    // 1. ARCHITECT: Strategy & Design
    log("ARCHITECT", "Synthesizing implementation strategy...");
    const architectPrompt = `
    You are the Lead Architect for TalentAI. 
    TalentAI is a React/TypeScript platform for AI-powered HR and talent management.
    Tech Stack: React 19, Vite, TailwindCSS, Supabase, Lucide icons.
    
    Task: ${task}
    
    Instructions:
    1. Analyze the requirement against the existing codebase patterns.
    2. Define which components/hooks/services need to be created or modified.
    3. Ensure AI-first UX (vibrant, dark-mode, glassy aesthetics).
    4. Propose a step-by-step Implementation Plan.
    
    Context:
    ${codebase}
    `;
    const plan = await generate("ARCHITECT", architectPrompt);
    writeFile('_agent_workspace/1_plan.md', plan);


    // 2. DEVELOPER: Code Generation
    log("DEVELOPER", "Generating TypeScript/React implementation...");
    const devPrompt = `
    You are the Senior Full-Stack Developer for TalentAI.
    Follow the Architectural Plan:
    ${plan}
    
    Task: ${task}
    
    Strict Implementation Rules:
    1. Use TypeScript with strict typing.
    2. Use TailwindCSS for styling (bg-background-dark, text-white, cyan-500 accents).
    3. Use Lucide-react for icons.
    4. If modifying existing files, provide the FULL new content.
    
    Output Format (Parsed by apply-changes.js):
    --- FILE: path/to/file.tsx ---
    (Code here)
    --- END FILE ---
    `;
    const code = await generate("DEVELOPER", devPrompt);
    writeFile('_agent_workspace/2_code.md', code);


    // 3. EXECUTOR: Quality Assurance & Lint Prediction
    log("EXECUTOR", "Predicting build stability and types...");
    const execPrompt = `
    You are the QA Automation Specialist. 
    Review the generated code for:
    1. Import errors (missing dependencies).
    2. TypeScript type mismatches.
    3. Proper React 19 patterns.
    
    Code:
    ${code}
    
    Output a concise table of potential risks and a stability score (0-100).
    `;
    const buildLog = await generate("EXECUTOR", execPrompt);
    writeFile('_agent_workspace/3_qa_analysis.md', buildLog);


    // 4. REVIEWER: Final Critique
    log("REVIEWER", "Performing final code audit...");
    const reviewPrompt = `
    You are the Head of Engineering. 
    Approve or reject the implementation based on:
    - Plan adherence.
    - Security (Supabase RLS, input sanitization).
    - Design consistency.
    
    QA Report: ${buildLog}
    
    Output "APPROVED" or "CHANGES_REQUESTED" followed by detailed reasoning.
    `;
    const review = await generate("REVIEWER", reviewPrompt);
    writeFile('_agent_workspace/4_review.md', review);

    const isApproved = review.toUpperCase().includes('APPROVED') && !review.toUpperCase().includes('CHANGES_REQUESTED');


    // 5. REPORTER: Summary
    log("REPORTER", "Drafting evolution report...");
    const reportFilename = `agent_reports/Report_${Date.now()}.md`;
    const report = `
# 🤖 TalentAI Evolution Report
**Task:** ${task}
**Status:** ${isApproved ? '✅ APPROVED' : '⚠️ REVISION NEEDED'}

## Implementation Summary
${plan.substring(0, 500)}...

## QA Insights
${buildLog}

## Review Outcome
${review}

---
*Generated by TalentAI Agentic Team*
    `;
    writeFile(reportFilename, report);

    console.log(`\n✅ Mission Phase Complete!`);
    console.log(`📄 Summary: ${reportFilename}`);

    if (shouldApply && isApproved) {
        log("ENGINEER", "Applying changes to codebase...");
        try {
            execSync(`node scripts/apply-changes.js "_agent_workspace/2_code.md"`, { stdio: 'inherit' });
        } catch (e) {
            log("ENGINEER", "❌ Failed to apply changes automatically.");
        }
    } else if (shouldApply) {
        log("ENGINEER", "🚫 Skipping application: Implementation not APPROVED.");
    }
}

main();
