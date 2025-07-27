// ===============================================
// Component: LinkView.tsx
// Description: Navigation links with locale-aware URLs for footer section
//
// Features:
//   - Email contact button
//   - Terms and Privacy links
//   - Locale-aware URL generation
//   - Responsive layout
// ===============================================

"use client";

import Link from 'next/link';

interface LinkViewProps {
  translations: {
    index_email_us: string;
    terms: string;
    privacy: string;
  };
  locale?: string;
}

export function LinkView({ translations, locale }: LinkViewProps) {
  const handleEmailClick = () => {
    window.location.href = 'mailto:service@piyuo.com';
  };

  // Helper function to create locale-aware URLs
  const createLocaleUrl = (path: string): string => {
    if (!locale || locale.trim() === '') {
      return path;
    }
    return `/${locale}${path}`;
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-6">
      {/* Email Button */}
      <button
        onClick={handleEmailClick}
        className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors shadow-lg"
      >
        {translations.index_email_us}
      </button>

      {/* Email Address */}
      <div className="text-white font-bold text-lg">
        service@piyuo.com
      </div>

      {/* Links */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Link
          href={createLocaleUrl("/terms")}
          className="text-white hover:text-gray-300 text-lg transition-colors"
        >
          {translations.terms}
        </Link>

        <Link
          href={createLocaleUrl("/privacy")}
          className="text-white hover:text-gray-300 text-lg transition-colors"
        >
          {translations.privacy}
        </Link>
      </div>
    </div>
  );
}
