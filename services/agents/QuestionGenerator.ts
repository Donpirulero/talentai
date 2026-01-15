import { AIService } from '../aiService';

export interface QuestionRequirement {
    topic: string;
    difficulty: 'easy' | 'medium' | 'hard';
    type: 'choice' | 'open';
    context?: string;
}

export interface Question {
    stem: string;
    options?: Record<string, string>;
    correctAnswer: string;
    explanation: string;
    difficulty: string;
    topic: string;
}

export class QuestionGenerator {
    private aiService: AIService;

    constructor(aiService: AIService) {
        this.aiService = aiService;
    }

    async generate(requirement: QuestionRequirement): Promise<Question> {
        console.log(`[QuestionGenerator] Generating question for: ${requirement.topic}`);

        // 1. Generation Phase
        const prompt = `
        You are an Expert Exam Creator. Create a ${requirement.difficulty} ${requirement.type} question about "${requirement.topic}".
        Context: ${requirement.context || "General professional context"}

        If multiple choice, provide 4 options (A, B, C, D).
        If open ended, provide the model answer.

        Return JSON matching this TypeScript interface:
        {
            stem: string;
            options?: { A: string, B: string, C: string, D: string }; // Only for 'choice'
            correctAnswer: string; // The letter (e.g. "B") or the full text answer
            explanation: string; // Detailed reasoning
            difficulty: string;
            topic: string;
        }
        `;

        const draft = await this.aiService.generateStructuredJSON<Question>(prompt, "{ stem: string, options?: any, correctAnswer: string, explanation: string, difficulty: string, topic: string }");

        // 2. Validation Phase (Simulated Dual-Loop)
        // In a full port, this would be a separate agent loop, but here we chain it for simplicity (or "Serverless coordination").
        console.log(`[QuestionGenerator] Validating draft...`);
        const validation = await this.validateQuestion(draft);

        if (validation.approved) {
            return draft;
        } else {
            console.log(`[QuestionGenerator] Draft rejected. Refining... Reason: ${validation.feedback}`);
            return this.refineQuestion(draft, validation.feedback);
        }
    }

    private async validateQuestion(question: Question): Promise<{ approved: boolean; feedback: string }> {
        const prompt = `
        You are a Senior Validator. Review this question for accuracy, clarity, and difficulty alignment.
        
        Question: ${JSON.stringify(question)}
        
        Return JSON:
        {
            "approved": boolean,
            "feedback": string // If approved, "OK". If not, specific issues.
        }
        `;
        return this.aiService.generateStructuredJSON(prompt, "{ approved: boolean, feedback: string }");
    }

    private async refineQuestion(draft: Question, feedback: string): Promise<Question> {
        const prompt = `
        Refine this question based on the feedback.
        
        Original Draft: ${JSON.stringify(draft)}
        Feedback: ${feedback}
        
        Return corrected JSON question.
        `;
        return this.aiService.generateStructuredJSON(prompt, "{ stem: string, options?: any, correctAnswer: string, explanation: string, difficulty: string, topic: string }");
    }
}
