// ===============================================
// Module: app/[locale]/docs/payload-format/page.tsx
// Description: Payload Format Documentation page with markdown rendering
//
// Sections:
//   - Metadata and Static Generation Config
//   - Markdown Content Reader
//   - Documentation Component
//   - Styled Markdown Rendering
// ===============================================

import fs from "fs/promises";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import path from "path";
import { isSupportedLocale } from "../../../i18n";
import { MarkdownRenderer } from "./MarkdownRenderer";

// Enable ISR with 24-hour revalidation for documentation
export const revalidate = 86400; // 24 hours in seconds

interface DocsPageProps {
  params: Promise<{ locale: string }>;
}

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Payload Format - Piyuo Counter Documentation",
      description: "Technical documentation for Piyuo Counter payload format and API specifications",
    };
  }

  return {
    title: "Payload Format - Piyuo Counter Documentation",
    description: "Technical documentation for Piyuo Counter payload format and API specifications. Learn about the privacy-first data structure for AI-powered people counting.",
    openGraph: {
      title: "Payload Format - Piyuo Counter Documentation",
      description: "Technical documentation for Piyuo Counter payload format and API specifications",
      type: "article",
      locale: locale,
    },
  };
}

/**
 * Read markdown file from the public docs directory
 */
async function readMarkdownFile(): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), "public", "docs", "payload-format.md");
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (error) {
    console.error("Error reading markdown file:", error);
    throw error;
  }
}

/**
 * Documentation page component that renders markdown content
 * with professional styling using Tailwind Typography.
 *
 * @param params - Route parameters including locale
 * @returns Rendered documentation page
 */
export default async function PayloadFormatDocsPage({ params }: DocsPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Read markdown content
  let markdownContent: string;
  try {
    markdownContent = await readMarkdownFile();
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <a
              href={`/${locale}`}
              className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </a>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
              Technical Documentation
            </h1>
            <p className="text-slate-600 mt-2">
              Piyuo Counter Payload Format Specification
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16">
              <MarkdownRenderer content={markdownContent} />
            </div>
          </article>

          {/* Footer */}
          <footer className="mt-12 text-center text-slate-600 text-sm">
            <p>
              Need help? Contact us at{" "}
              <a
                href="mailto:support@piyuo.com"
                className="text-blue-600 hover:text-blue-700 underline"
              >
                support@piyuo.com
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
