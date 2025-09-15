---
sidebar_position: 5
---

# Installation Troubleshooting

Having issues with your CyberArk Agentic Spec Driven Development installation? This guide covers common problems and their solutions.

## Common Installation Issues

### Permission Errors

#### Problem: `Permission denied` when running installation scripts

```bash
# Error message example
bash: ./setup.sh: Permission denied
```

#### Solutions:

**Option 1: Make script executable**
```bash
chmod +x ~/.cyberark-spec-os/setup/project.sh
chmod +x ~/.cyberark-spec-os/setup/base.sh
```

**Option 2: Run with bash directly**
```bash
bash ~/.cyberark-spec-os/setup/project.sh
```

**Option 3: Check file ownership**
```bash
# Check current ownership
ls -la ~/.agent-os/setup/

# Fix ownership if needed
sudo chown -R $USER:$USER ~/.cyberark-spec-os/
```

### Network and Download Issues

#### Problem: `curl: command not found` or download failures

**Install curl:**

**macOS:**
```bash
# Using Homebrew
brew install curl

# Using MacPorts
sudo port install curl
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install curl
```

**Linux (CentOS/RHEL):**
```bash
sudo yum install curl
# or for newer versions
sudo dnf install curl
```

**Windows:**
```bash
# Install via Chocolatey
choco install curl

# Or use PowerShell's Invoke-WebRequest instead
Invoke-WebRequest -Uri "https://example.com/file" -OutFile "file"
```

#### Problem: SSL certificate verification fails

```bash
# Temporary solution (not recommended for production)
curl -k -sSL https://url...

# Better solution: Update certificates
# macOS
brew install ca-certificates

# Linux
sudo apt-get update && sudo apt-get install ca-certificates
```

#### Problem: GitHub API rate limiting

```bash
# Error: API rate limit exceeded
# Solution: Use authenticated requests
curl -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/ChenReuven/cyberark-ai-spec-os/contents/file
```

### Path and Environment Issues

#### Problem: `~/.cyberark-spec-os` not found or path issues

**Check if directory exists:**
```bash
ls -la ~/
ls -la ~/.cyberark-spec-os/
```

**Verify home directory:**
```bash
echo $HOME
cd ~
pwd
```

**Create missing directories:**
```bash
mkdir -p ~/.cyberark-spec-os/standards/code-style
mkdir -p ~/.cyberark-spec-os/instructions/core
mkdir -p ~/.cyberark-spec-os/commands
```

#### Problem: Command not found after installation

**Add to PATH:**

**Bash (.bashrc or .bash_profile):**
```bash
echo 'export PATH="$HOME/.cyberark-spec-os/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**Zsh (.zshrc):**
```bash
echo 'export PATH="$HOME/.cyberark-spec-os/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

**Fish (.config/fish/config.fish):**
```bash
echo 'set -gx PATH $HOME/.cyberark-spec-os/bin $PATH' >> ~/.config/fish/config.fish
```

### Git and Repository Issues

#### Problem: Git not installed or configured

**Install Git:**

**macOS:**
```bash
# Using Homebrew
brew install git

# Using Xcode Command Line Tools
xcode-select --install
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install git

# CentOS/RHEL
sudo yum install git
```

**Configure Git:**
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### Problem: Repository access issues

```bash
# Test repository access
git ls-remote https://github.com/ChenReuven/cyberark-ai-spec-os.git

# If SSH issues, use HTTPS instead
git clone https://github.com/ChenReuven/cyberark-ai-spec-os.git
```

### File System Issues

#### Problem: Disk space insufficient

**Check available space:**
```bash
df -h ~
du -sh ~/.cyberark-spec-os/
```

**Clean up if needed:**
```bash
# Remove old backups
rm -rf ~/.cyberark-spec-os/*.backup.*

# Clear temporary files
rm -rf ~/.cyberark-spec-os/tmp/
```

#### Problem: File conflicts or corruption

**Reset installation:**
```bash
# Backup current config
cp ~/.cyberark-spec-os/config.yml ~/config.yml.backup

# Remove and reinstall
rm -rf ~/.cyberark-spec-os/
# Re-run installation

# Restore config
cp ~/config.yml.backup ~/.cyberark-spec-os/config.yml
```

## Platform-Specific Issues

### macOS Issues

#### Problem: Gatekeeper blocking scripts

```bash
# Allow script execution
sudo spctl --master-disable

# Or allow specific script
sudo xattr -r -d com.apple.quarantine ~/.cyberark-spec-os/setup/
```

#### Problem: Homebrew not found

```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add to PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Linux Issues

#### Problem: Missing dependencies

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install build-essential curl git
```

**CentOS/RHEL:**
```bash
sudo yum groupinstall "Development Tools"
sudo yum install curl git
```

#### Problem: SELinux blocking file operations

```bash
# Check SELinux status
sestatus

# Temporarily disable (not recommended for production)
sudo setenforce 0

# Or set proper contexts
sudo setsebool -P httpd_can_network_connect 1
```

### Windows Issues

#### Problem: PowerShell execution policy

```powershell
# Check current policy
Get-ExecutionPolicy

# Allow script execution (run as Administrator)
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
```

#### Problem: WSL vs native Windows paths

**In WSL:**
```bash
# Use Linux-style paths
~/.agent-os/

# Access Windows files
/mnt/c/Users/username/
```

