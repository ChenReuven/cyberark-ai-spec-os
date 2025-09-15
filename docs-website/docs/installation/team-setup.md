---
sidebar_position: 4
---

# Team Installation

Setting up CyberArk Agentic Spec Driven Development for your entire team or organization? This guide covers team-wide deployment strategies and shared configuration management.

## Team Installation Strategy

### 1. Centralized Standards Approach

Create a shared repository for your team's standards and configurations.

#### Create Team Standards Repository

```bash
# Create a new repository for your team standards
git clone https://github.com/your-org/team-agent-os-standards.git
cd team-agent-os-standards

# Set up the structure
mkdir -p standards/code-style
mkdir -p instructions/core
mkdir -p instructions/meta
mkdir -p commands
mkdir -p templates/project
```

#### Populate Team Standards

1. **Copy base standards** from CyberArk Agentic Spec Driven Development
2. **Customize** to match your team's preferences
3. **Add organization-specific** guidelines
4. **Version control** all changes

#### Team Standards Repository Structure

```
team-cyberark-spec-os-standards/
├── standards/
│   ├── tech-stack.md          # Your team's tech stack
│   ├── code-style.md          # Team coding standards
│   ├── best-practices.md      # Team development practices
│   └── code-style/
│       ├── typescript-style.md
│       ├── react-style.md
│       └── python-style.md
├── instructions/
│   ├── core/                  # Customized workflow instructions
│   └── meta/                  # Team-specific meta instructions
├── commands/                  # Team workflow commands
├── templates/
│   ├── project/               # Project template files
│   └── specs/                 # Spec templates
└── scripts/
    ├── team-install.sh        # Team installation script
    └── sync-standards.sh      # Standards sync script
```

### 2. Team Installation Script

Create a team-specific installation script:

```bash
# team-install.sh
#!/bin/bash

set -e

TEAM_REPO="https://github.com/your-org/team-cyberark-spec-os-standards.git"
TEAM_STANDARDS_DIR="$HOME/.cyberark-spec-os-team"
BASE_DIR="$HOME/.cyberark-spec-os"

echo "Installing CyberArk Agentic Spec Driven Development with team standards..."

# Install base CyberArk Agentic Spec Driven Development first
if [ ! -d "$BASE_DIR" ]; then
    echo "Installing base CyberArk Agentic Spec Driven Development..."
    curl -sSL https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/main/setup/base.sh | bash -s -- --claude-code --cursor
fi

# Clone team standards
if [ ! -d "$TEAM_STANDARDS_DIR" ]; then
    echo "Cloning team standards..."
    git clone "$TEAM_REPO" "$TEAM_STANDARDS_DIR"
else
    echo "Updating team standards..."
    cd "$TEAM_STANDARDS_DIR"
    git pull origin main
fi

# Sync team standards to base installation
echo "Syncing team standards..."
cp -r "$TEAM_STANDARDS_DIR/standards/"* "$BASE_DIR/standards/"
cp -r "$TEAM_STANDARDS_DIR/instructions/"* "$BASE_DIR/instructions/"
cp -r "$TEAM_STANDARDS_DIR/commands/"* "$BASE_DIR/commands/"

# Update config to indicate team installation
cat > "$BASE_DIR/config.yml" << EOF
version: "1.0.0"
installation_type: "team"
team_repo: "$TEAM_REPO"
installed_date: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
last_sync: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
tools:
  - claude-code
  - cursor
base_path: "$BASE_DIR"
team_path: "$TEAM_STANDARDS_DIR"
EOF

echo "✅ Team installation complete!"
echo "🔄 Use 'sync-standards.sh' to get latest team updates"
```

### 3. Standards Synchronization

Create a sync script for team members:

```bash
# sync-standards.sh
#!/bin/bash

TEAM_STANDARDS_DIR="$HOME/.cyberark-spec-os-team"
BASE_DIR="$HOME/.cyberark-spec-os"

if [ ! -d "$TEAM_STANDARDS_DIR" ]; then
    echo "❌ Team standards not found. Run team-install.sh first."
    exit 1
fi

echo "🔄 Syncing team standards..."

cd "$TEAM_STANDARDS_DIR"
git pull origin main

# Backup local customizations
if [ -d "$BASE_DIR/standards.local" ]; then
    echo "📦 Backing up local customizations..."
    cp -r "$BASE_DIR/standards.local" "$BASE_DIR/standards.local.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Sync team standards
cp -r "$TEAM_STANDARDS_DIR/standards/"* "$BASE_DIR/standards/"
cp -r "$TEAM_STANDARDS_DIR/instructions/"* "$BASE_DIR/instructions/"
cp -r "$TEAM_STANDARDS_DIR/commands/"* "$BASE_DIR/commands/"

# Update config
sed -i.bak "s/last_sync: .*/last_sync: \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"/" "$BASE_DIR/config.yml"

echo "✅ Standards synchronized!"
```

## Team Workflow

### 1. Onboarding New Team Members

```bash
# Send new team members this command
curl -sSL https://your-org.github.io/team-cyberark-spec-os/install.sh | bash
```

### 2. Updating Team Standards

