---
sidebar_position: 1
---

# Your First Project

Learn how to set up CyberArk Agentic Spec Driven Development in your first project, whether it's a new project or an existing codebase.

## Prerequisites

Before starting your first project, ensure you have:

- [Base installation completed](../installation/overview)
- A project directory (new or existing)
- Your preferred AI coding tool (Claude Code or Cursor)

## Project Setup

### Step 1: Navigate to Your Project

```bash
cd /path/to/your/project
```

### Step 2: Run Project Installation

```bash
~/.cyberark-spec-os/setup/project.sh
```

This creates the project structure and copies necessary files.

### Step 3: Verify Installation

Check that the project structure was created:

```bash
ls -la .cyberark-spec-os/
```

You should see:
- `product/` - Product documentation
- `specs/` - Feature specifications
- `standards/` - Project-specific standards
- `config.yml` - Project configuration

## Project Structure

### Core Directories

```
.cyberark-spec-os/
├── product/           # Product documentation
│   ├── mission.md     # Product mission and goals
│   ├── roadmap.md     # Feature roadmap
│   └── decisions.md   # Architectural decisions
├── specs/             # Feature specifications
│   └── (empty)        # Add specs as you create them
├── standards/         # Project-specific standards
│   ├── tech-stack.md  # Technology choices
│   ├── code-style.md  # Coding standards
│   └── best-practices.md
└── config.yml         # Project configuration
```

### Product Documentation

#### Mission Statement (`product/mission.md`)

Define what you're building:

```markdown
# Product Mission

## What We're Building
A task management application that helps teams organize and track their work efficiently.

## Target Users
- Project managers
- Development teams
- Small to medium businesses

## Success Criteria
- 90% user satisfaction rating
- 50% reduction in project delivery time
- 1000+ active users within 6 months

## Constraints
- Must work on mobile devices
- Budget: $50k development cost
- Timeline: 6 months to MVP
```

#### Roadmap (`product/roadmap.md`)

Plan your features:

```markdown
# Product Roadmap

## Shipped Features
- User authentication
- Basic task creation
- Project organization

## In Progress
- Real-time collaboration
- Mobile app development

## Planned
- Advanced reporting
- Integration with Slack
- Custom workflows

## Ideas / Backlog
- AI-powered task suggestions
- Time tracking
- Advanced analytics
```

## Creating Your First Spec

### Step 1: Define the Feature

Create a new specification file:

```bash
touch .cyberark-spec-os/specs/user-authentication.md
```

### Step 2: Write the Specification

```markdown
# User Authentication Feature

## Overview
Implement secure user authentication for the task management application.

## Requirements

### Functional Requirements
- Users can register with email and password
- Users can log in with credentials
- Users can reset forgotten passwords
- Users can log out securely

### Non-Functional Requirements
- Password must be at least 8 characters
- Account lockout after 5 failed attempts
- Session expires after 24 hours of inactivity
- All data transmission must be encrypted

## Technical Implementation

### Frontend
- React components for login/register forms
- Form validation using React Hook Form
- State management with Redux Toolkit

### Backend
- Express.js API endpoints
- JWT token authentication
- bcrypt for password hashing
- MongoDB for user storage

### Security
- HTTPS only
- CORS configuration
- Rate limiting on auth endpoints
- Input sanitization

## Acceptance Criteria
- [ ] User can register with valid email
- [ ] User can log in with correct credentials
- [ ] User cannot log in with invalid credentials
- [ ] Password reset email is sent
- [ ] Session persists across browser refresh
- [ ] User can log out and session is cleared

## Testing Strategy
- Unit tests for auth functions
- Integration tests for API endpoints
- E2E tests for user flows
- Security testing for vulnerabilities
```

## Working with AI Assistants

### Claude Code Integration

1. **Set Context**: Reference your standards and specs
2. **Provide Examples**: Show the AI your coding patterns
3. **Iterate**: Review and refine AI suggestions
4. **Validate**: Ensure code meets your standards

### Cursor Integration

1. **Use @-mentions**: Reference specific files or functions
2. **Provide Context**: Share relevant documentation
3. **Ask Specific Questions**: Be clear about requirements
4. **Review Output**: Always validate AI-generated code

## Best Practices

### Specification Writing

- **Be Specific**: Include concrete requirements
- **Use Examples**: Show expected behavior
- **Define Boundaries**: What's in scope vs. out of scope
- **Include Tests**: Define how to verify success

### AI Collaboration

- **Start Small**: Begin with simple features
- **Provide Context**: Share relevant standards and specs
- **Review Everything**: Don't blindly accept AI suggestions
- **Learn Patterns**: Understand what works for your team

### Project Management

- **Track Progress**: Update specs as you work
- **Document Decisions**: Record architectural choices
- **Version Control**: Commit changes regularly
- **Review Regularly**: Weekly spec and code reviews

## Common Pitfalls

### Specification Issues

- **Too Vague**: "Make it user-friendly" vs. "Button should be 44px tall"
- **Missing Context**: Not explaining the business need
- **No Examples**: Failing to show expected behavior
- **Outdated**: Not updating specs as requirements change

### AI Collaboration Issues

- **No Context**: Not sharing relevant documentation
- **Blind Acceptance**: Not reviewing AI suggestions
- **Inconsistent Prompts**: Not following standard patterns
- **No Validation**: Not testing AI-generated code

## Next Steps

- [Learn core workflows](../workflows/overview)
- [Explore best practices](../best-practices/overview)
- [Configure your standards](../configuration/standards)
