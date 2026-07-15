// ===============================================
// Module: app/[locale]/dpa/page.tsx
// Description: Data Processing Agreement page with internationalization support
//
// Sections:
//   - Metadata
//   - Static Generation Config
//   - DPA Component
//   - Content Sections and Structure
//   - Translation Integration
// ===============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslator, isSupportedLocale, type SupportedLocale } from "../../i18n";
import { generateHreflangLinksWithCanonical, getCanonicalUrl } from "../../utils/hreflang-utils";

// Enable ISR with 24-hour revalidation for legal documents
export const revalidate = 86400; // 24 hours in seconds

interface DpaPageProps {
  params: Promise<{ locale: string }>;
}

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }: DpaPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Data Processing Agreement - Piyuo Counter",
      description: "Data Processing Agreement for Piyuo Counter application",
    };
  }

  try {
    const t = await getTranslator(locale as SupportedLocale, 'dpa');

    return {
      title: t('dpa_intro_title'),
      description: t('dpa_intro_body'),
      alternates: {
        ...generateHreflangLinksWithCanonical(locale as SupportedLocale, '/dpa'),
        canonical: getCanonicalUrl(locale as SupportedLocale, '/dpa'),
      },
      openGraph: {
        title: t('dpa_intro_title'),
        description: t('dpa_intro_body'),
        type: 'article',
        locale: locale,
        url: getCanonicalUrl(locale as SupportedLocale, '/dpa'),
      },
    };
  } catch {
    return {
      title: "Data Processing Agreement - Piyuo Counter",
      description: "Data Processing Agreement for Piyuo Counter application",
    };
  }
}

/**
 * Data Processing Agreement page component with full internationalization support.
 *
 * @param params - Route parameters including locale
 * @returns Rendered DPA page
 */
export default async function DpaPage({ params }: DpaPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Get translator for dpa page
  const t = await getTranslator(locale as SupportedLocale, 'dpa');

  // Each entry maps directly to a {key}_title / {key}_body pair in the
  // localization JSON, matching the flattened dpa.json shape.
  const sections = [
    'dpa_intro',
    'dpa_scope',
    'dpa_security_access',
    'dpa_breach',
    'dpa_subprocessors',
    'dpa_compliance',
    'dpa_retention',
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <header className="mb-12 text-center border-b border-gray-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('dpa_intro_title')}
            </h1>
          </header>

          {/* Content sections, generated from title/body pairs */}
          {sections.map((key) => (
            <section key={key} className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
                {t(`${key}_title`)}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {t(`${key}_body`)}
              </p>
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}