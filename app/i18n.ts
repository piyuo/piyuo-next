import { appVersion, getBaseUrl } from '@/lib/runtime-config';
import { createTranslator } from 'next-intl';


// Supported locales - dynamically loaded
export const supportedLocales = [
  'af', 'am', 'ar', 'ar_AE', 'ar_DZ', 'ar_EG', 'az', 'bg', 'bn', 'bn_IN',
  'ca', 'cs', 'cy', 'da', 'de', 'de_AT', 'de_CH', 'el', 'en', 'en_AU', 'en_CA',
  'en_GB', 'en_IN', 'es', 'es_AR', 'es_CO', 'et', 'fa', 'fi', 'fr', 'fr_BE',
  'fr_CA', 'fr_CH', 'gl', 'gu', 'he', 'hi', 'hr', 'hu', 'id', 'it', 'ja',
  'kk', 'ko', 'lt', 'lv', 'ml', 'mn', 'mr', 'ms', 'ms_SG', 'my', 'nb',
  'ne', 'nl', 'nl_BE', 'pl', 'pt', 'pt_PT', 'ro', 'ru', 'ru_KZ', 'ru_UA',
  'si', 'sk', 'sl', 'sr', 'sv', 'sw', 'ta', 'te', 'th', 'tl', 'tr', 'uk',
  'ur', 'ur_IN', 'uz', 'vi', 'zh', 'zh_CN', 'zh_HK', 'zh_MO', 'zh_SG'
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
    return createTranslator({ locale, messages });
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
    .filter(Boolean);

  // Try each locale in order of preference
  for (const locale of locales) {
    // Exact match
    if (isSupportedLocale(locale)) {
      return locale;
    }

    // Try with underscore (e.g., 'en_US' for 'en-US')
    const underscoreLocale = locale.replace('-', '_');
    if (isSupportedLocale(underscoreLocale)) {
      return underscoreLocale;
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
