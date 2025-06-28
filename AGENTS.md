# AI Agent Instructions for Development

**Purpose:** This document guides AI assistants on how to help human developers with issue resolution and pull request creation.

Since AI assistants do tend to focus on the section that seems most relevant and skip the broader context. We need embedding the critical reminders directly into each workflow section.

## 📋 Table of Contents & Quick Navigation

## 📖 **Critical**

Always confirm understanding with the user before proceeding, If any required information is missing, proactively prompt the user to provide it.

### 🎯 **Overview**

- **Primary Use Cases:** Resolve GitHub issues and create pull requests
- **Key Requirements:** Always read CONTRIBUTING.md + README.md for context
- **Success Criteria:** Clean, tested, documented code with TOC, proper commit messages, and full traceability.

### 🔧 **Main Workflows**

1. **[Resolve Issue](#workflow-1-resolve-issue)** → When asked "resolve issue #42"
   - Setup branch → Draft PR → Test-first development → Finalize PR
2. **[Create Pull Request](#workflow-2-create-pull-request)** → When development is complete and ready for review
   - Verify readiness → Clean history → Create PR

### 📖 **Critical Documents (MUST READ EVERY TIME)**

- **CONTRIBUTING.md** → Complete workflow, commit formats, testing requirements
- **README.md** → Tech stack, implementation constraints, project setup
- **Templates** → PR body template and commit message formats

### ⚡ **Enhanced Decision Tree**

- Human says "resolve issue X" → Use Workflow 1
- Human says "create PR" AND development is complete → Use Workflow 2
- Work in progress, need draft PR → Use Workflow 1, Step 2
- Tests failing → See [Troubleshooting](#troubleshooting)
- Merge conflicts → See [Troubleshooting](#troubleshooting)
- Unsure what to do? → Read CONTRIBUTING.md first

### 🚨 **Non-Negotiable Requirements**

- Test-first development (≥80% coverage)
- Clean Git history before PR submission
- Issue numbers in all commits
- TOC at top of all code files (Why TOC? AI assistants like Copilot read the top 50–100 lines to understand structure. A good TOC helps them provide smarter suggestions and navigate the file effectively.)

---

## 🔧 Workflow 1: Resolve Issue

**Trigger:** Human says "resolve issue 42" or "solve issue #42"
**Prerequisites:** None - this workflow handles complete issue resolution from start to finish

**🚨 CRITICAL: Before starting, read CONTRIBUTING.md for complete workflow details and README.md for project-specific tech stack and implementation constraints.**

### Step 1: Setup Branch

```bash
./scripts/start-issue.sh <issue-number>
```

This creates the proper branch and assigns the issue.

**📖 Refer to CONTRIBUTING.md Step 1 for detailed branch creation instructions.**

### Step 2: Create Draft PR (Mandatory)

- Create draft PR with empty template body
- Use comments section to document your thinking process
- Example: "Planning to implement X by doing Y, will need to test Z"

```bash
./scripts/get-issue-title.sh <issue-number>
```

```bash
gh pr create --draft --title "<issue-title> #<issue-number>" --body-file .PR_BODY.md
```

**📖 Refer to CONTRIBUTING.md Step 2 for draft PR creation details.**

### Step 3: Follow Test-First Development

1. **Write tests first** (mandatory - ≥80% coverage)
2. **Develop solution** (commit freely with any messages)
3. **Ensure all tests pass**

**📖 MANDATORY: Read CONTRIBUTING.md Step 2 for test-first development requirements and README.md for project-specific implementation guidance.**

### Step 4: Finalize PR for Review

**📖 CRITICAL: Follow CONTRIBUTING.md Step 3 for exact process requirements.**

**4a. Clean Up Git History:**

```bash
./scripts/squash-commits.sh
```

**4b. Complete PR Submission:**

**Prepare PR body:**

- Copy template from `.github/PULL_REQUEST_TEMPLATE.md`
- Create `.PR_BODY.md` in project root using your code editor
- Fill out all sections completely

**Update/Create PR:**

- If draft exists: `gh pr edit <pr-number> --body-file .PR_BODY.md && gh pr ready <pr-number>`
- If no PR: `gh pr create --title "<issue-title> #<issue-number>" --body-file .PR_BODY.md`

**4c. Verification Checklist:**

- [ ] All tests pass
- [ ] Build succeeds
- [ ] Code follows standards (TOC at top of files, functions >10 lines documented)
- [ ] Clean commit history with proper format
- [ ] PR template fully completed

### Step 5: Clean Up

Your work is done. Ensure all temporary files (e.g., `.PR_BODY.md` after successful conversion) are removed.

---

## 📝 Workflow 2: Create Pull Request

**Trigger:** Human says "create a PR for issue 42" or "create a PR"
**Prerequisites:** Development work is complete, code is ready for review

**🚨 CRITICAL: This workflow assumes your feature/fix is already implemented and tested. If you need to start development, use Workflow 1 instead.**

**🚨 Before starting, read CONTRIBUTING.md for complete PR creation workflow and README.md for project overview.**

### Step 1: Identify Issue Number

- If not provided, extract from branch name (e.g., `45-feature-name` → issue #45)
- Verify issue exists: `gh issue view <issue-number>`

**📖 Refer to CONTRIBUTING.md for branch naming conventions.**

### Step 2: Verify Readiness

- [ ] All tests pass
- [ ] Build succeeds
- [ ] Code follows standards (TOC at top of files, functions >10 lines documented)

**📖 MANDATORY: Check CONTRIBUTING.md for complete pre-submission checklist and README.md for build requirements.**

### Step 3: Finalize PR for Review

**📖 CRITICAL: Follow CONTRIBUTING.md Step 3 for exact process requirements.**

**3a. Clean Up Git History:**

```bash
./scripts/squash-commits.sh
```

**3b. Complete PR Submission:**

**Prepare PR body:**

- Copy template from `.github/PULL_REQUEST_TEMPLATE.md`
- Create `.PR_BODY.md` in project root using your code editor
- Fill out all sections completely

**Create PR:**

```bash
gh pr create --title "<issue-title> #<issue-number>" --body-file .PR_BODY.md
```

**3c. Verification Checklist:**

- [ ] Clean commit history with proper format
- [ ] PR template fully completed
- [ ] Correct title format: `<issue-title> #<issue-number>`

### Step 4: Clean Up

Your work is done. Ensure all temporary files (e.g., `.PR_BODY.md` after successful conversion) are removed.

**📖 Final verification: Ensure all CONTRIBUTING.md Step 3 requirements are satisfied.**

---

## 🔧 Troubleshooting Common Issues

### Issue Doesn't Exist

**Problem:** `gh issue view <number>` fails
**Solution:**

- Verify issue number with human
- Ask human to create issue first if missing
- Check if issue is in different repository

### Branch Already Exists

**Problem:** Branch name conflict
**Solution:**

```bash
# Check existing branches
git branch -a | grep <issue-number>

# If you're already working on it
git checkout <branch-name>
git pull origin <branch-name>

```

### Tests Failing

**Problem:** Test suite doesn't pass
**Solution:**

1. Run tests locally: See README.md for Run all tests command
2. Fix failing tests before proceeding
3. Refer to CONTRIBUTING.md for test requirements
4. Ask for help if blocked on test failures

### Merge Conflicts

**Problem:** Conflicts during rebase
**Solution:**

1. Resolve conflicts in affected files
2. Stage resolved files: `git add <file>`
3. Continue rebase: `git rebase --continue`
4. If stuck, abort and ask for help: `git rebase --abort`

---

## 🚨 Key Requirements (Every Time)

### Code Quality Standards

- [ ] TOC at top of all new/modified files
- [ ] Functions >10 lines documented
- [ ] Test coverage ≥80%
- [ ] All tests passing

### Git Standards

- [ ] Clean commit history before PR
- [ ] Issue numbers in all commits
- [ ] Proper commit message format: `type(scope): description #issue-number`
- [ ] No commits >100 characters in header

### PR Standards

- [ ] Title matches issue exactly + `#<issue-number>`
- [ ] Template completely filled out
- [ ] All CI checks passing

### Commit Message Format Examples

```bash
✅ feat(auth): implement login system #123
✅ fix(api): resolve timeout issue #456
✅ docs(readme): update setup guide #789
```

**Common Mistakes:**

```bash
❌ feat(AUTH): implement login #123     (scope must be lowercase)
❌ feat(auth): implement login. #123    (no period at end)
❌ feat(auth): implement login          (missing issue number)
❌ feat(auth): #123                     (empty description)
```

---

## 📚 Reference Documents (READ THESE!)

**🚨 ALWAYS READ THESE DOCUMENTS FOR COMPLETE CONTEXT:**

- **CONTRIBUTING.md** → Complete workflow, commit formats, PR templates, test requirements
- **README.md** → Project tech stack, setup instructions, implementation constraints
- **docs/AI_ISSUE_ASSISTANT.md** → Issue creation guidance
- **docs/AI_PULL_REQUEST_ASSISTANT.md** → PR creation steps

**Quick Facts:**

- **Issue branch naming:** `<number>-<slugified-title>`
- **PR title:** Must match issue title exactly + `#<number>`
- **Scripts location:** `./scripts/` directory
- **Template location:** `.github/PULL_REQUEST_TEMPLATE.md`

---

## ❌ Common Mistakes to Avoid

- Don't skip writing tests first
- Don't submit PR without cleaning commits
- Don't forget issue numbers in commits
- Don't use uppercase scopes in commit messages
- Don't exceed 100 characters in commit headers
- Don't forget TOC at top of new files
- Don't assume scripts exist without checking
- Don't proceed with failing tests

---

**Success Criteria:** Following these workflows results in clean, tested code with proper documentation and traceability.
