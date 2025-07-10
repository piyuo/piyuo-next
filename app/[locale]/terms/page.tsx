// ===============================================
// Module: app/[locale]/terms/page.tsx
// Description: Terms of Service page with internationalization support
//
// Sections:
//   - Metadata and Static Generation Config
//   - Terms of Service Component
//   - Content Sections and Structure
//   - Translation Integration
// ===============================================

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslator, isSupportedLocale, type SupportedLocale } from "../../i18n";
import { generateHreflangLinks, getCanonicalUrl } from "../../utils/hreflang-utils";

// Enable ISR with 24-hour revalidation for legal documents
export const revalidate = 86400; // 24 hours in seconds

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

// Dynamic metadata generation for SEO
export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {
      title: "Terms of Service - Piyuo Counter",
      description: "Terms of Service for Piyuo Counter application",
    };
  }

  try {
    const t = await getTranslator(locale as SupportedLocale, 'terms');
    const title = t('terms_title');
    const description = t('terms_acceptance');

    return {
      title: title,
      description: description,
      alternates: {
        ...generateHreflangLinks('/terms'),
        canonical: getCanonicalUrl(locale as SupportedLocale, '/terms'),
      },
      openGraph: {
        title: title,
        description: description,
        type: 'article',
        locale: locale,
        url: getCanonicalUrl(locale as SupportedLocale, '/terms'),
      },
    };
  } catch {
    return {
      title: "Terms of Service - Piyuo Counter",
      description: "Terms of Service for Piyuo Counter application",
    };
  }
}

/**
 * Terms of Service page component with full internationalization support.
 * Converts the original static HTML content to a modern Next.js/React component.
 *
 * @param params - Route parameters including locale
 * @returns Rendered terms of service page
 */
export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;

  // Validate locale
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Get translator for terms page
  const t = await getTranslator(locale as SupportedLocale, 'terms');

  // Helper function to get URLs for translation context
  const translationContext = {
    website: t('website_url'),
    email: t('contact_email'),
    privacy_link: t('privacy_link')
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <header className="mb-12 text-center border-b border-gray-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('terms_title')}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              {t('terms_effective_date')}
            </p>
          </header>

          {/* 1. Acceptance of Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_acceptance_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_acceptance')}
            </p>
          </section>

          {/* 2. Description of Service */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_description_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms_description_1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_description_2')}
            </p>
          </section>

          {/* 3. License */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_license_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms_license_1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms_license_2')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-4">
              <li>{t('terms_license_reverse')}</li>
              <li>{t('terms_license_distribute')}</li>
              <li>{t('terms_license_modify')}</li>
              <li>{t('terms_license_remove')}</li>
            </ul>
          </section>

          {/* 4. Acceptable Use */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_use_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms_use_intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-4">
              <li>{t('terms_use_illegal')}</li>
              <li>{t('terms_use_privacy')}</li>
              <li>{t('terms_use_harm')}</li>
              <li>{t('terms_use_malware')}</li>
            </ul>
          </section>

          {/* 5. Privacy and Data */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_privacy_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms_privacy_1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms_privacy_2')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_privacy_3', translationContext)}
            </p>
          </section>

          {/* 6. Disclaimer of Warranties */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_disclaimer_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 uppercase text-sm">
              {t('terms_disclaimer_1')}
            </p>
            <p className="text-gray-700 leading-relaxed mb-4 uppercase text-sm">
              {t('terms_disclaimer_2')}
            </p>
            <p className="text-gray-700 leading-relaxed uppercase text-sm">
              {t('terms_disclaimer_3')}
            </p>
          </section>

          {/* 7. Limitation of Liability */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_liability_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 uppercase text-sm">
              {t('terms_liability_intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-4">
              <li className="uppercase text-sm">{t('terms_liability_access')}</li>
              <li className="uppercase text-sm">{t('terms_liability_third_party')}</li>
              <li className="uppercase text-sm">{t('terms_liability_content')}</li>
              <li className="uppercase text-sm">{t('terms_liability_unauthorized')}</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4 mt-4 uppercase text-sm">
              {t('terms_liability_basis')}
            </p>
            <p className="text-gray-700 leading-relaxed uppercase text-sm font-semibold">
              {t('terms_liability_risk')}
            </p>
          </section>

          {/* 8. No Support or Maintenance */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_support_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_support')}
            </p>
          </section>

          {/* 9. Changes to These Terms */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_changes_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_changes')}
            </p>
          </section>

          {/* 10. Governing Law */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_governing_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_governing')}
            </p>
          </section>

          {/* 11. Severability and Waiver */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_severability_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_severability')}
            </p>
          </section>

          {/* 12. Entire Agreement */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_entire_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('terms_entire', translationContext)}
            </p>
          </section>

          {/* 13. Contact Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('terms_contact_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('terms_contact_intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-4">
              <li>
                <a
                  href={`mailto:${t('contact_email')}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t('terms_contact_email', translationContext)}
                </a>
              </li>
              <li>
                <a
                  href={t('website_url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t('terms_contact_website', translationContext)}
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
