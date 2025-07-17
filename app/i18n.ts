import { appVersion, getBaseUrl } from '@/lib/runtime-config';
import { createTranslator } from 'next-intl';


// Supported locales - dynamically loaded
export const supportedLocales = [
  'af', 'am', 'ar', 'ar-AE', 'ar-DZ', 'ar-EG', 'az', 'bg', 'bn', 'bn-IN',
  'ca', 'cs', 'cy', 'da', 'de', 'de-AT', 'de-CH', 'el', 'en', 'en-AU', 'en-CA',
  'en-GB', 'en-IN', 'es', 'es-AR', 'es-CO', 'et', 'fa', 'fi', 'fr', 'fr-BE',
  'fr-CA', 'fr-CH', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja',
  'kk', 'ko', 'lt', 'lv', 'ml', 'mn', 'mr', 'ms', 'ms-SG', 'my', 'nb',
  'ne', 'nl', 'nl-BE', 'pl', 'pt', 'pt-PT', 'ro', 'ru', 'ru-KZ', 'ru-UA',
  'si', 'sk', 'sl', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tl', 'tr', 'uk',
  'ur', 'ur-IN', 'uz', 'vi', 'zh', 'zh-CN', 'zh-HK', 'zh-MO', 'zh-SG'
] as const;

export type SupportedLocale = typeof supportedLocales[number];

// Client-side message loading with translator creation
export async function getTranslator(locale: SupportedLocale, page: string) {
  const baseUrl = getBaseUrl();
  const version = appVersion;
  try {
    const res = await fetch(`${baseUrl}/messages/${locale}/${page}.json?v=${version}`);
    if (!res.ok) throw new Error('Not found');
    const messages = await res.json() as Record<string, string>;
    return createTranslator({ locale, messages });
  } catch {
    console.warn(`Failed to load messages for ${locale}/${page}, falling back to English`);
    const fallback = await fetch(`${baseUrl}/messages/en/${page}.json?v=${version}`);
    const messages = await fallback.json() as Record<string, string>;
    return createTranslator({ locale: 'en', messages });
  }
}

// Helper function to check if a locale is supported
export function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}

// Helper function to get the best matching locale
export function getBestMatchingLocale(requestedLocale: string): SupportedLocale {
  // Handle Accept-Language header format (e.g., "en-US,en;q=0.9,zh;q=0.8")
  const locales = requestedLocale
    .split(',')
    .map(lang => lang.split(';')[0].trim()) // Remove quality values
    .map(lang => lang.replace(/_/g, '-')) // Convert underscores to hyphens (e.g., en_GB -> en-GB)
    .filter(Boolean);

  // Try each locale in order of preference
  for (const locale of locales) {
    // Exact match
    if (isSupportedLocale(locale)) {
      return locale;
    }

    // Try base locale (e.g., 'en' for 'en-US')
    const baseLocale = locale.split('-')[0];
    if (isSupportedLocale(baseLocale)) {
      return baseLocale;
    }
  }

  // Fallback to English
  return 'en';
}

// Helper function to normalize and match locale codes with fallback
export function normalizeLocale(pathLocale: string): SupportedLocale | null {
  // Basic validation
  if (!pathLocale || typeof pathLocale !== 'string') {
    return null;
  }

  // Direct match (exact case)
  if (isSupportedLocale(pathLocale)) {
    return pathLocale;
  }

  // Check for malformed locale codes
  if (pathLocale.endsWith('-') || pathLocale.split('-').length > 2) {
    return null;
  }

  // Case-insensitive match for regional locales (e.g., en-gb -> en-GB)
  // Only apply this to regional locales (must contain hyphen)
  if (pathLocale.includes('-')) {
    const normalizedRequest = pathLocale.toLowerCase();
    const exactMatch = supportedLocales.find(locale =>
      locale.toLowerCase() === normalizedRequest
    );

    if (exactMatch) {
      return exactMatch;
    }
  }

  // Try base locale (e.g., 'en-notexist' -> 'en')
  // Only if it's a regional locale pattern (contains hyphen)
  if (pathLocale.includes('-')) {
    const baseLocale = pathLocale.split('-')[0];
    if (isSupportedLocale(baseLocale)) {
      return baseLocale;
    }
  }

  return null;
}