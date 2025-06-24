'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { getBestMatchingLocale } from './i18n';

// Root page that handles client-side locale detection and redirection
// This is necessary because middleware doesn't work with static export
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect browser locale and redirect to best matching locale
    const browserLocale = navigator.language || navigator.languages?.[0] || 'en';
    const bestLocale = getBestMatchingLocale(browserLocale);

    // Replace the current URL to avoid back button issues
    router.replace(`/${bestLocale}/`);
  }, [router]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
}