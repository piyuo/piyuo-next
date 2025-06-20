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
npm run dev
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
├── assets/             # Static assets that need versioning (images, etc.)
├── messages/           # i18n translation files
│   ├── en/             # English translations
│   └── zh/             # Chinese translations
├── public/             # Public static files (served at root). Files inside will never change (this folder is not versioned).
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

### Using `start-issue.sh`

This script streamlines the process of starting work on a GitHub issue:

```bash
./scripts/start-issue.sh <issue-number>
```

- Creates a new branch from `main` named `<issue-number>-<slugified-title>`.
- Assigns the issue to your GitHub user.
- Checks out the new branch (or switches to it if it already exists).

**Requirements:**
- [GitHub CLI (`gh`)](https://cli.github.com/) must be installed and authenticated.
- Run from the project root.

Example:

```bash
./scripts/start-issue.sh 42
```

### Using `get-issue-title.sh`

This script fetches the title of a GitHub issue by its number using the GitHub CLI:

```bash
./scripts/get-issue-title.sh <issue-number>
```

- Prints the issue title to stdout.
- Exits with an error if the issue number is missing or the title cannot be fetched.

**Requirements:**
- [GitHub CLI (`gh`)](https://cli.github.com/) must be installed and authenticated.
- Run from the project root.

Example:

```bash
./scripts/get-issue-title.sh 42
```

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Other documents to reference

- **AGENTS.md** – Guidance for AI Agents and developers on project conventions, best practices, and what to avoid.
- **CONTRIBUTING.md** – Follows a clear step-by-step GitHub flow.
