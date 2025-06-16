# AI Agent Instructions for Website Development

## 📌 Project Overview

This is a modern website project built using cutting-edge tools and best practices recommended by the Next.js community. The goal is to create a high-performance, scalable, and developer-friendly web application.

## 🧰 Tech Stack

- **TypeScript**: For static type safety across the codebase.
- **React**: Core UI framework.
- **Next.js (App Router)**: Handles routing, server-side rendering, and optimizations like `next/image`, `next/font`.
- **TurboPack**: For internationalization and multilingual support.
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

## 🧠 AI Agent Goals

You are an AI assistant helping with:

- Code generation (following conventions and typing).
- Component creation (using Tailwind + ShadCN UI).
- Internationalization (use `next-intl` structure).
- REST API integration (via `SWR`).
- State logic (use `Zustand` when needed).
- Form creation and validation (use `React Hook Form` + `Zod`).
- Writing and maintaining test files (Jest + RTL + Playwright).
- Optimizing performance and SEO (using Next.js features).
- Keeping the codebase clean and modular.

## ✅ Best Practices to Follow

- Use TypeScript for all code.
- Follow Next.js App Router architecture.
- Use functional components and React hooks only.
- All styles must use Tailwind CSS.
- Prefer server components unless interaction is required.
- Co-locate i18n messages with page or component (via `next-intl`).
- Validate all user input using Zod schemas.
- Prefer composable, reusable components.
- Always add tests for new features.
- Ensure accessibility in UI components.

## 🚫 What to Avoid

- Do not use class-based React components.
- Do not use Redux or other global state libraries (use Zustand only).
- Do not use CSS Modules or styled-components.
- Avoid GraphQL (REST + SWR only).
- Avoid complex side effects outside of hooks or state stores.

## 🗣️ Language & Style

- Use concise, readable TypeScript.
- Write self-documenting code (clear naming and structure).
- Use conventional commit messages (e.g., `feat: add login button`).

---

## 🔧 Rendering Strategy

- The current deployment uses **Static Site Generation (SSG)** only.
- All pages are pre-rendered at build time and deployed to **GitHub Pages**.
- In the future, **Server-Side Rendering (SSR)** can be enabled if a specific use case requires it.

## 🗂️ Asset Management Strategy

### 📁 File Placement

- Use an `assets/` directory for all **versioned assets** (e.g., images, documents, locale files).
  - These files should be imported directly in components or modules.
  - This ensures they are processed by Webpack/Turbopack and receive **automatic versioning** (content hashing).
  - Example:
    ```tsx
    import logo from '@/assets/logo.png';
    <Image src={logo} alt="Logo" />
    ```

- The `public/` folder should only be used for:
  - Files that **never change** (e.g., `robots.txt`, `favicon.ico`).
  - Static resources that are intended to bypass the bundler entirely.

### 🎯 Why This Matters

- Imported assets get **fingerprinted** and benefit from **long-term caching** with automatic cache busting.
- `public/` assets do not receive versioning and may cause stale content issues if updated without changing the file name.
- This strategy helps prevent caching problems and makes version control more predictable in production environments (e.g., GitHub Pages or Vercel).

> 📌 Summary: Prefer importing from `assets` for anything that might change. Only use `public/` for permanent, never-changing files.
