// ===============================================
// Middleware: middleware.ts
// Description: next-intl middleware for locale detection and routing
//
// Features:
//   - Automatic locale detection from Accept-Language headers
//   - URL locale prefix handling (e.g., /en/page, /es/page)
//   - Fallback to English for unsupported locales
//   - Leverages existing supportedLocales array
//   - Compatible with ISR and Cloudflare Pages
// ===============================================

import createMiddleware from 'next-intl/middleware';
import { supportedLocales } from './app/i18n';

export default createMiddleware({
  // Use your existing supportedLocales array (76 locales)
  locales: supportedLocales,

  // Set default locale
  defaultLocale: 'en',

  // Always use locale prefix for consistent URLs and SEO
  // This ensures URLs like /en/page, /es/page, etc.
  localePrefix: 'always',

  // Enable automatic locale detection from Accept-Language headers
  localeDetection: true,

  // Disable alternate link headers to reduce response size
  // With 76 locales, this prevents excessive HTTP headers
  alternateLinks: false,

  // Custom path matching - exclude API routes and static files
  pathnames: {
    // All paths use the same structure across locales
    '/': '/',
  }
});

export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Next.js internals (_next/*)
  // - Vercel internals (_vercel/*)
  // - Static files with extensions (favicon.ico, robots.txt, etc.)
  // - Cloudflare Pages functions (/functions/*)
  matcher: ['/((?!api|_next|_vercel|functions|.*\\..*).*)']
};
