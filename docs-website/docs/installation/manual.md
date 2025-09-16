---
sidebar_position: 3
---

# Manual Installation

Prefer full control over your installation? Follow these step-by-step instructions to manually install CyberArk Agentic Spec Driven Development. This approach works for both greenfield (new) and brownfield (existing) projects.

## Base Installation (Manual)

### Step 1: Create Directory Structure

Create the master CyberArk Agentic Spec Driven Development directories:

```bash
mkdir -p ~/.cyberark-spec-os/standards/code-style
mkdir -p ~/.cyberark-spec-os/instructions/core
mkdir -p ~/.cyberark-spec-os/instructions/meta
mkdir -p ~/.cyberark-spec-os/commands
mkdir -p ~/.cyberark-spec-os/setup
```

**Note:** The `~/` refers to your home directory:
- **Mac/Linux**: `/Users/yourusername/`
- **Windows**: `C:\Users\yourusername\` (or use `%USERPROFILE%` in Command Prompt)

### Step 2: Download Standards Files

Copy the standards files to `~/.cyberark-spec-os/standards/`:

#### Core Standards Files

Create `~/.cyberark-spec-os/standards/tech-stack.md`:

```bash
curl -o ~/.cyberark-spec-os/standards/tech-stack.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/standards/tech-stack.md
```

Create `~/.cyberark-spec-os/standards/code-style.md`:

```bash
curl -o ~/.cyberark-spec-os/standards/code-style.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/standards/code-style.md
```

Create `~/.cyberark-spec-os/standards/best-practices.md`:

```bash
curl -o ~/.cyberark-spec-os/standards/best-practices.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/standards/best-practices.md
```

#### Language-Specific Style Guides

Download to `~/.cyberark-spec-os/standards/code-style/`:

```bash
# HTML style guide
curl -o ~/.cyberark-spec-os/standards/code-style/html-style.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/standards/code-style/html-style.md

# CSS style guide  
curl -o ~/.cyberark-spec-os/standards/code-style/css-style.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/standards/code-style/css-style.md

# JavaScript style guide
curl -o ~/.cyberark-spec-os/standards/code-style/javascript-style.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/standards/code-style/javascript-style.md
```

### Step 3: Download Instructions Files

Copy the instruction files to `~/.cyberark-spec-os/instructions/`:

#### Core Instructions

```bash
# Core workflow instructions
curl -o ~/.cyberark-spec-os/instructions/core/plan-product.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/instructions/core/plan-product.md

curl -o ~/.cyberark-spec-os/instructions/core/create-spec.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/instructions/core/create-spec.md

curl -o ~/.cyberark-spec-os/instructions/core/execute-tasks.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/instructions/core/execute-tasks.md

curl -o ~/.cyberark-spec-os/instructions/core/execute-task.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/instructions/core/execute-task.md

curl -o ~/.cyberark-spec-os/instructions/core/analyze-product.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/instructions/core/analyze-product.md
```

#### Meta Instructions

```bash
curl -o ~/.cyberark-spec-os/instructions/meta/pre-flight.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/instructions/meta/pre-flight.md

curl -o ~/.cyberark-spec-os/instructions/meta/post-flight.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/instructions/meta/post-flight.md
```

### Step 4: Download Commands

```bash
curl -o ~/.cyberark-spec-os/commands/analyze-product.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/commands/analyze-product.md

curl -o ~/.cyberark-spec-os/commands/create-spec.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/commands/create-spec.md

curl -o ~/.cyberark-spec-os/commands/execute-tasks.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/commands/execute-tasks.md

curl -o ~/.cyberark-spec-os/commands/plan-product.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/commands/plan-product.md
```

### Step 5: Create Configuration

Create `~/.cyberark-spec-os/config.yml`:

```yaml
version: "1.0.0"
installation_type: "manual"
installed_date: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
tools:
  - claude-code  # Add if you use Claude Code
  - cursor       # Add if you use Cursor
base_path: "~/.cyberark-spec-os"
```

### Step 6: Create Project Installation Script

Create `~/.cyberark-spec-os/setup/project.sh`:

```bash
cat > ~/.cyberark-spec-os/setup/project.sh << 'EOF'
#!/bin/bash

# CyberArk Agentic Spec Driven Development Project Installation Script

set -e

PROJECT_DIR="$(pwd)"
BASE_DIR="$HOME/.cyberark-spec-os"

echo "Installing CyberArk Agentic Spec Driven Development into project: $PROJECT_DIR"

# Create project directory structure
mkdir -p .cyberark-spec-os/product
mkdir -p .cyberark-spec-os/specs
mkdir -p .cyberark-spec-os/standards

