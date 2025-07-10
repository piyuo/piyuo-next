/**
 * Test cases for hreflang utility functions
 * Tests the generation of hreflang tags for SEO optimization
 */

import { convertLocaleToHreflang, generateHreflangLinks, getCanonicalUrl } from './hreflang-utils';

describe('hreflang utilities', () => {
  describe('convertLocaleToHreflang', () => {
    it('should convert underscore locales to hyphen format', () => {
      expect(convertLocaleToHreflang('en_US')).toBe('en-US');
      expect(convertLocaleToHreflang('zh_CN')).toBe('zh-CN');
      expect(convertLocaleToHreflang('fr_CA')).toBe('fr-CA');
    });

    it('should handle single locales without changes', () => {
      expect(convertLocaleToHreflang('en')).toBe('en');
      expect(convertLocaleToHreflang('fr')).toBe('fr');
      expect(convertLocaleToHreflang('ja')).toBe('ja');
    });
  });

  describe('generateHreflangLinks', () => {
    it('should generate hreflang links for root path', () => {
      const result = generateHreflangLinks('/');

      // Should include all supported locales
      expect(Object.keys(result.languages).length).toBe(85); // 84 locales + x-default

      // Should include some key locales
      expect(result.languages['en']).toBe('https://piyuo.com/en');
      expect(result.languages['zh-CN']).toBe('https://piyuo.com/zh_CN');
      expect(result.languages['fr-CA']).toBe('https://piyuo.com/fr_CA');

      // Should include x-default
      expect(result.languages['x-default']).toBe('https://piyuo.com/en');
    });

    it('should generate hreflang links for privacy path', () => {
      const result = generateHreflangLinks('/privacy');

      // Should include privacy path
      expect(result.languages['en']).toBe('https://piyuo.com/en/privacy');
      expect(result.languages['zh-CN']).toBe('https://piyuo.com/zh_CN/privacy');
      expect(result.languages['x-default']).toBe('https://piyuo.com/en/privacy');
    });

    it('should generate hreflang links for terms path', () => {
      const result = generateHreflangLinks('/terms');

      // Should include terms path
      expect(result.languages['en']).toBe('https://piyuo.com/en/terms');
      expect(result.languages['ja']).toBe('https://piyuo.com/ja/terms');
      expect(result.languages['x-default']).toBe('https://piyuo.com/en/terms');
    });

    it('should allow custom base URL', () => {
      const result = generateHreflangLinks('/', 'https://example.com');

      expect(result.languages['en']).toBe('https://example.com/en');
      expect(result.languages['x-default']).toBe('https://example.com/en');
    });
  });

  describe('getCanonicalUrl', () => {
    it('should generate canonical URL for root path', () => {
      expect(getCanonicalUrl('en', '/')).toBe('https://piyuo.com/en');
      expect(getCanonicalUrl('zh_CN', '/')).toBe('https://piyuo.com/zh_CN');
    });

    it('should generate canonical URL for sub-paths', () => {
      expect(getCanonicalUrl('en', '/privacy')).toBe('https://piyuo.com/en/privacy');
      expect(getCanonicalUrl('fr', '/terms')).toBe('https://piyuo.com/fr/terms');
    });

    it('should allow custom base URL', () => {
      expect(getCanonicalUrl('en', '/', 'https://example.com')).toBe('https://example.com/en');
    });
  });
});
