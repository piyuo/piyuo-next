# AI Agent Instructions for Development

## Overview

Please refer to the README.md and CONTRIBUTING.md files to learn about the project, the technologies used, and the complete development workflow for contributing.

## Resolve issue Workflow

When you're asked to resolve an issue (e.g., “resolve issue 42” or “solve issue #42”), it means the issue has already been created on GitHub and has a valid issue number.

Please follow the steps below to resolve the issue correctly:

### Step 1: Read the Workflow

Refer to CONTRIBUTING.md to understand the project's development workflow. It usually includes instructions for setting up your working branch.

### Step 2: Create and Check Out the Issue Branch

Use the provided script to create a new branch based on the issue number:

./scripts/start-issue.sh <issue-number>

- Creates a new branch from `main` named `<issue-number>-<slugified-title>`.
- Assigns the issue to your GitHub user.
- Checks out the new branch (or switches to it if it already exists).

Example:

```bash
./scripts/start-issue.sh 42
```

This will create a properly named branch and check it out for you.

### Step 3: Resolve the Issue

As an expert, use your best judgment and problem-solving skills to address the issue. Refer to README.md for project-specific implementation guidance or constraints.

### Step 4: Prepare a Pull Request

Once your solution is complete:

Refer to docs/AI_PULL_REQUEST_ASSISTANT.md for help creating a pull request (PR).
Commit your changes following the commit message guidelines in the documentation.
Make sure the PR follows all the rules and formatting specified in the documentation.

### Step 5: Submit and Wait for Review

After your PR is submitted, your work is considered complete. Reviewers will evaluate your changes. If further adjustments are needed, they will run the Resolve issue workflow again to let you or another AI to get it done.

---

## Create Pull Request Workflow

When you're asked to create a pull request (PR), it means someone has already completed work on an issue and now needs your help to submit that work as a PR.

You might receive a command like:

“Create a PR for me on issue 42”
“Create a PR”
Follow the steps below to create the PR correctly.

### Step 1: Determine the Issue Number

If the issue number is not explicitly provided, infer it from the current working branch name. All issue branches follow a naming convention like:

45-docs-adjust-all-documents-to-fit-ai-workflow
The first number (45) is always the issue number.

### Step 2: Review the PR Guidelines

Refer to docs/AI_PULL_REQUEST_ASSISTANT.md to understand the rules for creating a PR. This file includes important instructions such as:

How to write a proper PR title and description
How to format commit messages

### Step 3: Finalize and Submit the PR

Make sure all code changes are committed.
Follow the instructions in the AI_PULL_REQUEST_ASSISTANT.md to create the pull request.
Ensure the PR complies with the contribution rules and links to the correct issue.

### Step 4: Done — Wait for Review

Once the PR is created, your job is done. Reviewers will now:

1. Review the PR
2. If additional work is required, they will trigger the “Resolve Issue” workflow again, which may involve you or another AI agent.

---

## Reference documents

- **/README.md**: provides a high-level overview of the project, including its purpose, tech stack .
- **/CONTRIBUTING.md**: outlines the complete development workflow for contributing to the project.
- **/AGENTS.md**: provides instructions and goals for AI assistants involved in the project.
- **docs/AI_ISSUE_ASSISTANT.md**: instructs agents on how to enhance raw user input into a GitHub issue.
- **docs/AI_PULL_REQUEST_ASSISTANT.md**: provides steps and guidelines to create pull requests.
