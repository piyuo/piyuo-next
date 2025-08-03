/**
 * Test cases for hreflang utility functions
 * Tests the generation of hreflang tags for SEO optimization
 */

import { convertLocaleToHreflang, generateHreflangLinks, generateHreflangLinksWithCanonical, getCanonicalUrl } from './hreflang-utils';

describe('hreflang utilities', () => {
  describe('convertLocaleToHreflang', () => {
    it('should convert underscore locales to hyphen format', () => {
      expect(convertLocaleToHreflang('en-US')).toBe('en-US');
      expect(convertLocaleToHreflang('zh-CN')).toBe('zh-CN');
      expect(convertLocaleToHreflang('fr-CA')).toBe('fr-CA');
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
      expect(result.languages['zh-CN']).toBe('https://piyuo.com/zh-CN');
      expect(result.languages['fr-CA']).toBe('https://piyuo.com/fr-CA');

      // Should include x-default
      expect(result.languages['x-default']).toBe('https://piyuo.com/en');
    });

    it('should generate hreflang links for privacy path', () => {
      const result = generateHreflangLinks('/privacy');

      // Should include privacy path
      expect(result.languages['en']).toBe('https://piyuo.com/en/privacy');
      expect(result.languages['zh-CN']).toBe('https://piyuo.com/zh-CN/privacy');
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
      expect(getCanonicalUrl('zh-CN', '/')).toBe('https://piyuo.com/zh-CN');
    });

    it('should generate canonical URL for sub-paths', () => {
      expect(getCanonicalUrl('en', '/privacy')).toBe('https://piyuo.com/en/privacy');
      expect(getCanonicalUrl('fr', '/terms')).toBe('https://piyuo.com/fr/terms');
    });

    it('should allow custom base URL', () => {
      expect(getCanonicalUrl('en', '/', 'https://example.com')).toBe('https://example.com/en');
    });
  });

  describe('canonical URL and x-default consistency (Issue #148)', () => {
    describe('original function shows the problem', () => {
      it('should demonstrate x-default mismatch with canonical URL for non-English locales', () => {
        // Test English locale - x-default should match canonical
        const enCanonical = getCanonicalUrl('en', '/');
        const enHreflang = generateHreflangLinks('/');
        expect(enHreflang.languages['x-default']).toBe(enCanonical);

        // Test Chinese locale - shows the mismatch problem
        const zhCanonical = getCanonicalUrl('zh-CN', '/');
        const zhHreflang = generateHreflangLinks('/');
        expect(zhCanonical).toBe('https://piyuo.com/zh-CN');
        expect(zhHreflang.languages['x-default']).toBe('https://piyuo.com/en');
        // These don't match, which causes the Google Search Console warning
        expect(zhHreflang.languages['x-default']).not.toBe(zhCanonical);
      });
    });

    describe('new function fixes the problem', () => {
      it('should ensure x-default matches canonical URL for English pages', () => {
        const canonical = getCanonicalUrl('en', '/');
        const hreflang = generateHreflangLinksWithCanonical('en', '/');

        expect(hreflang.languages['x-default']).toBe(canonical);
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/en');
      });

      it('should ensure x-default matches canonical URL for non-English pages', () => {
        const canonical = getCanonicalUrl('zh-CN', '/');
        const hreflang = generateHreflangLinksWithCanonical('zh-CN', '/');

        expect(hreflang.languages['x-default']).toBe(canonical);
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/zh-CN');
      });

      it('should handle privacy pages with proper x-default matching', () => {
        const canonical = getCanonicalUrl('en-GB', '/privacy');
        const hreflang = generateHreflangLinksWithCanonical('en-GB', '/privacy');

        expect(hreflang.languages['x-default']).toBe(canonical);
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/en-GB/privacy');
        expect(hreflang.languages['en-GB']).toBe('https://piyuo.com/en-GB/privacy');
      });

      it('should handle terms pages with proper x-default matching', () => {
        const canonical = getCanonicalUrl('fr', '/terms');
        const hreflang = generateHreflangLinksWithCanonical('fr', '/terms');

        expect(hreflang.languages['x-default']).toBe(canonical);
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/fr/terms');
        expect(hreflang.languages['fr']).toBe('https://piyuo.com/fr/terms');
      });

      it('should include all supported locales in hreflang links', () => {
        const hreflang = generateHreflangLinksWithCanonical('de', '/');

        // Should still include all 84 locales + x-default
        expect(Object.keys(hreflang.languages).length).toBe(85);

        // Should include key locales
        expect(hreflang.languages['en']).toBe('https://piyuo.com/en');
        expect(hreflang.languages['de']).toBe('https://piyuo.com/de');
        expect(hreflang.languages['zh-CN']).toBe('https://piyuo.com/zh-CN');

        // x-default should match the current locale
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/de');
      });

      it('should handle custom base URLs', () => {
        const canonical = getCanonicalUrl('ja', '/', 'https://example.com');
        const hreflang = generateHreflangLinksWithCanonical('ja', '/', 'https://example.com');

        expect(hreflang.languages['x-default']).toBe(canonical);
        expect(hreflang.languages['x-default']).toBe('https://example.com/ja');
        expect(hreflang.languages['ja']).toBe('https://example.com/ja');
      });
    });
  });
});
