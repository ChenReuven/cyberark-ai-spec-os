---
sidebar_position: 2
---

# Refining Your CyberArk ASDD Setup

CyberArk Agentic Spec Driven Development gets better with use. Each spec teaches you something about your process, your preferences, and how to better guide your AI agents. Here's how to continuously improve your setup.

## The Refinement Loop

The refinement process is a continuous cycle of learning and improvement:

<img src="/img/refinment-workflow.svg" alt="CyberArk ASDD Workflow" width="600" height="auto" style={{maxWidth: '100%', height: 'auto'}} />

After each feature or spec, reflect on these key questions:

### What worked well?
> Patterns to document and repeat

### What needed correction?
> Gaps in your standards or instructions

### What surprised you?
> Unexpected approaches that might be worth adopting

## Common Refinement Triggers

### After Your First Project
| What to Update | Why | Example |
|----------------|-----|---------|
| `code-style.md` | Add real examples from your code | TypeScript interface patterns you actually used |
| `best-practices.md` | Document corrections you made | Error handling patterns that worked well |
| `tech-stack.md` | Clarify confusing choices | Specific library versions and configurations |

### After Code Reviews
| Signal | Action | Result |
|--------|--------|--------|
| **Repeated corrections** | Add to standards files | Consistent patterns across team |
| **Patterns you love** | Document for agents | AI uses your preferred approaches |
| **Anti-patterns spotted** | Add "don't do this" examples | Prevent future mistakes |

### After Team Feedback
- **Team preferences** → Update standards to match team style
- **Workflow improvements** → Add to `best-practices.md`
- **Naming conventions** → Document agreed-upon patterns
- **Product insights** → Refine `mission.md` with better understanding

## Where to Make Updates

### Standards Files

<details>
<summary><strong>tech-stack.md</strong> - Technology choices and tools</summary>

**When to update:**
- New tool preferences discovered during development
- Version updates and dependency changes  
- Performance insights and tool recommendations

**Example updates:**
```markdown
## Updated Preferences (v2.1)
- **Testing**: Jest → Vitest (faster startup)
- **State Management**: Redux → Zustand (simpler patterns)
- **Styling**: CSS Modules → Tailwind (team preference)
```
</details>

<details>
<summary><strong>code-style.md</strong> - Formatting and conventions</summary>

**When to update:**
- Formatting patterns that work well for your team
- Naming conventions that emerged naturally
- File organization preferences discovered

**Example updates:**
```markdown
## Function Naming (Updated)
- API functions: `fetch*` prefix (fetchUserData)
- Utility functions: descriptive verbs (validateEmail)
- Event handlers: `handle*` prefix (handleSubmit)
```
</details>

<details>
<summary><strong>best-practices.md</strong> - Development philosophy</summary>

**When to update:**
- Development philosophy refinements
- Patterns to follow based on real experience
- Anti-patterns to avoid with specific examples

**Example updates:**
```markdown
## Error Handling Patterns
✅ Use custom error classes for different error types
❌ Don't use generic Error for all failures
```
</details>

### Code Style Organization

:::tip Pro Tip
Create language-specific files in `.cyberark-spec-os/standards/code-style/` to keep context lean:
:::

```
.cyberark-spec-os/standards/code-style/
├── javascript-style.md    # JS/TS specific patterns
├── css-style.md          # Styling conventions  
└── html-style.md         # Markup patterns
```

Reference them conditionally in your main `code-style.md` file. This way, agents only load styles relevant to current work.

### Product Files (Project-specific)

| File | Purpose | Update Triggers |
|------|---------|----------------|
| `mission.md` | Product vision & goals | User feedback, market insights |
| `roadmap.md` | Development phases | Implementation learnings, priorities |
| `tech-stack.md` | Project-specific choices | Architecture decisions, tool changes |

<details>
<summary><strong>Examples of Product File Updates</strong></summary>

**mission.md refinements:**
- Clarify target audience based on user research
- Update success metrics with real data
- Refine value proposition based on feedback

**roadmap.md adjustments:**
- Move features based on implementation complexity
- Update timelines with realistic estimates
- Add new features discovered during development

**tech-stack.md overrides:**
- Document project-specific architecture decisions
- Record why certain tools were chosen over global standards
- Note performance considerations for this specific project
</details>

## Making Refinements Stick

### Be Specific, Not Vague

| Vague | Specific |
|----------|-------------|
| "Write better tests" | "Write integration tests first, then unit tests. Mock external services using `jest.fn()` and create test fixtures in `__fixtures__/` directory" |
| "Improve error handling" | "Use custom error classes with specific types. Return 400 for validation errors, 401 for auth failures, 404 for not found" |
| "Make code cleaner" | "Extract reusable logic into custom hooks. Keep components under 100 lines. Use TypeScript strict mode" |

### Show, Don't Just Tell

Always include code examples in your standards:

<details>
<summary><strong>Example: Service Pattern Documentation</strong></summary>

```typescript
// ✅ Good: Service pattern we use
export class UserService {
  constructor(private userRepository: UserRepository) {}
  
  async createUser(userData: CreateUserRequest): Promise<User> {
    const validatedData = this.validateUserData(userData);
    return await this.userRepository.create(validatedData);
  }
  
  private validateUserData(data: CreateUserRequest): ValidatedUserData {
    // Validation logic here
  }
}

// ❌ Avoid: Direct database access in controllers
export class UserController {
  async createUser(req: Request) {
    const user = await db.users.create(req.body); // Don't do this
  }
}
```
</details>

### Version Your Changes

Track your refinements with simple versioning:

```markdown
---
Last updated: 2024-01-15
Version: 2.1  
Changes: Added TypeScript strict mode requirement, updated React to v18
---
```

