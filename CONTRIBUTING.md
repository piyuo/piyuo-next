# Contributing Guide

> **Complete Development Workflow:** This guide covers the entire development lifecycle from issue creation to automated releases, following a test-first approach with clean Git history.

**Note:** Code examples in this document use JavaScript for demonstration purposes. For the actual programming language, frameworks, and tech stack used in this project, please refer to the README.md file.

## 📋 Quick Start Workflow

Here's the complete development workflow at a glance:

1. **Create Issue** → Use AI Issue Assistant or templates
2. **Create Branch** → Using `./scripts/start-issue.sh <issue-number>`
3. **Write Tests First** → Test-driven development (TDD) approach
4. **Develop & Commit** → Frequent commits with descriptive messages
5. **Clean History** → Squash into meaningful commits before review
6. **Create PR** → Request review with proper title format
7. **Merge** → Maintainer performs rebase and merge
8. **Auto-Release** → Release-please handles versioning when milestone complete

---

## 🎯 Step 1: Create Issue

All work must begin with a GitHub Issue to ensure proper tracking and milestone alignment.

### Issue Creation Options

**AI Assist Issue** (Recommended) - Use the AI-powered issue template `AI Assist Issue`, the detail document is in   `docs/AI_ISSUE_ASSISTANT.md`
### Large Feature Management

For complex features, use **Epic + Sub-issues** approach:
1. **Epic Issue** - Main feature request with overview
2. **Team Planning** - Collaborative breakdown into sub-issues (1-2 days each)
3. **Sub-issue Creation** - Each with clear acceptance criteria
4. **Team Assignment** - Developers claim specific sub-issues

---

## 🌿 Step 2: Create Branch

**ALWAYS** use the provided script to start working on any issue:

```bash
./scripts/start-issue.sh <issue-number>
```

This script will:
- Create a branch named `<issue-number>-<slugified-title>` from `main`
- Assign the issue to you
- Check out the new branch

**Requirements:**
- GitHub CLI (`gh`) must be installed and authenticated
- Run from project root directory

---

## ✅ Step 3: Write Tests First (TDD)

**MANDATORY:** Write tests before implementing functionality. This test-first approach ensures:
- Code is testable and well-designed
- Edge cases are considered upfront
- Immediate feedback when implementation is complete
- Living documentation for expected behavior

### Test Coverage Requirements

- **Unit Tests**: ≥80% coverage for new code
- **Integration Tests**: Required for APIs and complex workflows
- **E2E Tests**: Required for critical user journeys

### Test File Structure

```text
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.js
│   │   │   └── Button.test.js    # Unit tests
│   │   └── ...
│   ├── pages/
│   │   ├── about/
│   │   │   ├── index.js
│   │   │   └── index.test.js     # Integration tests
│   │   └── index.test.js
├── __tests__/
│   ├── e2e/                      # End-to-end tests
│   │   ├── navigation.spec.js
│   │   └── user-journeys.spec.js
│   └── setup/                    # Test configuration
```

### Test Examples

```javascript
// ✅ Good: Testing behavior and user interactions
test('displays error message when form submission fails', async () => {
  // Arrange
  const component = render(<ContactForm />);

  // Act
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));

  // Assert
  await waitFor(() => {
    expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
  });
});
```

---

## 💻 Step 4: Development & Commit

### Code Standards

#### File Size Limits

- **Target:** ≤200 lines per file (excluding comments/blank lines)
- **Refactor if exceeded:** Extract components, utilities, types, or functions

#### Naming Conventions

- **Files:** Follow project conventions (PascalCase for components, camelCase for utilities)
- **Variables/Functions:** camelCase (`userName`, `handleSubmit`)
- **Constants:** SCREAMING_SNAKE_CASE (`API_BASE_URL`)

#### Comments (Required for functions >10 lines)

```javascript
/**
 * Calculates the total price of items in cart after applying discount and tax.
 *
 * @param {Array} items - Array of cart items with price and quantity
 * @param {number} discountRate - Discount rate as decimal (e.g., 0.10 for 10%)
 * @param {number} taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns {number} The final total price including tax and discount
 */
function calculateCartTotal(items, discountRate, taxRate) {
  // ... implementation
}
```

#### Import Organization

```javascript
// 1. Standard library imports
import fs from 'fs';
import path from 'path';

// 2. Third-party library imports
import express from 'express';
import lodash from 'lodash';

// 3. Internal imports
import { Button } from './components/Button';
import { validateEmail } from './utils/validation';

// 4. Relative imports
import './styles.css';
```

### Development Phase Commits

During development, commit frequently with any messages you find helpful:

