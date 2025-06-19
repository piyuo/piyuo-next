# Developer & AI Agent Workflow Guide

> **Essential Guide:** This document provides a complete step-by-step workflow for developers and AI agents (like VSCode Copilot) to automatically solve GitHub issues and create pull requests for the piyuo-next project.

## 🤖 Complete Workflow: Issue to PR

### Step 1: Start Working on an Issue

**ALWAYS** use the `start-issue.sh` script to begin work on any GitHub issue:

```bash
./scripts/start-issue.sh <issue-number>
```

This script will:
- Create a branch named `<issue-number>-<slugified-title>` from `main`
- Assign the issue to you
- Check out the new branch

**Requirements:**
- GitHub CLI (`gh`) must be installed and authenticated
- Run from project root

### Step 2: Write Code Following Guidelines

#### 2.1 Test-Driven Development (TDD)
**ALWAYS write tests first**, then implement the code:

1. **Create test file** with `.test.tsx` or `.spec.tsx` extension
2. **Write failing tests** that describe the expected behavior
3. **Implement code** to make tests pass
4. **Refactor** while keeping tests green

```typescript
// Example test structure
describe('UserProfile Component', () => {
  it('should display user name when data is loaded', () => {
    // Test implementation
  });

  it('should show loading state initially', () => {
    // Test implementation
  });
});
```

#### 2.2 Code Standards

**File Size Limits:**
- **Target:** ≤200 lines per file (excluding comments/blank lines)
- **Refactor if exceeded:** Extract components, utilities, types, or hooks

**Comments (Required for functions >10 lines):**
```typescript
/**
 * Calculates the total price of items in cart after applying discount and tax.
 *
 * @param items - Array of cart items with price and quantity
 * @param discountRate - Discount rate as decimal (e.g., 0.10 for 10%)
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns The final total price including tax and discount
 */
function calculateCartTotal(
  items: CartItem[],
  discountRate: number,
  taxRate: number
): number {
  // ... implementation
}
```

**Import Organization:**
```typescript
// 1. React and Next.js imports
import React from 'react';
import { NextPage } from 'next';

// 2. Third-party library imports
import { useTranslations } from 'next-intl';

// 3. Internal imports
import { Button } from '@/components/ui/button';
import { validateEmail } from '@/lib/validation';

// 4. Relative imports
import './page.css';
```

#### 2.3 Naming Conventions

- **Files:** PascalCase for components (`UserProfile.tsx`), camelCase for utilities (`dateUtils.ts`)
- **Variables/Functions:** camelCase (`userName`, `handleSubmit`)
- **Types/Interfaces:** PascalCase (`UserProfile`, `ApiResponse`)
- **Constants:** SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **Props:** ComponentName + "Props" (`UserProfileProps`)

#### 2.4 React/Next.js Best Practices

**Component Structure:**
```typescript
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';

interface UserProfileProps {
  userId: string;
  onUpdate?: (user: User) => void;
}

export default function UserProfile({ userId, onUpdate }: UserProfileProps) {
  // 1. Hooks first
  const t = useTranslations('user');
  const [user, setUser] = useState<User | null>(null);

  // 2. Event handlers
  const handleUpdate = () => {
    // implementation
  };

  // 3. Render
  return (
    // JSX
  );
}
```

**Required Practices:**
- Use functional components with hooks
- Always use `next/image` for images
- All user-facing text must use translation functions (`useTranslations`)
- Implement proper TypeScript types (avoid `any`)
- Use SWR for data fetching
- Use React Hook Form with Zod for form validation

#### 2.5 Internationalization (Required)

**ALL user-facing text must be internationalized:**
```typescript
// ❌ Wrong - hardcoded text
<button>Save Changes</button>

// ✅ Correct - using translations
const t = useTranslations('common');
<button>{t('buttons.save')}</button>
```

**Translation key format:** `feature.section.key` (e.g., `user.profile.edit`)

### Step 3: Create Pull Request

After completing your work, create a PR using GitHub CLI:

```bash
gh pr create --title "<issue-title> #<issue-number>" --body "<filled-template>" --base main
```

> **Tip:** You already know the issue number you are working on. To get the exact issue title, use the provided script:
>
> ```bash
> ./scripts/get-issue-title.sh <issue-number>
> ```
>
> This will output the issue title, which you should use directly in your PR title for consistency and clarity.

**Example:**
```bash
gh pr create --title "Add user dashboard component #23" --body "<filled-template>" --base main
```

There is no need to manually format the PR title—just use the issue title and number. See `CONTRIBUTING.md` for more details and examples.

## 🤖 AI Agent Automation Guide

For AI agents (like VSCode Copilot) to fully automate the workflow:

### 1. Issue Analysis
```typescript
// Analyze the GitHub issue to determine:
const issueAnalysis = {
  type: 'feat' | 'fix' | 'docs' | 'refactor' | 'test' | 'chore',
  components: string[], // Components to create/modify
  requiresTests: boolean,
  requiresI18n: boolean,
  estimatedComplexity: 'simple' | 'medium' | 'complex'
};
```

### 2. Automated Workflow
```bash
# 1. Start issue
./scripts/start-issue.sh ${issueNumber}

# 2. Create tests first (TDD)
# - Analyze requirements
# - Create test files
# - Write failing tests

# 3. Implement code
# - Follow naming conventions
# - Add JSDoc comments for functions >10 lines
# - Keep files ≤200 lines
# - Use proper TypeScript types
# - Implement i18n for user-facing text

# 4. Run tests and verify
pnpm test
pnpm build

# 5. Create PR
gh pr create --title "${type}(${scope}): ${description} #${issueNumber}" --body "${filledTemplate}" --base main
```

### 3. Critical Requirements Checklist

Before creating PR, verify:
- [ ] Tests written first (TDD approach)
- [ ] All functions >10 lines have JSDoc comments
- [ ] All user-facing text uses `useTranslations()`
- [ ] Files are ≤200 lines (code only)
- [ ] TypeScript types are properly defined
- [ ] Tests pass locally (`pnpm test`)
- [ ] Build succeeds (`pnpm build`)
- [ ] ESLint/Prettier formatting applied

## 🚨 Common Pitfalls to Avoid

- **Never** hardcode user-facing text (always use i18n)
- **Never** skip writing tests
- **Never** commit code without JSDoc for functions >10 lines
- **Never** create files >200 lines without refactoring
- **Never** use `any` type in TypeScript
- **Never** submit PRs with failing tests

## 📋 Quick Reference

**Key Commands:**
```bash
# Start work on issue
./scripts/start-issue.sh <issue-number>

# Run tests
pnpm test

# Run development server
pnpm dev

# Build project
pnpm build

# Create PR
gh pr create --title "<type>(<scope>): <description> #<issue>" --body "<template>" --base main
```

---

**Success Criteria:** Following this guide should result in a complete, tested, and properly documented feature that passes all CI checks and is ready for review.