1. **Make changes** to team standards repository
2. **Create pull request** for review
3. **Merge approved changes**
4. **Team members sync** using `sync-standards.sh`

### 3. Project Consistency

Ensure all team projects use consistent setup:

```bash
# Enhanced project installation for teams
#!/bin/bash

PROJECT_DIR="$(pwd)"
BASE_DIR="$HOME/.agent-os"
TEAM_STANDARDS_DIR="$HOME/.agent-os-team"

echo "Setting up project with team standards..."

# Standard project setup
~/.cyberark-spec-os/setup/project.sh

# Apply team-specific project templates
if [ -d "$TEAM_STANDARDS_DIR/templates/project" ]; then
    cp -r "$TEAM_STANDARDS_DIR/templates/project/"* .cyberark-spec-os/
fi

# Create team-specific project config
cat >> .cyberark-spec-os/config.yml << EOF
team_installation: true
team_repo: "$(grep team_repo $BASE_DIR/config.yml | cut -d' ' -f2-)"
project_template_version: "$(cd $TEAM_STANDARDS_DIR && git rev-parse HEAD)"
EOF

echo "✅ Project configured with team standards!"
```

## Team Standards Management

### Version Control Strategy

#### Branch Structure
- `main` - Stable team standards
- `develop` - Integration branch for new changes
- `feature/xyz` - Individual standard updates

#### Change Process
1. **Create feature branch** for standards changes
2. **Update relevant files** (standards, instructions, etc.)
3. **Test changes** on sample projects
4. **Create pull request** with detailed description
5. **Team review** and approval
6. **Merge to main** and tag release
7. **Team sync** new standards

### Team-Specific Customizations

#### Example: Team Tech Stack

```markdown
# Team Tech Stack

## Frontend
- **Framework**: React 18+
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Build**: Vite

## Backend
- **Framework**: Node.js + Express
- **Language**: TypeScript 5.0+
- **Database**: PostgreSQL 15+
- **ORM**: Prisma
- **Testing**: Vitest + Supertest

## DevOps
- **CI/CD**: GitHub Actions
- **Deployment**: Docker + Kubernetes
- **Monitoring**: Datadog
- **Error Tracking**: Sentry

## AI Development
- **Primary Tool**: Claude Code
- **Secondary**: Cursor
- **Spec System**: CyberArk AI Spec OS
```

#### Example: Team Code Style

```markdown
# Team Code Style

## General Principles
- **Clarity over cleverness**
- **Consistent naming conventions**
- **Comprehensive documentation**
- **Test-driven development**

## TypeScript Standards
- Use strict TypeScript configuration
- Prefer explicit types over `any`
- Use interface over type for object shapes
- Follow React functional component patterns

## File Organization
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── services/         # API and business logic
├── utils/            # Utility functions
├── types/            # TypeScript type definitions
└── __tests__/        # Test files
```

## Deployment Strategies

### 1. Gradual Rollout

1. **Pilot team** tests new standards
2. **Feedback collection** and iteration
3. **Department rollout** with training
4. **Organization-wide** deployment

### 2. Training and Documentation

- **Internal documentation** for team-specific processes
- **Training sessions** for new workflows
- **Best practices sharing** sessions
- **Regular review** and improvement cycles

### 3. Monitoring and Metrics

Track team adoption and effectiveness:

- **Installation completion** rates
- **Standards compliance** in code reviews
- **Development velocity** improvements
- **Quality metrics** (bugs, technical debt)

## Support and Maintenance

### Team Support Structure

1. **CyberArk AI Spec OS Champion** - Internal expert and trainer
2. **Standards Committee** - Reviews and approves changes
3. **Support Channel** - Slack/Teams channel for questions
4. **Regular Reviews** - Monthly standards review meetings

### Maintenance Tasks

- **Weekly**: Monitor team sync status
- **Monthly**: Review and update standards
- **Quarterly**: Assess effectiveness and improvements
- **Annually**: Major version updates and strategy review

## Advanced Team Features

### Custom Commands

Create team-specific workflow commands:

```bash
# .cyberark-spec-os/commands/team-deploy.md
# Team Deployment Command

This command handles our team's specific deployment workflow:

1. Run full test suite
2. Update version numbers
3. Generate changelog
4. Deploy to staging
5. Run integration tests
6. Deploy to production (with approval)
```

### Integration with Team Tools

Connect CyberArk AI Spec OS with your team's existing tools:

- **Jira/Linear** integration for spec tracking
- **Slack/Teams** notifications for spec updates
- **GitHub/GitLab** templates and workflows
- **CI/CD** pipeline integration

## Troubleshooting Team Issues

### Common Team Setup Problems

1. **Inconsistent installations** - Use team installation script
2. **Outdated standards** - Regular sync reminders
3. **Local overrides** - Clear override policies
4. **Tool conflicts** - Standardize tool versions

### Team Sync Issues

```bash
# Force sync all team standards
rm -rf ~/.cyberark-spec-os/standards
sync-standards.sh --force
```

### Getting Team Help

- Internal team documentation
- CyberArk AI Spec OS community
- Team standards repository issues
- Regular team office hours
