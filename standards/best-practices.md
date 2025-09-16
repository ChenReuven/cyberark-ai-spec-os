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

<conditional-block context-check="understanding-verification" task-condition="implementation-or-specification">
IF current task involves implementation or specification work:
  IF Understanding Verification section already read in current context:
    SKIP: Re-reading this section
    NOTE: "Using Understanding Verification guidelines already in context"
  ELSE:
    READ: The following verification guidelines

## Understanding Verification

### Feynman Technique Application
- Always explain your understanding back to the user in simple terms before implementation
- Break complex requirements into simple, clear components  
- Ask "why" questions to understand the underlying purpose
- Seek explicit confirmation that your understanding is accurate

### Questioning Best Practices
- Use numbered questions for clarity and organization
- Focus on one concept per question to avoid confusion
- Ask about edge cases and error handling conditions
- Clarify success criteria and acceptance tests
- Understand the "why" behind each requirement, not just the "what"

### Implementation Blocking Protocol
- Never begin implementation with less than 95% understanding confidence
- Always seek explicit user confirmation before proceeding ("yes", "correct", "that's right")
- Document any assumptions and get them validated
- Clarify ambiguous terms, requirements, and scope boundaries

### Verification Checkpoints
Apply understanding verification at these critical points:
- After initial requirements gathering
- Before creating technical specifications
- Before beginning any implementation work
- When encountering unclear requirements during development
- Before making architectural or design decisions

ELSE:
  SKIP: Understanding verification not relevant to current task
</conditional-block>
