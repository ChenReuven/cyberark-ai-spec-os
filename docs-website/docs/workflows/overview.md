---
sidebar_position: 1
---

# Core Workflows

Learn the essential workflows for using CyberArk Agentic Spec Driven Development effectively in your projects.

## Overview

CyberArk ASDD provides structured workflows that guide you through the entire development process, from initial planning to final deployment. These workflows ensure consistency, quality, and efficiency across all your projects.

## Core Workflow Types

### 1. Product Planning Workflow

**Purpose**: Define what you're building and why

**Steps**:
1. **Mission Definition**: Clarify product goals and target users
2. **Feature Planning**: Identify core features and priorities
3. **Architecture Design**: Plan technical approach and structure
4. **Roadmap Creation**: Define development timeline and milestones

**Key Files**:
- `product/mission.md` - Product vision and goals
- `product/roadmap.md` - Feature roadmap and timeline
- `product/decisions.md` - Architectural decision log

### 2. Specification Creation Workflow

**Purpose**: Create detailed specifications for each feature

**Steps**:
1. **Requirement Analysis**: Understand what needs to be built
2. **Technical Design**: Plan implementation approach
3. **Acceptance Criteria**: Define how to verify success
4. **Testing Strategy**: Plan validation approach

**Key Files**:
- `specs/[feature-name].md` - Detailed feature specifications
- `standards/` - Coding and quality standards

### 3. Task Execution Workflow

**Purpose**: Implement features according to specifications

**Steps**:
1. **Task Breakdown**: Divide specs into implementable tasks
2. **AI Collaboration**: Work with AI assistants to write code
3. **Code Review**: Validate against standards and specs
4. **Testing**: Verify functionality meets requirements

**Key Files**:
- Task lists and progress tracking
- Code implementation files
- Test files and validation

### 4. Analysis and Iteration Workflow

**Purpose**: Continuously improve and refine your approach

**Steps**:
1. **Performance Analysis**: Review what worked and what didn't
2. **Process Improvement**: Refine workflows and standards
3. **Knowledge Capture**: Document lessons learned
4. **Team Sharing**: Share insights with team members

## Workflow Integration

### With AI Coding Tools

#### Claude Code Integration

1. **Context Setting**: Load relevant standards and specs
2. **Task Definition**: Clearly define what needs to be built
3. **Iterative Development**: Work with AI to implement features
4. **Quality Assurance**: Review and validate AI output

#### Cursor Integration

1. **File Context**: Use @-mentions to reference specific files
2. **Specification Reference**: Share relevant documentation
3. **Code Generation**: Generate code based on specs
4. **Refinement**: Iterate and improve generated code

### With Version Control

1. **Branch Strategy**: Create feature branches for each spec
2. **Commit Messages**: Reference spec files in commits
3. **Pull Requests**: Include spec links in PR descriptions
4. **Code Review**: Validate against specifications

### With Project Management

1. **Task Tracking**: Link tasks to specifications
2. **Progress Monitoring**: Track completion against specs
3. **Milestone Management**: Align with roadmap milestones
4. **Team Coordination**: Share specs and progress

## Workflow Best Practices

### Specification Quality

- **Be Specific**: Include concrete, measurable requirements
- **Use Examples**: Show expected behavior with examples
- **Define Boundaries**: Clearly state what's in and out of scope
- **Include Validation**: Define how to verify success

### AI Collaboration

- **Provide Context**: Always share relevant standards and specs
- **Be Iterative**: Work in small, manageable chunks
- **Validate Output**: Always review and test AI-generated code
- **Learn Patterns**: Understand what prompts work best

### Process Management

- **Start Small**: Begin with simple features to learn the process
- **Document Everything**: Keep specs and decisions up to date
- **Regular Reviews**: Schedule periodic workflow reviews
- **Team Alignment**: Ensure everyone follows the same process

## Workflow Templates

### Feature Development Template

```markdown
# Feature Development Workflow

## 1. Specification Review
- [ ] Read and understand the spec
- [ ] Identify any missing requirements
- [ ] Clarify technical approach

## 2. Task Breakdown
- [ ] List all implementation tasks
- [ ] Estimate effort for each task
- [ ] Prioritize task order

## 3. Implementation
- [ ] Set up development environment
- [ ] Implement core functionality
- [ ] Add error handling
- [ ] Write tests

## 4. Validation
- [ ] Run all tests
- [ ] Verify against acceptance criteria
- [ ] Code review against standards
- [ ] Update documentation

## 5. Integration
- [ ] Merge to main branch
- [ ] Deploy to staging
- [ ] User acceptance testing
- [ ] Production deployment
```

### AI Collaboration Template

```markdown
# AI Collaboration Session

## Context Provided
- [ ] Relevant specification file
- [ ] Coding standards
- [ ] Existing code examples
- [ ] Project structure

## Task Definition
- [ ] Clear description of what to build
- [ ] Expected inputs and outputs
- [ ] Performance requirements
- [ ] Integration points

## AI Interaction
- [ ] Initial prompt with context
- [ ] Iterative refinement
- [ ] Code review and feedback
- [ ] Final validation

## Output Validation
- [ ] Code meets standards
- [ ] Functionality works as expected
- [ ] Tests pass
- [ ] Documentation updated
```

## Common Workflow Patterns

### Greenfield Projects

1. **Start with Mission**: Define product vision and goals
2. **Create Roadmap**: Plan major features and milestones
3. **Write Core Specs**: Detail essential features first
4. **Implement Iteratively**: Build and validate incrementally

### Brownfield Projects

1. **Analyze Existing**: Understand current codebase and patterns
2. **Extend Standards**: Adapt standards to existing code
3. **Identify Gaps**: Find areas needing improvement
4. **Incremental Adoption**: Gradually apply new processes

### Team Projects

1. **Establish Standards**: Agree on coding and process standards
2. **Share Context**: Ensure everyone has access to specs and standards
3. **Regular Sync**: Schedule regular team reviews and updates
4. **Knowledge Sharing**: Document and share lessons learned

## Troubleshooting Workflows

### Common Issues

**Specification Problems**:
- Vague or incomplete requirements
- Missing technical details
- Unclear acceptance criteria

**AI Collaboration Issues**:
- Insufficient context provided
- Inconsistent prompt patterns
- Not validating AI output

**Process Problems**:
- Skipping specification steps
- Not following standards
- Poor task breakdown

### Solutions

1. **Improve Specifications**: Add more detail and examples
2. **Enhance Context**: Provide better background information
3. **Refine Process**: Adjust workflows based on experience
4. **Team Training**: Ensure everyone understands the process

## Next Steps

- [Set up your first project](../getting-started/first-project)
- [Explore best practices](../best-practices/overview)
