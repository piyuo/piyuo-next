/**
 * Table of Contents
 * - Hreflang utilities for SEO optimization
 * - generateHreflangLinks: Creates hreflang alternate links for all supported locales
 * - convertLocaleToHreflang: Maps internal locale format to hreflang format
 * - Hreflang SEO utilities for multilingual websites
 */

import { supportedLocales, type SupportedLocale } from '../i18n';

/**
 * Convert internal locale format to hreflang format
 * Maps underscore-separated locales to hyphen-separated hreflang format
 * @param locale - Internal locale format (e.g., 'en_US', 'zh_CN')
 * @returns Hreflang format (e.g., 'en-US', 'zh-CN')
 */
export function convertLocaleToHreflang(locale: string): string {
  return locale.replace('_', '-');
}

/**
 * Generate hreflang alternate links for all supported locales
 * Creates proper alternate links for SEO to help search engines understand
 * the relationship between different language versions of the same content
 *
 * @param basePath - The base path for the page (e.g., '/', '/privacy', '/terms')
 * @param baseUrl - The base URL of the website (defaults to https://piyuo.com)
 * @returns Object with alternates for Next.js metadata API
 */
export function generateHreflangLinks(basePath: string = '/', baseUrl: string = 'https://piyuo.com') {
  const languages: Record<string, string> = {};

  // Generate alternate links for all supported locales
  supportedLocales.forEach((locale) => {
    const hreflangCode = convertLocaleToHreflang(locale);
    const url = `${baseUrl}/${locale}${basePath === '/' ? '' : basePath}`;
    languages[hreflangCode] = url;
  });

  // Add x-default for the primary language (English)
  languages['x-default'] = `${baseUrl}/en${basePath === '/' ? '' : basePath}`;

  return {
    languages
  };
}

/**
 * Get canonical URL for a specific locale and path
 * @param locale - The locale for the canonical URL
 * @param basePath - The base path for the page
 * @param baseUrl - The base URL of the website
 * @returns Canonical URL string
 */
export function getCanonicalUrl(locale: SupportedLocale, basePath: string = '/', baseUrl: string = 'https://piyuo.com'): string {
  return `${baseUrl}/${locale}${basePath === '/' ? '' : basePath}`;
}
