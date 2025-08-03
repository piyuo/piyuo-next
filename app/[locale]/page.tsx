import { notFound } from "next/navigation";
import { ClientPageWrapper } from "../components/ClientPageWrapper";
import { CoverView } from "../components/CoverView";
import { DesktopView } from "../components/DesktopView";
import { DownloadView } from "../components/DownloadView";
import { FeatureView } from "../components/FeatureView";
import { GlassContainer } from "../components/GlassContainer";
import { LinkView } from "../components/LinkView";
import { ScreenshotPlayer } from "../components/ScreenshotPlayer";
import { ScreenshotView } from "../components/ScreenshotView";
import { getTranslator, isSupportedLocale, supportedLocales, type SupportedLocale } from "../i18n";
import { generateHreflangLinksWithCanonical, getCanonicalUrl } from "../utils/hreflang-utils";

// Enable ISR with 24-hour revalidation
// Content is typically stable but allows for updates without full rebuilds
export const revalidate = 86400; // 24 hours in seconds

// Define all the translations we need
interface Translations {
  app_desc: string;
  index_video_title: string;
  index_video_desc: string;
  index_1: string;
  index_1_desc: string;
  index_2: string;
  index_2_desc: string;
  index_3: string;
  index_3_desc: string;
  index_4: string;
  index_4_desc: string;
  index_desktop_title: string;
  index_desktop_desc: string;
  index_desktop2_title: string;
  index_desktop2_desc: string;
  index_download: string;
  index_email_us: string;
  terms: string;
  privacy: string;
}

// Generate static params for all supported locales
export async function generateStaticParams() {
  return supportedLocales.map((locale) => ({
    locale: locale,
  }));
}

// Enable ISR for non-priority locales
export const dynamicParams = true;

// Generate metadata for each locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isSupportedLocale(locale)) {
    return {};
  }

  const t = await getTranslator(locale,'page');

  return {
    title: `Piyuo - ${t('app_desc')}`,
    description: t('app_desc'),
    alternates: {
      ...generateHreflangLinksWithCanonical(locale, '/'),
      canonical: getCanonicalUrl(locale, '/'),
    },
    openGraph: {
      title: `Piyuo - ${t('app_desc')}`,
      description: t('app_desc'),
      locale: locale,
      url: getCanonicalUrl(locale, '/'),
    },
  };
}

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocalePage({ params }: PageProps) {
  // Await the params
  const { locale } = await params;

  // Validate locale
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  // Get translator for this locale
  const t = await getTranslator(locale,'page');

  // Pre-compute all translations for static export
  const translations: Translations = {
    app_desc: t('app_desc'),
    index_video_title: t('index_video_title'),
    index_video_desc: t('index_video_desc'),
    index_1: t('index_1'),
    index_1_desc: t('index_1_desc'),
    index_2: t('index_2'),
    index_2_desc: t('index_2_desc'),
    index_3: t('index_3'),
    index_3_desc: t('index_3_desc'),
    index_4: t('index_4'),
    index_4_desc: t('index_4_desc'),
    index_desktop_title: t('index_desktop_title'),
    index_desktop_desc: t('index_desktop_desc'),
    index_desktop2_title: t('index_desktop2_title'),
    index_desktop2_desc: t('index_desktop2_desc'),
    index_download: t('index_download'),
    index_email_us: t('index_email_us'),
    terms: t('terms'),
    privacy: t('privacy'),
  };

  // Header translations for ClientPageWrapper
  const headerTranslations = {
    index_download: t('index_download'),
    index_language: t('index_language'),
  };

  return (
    <ClientPageWrapper locale={locale as SupportedLocale} translations={headerTranslations}>
      <div className="min-h-screen relative">
        {/* Background */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/background.webp)' }}
        />

        {/* Main Content */}
        <main className="relative z-10 pt-20">
          <div className="flex justify-center">
            <div className="w-full max-w-[1280px] px-5 space-y-8">
              {/* Cover Section */}
              <GlassContainer padding="p-6 md:p-10" margin="mt-6">
                <CoverView appDesc={translations.app_desc} />
              </GlassContainer>

              {/* Screenshot Section */}
              <GlassContainer padding="p-6 md:p-10">
                <ScreenshotView
                  title={translations.index_video_title}
                  description={translations.index_video_desc}
                />
              </GlassContainer>

              {/* Video Player */}
              <div className="px-0 mb-5">
                <ScreenshotPlayer />
              </div>

              {/* Features */}
              <FeatureView translations={{
                index_1: translations.index_1,
                index_1_desc: translations.index_1_desc,
                index_2: translations.index_2,
                index_2_desc: translations.index_2_desc,
                index_3: translations.index_3,
                index_3_desc: translations.index_3_desc,
                index_4: translations.index_4,
                index_4_desc: translations.index_4_desc,
              }} />

              {/* Desktop Views */}
              <GlassContainer padding="p-6 md:p-10">
                <DesktopView
                  title={translations.index_desktop_title}
                  description={translations.index_desktop_desc}
                  imagePath="desktop-1.webp"
                />
              </GlassContainer>

              <GlassContainer padding="p-6 md:p-10">
                <DesktopView
                  title={translations.index_desktop2_title}
                  description={translations.index_desktop2_desc}
                  imagePath="desktop-2.webp"
                />
              </GlassContainer>

              {/* Download Section */}
              <div data-download-section>
                <GlassContainer padding="p-6 md:p-10">
                  <DownloadView downloadText={translations.index_download} />
                </GlassContainer>
              </div>

              {/* Links */}
              <LinkView
                locale={locale}
                translations={{
                  index_email_us: translations.index_email_us,
                  terms: translations.terms,
                  privacy: translations.privacy,
                }} />

              {/* Footer */}
              <div className="text-center py-8">
                <div className="text-white text-2xl font-bold">
                  piyuo.com
                </div>
              </div>

              <div className="h-8" />
            </div>
          </div>
        </main>
      </div>
    </ClientPageWrapper>
  );
}
