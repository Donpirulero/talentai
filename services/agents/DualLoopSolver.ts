import { AIService } from '../aiService';

export interface SolverStep {
    id: string;
    description: string;
    status: 'pending' | 'active' | 'completed' | 'failed';
    result?: string;
}

export interface SolverState {
    phase: 'idle' | 'analyzing' | 'planning' | 'solving' | 'completed';
    steps: SolverStep[];
    analysisNotes: string[];
    finalAnswer: string | null;
    logs: string[];
}

interface InvestigateResult {
    queries: string[];
    reasoning: string;
}

interface PlanResult {
    steps: { id: string; description: string }[];
}

export class DualLoopSolver {
    private aiService: AIService;
    private state: SolverState;
    private notifyStateChange: (state: SolverState) => void;

    constructor(
        aiService: AIService,
        initialStateNotifier: (state: SolverState) => void
    ) {
        this.aiService = aiService;
        this.notifyStateChange = initialStateNotifier;
        this.state = {
            phase: 'idle',
            steps: [],
            analysisNotes: [],
            finalAnswer: null,
            logs: []
        };
    }

    private updateState(partialState: Partial<SolverState>) {
        this.state = { ...this.state, ...partialState };
        this.notifyStateChange(this.state);
    }

    private addLog(message: string) {
        console.log(`[DualLoopSolver] ${message}`);
        this.updateState({ logs: [...this.state.logs, message] });
    }

    async solve(question: string) {
        this.addLog(`Starting process for question: "${question}"`);
        this.updateState({ phase: 'analyzing', finalAnswer: null, steps: [], analysisNotes: [] });

        try {
            // 1. Analysis Loop
            await this.runAnalysisLoop(question);

            // 2. Planning
            this.updateState({ phase: 'planning' });
            const plan = await this.runPlanningPhase(question, this.state.analysisNotes);

            this.updateState({
                steps: plan.steps.map(s => ({ ...s, status: 'pending' }))
            });

            // 3. Solve Loop
            this.updateState({ phase: 'solving' });
            await this.runSolveLoop(question, plan.steps);

            // 4. Finalize
            this.updateState({ phase: 'completed' });
            this.addLog("Process completed successfully.");

        } catch (error) {
            this.addLog(`Error during solving: ${error}`);
            this.updateState({ phase: 'idle' }); // Or error state
        }
    }

    private async runAnalysisLoop(question: string) {
        this.addLog("Running Analysis Loop...");

        // Simulate "Investigate Agent"
        const prompt = `
        You are an Expert Investigator. Your goal is to break down the user's complex question into 2-3 key areas that need to be understood before solving.
        
        Question: "${question}"
        
        Return JSON validation:
        {
            "queries": ["sub-query 1", "sub-query 2"],
            "reasoning": "Explanation of why these areas are important."
        }
        `;

        const result = await this.aiService.generateStructuredJSON<InvestigateResult>(prompt, "{ queries: string[], reasoning: string }");

        this.addLog(`Investigation complete. Reasoning: ${result.reasoning}`);

        // In a real app, we would actually run these queries (RAG/Tools). 
        // For now, we simulate the "Note Agent" summarizing "findings" (mocked mainly as we don't have a real KB connected yet).

        const findings = result.queries.map(q => `Simulated finding for: ${q} - [Relevant info found in database]`);

        this.updateState({ analysisNotes: findings });
    }

    private async runPlanningPhase(question: string, findings: string[]) {
        this.addLog("Running Planning Phase...");

        const findingsText = findings.map(f => `- ${f}`).join('\n');
        const prompt = `
        You are a Strategic Manager Agent. Based on the user's question and the preliminary findings, create a step-by-step plan to answer the question thoroughly.
        
        Question: "${question}"
        Findings:
        ${findingsText}
        
        Create 3-5 distinct steps.
        Return JSON:
        {
            "steps": [
                { "id": "step_1", "description": "First step description..." }
            ]
        }
        `;

        const result = await this.aiService.generateStructuredJSON<PlanResult>(prompt, "{ steps: { id: string, description: string }[] }");
        this.addLog(`Plan generated with ${result.steps.length} steps.`);
        return result;
    }

    private async runSolveLoop(question: string, steps: { id: string; description: string }[]) {
        this.addLog("Running Solve Loop...");

        const fullAnswerParts: string[] = [];

        for (const step of steps) {
            this.updateStepStatus(step.id, 'active');
            this.addLog(`Executing Step: ${step.description}`);

            // Simulate "Solve Agent" executing the step
            const prompt = `
            You are a Solver Agent. Execute the following step for the user's request.
            
            Original Question: "${question}"
            Current Step: "${step.description}"
            Context so far:
            ${fullAnswerParts.join('\n---\n')}
            
            Provide the result for this specific step.
            `;

            const stepResult = await this.aiService.generateText(prompt);
            fullAnswerParts.push(stepResult);

            this.updateStepStatus(step.id, 'completed', stepResult);
            this.addLog(`Step ${step.id} completed.`);
        }

        // Final consolidation
        const finalPrompt = `
        You are the Response Agent. Consolidate the following step results into a final, cohesive answer for the user.
        
        Original Question: "${question}"
        
        Step Results:
        ${fullAnswerParts.join('\n\n')}
        
        Format beautifully in Markdown.
        `;

        const finalAnswer = await this.aiService.generateText(finalPrompt);
        this.updateState({ finalAnswer });
    }

    private updateStepStatus(stepId: string, status: SolverStep['status'], result?: string) {
        const newSteps = this.state.steps.map(s =>
            s.id === stepId
                ? { ...s, status, result: result || s.result }
                : s
        );
        this.updateState({ steps: newSteps });
    }
}
