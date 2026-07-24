// ===============================================
// Module: app/[locale]/privacy/page.tsx
// Description: Privacy Policy page with internationalization support
//
// Sections:
//   - Metadata
//   - Static Generation Config
//   - Privacy Policy Component
//   - Content Sections and Structure
//   - Translation Integration
// ===============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslator, isSupportedLocale, type SupportedLocale } from "../../i18n";
import { generateHreflangLinksWithCanonical, getCanonicalUrl } from "../../utils/hreflang-utils";

// Enable ISR with 24-hour revalidation for legal documents
export const revalidate = 86400; // 24 hours in seconds

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Privacy Policy - Piyuo Counter",
      description: "Privacy Policy for Piyuo Counter application",
    };
  }

  try {
    const t = await getTranslator(locale as SupportedLocale, 'privacy');

    return {
      title: t('privacy_title'),
      description: t('privacy_desc'),
      alternates: {
        ...generateHreflangLinksWithCanonical(locale as SupportedLocale, '/privacy'),
        canonical: getCanonicalUrl(locale as SupportedLocale, '/privacy'),
      },
      openGraph: {
        title: t('privacy_title'),
        description: t('privacy_desc'),
        type: 'article',
        locale: locale,
        url: getCanonicalUrl(locale as SupportedLocale, '/privacy'),
      },
    };
  } catch {
    return {
      title: "Privacy Policy - Piyuo Counter",
      description: "Privacy Policy for Piyuo Counter application",
    };
  }
}

/**
 * Privacy Policy page component with full internationalization support.
 *
 * @param params - Route parameters including locale
 * @returns Rendered privacy policy page
 */
export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Get translator for privacy page
  const t = await getTranslator(locale as SupportedLocale, 'privacy');

  // Each entry maps directly to a {key}_title / {key}_body pair in the
  // localization JSON, matching the current flattened privacy.json shape.
  const sections = [
    'privacy_intro',
    'privacy_how_it_works',
    'privacy_data',
    'privacy_storage',
    'privacy_rights',
    'privacy_contact',
  ] as const;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <header className="mb-12 text-center border-b border-gray-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('privacy')}
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
