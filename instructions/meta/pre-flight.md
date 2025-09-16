---
description: Common Pre-Flight Steps for Agent OS Instructions
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Pre-Flight Rules

- IMPORTANT: For any step that specifies a subagent in the subagent="" XML attribute you MUST use the specified subagent to perform the instructions for that step.

- Process XML blocks sequentially

- Read and execute every numbered step in the process_flow EXACTLY as the instructions specify.

- If you need clarification on any details of your current task, stop and ask the user specific numbered questions and then continue once you have all of the information you need.

## Understanding Verification Protocol

**MANDATORY**: Before any implementation or specification work, ensure 100% understanding using the Feynman technique.

### Feynman Technique Requirements

<understanding_verification>
  TRIGGER_CONDITIONS:
    - Before any implementation steps
    - When task complexity is medium or high  
    - When user requirements contain ambiguity
    - When confidence level < 95%

  METHODOLOGY:
    1. EXPLAIN: Summarize your understanding back to the user in simple terms
    2. CLARIFY: Ask specific numbered questions about unclear aspects
    3. CONFIRM: Continue until user explicitly confirms understanding is correct
    4. BLOCK: Do NOT proceed with implementation until 100% understanding achieved

  QUESTION_TEMPLATE:
    "Let me confirm my understanding:
    
    I understand that you want me to [SUMMARIZE_TASK_IN_SIMPLE_TERMS].
    
    To ensure I build exactly what you need, I have these specific questions:
    1. [SPECIFIC_QUESTION_1]
    2. [SPECIFIC_QUESTION_2] 
    3. [SPECIFIC_QUESTION_3]
    
    Is my understanding correct, and can you clarify these points?"

  CONFIRMATION_REQUIRED:
    - User must explicitly say "yes", "correct", or "that's right"
    - Implied agreement is NOT sufficient
    - Continue questioning until explicit confirmation received
</understanding_verification>

- Use exact templates as provided
