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
  'ar': 'العربية',
  'bn': 'বাংলা',
  'de': 'Deutsch',
  'el': 'Ελληνικά',
  'en': 'English',
  'es': 'Español',
  'fa': 'فارسی',
  'fr': 'Français',
  'he': 'עברית',
  'hi': 'हिन्दी',
  'hu': 'Magyar',
  'id': 'Bahasa Indonesia',
  'it': 'Italiano',
  'ja': '日本語',
  'ko': '한국어',
  'ms': 'Bahasa Melayu',
  'my': 'မြန်မာ',
  'nl': 'Nederlands',
  'pl': 'Polski',
  'pt': 'Português',
  'ro': 'Română',
  'ru': 'Русский',
  'sr': 'Српски',
  'th': 'ไทย',
  'tr': 'Türkçe',
  'uk': 'Українська',
  'vi': 'Tiếng Việt',
  'zh': '中文',
  'zh-CN': '中文 (简体)'
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
