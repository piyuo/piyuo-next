# piyuo-next

**GitHub Repository**: [https://github.com/piyuo/piyuo-next](https://github.com/piyuo/piyuo-next)

---

piyuo-next is the official website for piyuo counter. This project uses Next.js/React with Incremental Static Regeneration (ISR) deployed on Cloudflare Workers to build a small, fast, and most importantly, Search Engine Optimized (SEO) website with dynamic content capabilities and full Node.js compatibility.

## Table of Contents

### 🚀 Quick Start for AI Agents

- [🛠️ Development Tools](#️-development-tools) - Essential tools and package manager
- [Getting Started](#getting-started) - Common commands
- [🌐 Translation System](#-translation-system) - CSV-based i18n workflow
- [✅ Best Practices to Follow](#-best-practices-to-follow) - Required coding standards
- [🚫 What to Avoid](#-what-to-avoid) - Critical restrictions
- [AI Agent Assistance Highlight](#ai-agent-assistance-highlight) - AI-specific guidance

### 📋 Detailed Documentation

- [piyuo-next](#piyuo-next)
  - [Table of Contents](#table-of-contents)
    - [🚀 Quick Start for AI Agents](#-quick-start-for-ai-agents)
    - [📋 Detailed Documentation](#-detailed-documentation)
  - [🛠️ Development Tools](#️-development-tools)
  - [⚠️ **CRITICAL: Package Manager Requirement**](#️-critical-package-manager-requirement)
  - [Getting Started](#getting-started)
  - [🌐 Translation System](#-translation-system)
    - [Quick Translation Commands](#quick-translation-commands)
    - [Translation Workflow](#translation-workflow)
    - [Important Notes for Developers](#important-notes-for-developers)
  - [Project Structure](#project-structure)
    - [Key Files \& Directories](#key-files--directories)
  - [Environment Variables](#environment-variables)
  - [🧰 Tech Stack](#-tech-stack)
  - [⚙️ Bundlers](#️-bundlers)
  - [✅ Best Practices to Follow](#-best-practices-to-follow)
  - [🚫 What to Avoid](#-what-to-avoid)
  - [AI Agent Assistance Highlight](#ai-agent-assistance-highlight)
  - [🔧 Rendering Strategy](#-rendering-strategy)
    - [ISR Configuration](#isr-configuration)
  - [Release](#release)
    - [Milestone Completion](#milestone-completion)
  - [Deploy to Cloudflare Workers](#deploy-to-cloudflare-workers)
    - [Automated Deployment](#automated-deployment)
    - [Environment Configuration](#environment-configuration)
  - [Reference Documents](#reference-documents)

## 🛠️ Development Tools

These tools are used to support local development, collaboration, and testing:

- Visual Studio Code – Recommended code editor with official Next.js and Tailwind CSS extensions.
- Node.js (v18+) – Required runtime for Next.js and tooling.
- **pnpm – REQUIRED package manager (faster and more efficient than npm/yarn).**
- Git – Version control for managing source code.
- GitHub CLI (gh) – Streamlines GitHub workflows (issues, pull requests, etc.).
- Playwright Test Runner – Used for running end-to-end tests locally and in CI.
- Jest – Unit testing framework with React Testing Library integration.
- ESLint + Prettier – Enforces consistent code quality and formatting (integrated via VS Code extensions).
- Wrangler CLI – Cloudflare's CLI tool for local development and deployment.

## ⚠️ **CRITICAL: Package Manager Requirement**

> **This project uses [`pnpm`](https://pnpm.io) as the ONLY supported package manager.**
> **All commands MUST use `pnpm` - never `npm` or `yarn`.**
> **Using `npm install` or `yarn install` WILL cause errors and corrupted installations.**

```bash
# ✅ CORRECT - Always use pnpm
pnpm install
pnpm dev
pnpm build
pnpm test

# ❌ WRONG - These will break the project
npm install    # DON'T USE
yarn install   # DON'T USE
npm run dev    # DON'T USE
```

**Don't have pnpm?** Install it first:

```bash
npm install -g pnpm
```

## Getting Started

Here are the most commonly used commands for developing with this project:

```bash
# Start development server
pnpm dev
```

```bash
# Build for production
pnpm build
```

```bash
# Run all tests
pnpm test
```

### 🔄 Dependency Management

Keep your project dependencies up to date with the automated upgrade script:

```bash
# Upgrade all dependencies safely
./scripts/upgrade_deps.sh
```

This script will:

- ✅ Check for outdated dependencies
- ✅ Update `package.json` with latest versions
- ✅ Install updated packages
- ✅ Run build to ensure compatibility
- ✅ Execute tests to verify functionality
- ✅ Provide detailed error messages if issues occur

**Prerequisites:** Ensure you have `npm-check-updates` installed globally:

```bash
npm install -g npm-check-updates
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 🌐 Translation System

> **📖 For complete translation workflow documentation, see [TRANSLATION.md](/docs/TRANSLATION.md)**

This project uses a **CSV-based translation system** to manage multilingual content across 70+ locales efficiently:

### Quick Translation Commands

```bash
# Build all translation files from CSV sources
./scripts/build_translation.sh

# Build specific translation file
./scripts/build_translation.sh page
./scripts/build_translation.sh terms
./scripts/build_translation.sh privacy
```

### Translation Workflow

1. **Edit CSV files** in `/translation/` (source of truth)
2. **Run build script** to generate JSON files
3. **JSON files** are auto-generated in `/public/messages/[locale]/`

### Important Notes for Developers

- ✅ **Always edit CSV files** in `/translation/` directory
- ✅ **Use `./scripts/build_translation.sh`** to generate JSON files
- ❌ **Never manually edit** JSON files in `/public/messages/`
- 📖 **See [TRANSLATION.md](/docs/TRANSLATION.md)** for complete documentation

## Project Structure

```bash
├── app/                # Main Next.js app directory (App Router)
│   ├── components/     # Reusable React components
│   ├── globals.css     # Global styles (Tailwind CSS)
│   ├── i18n.ts         # Internationalization setup (next-intl)
│   ├── layout.tsx      # Root layout for all pages
│   └── page.tsx        # Home page (with language switch)
├── assets/             # Files in assets/ are meant for static assets that are part of the build process or may be versioned.
├── docs/               # Project documentation
│   └── TRANSLATION.md  # Translation system documentation
├── translation/        # 🌐 CSV translation source files (EDIT THESE)
│   ├── page.csv        # Main page translations
│   ├── terms.csv       # Terms of service translations
│   ├── privacy.csv     # Privacy policy translations
│   └── ...             # More translations
├── public/             # Use public/ for static assets that are unlikely to change, such as favicons or robots.txt. These files are served directly from the root URL.
│   └── messages/       # 🌐 Generated JSON translation files (DO NOT EDIT)
│       ├── en/         # English translations (auto-generated)
│       ├── zh-CN/      # Chinese translations (auto-generated)
│       └── ...         # 70+ other locales (auto-generated)
├── scripts/            # Useful scripts for development and maintenance
│   └── build_translation.sh  # 🌐 CSV to JSON translation builder
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
├── wrangler.toml       # Cloudflare Workers configuration
├── README.md           # Project documentation (this file)
├── AGENTS.md           # AI Agent instructions and best practices
└── CONTRIBUTING.md     # Contribution guidelines and workflow
```

### Key Files & Directories

- **app/**: Main application code using Next.js App Router. Contains pages, layouts, and components.
- **app/components/**: Reusable React components (e.g., `Greeting.tsx`).
- **app/i18n.ts**: Internationalization setup using `next-intl`.
- **translation/**: 🌐 **CSV translation source files - EDIT THESE for translations**
- **public/messages/**: 🌐 **Auto-generated JSON translation files - DO NOT EDIT MANUALLY**
- **scripts/build_translation.sh**: 🌐 **Script to convert CSV files to JSON translations**
- **docs/TRANSLATION.md**: 🌐 **Complete translation system documentation**
- **public/**: Static files (SVGs, images) served at the root URL.
- **assets/**: Prefer importing from `assets` for anything that might change. Only use `public/` for permanent, never-changing files.
- **messages/**: Store all translatable messages in `messages/` and load them via imports or dynamic imports..
- **.github/**: GitHub Actions workflows, issue/PR templates, and label sync config.
- **jest.config.ts & jest.setup.ts**: Testing setup with Jest and React Testing Library.
- **eslint.config.mjs**: ESLint configuration for code quality.
- **postcss.config.mjs**: PostCSS config for Tailwind CSS.
- **tsconfig.json**: TypeScript project configuration.
- **package.json**: Project dependencies, scripts, and metadata.
- **wrangler.toml**: Cloudflare Workers configuration for deployment.
- **AGENTS.md**: Guidance for AI Agents and developers on project conventions, best practices, and what to avoid. Essential for automated and human contributors.
- **CONTRIBUTING.md**: Step-by-step guide for contributing, including workflow, commit standards, and review process. Read this before making a PR.
- **scripts/**: Useful scripts for development and maintenance (e.g., cleanup, automation).
  - **cleanup_branches.sh**: Deletes all local git branches that have been removed from the remote. Useful for keeping your local repository clean.
  - **start_issue.sh**: Automates starting work on a GitHub issue. It creates a new branch named after the issue number and title, assigns the issue to you, and checks out the branch.
  - **get_issue_title.sh**: Fetches the title of a GitHub issue by its number.
  - **upgrade_deps.sh**: Safely upgrades project dependencies with comprehensive error handling and validation. Checks for outdated packages, updates them, runs builds and tests to ensure compatibility.

## Environment Variables

Create a `.env.local` file in the root directory for local development:

```bash
# Cloudflare API credentials (GitHub Secrets)
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Optional: On-demand revalidation security
REVALIDATE_TOKEN=your_secure_token
```

## 🧰 Tech Stack

- **TypeScript**: For static type safety across the codebase.
- **React**: Core UI framework.
- **Next.js (App Router)**: Handles routing, Incremental Static Regeneration (ISR), and optimizations like `next/image`, `next/font`.
- **@opennextjs/cloudflare**: Enables Next.js deployment on Cloudflare Workers with full Node.js compatibility.
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
- **Cloudflare Workers**: Production hosting with serverless functions and full Node.js runtime support.

## ⚙️ Bundlers

- **Turbopack** is used for local development (enabled by Next.js).
- **Webpack** is used for production builds.

## ✅ Best Practices to Follow

- **Always use `pnpm` for all package management commands.**
- **🌐 For translations: Edit CSV files in `/translation/`, run `./scripts/build_translation.sh`, never edit JSON files manually.**
- Use TypeScript for all code.
- Follow Next.js App Router architecture.
- Use functional components and React hooks only.
- All styles should use Tailwind CSS.
- Leverage ISR for pages that benefit from both static generation and dynamic updates.
- Use server components for static content and client components for interactive features.
- Co-locate i18n messages with the page or component. Place all messages files in the `messages/` directory (see below).
- Validate all user input using Zod schemas.
- Prefer composable, reusable components.
- All new features and fixes must use TDD (write tests first).
- Ensure accessibility in UI components.
- Use concise, readable TypeScript.
- Write self-documenting code with clear naming and structure.
- Optimize ISR revalidation intervals based on content update frequency.
- Take advantage of Node.js compatibility for server-side operations when needed.

## 🚫 What to Avoid

- **NEVER use `npm` or `yarn` commands - only `pnpm` is supported.**
- **🌐 NEVER manually edit JSON files in `/public/messages/` - they are auto-generated.**
- Do not use class-based React components.
- Do not use Redux or other global state libraries; use Zustand only.
- Do not use CSS Modules or styled-components.
- Avoid GraphQL (use only REST + SWR).
- Avoid complex side effects outside of hooks or state stores.
- Don't set ISR revalidation too aggressively (avoid unnecessary server load).

## AI Agent Assistance Highlight

- **CRITICAL: Always use `pnpm` commands, never `npm` or `yarn`**
- **🌐 Translation work: Edit CSV files in `/translation/`, run `./scripts/build_translation.sh` - see [TRANSLATION.md](/docs/TRANSLATION.md)**
- Code generation (following conventions and typing)
- Component creation (using Tailwind + ShadCN UI)
- Internationalization (using the `next-intl` structure)
- REST API integration (using `SWR`)
- State management (use `Zustand` when needed)
- Form creation and validation (using `React Hook Form` + `Zod`)
- Writing and maintaining test files (Jest + RTL + Playwright)
- Optimizing performance and SEO (using Next.js ISR features)
- ISR configuration and revalidation strategies
- Cloudflare Workers integration and deployment
- Node.js compatibility features and server-side operations
- Keeping the codebase clean and modular

## 🔧 Rendering Strategy

- The current deployment uses **Incremental Static Regeneration (ISR)** running on Cloudflare Workers for optimal performance and SEO.
- Pages are statically generated at build time and can be regenerated on-demand or at specified intervals.
- **Server-Side Rendering (SSR)** is available for dynamic content when needed.
- Static pages are served from Cloudflare's global CDN for maximum performance.
- Dynamic functionality is handled by Cloudflare Workers with full Node.js runtime compatibility.
- The **@opennextjs/cloudflare** adapter enables seamless Next.js features on Cloudflare Workers.

### ISR Configuration

Pages can be configured with different revalidation strategies:

```tsx
// Static generation with 60-second revalidation
export const revalidate = 60;

// On-demand revalidation (triggered by API calls)
export const revalidate = false;

// Always fresh (equivalent to SSR)
export const revalidate = 0;
```

## Release

**Release-please** automatically handles versioning and releases by:

1. **Analyzing commit messages** on main branch
2. **Determining version type** based on conventional commits:
   - `feat:` commits → Minor version bump (1.1.0 → 1.2.0)
   - `fix:` commits → Patch version bump (1.1.0 → 1.1.1)
   - `feat!:` or `BREAKING CHANGE` → Major version bump (1.1.0 → 2.0.0)
3. **Generating changelog** from commit messages and linked issues
4. **Creating release PR** with version bump and changelog
5. **Creating Git tags** when release PR is merged
6. **Triggering automated deployment** to Cloudflare Workers

### Milestone Completion

When all issues in a milestone are completed:

1. **Release-please creates release PR** automatically
2. **Maintainer reviews and merges** release PR to main
3. **Automatic version bump and changelog** generation
4. **Git tag created** with version number
5. **GitHub Actions deploys to Cloudflare Workers** automatically
6. **Website at <https://piyuo.com> updates immediately**

## Deploy to Cloudflare Workers

This project is automatically deployed to Cloudflare Workers using GitHub Actions and the **@opennextjs/cloudflare** adapter. The deployment workflow is triggered automatically when release-please PRs are merged to the main branch.

### Automated Deployment

The site is built and deployed using GitHub Actions:

1. Builds the Next.js application using @opennextjs/cloudflare
2. Deploys to Cloudflare Workers project named "piyuo-next"
3. Provides instant global distribution with edge computing
4. Full Node.js runtime compatibility for server-side operations
5. Website at <https://piyuo.com> updates immediately after deployment

### Environment Configuration

Configure environment variables in:

- **Development**: `.env.local` file
- **Production**: define in deploy.yml

## Reference Documents

- **/README.md**: provides a high-level overview of the project, including its purpose, tech stack.
- **/CONTRIBUTING.md**: outlines the complete development workflow for contributing to the project.
- **/AGENTS.md**: provides instructions and goals for AI assistants involved in the project.
- **📖 /docs/TRANSLATION.md**: comprehensive documentation for the CSV-based translation system and workflow.