```bash
# Examples of work-in-progress commits (will be cleaned up later)
git commit -m "WIP: initial authentication setup"
git commit -m "add password validation logic"
git commit -m "fix: handle edge case for empty passwords"
git commit -m "debug: add logging for troubleshooting"
```

**Development Phase Freedom:**

- Commit as frequently as you want with any message style
- Use WIP, debug, typo fix, or any other commit messages
- Focus on progress, not commit message perfection
- These commits will be cleaned up before review

---

## 🧹 Step 5: Clean Commit History

**Commit Message Requirements:**

- The **first commit** in your PR branch must use the exact same format as the PR title
- This ensures consistency between the commit history and PR tracking
- Additional commits in the same PR can use shorter, descriptive messages
- Always include the issue number for traceability

**CRITICAL:** You MUST clean up your commit history before creating a PR or converting Draft PR to ready for review.

### Before Requesting Review (Mandatory)

Transform messy development commits into **1-n meaningful commits** (typically 1 per issue).

#### Interactive Rebase Process

```bash
# First, sync with latest main
git fetch origin
git rebase origin/main

# Clean up commits using interactive rebase
git rebase -i origin/main

# In the interactive editor:
# - Keep the first commit as 'pick'
# - Change others to 'squash' or 'fixup'
# - Save and exit
# - Edit the final commit message

# Force push safely
git push --force-with-lease origin <branch-name>
```

### Commit Cleanup Guidelines

**What to squash/remove:**

- ❌ WIP commits
- ❌ Typo fixes
- ❌ Debug commits
- ❌ "Fix review comments"
- ❌ Any noisy, non-meaningful commits

**What constitutes meaningful commits:**

- ✅ `feat(AUTH): implement user authentication system #17`
- ✅ `fix(PAY): resolve payment gateway timeout issues #142`
- ✅ `refactor(DB): optimize database query performance #201`
- ✅ `docs(API): add API authentication guide #78`

### Final Commit Requirements

Your cleaned commits must follow these requirements:

