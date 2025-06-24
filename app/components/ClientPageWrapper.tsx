"use client";

import { useRouter } from "next/navigation";
import { type SupportedLocale } from "../i18n";
import { GlassContainer } from "./GlassContainer";
import { LanguageSelector } from "./LanguageSelector";

interface ClientPageWrapperProps {
  children: React.ReactNode;
  locale: SupportedLocale;
}

export function ClientPageWrapper({ children, locale }: ClientPageWrapperProps) {
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDownload = () => {
    const downloadSection = document.querySelector('[data-download-section]');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLanguageChange = (newLang: 'en' | 'zh') => {
    router.push(`/${newLang}/`);
  };

  // Create a simple translation function for the header
  const getHeaderTranslation = (key: string) => {
    // Simple translations for header items only
    const translations: Record<string, Record<string, string>> = {
      en: {
        index_download: "Download",
        index_language: "Language"
      },
      zh: {
        index_download: "下载",
        index_language: "语言"
      }
    };
    return translations[locale]?.[key] || key;
  };

  return (
    <>
      {/* App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="flex justify-center py-4">
          <div className="w-full max-w-[1280px] px-5">
            <GlassContainer padding="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={scrollToTop}
                  className="text-xl md:text-2xl font-bold text-white hover:text-gray-200 transition-colors"
                >
                  piyuo.com
                </button>

                <div className="flex items-center space-x-6">
                  <button
                    onClick={scrollToDownload}
                    className="text-sm md:text-base text-white hover:text-gray-200 transition-colors"
                  >
                    {getHeaderTranslation('index_download')}
                  </button>

                  <LanguageSelector
                    currentLang={locale}
                    onLangChange={handleLanguageChange}
                    t={getHeaderTranslation}
                  />
                </div>
              </div>
            </GlassContainer>
          </div>
        </div>
      </header>

      {/* Main content */}
      {children}
    </>
  );
}
