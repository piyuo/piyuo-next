# piyuo-next

piyuo-next is the official website for piyuo counter. This project uses Next.js/React to build a small, fast, and most importantly, Search Engine Optimized (SEO) website.

## 🛠️ Development Tools

These tools are used to support local development, collaboration, and testing:

- Visual Studio Code – Recommended code editor with official Next.js and Tailwind CSS extensions.
- Node.js (v18+) – Required runtime for Next.js and tooling.
- pnpm – Preferred package manager (faster and more efficient than npm/yarn).
- Git – Version control for managing source code.
- GitHub CLI (gh) – Streamlines GitHub workflows (issues, pull requests, etc.).
- Playwright Test Runner – Used for running end-to-end tests locally and in CI.
- Jest – Unit testing framework with React Testing Library integration.
- ESLint + Prettier – Enforces consistent code quality and formatting (integrated via VS Code extensions).

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Follow the instructions in the console to open the [URL] in your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```bash
├── app/                # Main Next.js app directory (App Router)
│   ├── components/     # Reusable React components
│   ├── globals.css     # Global styles (Tailwind CSS)
│   ├── i18n.ts         # Internationalization setup (next-intl)
│   ├── layout.tsx      # Root layout for all pages
│   └── page.tsx        # Home page (with language switch)
├── assets/             #  Files in assets/ are meant for static assets that are part of the build process or may be versioned.
├── messages/           # i18n translation files
│   ├── en/             # English translations
│   └── zh/             # Chinese translations
├── public/             # Use public/ for static assets that are unlikely to change, such as favicons or robots.txt. These files are served directly from the root URL.
│   └── locales/        # (Optional) i18n locale files for Next.js
├── scripts/            # Useful scripts for development and maintenance
├── styles/             # Additional global styles
├── .github/            # GitHub workflows, issue templates, and labels
├── .vscode/            # VS Code workspace settings and launch configs
├── eslint.config.mjs   # ESLint configuration
├── jest.config.ts      # Jest testing configuration
├── jest.setup.ts       # Jest setup (RTL, jest-dom)
├── next.config.ts      # Next.js configuration
├── package.json        # Project metadata and scripts
├── postcss.config.mjs  # PostCSS (for Tailwind CSS)
├── tsconfig.json       # TypeScript configuration
├── README.md           # Project documentation (this file)
├── AGENTS.md           # AI Agent instructions and best practices
└── CONTRIBUTING.md     # Contribution guidelines and workflow
```

### Key Files & Directories

- **app/**: Main application code using Next.js App Router. Contains pages, layouts, and components.
- **app/components/**: Reusable React components (e.g., `Greeting.tsx`).
- **app/i18n.ts**: Internationalization setup using `next-intl`.
- **messages/**: JSON translation files for each supported language.
- **public/**: Static files (SVGs, images) served at the root URL.
- **assets/**: Prefer importing from `assets` for anything that might change. Only use `public/` for permanent, never-changing files.
- **messages/**: Store all translatable messages in `messages/` and load them via imports or dynamic imports..
- **.github/**: GitHub Actions workflows, issue/PR templates, and label sync config.
- **jest.config.ts & jest.setup.ts**: Testing setup with Jest and React Testing Library.
- **eslint.config.mjs**: ESLint configuration for code quality.
- **postcss.config.mjs**: PostCSS config for Tailwind CSS.
- **tsconfig.json**: TypeScript project configuration.
- **package.json**: Project dependencies, scripts, and metadata.
- **AGENTS.md**: Guidance for AI Agents and developers on project conventions, best practices, and what to avoid. Essential for automated and human contributors.
- **CONTRIBUTING.md**: Step-by-step guide for contributing, including workflow, commit standards, and review process. Read this before making a PR.
- **scripts/**: Useful scripts for development and maintenance (e.g., cleanup, automation).
  - **cleanup-branches.sh**: Deletes all local git branches that have been removed from the remote. Useful for keeping your local repository clean.
  - **start-issue.sh**: Automates starting work on a GitHub issue. It creates a new branch named after the issue number and title, assigns the issue to you, and checks out the branch.
  - **get-issue-title.sh**: Fetches the title of a GitHub issue by its number.

## Environment Variables

## 🧰 Tech Stack

- **TypeScript**: For static type safety across the codebase.
- **React**: Core UI framework.
- **Next.js (App Router)**: Handles routing, server-side rendering, and optimizations like `next/image`, `next/font`.
- **TurboPack**: For fast local development (enabled by Next.js).
- **next-intl**: For internationalization and multilingual support.
- **Tailwind CSS + clsx**: Utility-first CSS styling with conditional class management.
- **ShadCN UI**: Prebuilt, accessible, and Tailwind-compatible UI components.
- **Zustand**: Lightweight state management library.
- **SWR**: Data fetching strategy for REST APIs.
- **Zod**: Schema validation and form validation logic.
- **React Hook Form**: Form handling and integration with Zod.
- **Jest + React Testing Library**: Unit and component testing.
- **Playwright**: End-to-end testing.

## ⚙️ Bundlers

- **Turbopack** is used for local development (enabled by Next.js).
- **Webpack** is used for production builds.

## ⚠️ Dependency Management

This project uses [`pnpm`](https://pnpm.io) for managing dependencies.

✅ Please use:

```bash
pnpm install
```

or

```bash
pnpm dev
```

❌ Do NOT use npm install. It will either be blocked or crash due to pnpm's optimized node_modules layout.

If you don’t have pnpm yet:

```bash
npm install -g pnpm
```

## ✅ Best Practices to Follow

- Use TypeScript for all code.
- Follow Next.js App Router architecture.
- Use functional components and React hooks only.
- All styles should use Tailwind CSS.
- Prefer server components unless interaction is required.
- Co-locate i18n messages with the page or component. Place all messages files in the `messages/` directory (see below).
- Validate all user input using Zod schemas.
- Prefer composable, reusable components.
- All new features and fixes must use TDD (write tests first).
- Ensure accessibility in UI components.
- Use concise, readable TypeScript.
- Write self-documenting code with clear naming and structure.

## 🚫 What to Avoid

- Do not use class-based React components.
- Do not use Redux or other global state libraries; use Zustand only.
- Do not use CSS Modules or styled-components.
- Avoid GraphQL (use only REST + SWR).
- Avoid complex side effects outside of hooks or state stores.

## AI Agent Assistance Highlight

- Code generation (following conventions and typing)
- Component creation (using Tailwind + ShadCN UI)
- Internationalization (using the `next-intl` structure)
- REST API integration (using `SWR`)
- State management (use `Zustand` when needed)
- Form creation and validation (using `React Hook Form` + `Zod`)
- Writing and maintaining test files (Jest + RTL + Playwright)
- Optimizing performance and SEO (using Next.js features)
- Keeping the codebase clean and modular

## 🔧 Rendering Strategy

- The current deployment uses **Static Site Generation (SSG)** only.
- All pages are pre-rendered at build time and deployed to **GitHub Pages**.
- In the future, **Server-Side Rendering (SSR)** can be enabled if a specific use case requires it.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Reference documents

- **/README.md**: provides a high-level overview of the project, including its purpose, tech stack .
- **/CONTRIBUTING.md**: outlines the complete development workflow for contributing to the project.
- **/AGENTS.md**: provides instructions and goals for AI assistants involved in the project.
- **docs/AI_ISSUE_ASSISTANT.md**: instructs agents on how to enhance raw user input into a GitHub issue.
- **docs/AI_PULL_REQUEST_ASSISTANT.md**: provides steps and guidelines to create pull requests.
