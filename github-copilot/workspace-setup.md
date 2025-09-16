# GitHub Copilot Workspace Configuration for Agent OS

## Setting up GitHub Copilot for Agent OS Projects

### 1. VS Code Settings
Add these settings to your `.vscode/settings.json`:

```json
{
  "github.copilot.enable": {
    "*": true,
    "yaml": true,
    "markdown": true,
    "plaintext": false
  },
  "github.copilot.advanced": {
    "listCount": 10,
    "inlineSuggestCount": 3
  },
  "files.associations": {
    ".agent-os/instructions/**/*.md": "markdown",
    ".agent-os/standards/**/*.md": "markdown",
    ".github/copilot/**/*.md": "markdown"
  }
}
```

### 2. Workspace Context Files
Ensure these files are accessible to GitHub Copilot:

- `.agent-os/instructions/` - Core workflow instructions
- `.agent-os/standards/` - Development standards and best practices
- `.github/copilot/` - Copilot-specific templates and prompts
- `README.md` - Project overview and setup instructions

### 3. Project-Specific Context
When working with GitHub Copilot in an Agent OS project, always provide context about:

#### Project Structure
```
This project follows Agent OS patterns with:
- Structured instructions in .agent-os/instructions/
- Development standards in .agent-os/standards/
- Project tracking in .agent-os/roadmap.md and related files
- Feature specifications in .agent-os/specs/
```

#### Coding Patterns
```
Follow the coding standards defined in .agent-os/standards/:
- Code style guidelines
- Best practices for the current tech stack
- Testing patterns and requirements
- Documentation standards
```

### 4. Common Copilot Commands for Agent OS

#### Project Planning
```
@workspace Based on Agent OS patterns, help me plan a new [TYPE] project
```

#### Feature Development
```
@workspace Using .agent-os/standards/, implement [FEATURE] following project patterns
```

#### Code Review
```
@workspace Review this code against the standards in .agent-os/standards/
```

#### Documentation
```
@workspace Generate documentation for [COMPONENT] following project doc standards
```

### 5. Best Practices

1. **Reference Agent OS Context**: Always mention relevant .agent-os/ files in prompts
2. **Use @workspace**: Leverage workspace-wide context for better suggestions
3. **Follow Established Patterns**: Ask Copilot to maintain consistency with existing code
4. **Validate Suggestions**: Check all suggestions against Agent OS standards
5. **Maintain Documentation**: Update Agent OS tracking files after implementing suggestions

### 6. Integration with Agent OS Workflows

#### Planning Phase
- Use Copilot to generate initial specs based on .agent-os/instructions/core/plan-product.md
- Get suggestions for roadmap structure and milestone planning

#### Development Phase
- Reference .agent-os/standards/ for code generation
- Use existing patterns as examples for new components
- Generate tests following established patterns

#### Review Phase
- Get code review suggestions based on project standards
- Generate documentation updates
- Validate against Agent OS quality checkpoints

### 7. Troubleshooting

**Issue**: Copilot suggestions don't follow project standards
**Solution**: Include explicit references to .agent-os/standards/ files in prompts

**Issue**: Generated code doesn't match existing patterns
**Solution**: Use @workspace and reference specific example files

**Issue**: Missing context about Agent OS workflows
**Solution**: Reference .agent-os/instructions/ files in conversation

### 8. Advanced Usage

#### Custom Prompts
Create reusable prompts in `.github/copilot/prompts.md` for common tasks

#### Workflow Automation
Use Copilot to generate scripts that follow Agent OS conventions

#### Documentation Generation
Automate documentation updates while maintaining Agent OS structure

For more advanced configurations and examples, see the GitHub Copilot documentation and Agent OS guides.
