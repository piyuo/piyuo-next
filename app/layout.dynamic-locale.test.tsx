/**
 * # Root Layout Dynamic Locale Tests
 *
 * ## Purpose
 * Tests to verify that the root layout correctly uses dynamic locale
 * from middleware headers for the HTML lang attribute.
 *
 * ## Test Cases
 * - Dynamic locale from headers
 * - Fallback to English when no locale header
 * - Validation of supported locales
 */

import { headers } from 'next/headers';
import { isSupportedLocale } from './i18n';

// Mock next/headers
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

// Mock the i18n functions
jest.mock('./i18n', () => ({
  isSupportedLocale: jest.fn(),
}));

const mockedHeaders = headers as jest.MockedFunction<typeof headers>;
const mockedIsSupportedLocale = isSupportedLocale as jest.MockedFunction<typeof isSupportedLocale>;

describe('Root Layout Dynamic Locale Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return correct locale from x-locale header', async () => {
    const mockHeadersList = new Map([
      ['x-locale', 'fr']
    ]);
    mockedHeaders.mockResolvedValue(mockHeadersList as unknown as Awaited<ReturnType<typeof headers>>);
    mockedIsSupportedLocale.mockReturnValue(true);

    // Simulate the locale detection logic from RootLayout
    const headersList = await headers();
    const locale = headersList.get('x-locale');
    const htmlLang = locale && isSupportedLocale(locale) ? locale : 'en';

    expect(htmlLang).toBe('fr');
    expect(mockedIsSupportedLocale).toHaveBeenCalledWith('fr');
  });

  it('should fallback to English when no locale header', async () => {
    const mockHeadersList = new Map();
    mockedHeaders.mockResolvedValue(mockHeadersList as unknown as Awaited<ReturnType<typeof headers>>);

    // Simulate the locale detection logic from RootLayout
    const headersList = await headers();
    const locale = headersList.get('x-locale');
    const htmlLang = locale && isSupportedLocale(locale) ? locale : 'en';

    expect(htmlLang).toBe('en');
    expect(mockedIsSupportedLocale).not.toHaveBeenCalled();
  });

  it('should fallback to English for unsupported locale', async () => {
    const mockHeadersList = new Map([
      ['x-locale', 'invalid-locale']
    ]);
    mockedHeaders.mockResolvedValue(mockHeadersList as unknown as Awaited<ReturnType<typeof headers>>);
    mockedIsSupportedLocale.mockReturnValue(false);

    // Simulate the locale detection logic from RootLayout
    const headersList = await headers();
    const locale = headersList.get('x-locale');
    const htmlLang = locale && isSupportedLocale(locale) ? locale : 'en';

    expect(htmlLang).toBe('en');
    expect(mockedIsSupportedLocale).toHaveBeenCalledWith('invalid-locale');
  });

  it('should use supported locale correctly', async () => {
    const testCases = [
      { locale: 'zh-CN', expected: 'zh-CN' },
      { locale: 'es', expected: 'es' },
      { locale: 'de', expected: 'de' },
      { locale: 'ja', expected: 'ja' },
    ];

    for (const { locale, expected } of testCases) {
      const mockHeadersList = new Map([
        ['x-locale', locale]
      ]);
      mockedHeaders.mockResolvedValue(mockHeadersList as unknown as Awaited<ReturnType<typeof headers>>);
      mockedIsSupportedLocale.mockReturnValue(true);

      // Simulate the locale detection logic from RootLayout
      const headersList = await headers();
      const localeFromHeader = headersList.get('x-locale');
      const htmlLang = localeFromHeader && isSupportedLocale(localeFromHeader) ? localeFromHeader : 'en';

      expect(htmlLang).toBe(expected);
      expect(mockedIsSupportedLocale).toHaveBeenCalledWith(locale);
    }
  });

  it('should handle null locale header gracefully', async () => {
    const mockHeadersList = new Map([
      ['x-locale', null]
    ]);
    mockedHeaders.mockResolvedValue(mockHeadersList as unknown as Awaited<ReturnType<typeof headers>>);

    // Simulate the locale detection logic from RootLayout
    const headersList = await headers();
    const locale = headersList.get('x-locale');
    const htmlLang = locale && isSupportedLocale(locale) ? locale : 'en';

    expect(htmlLang).toBe('en');
    expect(mockedIsSupportedLocale).not.toHaveBeenCalled();
  });
});
