/**
 * Table of Contents
 * - Language utilities for dynamic language detection and management
 * - getAvailableLanguages: Returns available languages from supported locales list
 * - getLanguageDisplayName: Maps language codes to human-readable names
 * - isValidLanguageCode: Validates language code format
 * - Language display name mappings for common locales
 */

import { supportedLocales, type SupportedLocale } from '../i18n';

/**
 * Get all available languages from the supported locales list
 * This works in both server and client environments
 */
export async function getAvailableLanguages(): Promise<SupportedLocale[]> {
  // In a real implementation, this could fetch from an API endpoint
  // For now, we'll return all supported locales sorted alphabetically
  return [...supportedLocales].sort();
}

/**
 * Language display name mappings
 * Maps language codes to their native names
 */
const languageDisplayNames: Record<string, string> = {
  'af': 'Afrikaans',
  'am': 'አማርኛ',
  'ar': 'العربية',
  'ar-AE': 'العربية (الإمارات)',
  'ar-DZ': 'العربية (الجزائر)',
  'ar-EG': 'العربية (مصر)',
  'az': 'Azərbaycan',
  'bg': 'български',
  'bn': 'বাংলা',
  'bn-IN': 'বাংলা (ভারত)',
  'ca': 'Català',
  'cs': 'Čeština',
  'da': 'Dansk',
  'de': 'Deutsch',
  'de-AT': 'Deutsch (Österreich)',
  'de-CH': 'Deutsch (Schweiz)',
  'el': 'Ελληνικά',
  'en': 'English',
  'en-AU': 'English (Australia)',
  'en-CA': 'English (Canada)',
  'en-GB': 'English (UK)',
  'en-IN': 'English (India)',
  'es': 'Español',
  'es-AR': 'Español (Argentina)',
  'es-CO': 'Español (Colombia)',
  'et': 'Eesti',
  'fa': 'فارسی',
  'fi': 'Suomi',
  'fr': 'Français',
  'fr-BE': 'Français (Belgique)',
  'fr-CA': 'Français (Canada)',
  'fr-CH': 'Français (Suisse)',
  'gl': 'Galego',
  'gu': 'ગુજરાતી',
  'he': 'עברית',
  'hi': 'हिन्दी',
  'hr': 'Hrvatski',
  'hu': 'Magyar',
  'id': 'Bahasa Indonesia',
  'it': 'Italiano',
  'ja': '日本語',
  'kk': 'Қазақша',
  'ko': '한국어',
  'lt': 'Lietuvių',
  'lv': 'Latviešu',
  'ml': 'മലയാളം',
  'mn': 'Монгол',
  'mr': 'मराठी',
  'ms': 'Bahasa Melayu',
  'ms-SG': 'Bahasa Melayu (Singapura)',
  'my': 'မြန်မာ',
  'nb': 'Norsk bokmål',
  'ne': 'नेपाली',
  'nl': 'Nederlands',
  'nl-BE': 'Nederlands (België)',
  'pl': 'Polski',
  'pt': 'Português',
  'pt-PT': 'Português (Portugal)',
  'ro': 'Română',
  'ru': 'Русский',
  'ru-KZ': 'Русский (Казахстан)',
  'ru-UA': 'Русский (Украина)',
  'si': 'සිංහල',
  'sk': 'Slovenčina',
  'sl': 'Slovenščina',
  'sr': 'Српски',
  'sv': 'Svenska',
  'sw': 'Kiswahili',
  'ta': 'தமிழ்',
  'te': 'తెలుగు',
  'th': 'ไทย',
  'tl': 'Filipino',
  'tr': 'Türkçe',
  'uk': 'Українська',
  'ur': 'اردو',
  'ur-IN': 'اردو (بھارت)',
  'uz': 'O\'zbek',
  'vi': 'Tiếng Việt',
  'zh': '中文',
  'zh-CN': '中文 (简体)',
  'zh-HK': '中文 (香港)',
  'zh-MO': '中文 (澳門)',
  'zh-SG': '中文 (新加坡)'
};

/**
 * Get the display name for a language code
 * Returns the native name of the language, or the code if unknown
 */
export function getLanguageDisplayName(languageCode: string): string {
  // Handle regional codes by checking base language first
  const displayName = languageDisplayNames[languageCode];
  if (displayName) {
    return displayName;
  }

  // For regional codes like 'en-US', try to construct a display name
  if (languageCode.includes('-')) {
    const [baseCode, region] = languageCode.split('-');
    const baseName = languageDisplayNames[baseCode];
    if (baseName) {
      return `${baseName} (${region})`;
    }
  }

  // Fallback to the language code itself
  return languageCode;
}

/**
 * Validate if a string is a valid language code format
 */
export function isValidLanguageCode(code: string): boolean {
  if (!code || typeof code !== 'string') {
    return false;
  }

  // Basic validation: should be 2-5 characters, possibly with hyphen
  const regex = /^[a-z]{2}(-[A-Z]{2})?$/;
  return regex.test(code);
}
