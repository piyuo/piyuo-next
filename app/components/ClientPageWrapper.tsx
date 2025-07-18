// ===============================================
// Component: ClientPageWrapper.tsx
// Description: Wrapper component for client-side functionality and navigation
//
// Sections:
//   - Imports and Types
//   - Component Interface
//   - Main Component
//   - Event Handlers
//   - Header Translation Helper
// ===============================================

"use client";

import { type SupportedLocale } from "../i18n";
import { EnhancedLanguageSelector } from "./EnhancedLanguageSelector";
import { GlassContainer } from "./GlassContainer";

interface HeaderTranslations {
  index_download: string;
  index_language: string;
}

interface ClientPageWrapperProps {
  children: React.ReactNode;
  locale: SupportedLocale;
  translations: HeaderTranslations;
}

export function ClientPageWrapper({ children, locale, translations }: ClientPageWrapperProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDownload = () => {
    const downloadSection = document.querySelector('[data-download-section]');
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' });
    }
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
                    {translations.index_download}
                  </button>

                  <EnhancedLanguageSelector
                    currentLocale={locale}
                    languageLabel={translations.index_language}
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