:::info Why version?
- **Track evolution** of your standards over time
- **Understand impact** of changes on team workflow  
- **Rollback easily** if a change doesn't work out
:::

## Team Refinement Process

Working with a team? Here's how to refine collaboratively:

### Schedule Regular Reviews
```
Monthly Refinement Meeting
├── Review metrics (15 min)
│   ├── Code review comment patterns
│   ├── AI correction frequency
│   └── Development velocity trends
├── Discuss learnings (20 min)
│   ├── What worked well this month?
│   ├── What needed frequent correction?
│   └── Any surprising discoveries?
└── Plan updates (10 min)
    ├── Agree on standard updates
    ├── Assign documentation tasks
    └── Set next month's focus areas
```

### Collect Patterns
| Data Source | What to Track | Action |
|-------------|---------------|--------|
| Code Reviews | Repeated corrections | Add to standards |
| AI Feedback | Consistent AI mistakes | Update agent instructions |
| Team Discussion | Preferred patterns | Document as best practices |
| Bug Reports | Common error types | Add prevention guidelines |

### Reach Consensus
- **Try before standardizing** - Test controversial patterns on small features
- **Vote on ambiguous cases** - Let team majority decide on style choices  
- **Document the "why"** - Explain reasoning behind each standard
- **Start small** - Begin with high-impact, low-controversy changes

### Share Updates
:::warning Keep Everyone Synced
- Update local `.cyberark-spec-os/` files in all projects
- Use version control for standards files
- Share changes in team chat/docs
- Include update summaries in sprint reviews
:::

## Signs You Need Refinement

Watch for these red flags:

| Signal | Frequency | Action Needed |
|-----------|--------------|------------------|
| **Repetitive corrections** | Same fixes in every code review | Add patterns to standards |
| **Inconsistent AI output** | Agents miss the same patterns | Update agent instructions |
| **Style inconsistencies** | Formatting disagreements | Clarify code-style.md |
| **Unclear conventions** | New team members confused | Improve documentation |
| **Better patterns found** | Discovery of superior approaches | Document and standardize |

## Integration with CyberArk ASDD Workflow

Refinement happens at every stage of your ASDD workflow:


<img src="/img/refinment-workflow-2.svg" alt="CyberArk ASDD Workflow" width="600" height="auto" style={{maxWidth: '100%', height: 'auto'}} />

### During `/plan-product`
- **Review `mission.md`** based on user feedback and market insights
- **Update `tech-stack.md`** with lessons learned from previous projects
- **Refine product understanding** based on stakeholder input

### During `/create-spec`
- **Apply refined standards** to new specifications
- **Use improved patterns** discovered in previous implementations  
- **Reference updated best practices** in technical requirements

### During `/execute-tasks`
- **Implement using refined standards** from your updated files
- **Note what works well** and what needs adjustment during development
- **Track AI agent performance** with your current instructions

### After `/execute-tasks`
- **Update standards** based on real implementation experience
- **Document new patterns** in your recap files (`.cyberark-spec-os/recaps/`)
- **Plan improvements** for the next development cycle

## The Long Game

:::info Remember
CyberArk ASDD is a **living system**. The goal isn't perfection on day one—it's **continuous improvement**. Each refinement makes your agents more effective and your codebase more consistent.
:::

**Your ASDD setup a year from now will be dramatically better than today's**, shaped by real experience and tailored to exactly how you and your team work best.

## Example Refinement Session

<details>
<summary><strong>January 2024 Team Refinement Session</strong></summary>

### What We Learned
1. **Agents struggle with our error handling patterns** → Too generic, need specific examples
2. **TypeScript interfaces need better naming conventions** → Team prefers `I` prefix
3. **Test file organization is inconsistent** → No clear structure documented

### Changes Made

**1. Updated `javascript-style.md`:**
```diff
+ ## Error Handling Patterns
+ ✅ Use custom error classes: UserNotFoundError, ValidationError  
+ ❌ Don't use generic Error for all failures
+ 
+ ## Interface Naming
+ ✅ Prefix interfaces with 'I': IUserService, IRepository
```

**2. Updated `best-practices.md`:**
```diff
+ ## Test Organization
+ - Unit tests: `__tests__/ComponentName.test.tsx`
+ - Integration tests: `__tests__/integration/`
+ - Test utilities: `__tests__/utils/`
```

**3. Updated `tech-stack.md`:**
```diff
+ ## Jest Configuration
+ - Use setupFilesAfterEnv for test utilities
+ - Mock external services in __mocks__/
+ - Prefer integration tests over unit tests for React components
```

### Next Month's Focus
- Monitor if error handling improvements reduce review comments by 50%
- Track consistency of new interface naming across all new code
- Measure test file organization adoption in new features

</details>

## Quick Refinement Checklist

After each major feature, spend 10 minutes on this checklist:

### Review & Reflect
- [ ] **Code patterns** → Any worth documenting for future use?
- [ ] **Standards clarity** → Did anything need clarification during development?
- [ ] **Real examples** → Can we update standards with actual project code?

### Agent Performance  
- [ ] **AI behavior** → Did agents miss any patterns consistently?
- [ ] **Instruction updates** → Do any agent prompts need refinement?
- [ ] **Context quality** → Are standards files providing good guidance?

### Documentation
- [ ] **Architectural decisions** → Document any significant choices made
- [ ] **Team conventions** → Update based on team feedback during development
- [ ] **Version tracking** → Update version numbers and change logs

---

:::tip Success Metric
**Small, consistent refinements lead to dramatic improvements over time.** Your future self will thank you for documenting these patterns today!
:::
