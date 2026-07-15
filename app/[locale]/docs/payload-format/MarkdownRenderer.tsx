// ===============================================
// Module: app/[locale]/docs/payload-format/MarkdownRenderer.tsx
// Description: Client-side markdown renderer with syntax highlighting
//
// Sections:
//   - React Markdown Configuration
//   - Syntax Highlighting Setup
//   - Custom Component Overrides
//   - Styled Rendering
// ===============================================

"use client";

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Client-side markdown renderer with GitHub Flavored Markdown support
 * and syntax highlighting for code blocks.
 *
 * Features:
 * - Tables (via remark-gfm)
 * - Task lists (via remark-gfm)
 * - Strikethrough (via remark-gfm)
 * - Syntax highlighting (via rehype-highlight)
 * - Tailwind Typography styling
 *
 * @param content - Raw markdown string to render
 * @returns Styled markdown content
 */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-slate max-w-none
      prose-headings:scroll-mt-20
      prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-6 prose-h1:text-slate-900 prose-h1:border-b prose-h1:border-slate-200 prose-h1:pb-4
      prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-slate-800 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3
      prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800
      prose-p:text-slate-700 prose-p:leading-relaxed prose-p:my-4
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700 hover:prose-a:underline
      prose-strong:text-slate-900 prose-strong:font-semibold
      prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:shadow-lg prose-pre:my-6 prose-pre:overflow-x-auto
      prose-pre:code:text-slate-100 prose-pre:code:bg-transparent prose-pre:code:p-0
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-slate-600
      prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
      prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
      prose-li:text-slate-700 prose-li:my-2
      prose-table:w-full prose-table:my-6 prose-table:border-collapse
      prose-th:bg-slate-100 prose-th:border prose-th:border-slate-300 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900
      prose-td:border prose-td:border-slate-300 prose-td:px-4 prose-td:py-3 prose-td:text-slate-700
      prose-tr:even:bg-slate-50
      prose-hr:my-8 prose-hr:border-slate-300
      prose-img:rounded-lg prose-img:shadow-md
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
