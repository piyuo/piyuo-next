# piyuo-next

piyuo-next is the official website for piyuo counter. This project uses Next.js/React with Incremental Static Regeneration (ISR) to build a small, fast, and most importantly, Search Engine Optimized (SEO) website with dynamic content capabilities.

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
- Wrangler CLI – Cloudflare's CLI tool for local development and deployment.

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
├── wrangler.toml       # Cloudflare configuration
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
- **wrangler.toml**: Cloudflare Pages and Functions configuration.
- **AGENTS.md**: Guidance for AI Agents and developers on project conventions, best practices, and what to avoid. Essential for automated and human contributors.
- **CONTRIBUTING.md**: Step-by-step guide for contributing, including workflow, commit standards, and review process. Read this before making a PR.
- **scripts/**: Useful scripts for development and maintenance (e.g., cleanup, automation).
  - **cleanup-branches.sh**: Deletes all local git branches that have been removed from the remote. Useful for keeping your local repository clean.
  - **start-issue.sh**: Automates starting work on a GitHub issue. It creates a new branch named after the issue number and title, assigns the issue to you, and checks out the branch.
  - **get-issue-title.sh**: Fetches the title of a GitHub issue by its number.

## Environment Variables

Create a `.env.local` file in the root directory for local development:

```bash
# Cloudflare API credentials (GitHub Secrets)
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Optional: On-demand revalidation security
REVALIDATE_TOKEN=your_secure_token
```

For production deployment on Cloudflare Pages, set environment variables in the Cloudflare Dashboard under Pages > Settings > Environment variables.

## 🧰 Tech Stack

- **TypeScript**: For static type safety across the codebase.
- **React**: Core UI framework.
- **Next.js (App Router)**: Handles routing, Incremental Static Regeneration (ISR), and optimizations like `next/image`, `next/font`.
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
- **Cloudflare Pages + Functions**: Production hosting with serverless functions support.

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

If you don't have pnpm yet:

```bash
npm install -g pnpm
```

## ✅ Best Practices to Follow

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

## 🚫 What to Avoid

- Do not use class-based React components.
- Do not use Redux or other global state libraries; use Zustand only.
- Do not use CSS Modules or styled-components.
- Avoid GraphQL (use only REST + SWR).
- Avoid complex side effects outside of hooks or state stores.
- Don't set ISR revalidation too aggressively (avoid unnecessary server load).

## AI Agent Assistance Highlight

- Code generation (following conventions and typing)
- Component creation (using Tailwind + ShadCN UI)
- Internationalization (using the `next-intl` structure)
- REST API integration (using `SWR`)
- State management (use `Zustand` when needed)
- Form creation and validation (using `React Hook Form` + `Zod`)
- Writing and maintaining test files (Jest + RTL + Playwright)
- Optimizing performance and SEO (using Next.js ISR features)
- ISR configuration and revalidation strategies
- Cloudflare Pages and Functions integration
- Keeping the codebase clean and modular

## 🔧 Rendering Strategy

- The current deployment uses **Incremental Static Regeneration (ISR)** for optimal performance and SEO.
- Pages are statically generated at build time and can be regenerated on-demand or at specified intervals.
- **Server-Side Rendering (SSR)** is available for dynamic content when needed.
- Static pages are served from Cloudflare's global CDN for maximum performance.
- Dynamic functionality is handled by Cloudflare Functions (serverless edge computing).

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

### Milestone Completion

When all issues in a milestone are completed:

1. **Release-please creates release PR** automatically
2. **Maintainer reviews and merges** release PR to main
3. **Automatic version bump and changelog** generation
4. **Git tag created** with version number
5. **CI/CD deployment triggered** automatically

## Deploy to Cloudflare Pages

This project is automatically deployed to Cloudflare Pages using GitHub Actions. The deployment workflow is triggered on every push to the main branch.

### Automated Deployment

The site is built and deployed using Cloudflare Pages' GitHub integration:

1. Builds the Next.js application with ISR support
2. Deploys static assets to Cloudflare's global CDN
3. Deploys serverless functions to Cloudflare Functions
4. Provides instant global distribution with edge caching

### Manual Deployment

For manual deployment using Wrangler CLI:

```bash
# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
pnpm run build

# Deploy to Cloudflare Pages
wrangler pages deploy .next --project-name=piyuo-next
```

### Local Development with Cloudflare

To test Cloudflare Functions locally:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Run local development server with Functions
wrangler pages dev .next --compatibility-date=2024-01-15
```

### Environment Configuration

Configure environment variables in:

- **Development**: `.env.local` file
- **Production**: Cloudflare Dashboard > Pages > Settings > Environment variables

### Performance Benefits

The migration to Cloudflare Pages + ISR provides:

- **Faster Time to First Byte**: ISR serves cached content instantly
- **Better SEO**: Server-generated content with dynamic updates
- **Global Performance**: Cloudflare's 200+ edge locations
- **Automatic Scaling**: Serverless functions scale automatically
- **Cost Efficiency**: Pay-per-use model with generous free tier

Check out the [Next.js ISR documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration) and [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/) for more details.

## Reference documents

- **/README.md**: provides a high-level overview of the project, including its purpose, tech stack .
- **/CONTRIBUTING.md**: outlines the complete development workflow for contributing to the project.
- **/AGENTS.md**: provides instructions and goals for AI assistants involved in the project.
- **docs/AI_ISSUE_ASSISTANT.md**: instructs agents on how to enhance raw user input into a GitHub issue.
- **docs/AI_PULL_REQUEST_ASSISTANT.md**: provides steps and guidelines to create pull requests.