# Copy base standards (can be overridden locally)
if [ -d "$BASE_DIR/standards" ]; then
    cp -r "$BASE_DIR/standards/"* .cyberark-spec-os/standards/
fi

# Create initial product documentation
cat > .cyberark-spec-os/product/mission.md << 'MISSION'
# Product Mission

## What We're Building
[Describe what you're building, for whom, and why it matters]

## Target Users
[Define your primary users and their needs]

## Success Criteria
[How will you measure success?]

## Constraints
[Technical, business, or other constraints to consider]
MISSION

cat > .cyberark-spec-os/product/roadmap.md << 'ROADMAP'
# Product Roadmap

## Shipped Features
- [List completed features]

## In Progress
- [Current work items]

## Planned
- [Upcoming features and enhancements]

## Ideas / Backlog
- [Future possibilities and ideas]
ROADMAP

cat > .cyberark-spec-os/product/decisions.md << 'DECISIONS'
# Architectural Decisions

## Decision Log

### [Decision Title]
**Date:** [YYYY-MM-DD]
**Status:** [Accepted/Rejected/Superseded]
**Context:** [What situation prompted this decision?]
**Decision:** [What did we decide?]
**Rationale:** [Why did we make this choice?]
**Consequences:** [What are the implications?]
DECISIONS

# Create local config
cat > .cyberark-spec-os/config.yml << CONFIG
project_name: "$(basename "$PROJECT_DIR")"
installation_date: "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
base_installation: "$BASE_DIR"
CONFIG

echo "✅ CyberArk Agentic Spec Driven Development installed successfully!"
echo "📁 Project files created in .cyberark-spec-os/"
echo "📚 Next: Review and customize your standards in .cyberark-spec-os/standards/"
EOF

chmod +x ~/.cyberark-spec-os/setup/project.sh
```

## Project Installation (Manual)

### Navigate to Your Project

```bash
cd /path/to/your/project
```

### Run the Project Installation

```bash
~/.cyberark-spec-os/setup/project.sh
```

Or manually create the project structure:

```bash
# Create project directory structure
mkdir -p .cyberark-spec-os/product
mkdir -p .cyberark-spec-os/specs
mkdir -p .cyberark-spec-os/standards

# Copy standards from base installation
cp -r ~/.cyberark-spec-os/standards/* .cyberark-spec-os/standards/

# Create initial product documentation templates
# (See the script above for template content)
```

## Tool-Specific Setup

### For Claude Code Users

If using Claude Code, create additional agent files:

```bash
mkdir -p ~/.cyberark-spec-os/claude-code/agents

# Download agent configurations
curl -o ~/.cyberark-spec-os/claude-code/agents/context-fetcher.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/claude-code/agents/context-fetcher.md

curl -o ~/.cyberark-spec-os/claude-code/agents/date-checker.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/claude-code/agents/date-checker.md

curl -o ~/.cyberark-spec-os/claude-code/agents/file-creator.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/claude-code/agents/file-creator.md

curl -o ~/.cyberark-spec-os/claude-code/agents/git-workflow.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/claude-code/agents/git-workflow.md

curl -o ~/.cyberark-spec-os/claude-code/agents/test-runner.md \
  https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/master/claude-code/agents/test-runner.md
```

### For Cursor Users

Cursor integration works automatically with the base installation. No additional setup required.

## Verification

Verify your manual installation:

```bash
# Check base installation
ls -la ~/.cyberark-spec-os/
ls -la ~/.cyberark-spec-os/standards/
ls -la ~/.cyberark-spec-os/instructions/
ls -la ~/.cyberark-spec-os/commands/

# Check project installation (from project directory)
ls -la .cyberark-spec-os/
ls -la .cyberark-spec-os/product/
ls -la .cyberark-spec-os/standards/
```

## Updating Your Installation

To update your manually installed CyberArk Agentic Spec Driven Development:

### Update Base Installation

```bash
# Backup current configuration
cp ~/.cyberark-spec-os/config.yml ~/.cyberark-spec-os/config.yml.backup

# Re-download files (this will overwrite existing files)
# Follow Steps 2-4 above

# Restore your configuration if needed
```

### Update Project Installation

```bash
# From your project directory
~/.cyberark-spec-os/setup/project.sh
```

## Customization

After manual installation, you can customize:

1. **Standards files** in `~/.cyberark-spec-os/standards/`
2. **Instructions** in `~/.cyberark-spec-os/instructions/`
3. **Project templates** by modifying the setup script
4. **Workflow commands** in `~/.cyberark-spec-os/commands/`

## Next Steps

- [Set up your first project](../getting-started/first-project)
