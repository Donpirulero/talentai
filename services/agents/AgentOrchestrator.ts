import { AIService, defaultAIService } from "../aiService";

export interface AgentStep {
    id: 'architect' | 'developer' | 'executor' | 'reviewer';
    status: 'pending' | 'running' | 'completed' | 'error';
    output: string | null;
    error?: string;
}

export interface WorkshopState {
    taskId: string;
    isProcessing: boolean;
    currentStep: 'architect' | 'developer' | 'executor' | 'reviewer' | 'completed' | 'idle';
    steps: Record<string, AgentStep>;
    artifacts: {
        plan: string;
        code: string;
        execution_output: string;
        execution_error: string;
        feedback: string;
    };
}

export class AgentOrchestrator {
    private aiService: AIService;
    private stateCallback: (state: WorkshopState) => void;

    // Internal state tracking
    private currentState: WorkshopState = {
        taskId: '',
        isProcessing: false,
        currentStep: 'idle',
        steps: {
            architect: { id: 'architect', status: 'pending', output: null },
            developer: { id: 'developer', status: 'pending', output: null },
            executor: { id: 'executor', status: 'pending', output: null },
            reviewer: { id: 'reviewer', status: 'pending', output: null },
        },
        artifacts: {
            plan: '',
            code: '',
            execution_output: '',
            execution_error: '',
            feedback: ''
        }
    };

    constructor(callback: (state: WorkshopState) => void, aiService: AIService = defaultAIService) {
        this.stateCallback = callback;
        this.aiService = aiService;
    }

    private updateState(update: Partial<WorkshopState> | ((prev: WorkshopState) => Partial<WorkshopState>)) {
        if (typeof update === 'function') {
            const partial = update(this.currentState);
            this.currentState = { ...this.currentState, ...partial };
        } else {
            this.currentState = { ...this.currentState, ...update };
        }
        this.stateCallback(this.currentState);
    }

    private updateStep(stepId: string, update: Partial<AgentStep>) {
        this.updateState(prev => ({
            steps: {
                ...prev.steps,
                [stepId]: { ...prev.steps[stepId], ...update }
            }
        }));
    }

    async runPipeline(taskDescription: string, contextFiles: string) {
        this.updateState({
            taskId: Date.now().toString(),
            isProcessing: true,
            currentStep: 'architect',
            artifacts: { plan: '', code: '', execution_output: '', execution_error: '', feedback: '' },
            steps: {
                architect: { id: 'architect', status: 'running', output: null },
                developer: { id: 'developer', status: 'pending', output: null },
                executor: { id: 'executor', status: 'pending', output: null },
                reviewer: { id: 'reviewer', status: 'pending', output: null },
            }
        });

        try {
            /* 1. ARCHITECT */
            const architectPrompt = `
You are the Lead TalentAI Architect.
Task: ${taskDescription}
Context: ${contextFiles.substring(0, 50000)}

Strategy:
Define the UI structure, data flow, and necessary modifications in React/TS. 
Maintain the high-end dark aesthetics.
            `;

            const plan = await this.aiService.generateText(architectPrompt);
            this.updateStep('architect', { status: 'completed', output: plan });
            this.updateState(prev => ({
                currentStep: 'developer',
                artifacts: { ...prev.artifacts, plan }
            }));
            this.updateStep('developer', { status: 'running' });


            /* 2. DEVELOPER */
            const developerPrompt = `
You are the Senior TalentAI Developer.
Implement the Plan:
${plan}

Task: ${taskDescription}

Technical Specs:
- TypeScript, React 19.
- TailwindCSS (bg-background-dark, cyan accents).
- Lucide-react icons.
            `;

            let code = await this.aiService.generateText(developerPrompt);
            this.updateStep('developer', { status: 'completed', output: code });
            this.updateState(prev => ({
                currentStep: 'executor',
                artifacts: { ...prev.artifacts, code }
            }));
            this.updateStep('executor', { status: 'running' });


            /* 3. EXECUTOR (Simulation) */
            const executorPrompt = `
You are the Quality Engineer. 
Simulate the compilation and execution of this implementation:
${code}

Identify any missing imports, logic errors, or styling issues.
            `;

            const execResult = await this.aiService.generateStructuredJSON<{ stdout: string, stderr: string }>(
                executorPrompt,
                '{ stdout: string, stderr: string }'
            );

            this.updateStep('executor', { status: 'completed', output: `Analysis:\n${execResult.stdout}\n\nRisks:\n${execResult.stderr}` });
            this.updateState(prev => ({
                currentStep: 'reviewer',
                artifacts: { ...prev.artifacts, execution_output: execResult.stdout, execution_error: execResult.stderr }
            }));
            this.updateStep('reviewer', { status: 'running' });


            /* 4. REVIEWER */
            const reviewerPrompt = `
You are the Head of Engineering. 
Perform a final audit on:
Task: ${taskDescription}
Code: ${code}

Verify alignment with TalentAI standards and aesthetic requirements.
            `;

            const feedback = await this.aiService.generateText(reviewerPrompt);
            this.updateStep('reviewer', { status: 'completed', output: feedback });
            this.updateState(prev => ({
                currentStep: 'completed',
                isProcessing: false,
                artifacts: { ...prev.artifacts, feedback }
            }));

        } catch (error: any) {
            console.error("Pipeline Error:", error);
            this.updateState({ isProcessing: false });
            const currentStepKey = this.currentState.currentStep as keyof typeof this.currentState.steps;
            if (currentStepKey && currentStepKey !== 'completed' && currentStepKey !== 'idle') {
                this.updateStep(currentStepKey, { status: 'error', error: error.message });
            }
        }
    }
}
