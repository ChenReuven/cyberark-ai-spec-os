---
sidebar_position: 1
---

# Common Issues and Solutions

Troubleshoot common problems you might encounter when using CyberArk Agentic Spec Driven Development.

## Installation Issues

### Permission Denied Errors

**Problem**: Getting permission denied when running installation scripts.

**Symptoms**:
```bash
bash: ./setup/base.sh: Permission denied
```

**Solution**:
```bash
# Make the script executable
chmod +x ~/.cyberark-spec-os/setup/base.sh
chmod +x ~/.cyberark-spec-os/setup/project.sh

# Or run with explicit bash
bash ~/.cyberark-spec-os/setup/base.sh
```

### Network Connection Issues

**Problem**: Scripts fail to download files from GitHub.

**Symptoms**:
```bash
curl: (6) Could not resolve host: raw.githubusercontent.com
```

**Solutions**:

1. **Check Internet Connection**:
   ```bash
   ping google.com
   ```

2. **Try Manual Download**:
   ```bash
   # Download files manually
   mkdir -p ~/.cyberark-spec-os/standards
   curl -o ~/.cyberark-spec-os/standards/tech-stack.md \
     https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/standards/tech-stack.md
   ```

3. **Use Alternative Mirror**:
   ```bash
   # If GitHub is blocked, try alternative approaches
   git clone https://github.com/ChenReuven/cyberark-ai-spec-os.git
   cp -r cyberark-ai-spec-os/standards/* ~/.cyberark-spec-os/standards/
   ```

### Path Issues

**Problem**: Shell can't find the installation directory.

**Symptoms**:
```bash
bash: ~/.cyberark-spec-os/setup/project.sh: No such file or directory
```

**Solutions**:

1. **Use Full Path**:
   ```bash
   /Users/yourusername/.cyberark-spec-os/setup/project.sh
   ```

2. **Add to PATH**:
   ```bash
   echo 'export PATH="$HOME/.cyberark-spec-os/bin:$PATH"' >> ~/.bashrc
   source ~/.bashrc
   ```

3. **Check Installation**:
   ```bash
   ls -la ~/.cyberark-spec-os/
   ```

## AI Collaboration Issues

### AI Not Following Standards

**Problem**: AI-generated code doesn't follow your coding standards.

**Symptoms**:
- Code doesn't match your style guide
- Missing error handling
- Inconsistent patterns

**Solutions**:

1. **Provide Better Context**:
   ```markdown
   ## Context for AI Assistant
   
   Please follow our coding standards:
   - See attached: `standards/javascript-style.md`
   - See attached: `standards/api-design.md`
   - See existing code: `src/services/UserService.ts`
   
   Current task: Implement ProductService following the same patterns as UserService.
   ```

2. **Use Reference Examples**:
   ```markdown
   Please implement the ProductService following the same patterns as our existing UserService:
   
   - Error handling: See `src/services/UserService.ts` lines 15-25
   - Validation: See `src/utils/validation.ts`
   - Testing: See `src/services/__tests__/UserService.test.ts`
   ```

3. **Iterative Refinement**:
   ```markdown
   The code looks good, but please:
   1. Add the same error handling pattern as UserService
   2. Include input validation like in our validation utils
   3. Follow our TypeScript naming conventions
   ```

### AI Generating Incomplete Code

**Problem**: AI produces partial implementations or missing functionality.

**Symptoms**:
- Missing error handling
- Incomplete function implementations
- No tests included

**Solutions**:

1. **Be More Specific**:
   ```markdown
   Please implement a complete user registration function that includes:
   - Input validation (email format, password strength)
   - Password hashing with bcrypt
   - Database insertion with error handling
   - JWT token generation
   - Unit tests for all scenarios
   - Proper TypeScript types
   ```

