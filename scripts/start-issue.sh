#!/bin/bash
# This script uses GitHub CLI to create and check out a branch linked to an issue.
# Usage: ./start-issue.sh <issue-number>

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

if [ -z "$1" ]; then
    echo -e "${RED}❌ Error: Issue number is required.${NC}"
    echo "Usage: $0 <issue-number>"
    exit 1
fi

ISSUE="$1"

# Ensure user is logged in to GitHub CLI
if ! gh auth status &>/dev/null; then
    echo -e "${RED}❌ Error: You are not logged in to GitHub CLI. Run 'gh auth login' first.${NC}"
    exit 1
fi

# Check that issue exists
if ! gh issue view "$ISSUE" &>/dev/null; then
    echo -e "${RED}❌ Error: Issue #$ISSUE not found.${NC}"
    exit 1
fi

# Check for uncommitted changes before switching branches
echo "🔍 Checking for uncommitted changes..."
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}❌ Error: You have uncommitted changes. Please commit or stash them before proceeding.${NC}"
    git status -s
    exit 1
fi
echo -e "${GREEN}✅ No uncommitted changes found.${NC}"

# Pull the latest changes from the remote main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Switching to main branch and pulling latest changes..."
    git checkout main
fi
git pull origin main

# Use GitHub CLI to create and link the branch
echo -e "🚀 Creating a branch for issue #$ISSUE using 'gh issue develop'..."
gh issue develop "$ISSUE" --checkout --base main

# Print final status
NEW_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${GREEN}✅ Branch '$NEW_BRANCH' created and linked to issue #$ISSUE.${NC}"

# Call cleanup script to remove old branches
if [ -x "./cleanup-branches.sh" ]; then
    echo -e "🧹 Running branch cleanup script..."
    bash ./cleanup-branches.sh
else
    echo -e "${RED}⚠️ Warning: cleanup-branches.sh not found or not executable.${NC}"
fi