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
    const title = t('privacy_title');

    return {
      title: title,
      description: t('privacy_introduction_1'),
      openGraph: {
        title: title,
        description: t('privacy_introduction_1'),
        type: 'article',
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
 * Converts the original static HTML content to a modern Next.js/React component.
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {/* Header */}
          <header className="mb-12 text-center border-b border-gray-200 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('privacy_title')}
            </h1>
            <p className="text-lg text-gray-600 font-medium">
              {t('privacy_effective_date')}
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_introduction_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy_introduction_1')}
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              {t('privacy_introduction_2')}
            </p>
          </section>

          {/* Who We Are */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_who_we_are_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy_who_we_are', {
                website: t('website_url'),
                email: t('contact_email')
              })}
            </p>
          </section>

          {/* Information We Do Not Collect */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_no_collect_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4 font-semibold">
              {t('privacy_no_collect_intro')}
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed ml-4">
              <li>
                <strong>{t('privacy_no_collect_personal').split(':')[0]}:</strong>{' '}
                {t('privacy_no_collect_personal').split(':')[1]}
              </li>
              <li>
                <strong>{t('privacy_no_collect_usage').split(':')[0]}:</strong>{' '}
                {t('privacy_no_collect_usage').split(':')[1]}
              </li>
              <li>
                <strong>{t('privacy_no_collect_third_party').split(':')[0]}:</strong>{' '}
                {t('privacy_no_collect_third_party').split(':')[1]}
              </li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_use_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy_use')}
            </p>
          </section>

          {/* Information Sharing and Disclosure */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_sharing_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy_sharing')}
            </p>
          </section>

          {/* Data Security */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_security_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy_security')}
            </p>
          </section>

          {/* Children's Privacy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_children_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy_children')}
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_rights_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy_rights_1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy_rights_2')}
            </p>
          </section>

          {/* Changes to This Privacy Policy */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_changes_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy_changes_1', {
                website: t('website_url')
              })}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('privacy_changes_2')}
            </p>
          </section>

          {/* Contact Us */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">
              {t('privacy_contact_title')}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('privacy_contact_intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 leading-relaxed ml-4">
              <li>
                <a
                  href={`mailto:${t('contact_email')}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t('privacy_contact_email', {
                    email: t('contact_email')
                  })}
                </a>
              </li>
              <li>
                <a
                  href={t('website_url')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t('privacy_contact_website', {
                    website: t('website_url')
                  })}
                </a>
              </li>
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
