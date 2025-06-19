# AI Agent Instructions for Website Development

## 📌 Project Overview

This is a modern website project built using cutting-edge tools and best practices recommended by the Next.js community. The goal is to create a high-performance, scalable, and developer-friendly web application.

## 🧠 AI Agent Goals

You are an AI assistant who helps with:

- Code generation (following conventions and typing)
- Component creation (using Tailwind + ShadCN UI)
- Internationalization (using the `next-intl` structure)
- REST API integration (using `SWR`)
- State management (use `Zustand` when needed)
- Form creation and validation (using `React Hook Form` + `Zod`)
- Writing and maintaining test files (Jest + RTL + Playwright)
- Optimizing performance and SEO (using Next.js features)
- Keeping the codebase clean and modular

## ✅ Best Practices to Follow

- Use TypeScript for all code.
- Follow Next.js App Router architecture.
- Use functional components and React hooks only.
- All styles should use Tailwind CSS.
- Prefer server components unless interaction is required.
- Co-locate i18n messages with the page or component. Place all messages files in the `messages/` directory (see below).
- Validate all user input using Zod schemas.
- Prefer composable, reusable components.
- All new features and fixes must use TDD (write tests first). See `TESTING_POLICY.md` for detailed testing process and standards.
- Ensure accessibility in UI components.

## 🚫 What to Avoid

- Do not use class-based React components.
- Do not use Redux or other global state libraries; use Zustand only.
- Do not use CSS Modules or styled-components.
- Avoid GraphQL (use only REST + SWR).
- Avoid complex side effects outside of hooks or state stores.

## 🗣️ Language & Style

- Use concise, readable TypeScript.
- Write self-documenting code with clear naming and structure.
- Use conventional commit messages and PR titles. All commit and PR titles must include a scope and issue number, following the format `<type>(<scope>): <description> #<issue-number>`. See `CONTRIBUTING.md` for canonical format and more examples.

  **Examples:**
  - `feat(DASH): add user dashboard with activity metrics #95`
  - `fix(PAY): resolve payment gateway connection timeout #142`

---

## 🔄 Pull Request Workflow

- **AI agents:** Create Pull Requests directly when work is completed. Do **not** create draft PRs.
- **Human engineers:** Always create a **Draft PR** when starting work, and convert to ready-for-review when complete.
- Ensure all tests pass and code follows the established conventions before creating the PR.
- Use descriptive PR titles and include relevant context in the description.
- See `CONTRIBUTING.md` for full workflow and requirements.

---

## 🔧 Rendering Strategy

- The current deployment uses **Static Site Generation (SSG)** only.
- All pages are pre-rendered at build time and deployed to **GitHub Pages**.
- In the future, **Server-Side Rendering (SSR)** can be enabled if a specific use case requires it.

## 🗂️ Asset Management Strategy

- For detailed asset and i18n file placement rules, see the `README.md`.

> 📌 Summary: Prefer importing from `assets` for anything that might change. Only use `public/` for permanent, never-changing files. See `README.md` for details.

## 🌍 Locale File Structure

- Store all translatable messages in `messages/` and load them via imports or dynamic imports. See `README.md` for details.

---

## Other documents to reference

- **README.md** – Includes purpose, how to start, tech stack, and detailed asset/i18n placement rules
- **CONTRIBUTING.md** – Follows a clear step-by-step GitHub flow and defines canonical commit/PR title format
- **docs/DEVELOPMENT_GUIDELINES.md** – See detailed development standards and coding conventions
- **docs/TESTING_POLICY.md** – See the project's testing requirements and best practices. All new features and fixes must use TDD (write tests first).