**In native Windows:**
```cmd
# Use Windows-style paths
%USERPROFILE%\.agent-os\
```

## Tool-Specific Issues

### Claude Code Integration

#### Problem: Claude Code not recognizing agent files

**Check file locations:**
```bash
ls -la ~/.cyberark-spec-os/claude-code/agents/
```

**Verify file format:**
```bash
# Files should be markdown (.md)
file ~/.cyberark-spec-os/claude-code/agents/context-fetcher.md
```

**Restart Claude Code** after installation.

### Cursor Integration

#### Problem: Cursor not using CyberArk Agentic Spec Driven Development standards

**Check project configuration:**
```bash
ls -la .cyberark-spec-os/
cat .cyberark-spec-os/config.yml
```

**Verify standards files:**
```bash
ls -la .cyberark-spec-os/standards/
```

**Restart Cursor** and reload the project.

## Verification and Diagnostics

### Installation Health Check

Create a diagnostic script:

```bash
#!/bin/bash
# health-check.sh

echo "🔍 CyberArk Agentic Spec Driven Development Health Check"
echo "=================================="

# Check base installation
if [ -d ~/.cyberark-spec-os ]; then
    echo "✅ Base installation found"
    echo "📁 Location: ~/.cyberark-spec-os"
    
    # Check key directories
    for dir in standards instructions commands; do
        if [ -d ~/.cyberark-spec-os/$dir ]; then
            echo "✅ $dir directory exists"
            echo "   Files: $(ls ~/.cyberark-spec-os/$dir | wc -l)"
        else
            echo "❌ $dir directory missing"
        fi
    done
    
    # Check config
    if [ -f ~/.cyberark-spec-os/config.yml ]; then
        echo "✅ Configuration file found"
        echo "   Version: $(grep version ~/.cyberark-spec-os/config.yml | cut -d' ' -f2)"
    else
        echo "❌ Configuration file missing"
    fi
else
    echo "❌ Base installation not found"
    echo "   Run: curl -sSL https://install-url | bash"
fi

# Check project installation (if in a project)
if [ -d .cyberark-spec-os ]; then
    echo "✅ Project installation found"
    echo "📁 Location: ./.cyberark-spec-os"
    
    for dir in product specs standards; do
        if [ -d .cyberark-spec-os/$dir ]; then
            echo "✅ $dir directory exists"
        else
            echo "❌ $dir directory missing"
        fi
    done
else
    echo "ℹ️  No project installation in current directory"
    echo "   Run: ~/.cyberark-spec-os/setup/project.sh"
fi

# Check tools
echo ""
echo "🛠️  Tool Status"
echo "==============="

# Check common tools
for tool in git curl node npm; do
    if command -v $tool &> /dev/null; then
        version=$(${tool} --version 2>/dev/null | head -n1)
        echo "✅ $tool: $version"
    else
        echo "❌ $tool: not installed"
    fi
done

echo ""
echo "Health check complete!"
```

Run the health check:
```bash
chmod +x health-check.sh
./health-check.sh
```

### Log Analysis

**Check installation logs:**
```bash
# Look for installation logs
ls -la ~/.cyberark-spec-os/*.log

# Check system logs
# macOS
log show --predicate 'subsystem contains "agent-os"' --last 1h

# Linux
journalctl -u agent-os --since "1 hour ago"
```

## Getting Additional Help

### Community Support

1. **GitHub Issues**: [Report bugs](https://github.com/ChenReuven/cyberark-ai-spec-os/issues)
2. **Discussions**: [Community discussions](https://github.com/ChenReuven/cyberark-ai-spec-os/discussions)
3. **Documentation**: [Full documentation](https://cyberark-ai-spec-os.github.io)

### Information to Include in Bug Reports

When reporting installation issues, include:

```bash
# System information
uname -a
echo "Shell: $SHELL"
echo "Home: $HOME"

# CyberArk Agentic Spec Driven Development information
cat ~/.cyberark-spec-os/config.yml 2>/dev/null || echo "No config found"

# Tool versions
git --version
curl --version
node --version 2>/dev/null || echo "Node not installed"

# Directory structure
ls -la ~/.cyberark-spec-os/ 2>/dev/null || echo "No base installation"
ls -la .cyberark-spec-os/ 2>/dev/null || echo "No project installation"

# Error messages
# Include the exact error message and command that caused it
```

### Clean Reinstall Process

If all else fails, perform a clean reinstall:

```bash
# 1. Backup any customizations
cp -r ~/.cyberark-spec-os/standards ~/.cyberark-spec-os-backup/ 2>/dev/null || true

# 2. Remove current installation
rm -rf ~/.cyberark-spec-os/

# 3. Clear any cached data
rm -rf ~/.cache/cyberark-spec-os/ 2>/dev/null || true

# 4. Reinstall base
curl -sSL https://raw.githubusercontent.com/ChenReuven/cyberark-ai-spec-os/main/setup/base.sh | bash -s -- --claude-code --cursor

# 5. Restore customizations
cp -r ~/.cyberark-spec-os-backup/* ~/.cyberark-spec-os/standards/ 2>/dev/null || true

# 6. Reinstall project (from project directory)
~/.cyberark-spec-os/setup/project.sh
```

This should resolve most installation issues. If problems persist, please reach out to the community for additional support.
