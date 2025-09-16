# GitHub Copilot Prompts for Agent OS

This file contains example prompts and patterns for using GitHub Copilot effectively within Agent OS workflows.

## Product Planning Prompts

### Initial Product Planning
```
Based on the Agent OS plan-product workflow in .agent-os/instructions/core/plan-product.md, help me create a comprehensive product plan for [PRODUCT_NAME]. Include:

1. Mission statement
2. Target audience analysis
3. Core features roadmap
4. Technical architecture overview
5. Success metrics

Follow the Agent OS standards for documentation structure and maintain consistency with the existing codebase patterns.
```

### Feature Specification
```
Using Agent OS create-spec workflow as a guide, help me create a detailed specification for [FEATURE_NAME]. Reference .agent-os/instructions/core/create-spec.md and ensure the spec includes:

1. Feature overview and user stories
2. Technical requirements and constraints
3. Implementation approach following project standards
4. Testing strategy
5. Acceptance criteria

Maintain consistency with existing .agent-os/standards/ guidelines.
```

## Development Prompts

### Code Generation
```
Generate [COMPONENT_TYPE] following the coding standards in .agent-os/standards/. The component should:

1. Follow the established patterns in [EXISTING_FILE]
2. Implement [SPECIFIC_FUNCTIONALITY]
3. Include appropriate error handling
4. Add comprehensive tests
5. Include JSDoc/documentation comments

Ensure the code integrates seamlessly with the existing Agent OS project structure.
```

### Refactoring
```
Help me refactor [FILE_NAME] to better align with Agent OS best practices. Reference .agent-os/standards/best-practices.md and:

1. Improve code organization and structure
2. Enhance error handling
3. Add missing documentation
4. Optimize performance where applicable
5. Ensure consistent coding style

Maintain backward compatibility and existing functionality.
```

## Testing Prompts

### Test Generation
```
Create comprehensive tests for [COMPONENT_NAME] following Agent OS testing standards. Include:

1. Unit tests for all public methods
2. Integration tests for key workflows
3. Edge case handling
4. Mock implementations where needed
5. Performance benchmarks if applicable

Follow the testing patterns established in the existing test suite.
```

### Test Strategy
```
Develop a testing strategy for [FEATURE_NAME] that aligns with Agent OS quality standards. Include:

1. Test pyramid breakdown (unit/integration/e2e)
2. Coverage requirements
3. Test data management
4. CI/CD integration points
5. Performance testing approach

Reference existing test patterns and maintain consistency.
```

## Documentation Prompts

### API Documentation
```
Generate comprehensive API documentation for [API_NAME] following Agent OS documentation standards. Include:

1. Endpoint descriptions and examples
2. Request/response schemas
3. Error handling patterns
4. Authentication requirements
5. Rate limiting information

Maintain consistency with existing documentation format and style.
```

### User Guide Creation
```
Create user-friendly documentation for [FEATURE_NAME] that follows Agent OS documentation patterns. Include:

1. Getting started guide
2. Common use cases and examples
3. Troubleshooting section
4. Best practices
5. Integration examples

Ensure the documentation is accessible and follows project style guidelines.
```

## Code Review Prompts

### Review Assistance
```
Review this code following Agent OS standards and best practices. Check for:

1. Adherence to coding standards in .agent-os/standards/
2. Proper error handling and edge cases
3. Security considerations
4. Performance implications
5. Documentation completeness

Provide specific feedback with improvement suggestions and reference relevant standards.
```

### Security Review
```
Perform a security review of [COMPONENT_NAME] focusing on:

1. Input validation and sanitization
2. Authentication and authorization
3. Data protection and privacy
4. Secure communication protocols
5. Vulnerability prevention

Reference security best practices from Agent OS standards and provide actionable recommendations.
```

## Best Practices for Prompts

1. **Always reference Agent OS context**: Include relevant .agent-os/ file references
2. **Be specific about standards**: Reference specific guideline documents
3. **Maintain consistency**: Ask Copilot to follow existing patterns
4. **Include context**: Provide relevant codebase information
5. **Request comprehensive solutions**: Ask for complete implementations including tests and docs
6. **Validate against standards**: Always verify suggestions against Agent OS guidelines

## Workflow Integration

When using these prompts:

1. **Start with planning**: Use product planning prompts before development
2. **Follow Agent OS structure**: Maintain the established workflow patterns
3. **Validate outputs**: Check all generated code against project standards
4. **Update documentation**: Keep Agent OS tracking files updated
5. **Iterate incrementally**: Use structured task breakdown from Agent OS workflows
