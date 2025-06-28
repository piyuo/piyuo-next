# Contributing Guide

> **Complete Development Workflow:** This guide covers the entire development lifecycle from issue creation to automated releases, following a test-first approach with clean Git history.

**Note:** Code examples use JavaScript for demonstration. For actual tech stack, see README.md.

## 📋 Table of Contents & Quick Start

### 🚀 Core Workflow (4 Steps)

1. **[📋 Issue → Branch](#-step-1-issue--branch)** → Create issue, start branch
2. **[✅ Test-First Development](#-step-2-test-first-development)** → Write tests, develop, commit freely
3. **[🧹 Clean & Submit](#-step-3-clean--submit)** → Clean commits, create PR
4. **[🔀 Review & Merge](#-step-4-review--merge)** → Get approval, maintainer merges

### Guidelines & Standards

- [📝 PR Guidelines](#-pr-guidelines)
- [Code Standards & AI-Friendly Structure](#code-standards)
- [Commit Message Format](#commit-message-format-enforced)

### Support & Reference

- [🆘 Getting Help](#-getting-help)
- [❓ FAQ](#-faq)
- [🚨 Common Pitfalls](#-common-pitfalls)
- [📚 Reference Documents](#-reference-documents)

### Key Requirements

- **Test-First Development**: Write tests before code (≥80% coverage)
- **Clean Git History**: Squash commits before PR submission
- **AI-Friendly Files**: Include TOC/Overview at top of all files
- **Issue-Driven**: All work must start with GitHub Issue

---

## 📋 Step 1: Issue → Branch

### Create Issue First

All work must begin with a GitHub Issue for proper tracking.

**Recommended:** Use the AI-powered issue template `AI Assist Issue` (see `docs/AI_ISSUE_ASSISTANT.md`)

**For large features:** Create Epic + Sub-issues (1-2 days each)

### Start Issue Branch

**ALWAYS** use the provided script:

```bash
./scripts/start-issue.sh <issue-number>
```

This script:

- Creates branch named `<issue-number>-<slugified-title>`
- Assigns issue to you
- Checks out the new branch

---

## ✅ Step 2: Test-First Development

### Write Tests First (MANDATORY)

Before writing any code, write tests that define expected behavior.

**Why:** This ensures code is testable, considers edge cases upfront, and provides immediate feedback.

**Requirements:**

- Unit Tests: ≥80% coverage for new code
- Integration Tests: Required for APIs and complex workflows
- E2E Tests: Required for critical user journeys

### Test File Structure

Put `.test` files next to their targets:

```text
src/
├── components/
│   ├── Button/
│   │   ├── Button.js
│   │   └── Button.test.js
├── pages/
│   ├── about/
│   │   ├── index.js
│   │   └── index.test.js
```

### Development Phase

**Commit freely** during development with any messages:(These will be cleaned up later — focus on progress and don't worry about perfect messages at this stage!)

```bash
# These will be cleaned up later - focus on progress!
git commit -m "WIP: initial auth setup"
git commit -m "add password validation"
git commit -m "fix edge case"
git commit -m "debug logging"
```

### Code Standards

- **Files:** Keep under 200 lines when possible
- **Functions >10 lines:** Add documentation comments
- **Imports:** Organize by standard → third-party → internal → relative
- **AI-Friendly Structure:** Add TOC/Overview at the top of every file (see below)

#### File Structure for AI Efficiency

**MANDATORY:** Every code file and test file must include a TOC or Overview at the top in comments. This helps AI assistants understand file structure within the first 50-100 lines.

**JavaScript/TypeScript Example:**

```javascript
// ===============================================
// Module: payment-processor.js
// Description: Handles payment validation, processing, and webhooks
//
// Sections:
//   - Constants and Config
//   - Validation Functions
//   - Payment Processing Class
//   - Webhook Handlers
//   - Error Handling
//   - Exports
// ===============================================

import stripe from 'stripe';
// ... rest of imports

/**
 * Calculates cart total with discount and tax.
 * @param {Array} items - Cart items with price/quantity
 * @param {number} discountRate - Decimal rate (0.10 = 10%)
 * @returns {number} Final total price
 */
function calculateCartTotal(items, discountRate) {
  // implementation
}
```

**Test File Example:**

```javascript
// ===============================================
// Test Suite: payment-processor.test.js
// Description: Unit tests for payment processing functionality
//
// Test Groups:
//   - Setup and Teardown
//   - Validation Tests
//   - Payment Processing Tests
//   - Webhook Handler Tests
//   - Error Handling Tests
// ===============================================

import { describe, test, expect } from '@jest/globals';
// ... rest of test code
```

**Why This Helps AI:**

- Recognizes file structure immediately
- Skips irrelevant sections when unnecessary
- Predicts function names and responsibilities better
- Reduces token usage by understanding context faster

### Creating a Draft PR (Optional but Recommended)

```bash
gh pr create --draft --title "<issue-title> #<issue-number>" --body-file .PR_BODY.md
```

**Benefits:** Early feedback, communicate approach, collaborative problem-solving

---

## 🧹 Step 3: Clean & Submit

### Clean Commit History (MANDATORY)

Transform messy development commits into meaningful commits before review.

**Small issues:** Usually 1 commit
**Larger issues:** Multiple logical commits (e.g., feat + docs + fix)

### Interactive Rebase Process

You can automate this using the scripts/squash-commits.sh script:

This script rebases your branch onto main, helps you squash commits interactively, edits the final message, and safely force-pushes the result.

```bash
./scripts/squash-commits.sh
```

### Commit Message Format (ENFORCED)

- The **first commit** must match the PR title format exactly
- Always reference the issue number in the commit

**Format:** `type(scope): description #issue-number`

**Examples:**

```bash
✅ feat(auth): implement user login system #123
✅ fix(payment): resolve gateway timeout #456
✅ docs(readme): update installation guide #789
✅ refactor(db): optimize query performance #321
```

**Common Mistakes:**

```bash
❌ feat(AUTH): implement login #123     (scope must be lowercase)
❌ feat(auth): implement login. #123    (no period at end)
❌ feat(auth): implement login          (missing issue number)
❌ feat(auth): #123                     (empty description)
❌ feat(auth): implement user authentication system with OAuth and JWT #123  (>100 chars)
```

**Key Rules:**

- Header ≤100 characters
- Lowercase scope
- No period at end
- Must include issue number
- Use `feat:` or `fix:` for version updates

### Create or Update PR

#### PR Body Creation Process

1. **Prepare the template content**: Copy the template from `.github/PULL_REQUEST_TEMPLATE.md`
2. **Create temporary file**: Create `.PR_BODY.md` in your project root using your code editor
3. **Fill out all sections**: Complete the template based on your changes (see example below)
4. **Create the PR**: Use the body file when creating your PR
5. **Clean up**: Delete the temporary file after successful PR creation

**Important:** Use your code editor to create `.PR_BODY.md` rather than terminal commands to avoid issues with long content.

#### If You Created a Draft PR

Convert when ready:

```bash
gh pr ready <pr-number>
```

#### If No Draft PR Exists

Create a new one:

```bash
# Create the PR using the body file
gh pr create \
  --title "<issue-title> #<issue-number>" \
  --body-file .PR_BODY.md \
  --base main

# Clean up the temporary file after successful PR creation
rm .PR_BODY.md
```

#### Pre-submission Checklist

- [ ] Commits cleaned up with issue numbers
- [ ] All tests pass locally
- [ ] Build succeeds
- [ ] Code formatted (linting/prettier)
- [ ] Functions >10 lines documented
- [ ] **All files include TOC/Overview at the top for AI efficiency**

---

## 🔀 Step 4: Review & Merge

### Review Process

1. CODEOWNERS automatically assigned as reviewers
2. Address feedback promptly
3. All CI checks must pass
4. At least one approval required

### Merge Process

- **Only "Rebase and merge" allowed**
- **Maintainer performs merge** after approval
- **Branch auto-deleted** after merge
- **Commits appear on main exactly as they exist on feature branch**

---

## 📝 PR Guidelines

### PR Title Format

**Must match:** `<issue-title> #<issue-number>`

Get the exact title: `./scripts/get-issue-title.sh <issue-number>`

### PR Body Template

Use the template at `.github/PULL_REQUEST_TEMPLATE.md`:

- **Checklist** → Quality checks completed
- **Testing** → How changes were tested
- **Deployment Notes** → Special deployment needs
- **AI Assistance** → Transparency about AI use
- **Reviewer Notes** → Areas needing attention

**Draft PRs:** Just paste template
**Ready PRs:** Complete all sections

**Note:** The `.PR_BODY.md` file is automatically ignored by git (already in .gitignore) and needs to be cleaned up after successful PR creation.

### Template Completion

- Be honest about checklist items - don't check items that weren't done
- Provide specific details in optional sections when relevant
- Use the AI Assistance section to maintain transparency
- Give reviewers context in the Reviewer Notes section

#### Example

**Issue title:**

```bash
"docs: create AI pull request assistant guide #43"
```

**Issue body:**

```bash
## Checklist
- [x] My code follows the project's coding standards
- [x] I have performed a self-review of my code
- [x] I have commented my code, particularly in hard-to-understand areas
- [x] I have made corresponding changes to the documentation
- [x] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests pass locally with my changes
- [x] Any dependent changes have been merged and published

## Testing
- [x] Existing tests pass
- [ ] Added new tests for new functionality (N/A for documentation)
- [x] Manual testing performed (verified document format and completeness)
- [ ] Tested on multiple browsers/environments (N/A for documentation)

### Test Evidence (Optional)
- Verified markdown formatting renders correctly
- Confirmed all referenced files exist and are accessible

## Deployment Notes (Optional)
- [x] No special deployment steps required
- [ ] Database migrations required
- [ ] Environment variables need to be updated
- [ ] Other: _________

## 🤖 AI Assistance (Optional)
- [x] This PR contains code generated or significantly assisted by AI.
- [x] I have reviewed the AI-generated code for accuracy, security, and quality.

**Prompt Used:** "Create documentation for AI agents to create pull requests following our issue-driven development process"

## Reviewer Notes (Optional)
- Please verify the PR creation workflow instructions are accurate for our setup
- Ensure the template completion examples align with project standards
```

---

## 🆘 Getting Help

### When to Ask

**ALWAYS ask when you:**

- Don't understand issue requirements
- Are unsure about technical approach
- Encounter unfamiliar technologies
- Are blocked and can't resolve alone
- Need clarification on project conventions

### How to Ask

1. **Comment in Draft PR** with specific questions
2. **Tag relevant team members** or use `@team`
3. **Provide context** about what you've tried
4. **Be specific** about what you need

### Example Help Request

```markdown
## Need Help 🆘

Stuck on payment integration webhook verification.

**What I've tried:**
- Read Stripe webhook docs
- Looked at existing handlers
- Attempted signature verification

**Questions:**
- How to store webhook secrets securely?
- Should processing be sync or queued?
- Existing utilities I should use?

Context: Issue #142 - Payment gateway integration
```

---

## ❓ FAQ

**Q: My commit fails validation. What should I check?**
A: Common issues - header >100 chars, uppercase scope, missing issue number, ends with period. Use `git commit --amend` to fix.

**Q: When should I create a Draft PR?**
A: After you have a clear development direction and some initial progress. This enables early feedback and collaboration.

**Q: When do I clean commits?**
A: Before creating a PR or marking a Draft as ready. This is mandatory - reviewers expect clean history.

**Q: Do all commits need issue numbers?**
A: Yes, mandatory for traceability (except `chore(main):` commits).

**Q: How many commits per issue?**
A: Small issues = 1 commit, larger issues = multiple logical commits (feat + docs, etc.).

**Q: Why do we need TOC/Overview at the top of files?**
A: AI assistants (like Copilot) typically read the first 50-100 lines to understand file context. A clear TOC helps them work more efficiently and provide better suggestions.

**Q: What should be included in the file TOC?**
A: Module name, brief description, and main sections/components. Keep it concise but informative - aim for 5-10 lines maximum.

---

## 🚨 Common Pitfalls

- **Never** skip writing tests first
- **Never** submit PRs without cleaning commit history
- **Never** commit without issue numbers (except `chore(main):`)
- **Never** use uppercase scopes in commits
- **Never** exceed 100 characters in commit headers
- **Never** end commit headers with periods
- **Never** submit PRs with failing tests
- **Never** forget to add TOC/Overview at the top of new files

---

## 📚 Reference Documents

- **README.md** → Project overview and tech stack
- **AGENTS.md** → AI assistant instructions
- **docs/AI_ISSUE_ASSISTANT.md** → Issue creation guidance
- **docs/AI_PULL_REQUEST_ASSISTANT.md** → PR creation guidance

---

**Success Criteria:** Following this guide results in tested, documented features with clean Git history that provides complete traceability and passes all validation checks.
