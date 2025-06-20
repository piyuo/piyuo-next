# 🤖 AI Pull Request Assistant

This document is for AI agents to create consistent, properly formatted pull requests (PRs) for our issue-driven development workflow.

---

## Input

1. Issue number that the PR addresses
2. Branch name with implemented changes
3. This guide (used by the AI to format the PR correctly)

---

## Steps for AI

### 1. **Retrieve Issue Information**

Use the provided script to get the issue title:

```bash
./scripts/get-issue-title.sh <issue-number>
```

This script requires GitHub CLI (`gh`) to be installed and authenticated.

### 2. **Understand PR Template Structure**

The PR template is located at `.github/PULL_REQUEST_TEMPLATE.md` and contains:

- **Checklist** - Development quality checks
- **Testing** - Testing approach and evidence
- **Deployment Notes** - Special deployment considerations
- **AI Assistance** - Transparency about AI-generated code
- **Reviewer Notes** - Specific areas for reviewer focus

### 3. **Format PR Title and Commit Messages**

Both the PR title and the first commit message should follow the same format:

```text
<type>(<scope>): <description> #<issue-number>
```

**Examples:**

- `feat(ui): implement dark mode theme support #43`
- `fix(auth): resolve login redirect issue #27`
- `docs(contributing): add pull request guidelines #15`

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, build changes

**Scope (optional):**

- Component, module, or area affected (e.g., `ui`, `auth`, `api`, `docs`)

**Commit Message Requirements:**

- The **first commit** in your PR branch must use the exact same format as the PR title
- This ensures consistency between the commit history and PR tracking
- Additional commits in the same PR can use shorter, descriptive messages
- Always include the issue number for traceability

### 4. **Fill PR Template Intelligently**

#### **Checklist Section**

- Check items that are complete based on the changes made
- Leave unchecked items that require manual verification
- Add explanatory comments for complex items

#### **Testing Section**

- Describe testing approach used
- Check applicable testing items
- Provide test evidence when available (screenshots, logs, test output)

#### **Deployment Notes**

- Assess if changes require special deployment steps
- Check "No special deployment steps required" for simple changes
- Detail any migrations, environment variables, or other requirements

#### **AI Assistance Section**

- Always check if AI tools were used in development
- Include the original prompt or request for transparency
- Note any significant AI contributions

#### **Reviewer Notes**

- Highlight complex areas that need careful review
- Mention potential impacts or edge cases
- Suggest specific testing scenarios

### 5. **Create Pull Request**

Use GitHub CLI to create the PR:

```bash
gh pr create --title "<issue-title> #<issue-number>" --body "<filled-template>" --base main
```

**Important:**

- Replace `<issue-title>` with the title retrieved from step 1
- Replace `<issue-number>` with the actual issue number
- Replace `<filled-template>` with the completed PR template content
- Ensure you're on the correct feature branch before creating the PR

---

## Template Completion Example

For issue #43 "docs: create AI pull request assistant guide":

### Title and First Commit Message

Both should use the same format:

```text
docs(ai): create AI pull request assistant guide #43
```

### Template Content

```markdown
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

## Best Practices

### **PR Title Guidelines**

- Keep titles concise but descriptive
- Use lowercase for type and description
- Include the issue number for traceability
- Match the conventional commit format used in the project

### **Commit Message Guidelines**

- The **first commit** must match the PR title format exactly
- Use the same `<type>(<scope>): <description> #<issue-number>` format
- Subsequent commits can be more descriptive but should remain clear
- Always reference the issue number in the first commit
- Keep commit messages under 72 characters when possible

### **Template Completion**

- Be honest about checklist items - don't check items that weren't done
- Provide specific details in optional sections when relevant
- Use the AI Assistance section to maintain transparency
- Give reviewers context in the Reviewer Notes section

### **Quality Assurance**

- Ensure the PR branch contains only changes related to the issue
- Verify all automated checks pass before creating the PR
- Include sufficient context for reviewers to understand the changes

### **Error Handling**

- If `get-issue-title.sh` fails, verify GitHub CLI authentication
- If PR creation fails, check branch status and remote repository access
- For merge conflicts, resolve them before creating the PR

---

## 🎯 AI Success Criteria

A successful AI-created PR should:

- ✅ Have a properly formatted title following conventional commit style
- ✅ Reference the correct issue number
- ✅ Complete the PR template thoughtfully and accurately
- ✅ Provide sufficient context for reviewers
- ✅ Be transparent about AI assistance used
- ✅ Follow the project's development standards

**Remember: You're creating a bridge between issue requirements and code implementation - make it easy for reviewers to understand and approve your changes.**

---

End of guide.
