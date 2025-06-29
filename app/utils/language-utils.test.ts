/**
 * Table of Contents
 * - Test suite for language utility functions
 * - Tests for getAvailableLanguages function
 * - Tests for language display name mappings
 * - Tests for language code validation
 */

import { getAvailableLanguages, getLanguageDisplayName, isValidLanguageCode } from './language-utils';

describe('Language Utils', () => {
  describe('getAvailableLanguages', () => {
    it('should return array of available language codes', async () => {
      const languages = await getAvailableLanguages();

      expect(Array.isArray(languages)).toBe(true);
      expect(languages.length).toBeGreaterThan(0);
      expect(languages).toContain('en');
      expect(languages).toContain('zh');
    });

    it('should return languages in consistent order', async () => {
      const languages1 = await getAvailableLanguages();
      const languages2 = await getAvailableLanguages();

      expect(languages1).toEqual(languages2);
    });

    it('should only return valid language codes', async () => {
      const languages = await getAvailableLanguages();

      for (const lang of languages) {
        expect(typeof lang).toBe('string');
        expect(lang.length).toBeGreaterThan(0);
      }
    });
  });

  describe('getLanguageDisplayName', () => {
    it('should return correct display names for common languages', () => {
      expect(getLanguageDisplayName('en')).toBe('English');
      expect(getLanguageDisplayName('zh')).toBe('中文');
      expect(getLanguageDisplayName('fr')).toBe('Français');
      expect(getLanguageDisplayName('es')).toBe('Español');
      expect(getLanguageDisplayName('ja')).toBe('日本語');
      expect(getLanguageDisplayName('de')).toBe('Deutsch');
    });

    it('should return language code for unknown languages', () => {
      expect(getLanguageDisplayName('unknown')).toBe('unknown');
      expect(getLanguageDisplayName('xyz')).toBe('xyz');
    });

    it('should handle regional language codes', () => {
      expect(getLanguageDisplayName('en_US')).toBe('English (US)');
      expect(getLanguageDisplayName('zh_CN')).toBe('中文 (简体)');
      expect(getLanguageDisplayName('fr_CA')).toBe('Français (Canada)');
    });
  });

  describe('isValidLanguageCode', () => {
    it('should validate correct language codes', () => {
      expect(isValidLanguageCode('en')).toBe(true);
      expect(isValidLanguageCode('zh')).toBe(true);
      expect(isValidLanguageCode('fr_CA')).toBe(true);
      expect(isValidLanguageCode('en_US')).toBe(true);
    });

    it('should reject invalid language codes', () => {
      expect(isValidLanguageCode('')).toBe(false);
      expect(isValidLanguageCode('123')).toBe(false);
      expect(isValidLanguageCode('toolong')).toBe(false);
      expect(isValidLanguageCode('en-')).toBe(false);
    });
  });
});