- **Use conventional commit format**: `<type>(<scope>): <description> #<issue-number>`
- **Must include issue number** - **MANDATORY** for all commits
- **Must be `feat:` or `fix:`** to trigger version updates (unless it's docs/refactor/chore)
- **Include scope** for better categorization (AUTH, DASH, PAY, etc.)
- **Be descriptive and actionable**

#### Good Examples

```bash
feat(DASH): add user dashboard with activity metrics #95
fix(PAY): resolve payment gateway connection timeout #142
refactor(DB): optimize database query performance for large datasets #201
docs(README): update API authentication guide #78
```

---

## 🔀 Step 6: Create Pull Request

### PR Creation Process

1. **Get the exact issue title**:

   ```bash
   ./scripts/get-issue-title.sh <issue-number>
   ```

2. **Create PR using GitHub CLI**:

   ```bash
   gh pr create --title "<issue-title> #<issue-number>" --body "<filled-template>" --base main
   ```

### PR Title Format

```bash
<type>(<scope>): <description> #<issue-number>
```

**Examples:**

```bash
feat(DASH): add user dashboard with activity metrics #95
fix(PAY): resolve payment gateway connection timeout #142
docs(README): update API authentication guide #78
```

### PR Template Requirements

**Required Sections:**

- **Checklist** - Code standards, testing, documentation
- **Testing** - How changes were tested, evidence provided
- **Deployment Notes** - Any special deployment considerations
- **Reviewer Notes** - Specific areas for review focus

### Pre-PR Checklist

Before creating/converting PR, ensure:

- [ ] Commits are cleaned up with meaningful messages
- [ ] All commits include issue number
- [ ] All tests pass locally
- [ ] Build succeeds
- [ ] Code formatting applied (linting/prettier)
- [ ] Functions >10 lines have documentation comments
- [ ] Files are ≤200 lines

### Review Process

1. **CODEOWNERS automatically assigned** as reviewers
2. **Address feedback promptly**
3. **All CI checks must pass** before merge
4. **At least one approval required** from CODEOWNERS

**Important:** Reviewers decide when to merge. Once they approve, they typically merge immediately. Ensure commits are clean BEFORE requesting review.

---

## 🚀 Step 7: Merge (Rebase Strategy)

### Merge Process

- **Only "Rebase and merge" allowed** - other options are disabled
- **Maintainer performs the merge** after approval
- **Commits appear on main exactly as they exist on feature branch**
- **Branch automatically deleted** after merge

### Branch Management

**Automatic Branch Deletion:** After pull requests are merged, issue branches are deleted automatically since we use rebase and merge strategy.

#### Recreating Branches for Debugging

If you need to recreate an issue branch:

1. **Find the issue commit** in main branch history
2. **Copy the commit SHA**
3. **Create new branch** from that commit:
   ```bash
   git checkout -b debug-branch <commit-SHA>
   ```

---

## 🏷️ Step 8: Auto-Release

### Release-Please Automation

**Release-please** automatically handles versioning and releases by:

1. **Analyzing commit messages** on main branch
2. **Determining version type** based on conventional commits:
   - `feat:` commits → Minor version bump (1.1.0 → 1.2.0)
   - `fix:` commits → Patch version bump (1.1.0 → 1.1.1)
   - `feat!:` or `BREAKING CHANGE` → Major version bump (1.1.0 → 2.0.0)
3. **Generating changelog** from commit messages and linked issues
4. **Creating release PR** with version bump and changelog
5. **Creating Git tags** when release PR is merged

### Milestone Completion

When all issues in a milestone are completed:
1. **Release-please creates release PR** automatically
2. **Maintainer reviews and merges** release PR to main
3. **Automatic version bump and changelog** generation
4. **Git tag created** with version number
5. **CI/CD deployment triggered** automatically

---

## 🛠️ Development Tools & Commands

### Key Commands
```bash
# Start work on issue
./scripts/start-issue.sh <issue-number>

# Get issue title for PR
./scripts/get-issue-title.sh <issue-number>

# Run tests (adjust based on your project)
npm test
npm run test:watch
npm run test:coverage
npm run test:e2e

# Run development server
npm run dev

# Build project
npm run build

# Create PR
gh pr create --title "<type>(<scope>): <description> #<issue>" --body "<template>" --base main
```

### Git Operations
```bash
# Update branch with latest main
git fetch origin
git rebase origin/main

# Clean up commits (interactive rebase)
git rebase -i origin/main

# Force push safely
git push --force-with-lease origin <branch-name>
```

---

## 🔍 Traceability & Linking

With our commit format requiring issue numbers, we achieve complete traceability:

### Complete Traceability Chain
```
Issue #93 → Branch 93-docs-update → PR #94 → Commit "docs(README): update guide #93"
```

### Benefits
- **Instant issue identification** from any commit on main branch
- **One-click navigation** from commit to issue via #issue-number
- **Streamlined code archaeology** - easily trace why changes were made
- **Automated issue closing** - GitHub closes issues when PR with `#issue-number` is merged
- **Perfect audit trail** - every commit is linked to its originating issue

---

## 🤔 FAQ

**Q: When exactly should I clean up my commits?**
A: **Before creating a PR or converting Draft PR to ready for review**. This is mandatory - reviewers expect clean, meaningful commits with issue numbers.

**Q: Can I keep WIP commits in my PR?**
A: **No**. All WIP, typo fixes, debug commits, and other noisy commits must be squashed before review.

**Q: Do all my commits need to have issue numbers?**
A: **Yes, this is now MANDATORY**. Every commit must include the issue number (e.g., `#123`) for complete traceability.

**Q: What's the easiest way to clean up commits?**
A: **Use interactive rebase** (`git rebase -i origin/main`) to squash commits and rewrite commit messages.

**Q: Why write tests first?**
A: Test-first development ensures your code is testable, forces you to think about requirements upfront, and provides immediate feedback when implementation is complete.

**Q: What if I need to work on multiple issues?**
A: Each issue must have its own branch and milestone assignment. Each commit must reference its specific issue number.

**Q: How do I handle breaking changes?**
A: Use the exclamation mark syntax to trigger a major version bump:
```bash
feat!(AUTH): change user ID from int to UUID #123
```

---

## 🚨 Common Pitfalls to Avoid

- **Never** skip writing tests first
- **Never** commit code without documentation for functions >10 lines
- **Never** create files >200 lines without refactoring
- **Never** submit PRs with failing tests
- **Never** create commits without issue numbers
- **Never** submit PRs without cleaning up commit history

---

**Success Criteria:** Following this guide should result in a complete, tested, and properly documented feature that passes all CI checks and is ready for review, with a clean Git history that provides perfect traceability from commit to original issue.

## Reference documents

- **/README.md**: provides a high-level overview of the project, including its purpose, tech stack .
- **/CONTRIBUTING.md**: outlines the complete development workflow for contributing to the project.
- **/AGENTS.md**: provides instructions and goals for AI assistants involved in the project.
- **docs/AI_ISSUE_ASSISTANT.md**: instructs agents on how to enhance raw user input into a GitHub issue.
- **docs/AI_PULL_REQUEST_ASSISTANT.md**: provides steps and guidelines to create pull requests.
