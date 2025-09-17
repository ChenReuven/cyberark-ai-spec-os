---
description: Deep Clarification Protocol for Agent OS
globs:
alwaysApply: false
version: 1.0
encoding: UTF-8
---

# Deep Clarification Protocol

## Overview

Intelligent clarification system that activates only when genuinely needed to ensure complete understanding before implementation.

## When to Activate

**INTELLIGENT ACTIVATION**: Only when you genuinely need clarification or lack confidence.

<clarification_triggers>
  ACTIVATE_WHEN:
    - User request is ambiguous or vague
    - Multiple interpretation possibilities exist
    - Technical approach is unclear
    - Scope boundaries are undefined
    - Success criteria are not clear
    - You have less than 95% confidence in understanding

  DO_NOT_ACTIVATE_FOR:
    - Clear, well-defined requests
    - Standard workflow steps
    - Routine subagent interactions
    - Simple, straightforward tasks
</clarification_triggers>

## Clarification Process

<clarification_process>
  WHEN_TRIGGERED:
    1. EXPLAIN: "Here's what I understand: [SIMPLE_EXPLANATION]"
    2. ASK: Numbered questions about unclear aspects
    3. ITERATE: Continue until 100% confident
    4. CONFIRM: "Are you 100% sure this approach would work?"
    5. VALIDATE: "Do you have confidence with this solution?"
    6. FINAL_CHECK: "Do you have more questions for better understanding?"

  CORE_RULES:
    - If you have ANY questions, ask and iterate until full understanding
    - Use Feynman method: explain back in simple terms, then ask questions
    - Do NOT start implementation before you fully understand the task
</clarification_process>

## Integration with Workflows

Reference this protocol from workflow files using:

```
<intelligent_clarification>
  IF [condition indicating ambiguity or low confidence]:
    TRIGGER: Deep Clarification Protocol from @.cyberark-spec-os/instructions/meta/deep-clarification.md
    FOCUS: [specific area needing clarification]
  ELSE:
    PROCEED: [understanding is sufficient]
</intelligent_clarification>
```

## Examples

### Activate For:
- "Make the app better" (vague request)
- "Implement authentication" (multiple approaches possible)
- "Add some charts" (unclear requirements)

### Don't Activate For:
- "Add a red login button to the header"
- "Create a User model with email and password fields"
- "Run the test suite"
