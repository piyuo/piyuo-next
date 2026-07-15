# Documentation System

## Overview

The project includes a professional documentation system for rendering technical documentation from Markdown files.

## Payload Format Documentation

**URL:** `/en/docs/payload-format` (or `/{locale}/docs/payload-format` for other locales)

**Source File:** `public/docs/payload-format.md`

This page renders the Payload Format specification with:
- **Professional styling** using Tailwind Typography
- **Syntax highlighting** for code blocks (via highlight.js)
- **GitHub Flavored Markdown** support (tables, task lists, strikethrough)
- **Responsive design** with clean, readable layout
- **SEO optimization** with proper metadata

## Features

### Markdown Rendering
- Headings with proper hierarchy
- Tables with styled borders and alternating row colors
- Code blocks with syntax highlighting (GitHub Dark theme)
- Inline code with pink highlighting
- Lists (ordered and unordered)
- Links, bold, italic, and other inline formatting
- Blockquotes and horizontal rules

### Technical Stack
- **react-markdown** - Core markdown parsing
- **remark-gfm** - GitHub Flavored Markdown support
- **rehype-highlight** - Syntax highlighting
- **@tailwindcss/typography** - Professional typography styling

## Adding New Documentation Pages

To add a new documentation page:

1. **Create the markdown file** in `public/docs/`:
   ```bash
   touch public/docs/your-doc.md
   ```

2. **Create a new route** under `app/[locale]/docs/`:
   ```bash
   mkdir -p app/[locale]/docs/your-doc
   ```

3. **Copy the page structure** from `app/[locale]/docs/payload-format/page.tsx`
   - Update the markdown file path
   - Update metadata (title, description)
   - Adjust the header text

4. **Use the MarkdownRenderer component** (already created and reusable)

5. **Add tests** following the pattern in `page.test.tsx`

## Styling Customization

The markdown styling is defined in `app/[locale]/docs/payload-format/MarkdownRenderer.tsx` using Tailwind Typography classes. You can customize:

- Heading sizes and colors
- Code block themes (change the highlight.js theme in `app/globals.css`)
- Table styling
- Link colors and hover effects
- Spacing and typography

## Testing

Tests are located in:
- `app/[locale]/docs/payload-format/page.test.tsx` - Page component tests
- `app/[locale]/docs/payload-format/MarkdownRenderer.test.tsx` - Markdown renderer tests

Run tests with:
```bash
pnpm test
```

## Maintenance

- **Markdown content** can be updated directly in `public/docs/*.md` without code changes
- **ISR (Incremental Static Regeneration)** is enabled with 24-hour revalidation
- **Syntax highlighting theme** can be changed by updating the CSS import in `app/globals.css`

## Access URLs

Documentation is available in all supported locales:
- English: `http://localhost:8080/en/docs/payload-format`
- Chinese: `http://localhost:8080/zh/docs/payload-format`
- Japanese: `http://localhost:8080/ja/docs/payload-format`
- Spanish: `http://localhost:8080/es/docs/payload-format`
- German: `http://localhost:8080/de/docs/payload-format`