2. **Break Down Tasks**:
   ```markdown
   Let's implement this step by step:
   
   Step 1: Create the basic function structure with TypeScript types
   Step 2: Add input validation
   Step 3: Add password hashing
   Step 4: Add database operations
   Step 5: Add error handling
   Step 6: Add unit tests
   ```

3. **Provide Complete Examples**:
   ```markdown
   Please implement a user service similar to this example:
   
   ```typescript
   // Example from our codebase
   export class UserService {
     async createUser(userData: CreateUserRequest): Promise<User> {
       try {
         const validatedData = this.validateUserData(userData);
         const hashedPassword = await this.hashPassword(validatedData.password);
         const user = await this.userRepository.create({
           ...validatedData,
           password: hashedPassword
         });
         return user;
       } catch (error) {
         throw new UserCreationError('Failed to create user', error);
       }
     }
   }
   ```
   ```

### AI Not Understanding Project Context

**Problem**: AI generates code that doesn't fit your project structure or requirements.

**Symptoms**:
- Wrong file structure
- Incompatible with existing code
- Missing project-specific requirements

**Solutions**:

1. **Share Project Structure**:
   ```markdown
   Our project structure:
   ```
   src/
   ├── components/
   ├── services/
   ├── repositories/
   ├── types/
   └── utils/
   ```
   
   Please implement the UserService in `src/services/UserService.ts`
   ```

2. **Provide Architecture Context**:
   ```markdown
   Our application uses:
   - React frontend with TypeScript
   - Express.js backend
   - MongoDB database
   - JWT authentication
   - Jest for testing
   
   Please implement the user authentication following this architecture.
   ```

3. **Share Existing Patterns**:
   ```markdown
   Please follow our established patterns:
   - Services go in `src/services/`
   - Use dependency injection for repositories
   - All async functions return Promises
   - Error handling uses custom error classes
   - See `src/services/AuthService.ts` for reference
   ```

## Specification Issues

### Vague or Incomplete Specifications

**Problem**: Specifications are too vague or missing important details.

**Symptoms**:
- AI generates incorrect implementations
- Team members have different interpretations
- Requirements change frequently during development

**Solutions**:

1. **Use Specification Templates**:
   ```markdown
   # Feature Specification Template
   
   ## Overview
   [What is this feature and why is it needed?]
   
   ## Functional Requirements
   - [Specific, measurable requirement 1]
   - [Specific, measurable requirement 2]
   
   ## Non-Functional Requirements
   - [Performance, security, usability requirements]
   
   ## Technical Implementation
   - [Frontend requirements]
   - [Backend requirements]
   - [Database requirements]
   
   ## Acceptance Criteria
   - [ ] [Testable criterion 1]
   - [ ] [Testable criterion 2]
   
   ## Examples
   [Concrete examples of expected behavior]
   ```

2. **Add Concrete Examples**:
   ```markdown
   ## User Registration Example
   
   **Input:**
   ```json
   {
     "email": "user@example.com",
     "password": "SecurePass123",
     "name": "John Doe"
   }
   ```
   
   **Expected Output:**
   ```json
   {
     "id": "123e4567-e89b-12d3-a456-426614174000",
     "email": "user@example.com",
     "name": "John Doe",
     "createdAt": "2024-01-15T10:30:00Z"
   }
   ```
   ```

3. **Define Boundaries Clearly**:
   ```markdown
   ## Scope
   
   **In Scope:**
   - User registration with email/password
   - Email validation
   - Password strength requirements
   - Account creation confirmation
   
   **Out of Scope:**
   - Social login integration
   - Two-factor authentication
   - User profile management
   - Password reset functionality
   ```

### Outdated Specifications

**Problem**: Specifications become outdated as requirements change.

**Symptoms**:
- Code doesn't match current specifications
- Team confusion about requirements
- Inconsistent implementations

**Solutions**:

