/**
 * Table of Contents
 * - Hreflang utilities for SEO optimization
 * - generateHreflangLinks: Creates hreflang alternate links with x-default pointing to English
 * - generateHreflangLinksWithCanonical: Creates hreflang links with x-default pointing to English (language-neutral default)
 * - convertLocaleToHreflang: Maps internal locale format to hreflang format
 * - Hreflang SEO utilities for multilingual websites
 *
 * Issue #153 Fix: x-default now always points to English (language-neutral default) instead of current page's locale
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
 * Generate hreflang alternate links with x-default pointing to language-neutral default
 * This fixes the SEO issue where x-default should always point to a language-neutral default (English)
 * instead of the current page's locale
 *
 * @param currentLocale - The current page's locale (used only for generating the full URL list)
 * @param basePath - The base path for the page (e.g., '/', '/privacy', '/terms')
 * @param baseUrl - The base URL of the website (defaults to https://piyuo.com)
 * @returns Object with alternates for Next.js metadata API where x-default points to English (language-neutral default)
 */
export function generateHreflangLinksWithCanonical(
  currentLocale: SupportedLocale,
  basePath: string = '/',
  baseUrl: string = 'https://piyuo.com'
) {
  const languages: Record<string, string> = {};

  // Generate alternate links for all supported locales
  supportedLocales.forEach((locale) => {
    const hreflangCode = convertLocaleToHreflang(locale);
    const url = `${baseUrl}/${locale}${basePath === '/' ? '' : basePath}`;
    languages[hreflangCode] = url;
  });

  // Set x-default to always point to English (language-neutral default)
  // This fixes Issue #153: x-default should not point to language-specific pages
  // but to a language-neutral default (English)
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
