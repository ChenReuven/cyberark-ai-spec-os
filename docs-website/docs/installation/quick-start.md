---
sidebar_position: 2
---

# Quick Installation Guide

Get up and running with CyberArk AI Spec OS in minutes. This guide covers the most common installation scenarios for both greenfield (new) and brownfield (existing) projects.

## Step 1: Base Installation

The base installation sets up CyberArk AI Spec OS centrally on your system. This is optional but recommended, as it maintains your default standards and instructions that projects will inherit from.

### Choose Your Installation Method

Select the installation command based on which AI coding tools you use:

#### For Claude Code Users

```bash
curl -sSL https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/main/setup/base.sh | bash -s -- --claude-code
```

#### For Cursor Users

```bash
curl -sSL https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/main/setup/base.sh | bash -s -- --cursor
```

#### For Both Claude Code & Cursor

```bash
curl -sSL https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/main/setup/base.sh | bash -s -- --claude-code --cursor
```

### Installation Location

By default, the base installation creates the `.cyberark-spec-os/` folder in your home directory (`~/.cyberark-spec-os`). 

You can choose a different location if needed by navigating to your preferred directory before running the installation command.

## Step 2: Project Installation

After completing the base installation, you'll need to install CyberArk AI Spec OS into each project where you want to use it. This works seamlessly whether you're starting a new project (greenfield) or adding it to an existing codebase (brownfield).

### Navigate to Your Project

```bash
cd /path/to/your/project
```

### Run Project Installation

```bash
~/.cyberark-spec-os/setup/project.sh
```

This script will:
- Copy necessary files to your project
- Set up project-specific configurations
- Create initial documentation templates
- Configure your project for AI-assisted development

## Step 3: Verification

Verify your installation by checking that these directories exist:

### Base Installation
```bash
ls ~/.cyberark-spec-os/
```

You should see:
- `standards/` - Your coding standards and best practices
- `instructions/` - Core workflow instructions
- `commands/` - Available commands
- `config.yml` - Configuration file

### Project Installation
```bash
ls .cyberark-spec-os/
```

You should see:
- `product/` - Product-specific documentation
- `specs/` - Individual feature specifications
- Local configuration files

## What Happens During Installation

### Base Installation Process
1. **Creates** the `.cyberark-spec-os/` folder structure
2. **Downloads** instruction files from the repository
3. **Installs** standards file templates
4. **Sets up** language-specific code style guides
5. **Creates** configuration tracking
6. **Preserves** any existing customizations

### Project Installation Process
1. **Inherits** standards from base installation
2. **Creates** project-specific folders (`.cyberark-spec-os/`)
3. **Sets up** initial product documentation
4. **Configures** local overrides
5. **Initializes** spec tracking

## Troubleshooting

### Permission Issues
If you encounter permission errors:

```bash
# Make the script executable
chmod +x ~/.cyberark-spec-os/setup/project.sh

# Or run with explicit permissions
bash ~/.cyberark-spec-os/setup/project.sh
```

### Network Issues
If the download fails:

1. Check your internet connection
2. Try downloading manually from the [GitHub repository](https://github.com/ChenReuven/cyberark-ai-spec-os)
3. Use the [manual installation method](./manual)

### Path Issues
Ensure your shell can find the installation:

```bash
# Add to your shell profile if needed
echo 'export PATH="$HOME/.cyberark-spec-os/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## Next Steps

After successful installation:

1. **Configure** your [standards](../configuration/standards) to match your preferences
2. **Set up** your first [project](../getting-started/first-project)
3. **Learn** the core [workflows](../workflows/overview)
4. **Explore** [best practices](../best-practices/overview)

## Getting Help

If you encounter issues:

- Check our [Troubleshooting Guide](../troubleshooting/common-issues)
- Join our [Community Discussions](https://github.com/ChenReuven/cyberark-ai-spec-os/discussions)
- Report bugs in our [Issue Tracker](https://github.com/ChenReuven/cyberark-ai-spec-os/issues)
