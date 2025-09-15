---
sidebar_position: 1
---

# Installation Overview

CyberArk AI Spec OS has a flexible two-part installation system designed to work with both greenfield (new) and brownfield (existing) projects, seamlessly integrating with your current development workflow.

## Installation Architecture

The installation consists of two main components:

### 1. Base Installation (Recommended)
Install CyberArk AI Spec OS centrally on your system. This maintains your standards and instructions that projects will inherit from.

**Location:** `~/.cyberark-spec-os` (or custom location)
**Purpose:** Global standards, instructions, and project templates

### 2. Project Installation 
Install CyberArk AI Spec OS into each project you work on. This provides self-contained setup with project-specific customizations.

**Location:** Your project directory (`.cyberark-spec-os/`)
**Purpose:** Project-specific configurations and specs

## Supported Tools

CyberArk AI Spec OS works seamlessly with:

- **Claude Code** - AI coding assistant
- **Cursor** - AI-powered code editor  
- **Any AI coding tool** (In Development) - Flexible integration

## Project Types

Works with any project setup:

- **Greenfield Projects** - Start fresh with CyberArk AI Spec OS from day one
- **Brownfield Projects** - Integrate into existing codebases without disruption
- **Any Technology Stack** - Language and framework agnostic approach
- **Any Project Size** - From small utilities to large enterprise applications

## What Gets Installed

### Base Installation Includes:
- **Standards files** (tech-stack, code-style, best-practices)
- **Instructions** (plan-product, create-spec, execute-tasks, etc.)
- **Commands** for workflow management
- **Configuration** files and version tracking
- **Language-specific** code style guides

### Project Installation Includes:
- **Product documentation** (mission, roadmap, decisions)
- **Specs** for individual features and enhancements
- **Project-specific** configurations
- **Local overrides** for global standards

## Next Steps

Choose your installation path:

1. **Quick Start**: Follow our [Quick Installation Guide](./quick-start) for the fastest setup
2. **Custom Setup**: Use the [Manual Installation](./manual) for full control
3. **Team Setup**: See [Team Installation](./team-setup) for organization-wide deployment

## Prerequisites

Before installing, ensure you have:

- Node.js 18.0 or higher
- Git installed and configured
- Your preferred AI coding tool (Claude Code / Cursor)
- Terminal access for running installation scripts
