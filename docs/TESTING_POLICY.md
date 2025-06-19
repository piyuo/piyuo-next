# Testing Policy for Next.js React Project

> **Note:** This document extends [CONTRIBUTING.md](../CONTRIBUTING.md). Please read it first for workflow, commit, and PR standards. This file focuses on project-specific testing philosophy, patterns, and best practices. See also [Testing Policy section in CONTRIBUTING.md](../CONTRIBUTING.md#testing-policy).

## 1. Test-First Development (TDD Approach)

**When implementing new features or fixing bugs, you must create or update corresponding test functions *before* writing the primary implementation code.** This test-first approach:

* Ensures your code is testable and well-designed
* Forces you to think about edge cases and requirements upfront
* Provides immediate feedback when your implementation is complete
* Serves as living documentation for expected behavior

## 2. Test Coverage Requirements

*See [Testing Policy in CONTRIBUTING.md](../CONTRIBUTING.md#testing-policy) for coverage targets and requirements.*

## 3. Types of Tests & When to Use Them

### Unit Tests (Primary Focus)

**Tool:** Jest + React Testing Library
**Purpose:** Test individual components, functions, and hooks in isolation
**When to write:**

* For all utility functions and business logic
* For React components with complex logic or state
* For custom hooks
* For form validation schemas (Zod)

### Integration Tests

**Tool:** Jest + React Testing Library (with MSW for API mocking)
**Purpose:** Test how multiple components or modules work together
**When to write:**

* For page components that combine multiple features
* For API integration with SWR
* For state management flows (Zustand stores)
* For form submission workflows

### End-to-End Tests

**Tool:** Playwright
**Purpose:** Test complete user workflows from the browser perspective
**When to write:**

* For critical user journeys (signup, checkout, etc.)
* For cross-page navigation flows
* For testing different locales (next-intl)
* For responsive design validation

### Visual Regression Tests (Optional)

**Tool:** Playwright with screenshots
**Purpose:** Catch unintended UI changes
**When to write:**

* For components with complex styling
* For pages with dynamic content layouts

## 4. Testing Standards & Best Practices

### General Principles

* **Test Behavior, Not Implementation:** Focus on what the code does, not how it does it
* **Arrange-Act-Assert Pattern:** Structure tests clearly with setup, execution, and verification
* **One Assertion Per Test:** Keep tests focused and easy to debug
* **Descriptive Test Names:** Use clear, specific test descriptions that explain the scenario

### React Component Testing

```typescript
// ✅ Good: Testing behavior and user interactions
test('displays error message when form submission fails', async () => {
  render(<ContactForm />);
  fireEvent.click(screen.getByRole('button', { name: /submit/i }));
  await waitFor(() => {
    expect(screen.getByText(/submission failed/i)).toBeInTheDocument();
  });
});

// ❌ Bad: Testing implementation details
test('calls handleSubmit when button is clicked', () => {
  const handleSubmit = jest.fn();
  render(<ContactForm onSubmit={handleSubmit} />);
  fireEvent.click(screen.getByRole('button'));
  expect(handleSubmit).toHaveBeenCalled();
});
```

### API Testing with MSW

* Mock external API calls using Mock Service Worker (MSW)
* Test both success and error scenarios
* Verify loading states and error handling

### Accessibility Testing

* Include basic accessibility checks in component tests
* Use `@testing-library/jest-dom` matchers for accessibility assertions
* Test keyboard navigation and screen reader compatibility

## 5. File Organization & Naming

*See [Testing Policy in CONTRIBUTING.md](../CONTRIBUTING.md#testing-policy) for test file structure and naming conventions.*

### Test File Structure

```text
├── app/                           # Next.js App Router directory
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx    # Unit tests
│   │   │   └── Button.stories.tsx # Storybook (optional)
│   │   └── ...
│   ├── [locale]/                  # Dynamic locale routes
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   │   └── page.test.tsx      # Integration tests
│   │   └── page.test.tsx          # Home page tests
│   ├── layout.test.tsx            # Root layout tests
│   └── ...
├── lib/                           # Utility functions (if you have them)
│   ├── utils.ts
│   └── utils.test.ts              # Unit tests
├── __tests__/                     # Test configuration and E2E tests
│   ├── e2e/                       # Playwright E2E tests
│   │   ├── navigation.spec.ts
│   │   ├── i18n.spec.ts           # Internationalization E2E tests
│   │   └── user-journeys.spec.ts
│   └── setup/                     # Test configuration files
├── scripts/
│   └── test-utils.ts              # Custom testing utilities
```

### Naming Conventions

* Unit tests: `ComponentName.test.tsx`
* Integration tests: `page.test.tsx` or `feature.integration.test.tsx`
* E2E tests: `user-journey.spec.ts`
* Test utilities: `test-utils.ts`

## 6. Testing Tools & Configuration

### Primary Testing Stack

* **Jest:** Test runner and assertion library
* **React Testing Library:** React component testing utilities
* **Playwright:** End-to-end testing framework
* **MSW (Mock Service Worker):** API mocking
* **@testing-library/jest-dom:** Additional DOM matchers

### Required Test Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## 7. Mandatory Test Scenarios

*See [Testing Policy in CONTRIBUTING.md](../CONTRIBUTING.md#testing-policy) for required test scenarios and checklists.*

### For All Components

* [ ] Renders without crashing
* [ ] Handles required props correctly
* [ ] Displays expected content
* [ ] Handles user interactions appropriately

### For Forms

* [ ] Validates required fields
* [ ] Shows appropriate error messages
* [ ] Handles successful submission
* [ ] Handles submission errors
* [ ] Maintains form state correctly

### For App Router Pages

* [ ] Renders with expected content
* [ ] Handles loading states (loading.tsx)
* [ ] Handles error states (error.tsx)
* [ ] Tests critical user paths
* [ ] Tests locale-specific routing ([locale] dynamic segments)
* [ ] Tests metadata generation (if using generateMetadata)

### For API Integration

* [ ] Handles successful responses
* [ ] Handles error responses
* [ ] Shows loading indicators
* [ ] Implements proper error boundaries

## 8. Running Tests

### Local Development

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage

# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui
```

### Pre-commit Requirements

* All tests must pass before committing
* New code must meet coverage requirements
* E2E tests must pass for critical paths

## 9. Continuous Integration

### PR Requirements

* [ ] All existing tests pass
* [ ] New features include corresponding tests
* [ ] Coverage meets minimum requirements (80%)
* [ ] E2E tests pass for affected user journeys

### Automated Checks

* Unit and integration tests run on every PR
* E2E tests run on main branch and release branches
* Coverage reports are posted as PR comments
* Visual regression tests run for UI changes

## 10. Common Testing Patterns

### Testing Custom Hooks

```typescript
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
```

### Testing Zustand Stores

```typescript
import { act, renderHook } from '@testing-library/react';
import { useStore } from './store';

test('updates user data', () => {
  const { result } = renderHook(() => useStore());

  act(() => {
    result.current.setUser({ name: 'John Doe' });
  });

  expect(result.current.user.name).toBe('John Doe');
});
```

### Testing Internationalization (next-intl)

```typescript
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Component from './Component';

// Load actual messages from your messages directory
const messages = {
  welcome: 'Welcome to our site'
};

test('displays localized text', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Component />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('Welcome to our site')).toBeInTheDocument();
});

// Test locale switching
test('switches between locales correctly', async () => {
  const { rerender } = render(
    <NextIntlClientProvider locale="en" messages={{ title: 'Hello' }}>
      <Component />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('Hello')).toBeInTheDocument();

  rerender(
    <NextIntlClientProvider locale="zh" messages={{ title: '你好' }}>
      <Component />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('你好')).toBeInTheDocument();
});
```

### Testing App Router Pages

```typescript
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import Page from './page';

// Mock next/navigation for App Router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  }
}));

test('renders page content correctly', () => {
  const messages = { title: 'Home Page' };

  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Page />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('Home Page')).toBeInTheDocument();
});
```

## 11. Testing Exceptions & Guidelines

### When NOT to Test

* Third-party library internals (React, Next.js, etc.)
* Simple prop passing without logic
* Trivial getters/setters
* Configuration files

### Performance Considerations

* Keep test suites fast (< 30 seconds for unit tests)
* Use `test.skip()` for temporarily broken tests
* Parallelize test execution where possible
* Mock heavy dependencies (databases, external APIs)

## 12. Resources & Learning

### Recommended Reading

* [React Testing Library Best Practices](https://kentcdodds.com/blog/react-testing-library-best-practices)
* [Playwright Documentation](https://playwright.dev/)
* [Jest Documentation](https://jestjs.io/)

### Team Knowledge Sharing

* Include testing considerations in code reviews
* Share testing patterns in team meetings
* Document complex testing scenarios as they arise

---

**Remember:** Good tests make refactoring safer, debugging easier, and onboarding faster. When in doubt, write the test that would have helped you catch the bug you just fixed.
