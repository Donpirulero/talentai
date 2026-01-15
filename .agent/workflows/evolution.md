---
description: how to evolve the platform using autonomous agents
---

# Asynchronous Platform Evolution Workflow

This document defines the process for iteratively developing the TalentAI platform using the built-in agentic team.

## Phase 1: Task Definition
1. Identify a requirement or bug.
2. Run the agentic pipeline to generate a solution.

// turbo
```bash
node scripts/talent-agent.js "Your task description here"
```

## Phase 2: Implementation Review
1. Check the generated report at `agent_reports/Report_<timestamp>.md`.
2. Inspect individual artifacts in `_agent_workspace/`:
   - `1_plan.md`: The strategy.
   - `2_code.md`: The code blocks.
   - `3_qa_analysis.md`: Predicted stability.
   - `4_review.md`: Head of Engineering audit.

## Phase 3: Autonomous Application
If the implementation is **APPROVED** in the review, apply it to the codebase.

// turbo
```bash
node scripts/talent-agent.js "Your task" --apply
```

## Phase 4: Verification
1. Verify the changes in the development server (`npm run dev`).
2. If issues are found, start a new iteration with the observed error as context.

> [!IMPORTANT]
> The agents use `project_codebase.txt` as their primary source of truth. Always run `node generate_context.js` before a major evolution task to ensure they have the latest view.