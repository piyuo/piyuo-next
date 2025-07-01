// ===============================================
// Module: page.tsx
// Description: Enhanced root page with robust locale detection and redirection
//
// Features:
//   - Server-side locale detection from Accept-Language headers
//   - Graceful error handling for Cloudflare Edge Runtime
//   - Fallback mechanisms for failed locale detection
//   - SEO-optimized server-side redirects with locale prefixes
//   - Edge Runtime compatibility (no Node.js APIs)
// ===============================================

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBestMatchingLocale } from './i18n';

// Configure Edge Runtime for Cloudflare compatibility
export const runtime = 'edge';

/**
 * Enhanced root page that handles locale detection and redirection
 * with comprehensive error handling for Cloudflare Pages environment.
 *
 * This component replaces middleware functionality that was incompatible
 * with Cloudflare Pages by implementing robust locale detection directly
 * in the root page component.
 */
export default async function RootPage() {
  let acceptLanguage = 'en'; // Default fallback
  let bestLocale = 'en'; // Default fallback

  try {
    // Get headers to detect user's preferred language
    const headersList = await headers();
    acceptLanguage = headersList.get('accept-language') || 'en';
  } catch (error) {
    // Graceful fallback if headers API fails in edge runtime
    console.warn('Failed to access headers in edge runtime:', error);
    acceptLanguage = 'en';
  }

  try {
    // Detect best matching locale with error handling
    bestLocale = getBestMatchingLocale(acceptLanguage);
  } catch (error) {
    // Graceful fallback if locale detection fails
    console.warn('Failed to detect best matching locale:', error);
    bestLocale = 'en';
  }

  // Server-side redirect to the best matching locale
  // This ensures proper URL structure with locale prefixes
  redirect(`/${bestLocale}/`);
}