1. **Regular Review Process**:
   ```markdown
   ## Specification Review Schedule
   
   - **Weekly**: Review active specifications
   - **Before Implementation**: Final spec review
   - **After Changes**: Update affected specs
   - **Monthly**: Archive completed specs
   ```

2. **Version Control for Specs**:
   ```markdown
   # User Authentication v2.1
   
   ## Changelog
   - v2.1 (2024-01-15): Added password strength requirements
   - v2.0 (2024-01-10): Added email verification
   - v1.0 (2024-01-01): Initial specification
   ```

3. **Change Management**:
   ```markdown
   ## Specification Change Process
   
   1. **Propose Change**: Document the proposed change
   2. **Impact Analysis**: Assess impact on existing code
   3. **Team Review**: Get team approval
   4. **Update Spec**: Modify specification
   5. **Update Code**: Implement changes
   6. **Validate**: Ensure code matches spec
   ```

## Deployment Issues

### GitHub Pages Deployment Fails

**Problem**: Docusaurus deployment to GitHub Pages fails.

**Symptoms**:
```bash
[ERROR] Error: Please set the GIT_USER environment variable
```

**Solutions**:

1. **Set GIT_USER Environment Variable**:
   ```bash
   GIT_USER=YourGitHubUsername npm run deploy
   ```

2. **Use SSH Instead**:
   ```bash
   USE_SSH=true npm run deploy
   ```

3. **Configure in package.json**:
   ```json
   {
     "scripts": {
       "deploy": "GIT_USER=YourGitHubUsername docusaurus deploy"
     }
   }
   ```

### Build Failures

**Problem**: Docusaurus build fails due to broken links or other issues.

**Symptoms**:
```bash
[ERROR] Docusaurus found broken links!
```

**Solutions**:

1. **Fix Broken Links**:
   ```bash
   # Check for broken links
   npm run build
   
   # Fix the reported broken links
   # Update markdown files to point to existing pages
   ```

2. **Ignore Broken Links Temporarily**:
   ```typescript
   // In docusaurus.config.ts
   const config = {
     onBrokenLinks: 'warn', // Change from 'throw' to 'warn'
     // ... other config
   };
   ```

3. **Use Trailing Slash Configuration**:
   ```typescript
   // In docusaurus.config.ts
   const config = {
     trailingSlash: true, // Add this line
     // ... other config
   };
   ```

## Performance Issues

### Slow AI Response Times

**Problem**: AI assistants take too long to respond or generate code.

**Solutions**:

1. **Optimize Prompts**:
   - Be more specific and concise
   - Provide only necessary context
   - Break down complex requests

2. **Use Smaller Context Windows**:
   - Reference specific files instead of entire codebase
   - Use focused examples rather than comprehensive documentation

3. **Cache Common Responses**:
   - Save frequently used prompts and responses
   - Create templates for common patterns

### Large Project Performance

**Problem**: Performance degrades with large projects.

**Solutions**:

1. **Modular Specifications**:
   - Break large features into smaller specs
   - Use component-based specifications
   - Focus on single responsibility

2. **Efficient Context Management**:
   - Only share relevant files
   - Use file references instead of full content
   - Maintain focused documentation

## Getting Help

### Self-Service Resources

1. **Check Documentation**: Review the full documentation
2. **Search Issues**: Look through existing GitHub issues
3. **Community Discussions**: Check GitHub discussions
4. **Code Examples**: Review example implementations

### Community Support

1. **GitHub Issues**: Report bugs and request features
2. **Discussions**: Ask questions and share experiences
3. **Pull Requests**: Contribute improvements
4. **Documentation**: Help improve documentation

### Escalation Process

1. **Document the Issue**: Include error messages, steps to reproduce
2. **Check Existing Issues**: Search for similar problems
3. **Create Detailed Issue**: Provide comprehensive information
4. **Follow Up**: Respond to questions and provide additional details

## Next Steps

- [Set up your first project](../getting-started/first-project)
- [Explore best practices](../best-practices/overview)
