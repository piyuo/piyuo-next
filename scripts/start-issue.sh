# scripts/start-issue.sh
#!/bin/bash
# This script creates a new branch for a GitHub issue, assigns it to you, and checks it out.
# Usage: ./start-issue.sh <issue-number>

set -e

# Check input
if [ -z "$1" ]; then
    echo "❌ Error: Issue number is required."
    echo "Usage: $0 <issue-number>"
    exit 1
fi

ISSUE="$1"
BASE=main

# Get current GitHub username
GH_USER=$(gh api user --jq .login 2>/dev/null)
if [ -z "$GH_USER" ]; then
    echo "❌ Error: Could not determine GitHub user. Are you logged in with gh?"
    exit 1
fi

# Check if issue exists and get title
ISSUE_TITLE=$(gh issue view "$ISSUE" --json title --jq ".title" 2>/dev/null || true)
if [ -z "$ISSUE_TITLE" ]; then
    echo "❌ Error: Issue #$ISSUE not found. Please check the issue number."
    exit 1
fi

echo "📋 Issue #$ISSUE: $ISSUE_TITLE"

# Slugify issue title (lowercase, replace non-alnum with dash, trim dashes)
SLUG=$(echo "$ISSUE_TITLE" | \
    tr '[:upper:]' '[:lower:]' | \
    sed -E 's/[^a-z0-9]+/-/g' | \
    sed -E 's/^-+|-+$//g')

BRANCH="${ISSUE}-${SLUG}"

# Assign issue to current user
echo "👤 Assigning issue #$ISSUE to @$GH_USER..."
gh issue edit "$ISSUE" --add-assignee "$GH_USER" >/dev/null

# Check if branch exists locally
if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
    echo "✅ Branch '$BRANCH' already exists locally."
    git checkout "$BRANCH"
else
    echo "🚀 Creating and checking out branch '$BRANCH' for issue #$ISSUE"
    # Create branch from base
    git fetch origin "$BASE"
    git checkout -b "$BRANCH" "origin/$BASE"
fi
