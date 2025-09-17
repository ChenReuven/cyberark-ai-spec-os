# Development Best Practices

## Context

Global development guidelines for Agent OS projects.

<conditional-block context-check="core-principles">
IF this Core Principles section already read in current context:
  SKIP: Re-reading this section
  NOTE: "Using Core Principles already in context"
ELSE:
  READ: The following principles

## Core Principles

### Keep It Simple
- Implement code in the fewest lines possible
- Avoid over-engineering solutions
- Choose straightforward approaches over clever ones

### Optimize for Readability
- Prioritize code clarity over micro-optimizations
- Write self-documenting code with clear variable names
- Add comments for "why" not "what"

### DRY (Don't Repeat Yourself)
- Extract repeated business logic to private methods
- Extract repeated UI markup to reusable components
- Create utility functions for common operations

### File Structure
- Keep files focused on a single responsibility
- Group related functionality together
- Use consistent naming conventions
</conditional-block>

<conditional-block context-check="dependencies" task-condition="choosing-external-library">
IF current task involves choosing an external library:
  IF Dependencies section already read in current context:
    SKIP: Re-reading this section
    NOTE: "Using Dependencies guidelines already in context"
  ELSE:
    READ: The following guidelines
ELSE:
  SKIP: Dependencies section not relevant to current task

## Dependencies

### Choose Libraries Wisely
When adding third-party dependencies:
- Select the most popular and actively maintained option
- Check the library's GitHub repository for:
  - Recent commits (within last 6 months)
  - Active issue resolution
  - Number of stars/downloads
  - Clear documentation
</conditional-block>

<conditional-block context-check="intelligent-clarification" task-condition="ambiguous-request">
IF current task has ambiguity or unclear requirements:
  IF Intelligent Clarification section already read in current context:
    SKIP: Re-reading this section
    NOTE: "Using Intelligent Clarification guidelines already in context"
  ELSE:
    READ: The following clarification guidelines

## Intelligent Clarification

### When to Activate
Only when genuinely needed:
- User request is ambiguous or vague
- Multiple interpretation possibilities exist
- Technical approach is unclear
- Scope boundaries are undefined
- Success criteria are not clear
- You have less than 95% confidence

### Core Process
- If you have ANY questions, ask and iterate until full understanding
- Use Feynman method: explain back in simple terms, then ask questions
- Do NOT start implementation before you fully understand the task

### Smart Questioning
- Ask numbered questions for clarity
- Focus on one concept per question
- Continue asking until 100% confident
- Always end with: "Are you 100% sure this approach would work?"
- Always ask: "Do you have confidence with this solution?"
- Always ask: "Do you have more questions for better understanding?"

ELSE:
  SKIP: Request is clear, no clarification needed
</conditional-block>
