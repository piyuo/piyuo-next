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

  describe('x-default hreflang behavior (Issue #153)', () => {
    describe('original function behavior', () => {
      it('should always set x-default to English for language-neutral default', () => {
        // Test English locale - x-default should point to English
        const enHreflang = generateHreflangLinks('/');
        expect(enHreflang.languages['x-default']).toBe('https://piyuo.com/en');

        // Test Chinese locale - x-default should still point to English (language-neutral)
        const zhHreflang = generateHreflangLinks('/');
        expect(zhHreflang.languages['x-default']).toBe('https://piyuo.com/en');

        // Test privacy pages - x-default should always point to English version
        const privacyHreflang = generateHreflangLinks('/privacy');
        expect(privacyHreflang.languages['x-default']).toBe('https://piyuo.com/en/privacy');
      });
    });

    describe('correct x-default behavior for Issue #153', () => {
      it('should set x-default to root path (language-neutral) for all pages', () => {
        // For any page, x-default should point to root path that redirects based on user's locale
        const hreflang = generateHreflangLinksWithCanonical('en', '/');

        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/');
        expect(hreflang.languages['en']).toBe('https://piyuo.com/en');
      });      it('should set x-default to root path for non-English pages (Issue #153 requirement)', () => {
        // For Chinese pages, x-default should point to root path (truly language-neutral)
        const zhCanonical = getCanonicalUrl('zh-CN', '/');
        const zhHreflang = generateHreflangLinksWithCanonical('zh-CN', '/');

        // Current canonical should be Chinese
        expect(zhCanonical).toBe('https://piyuo.com/zh-CN');
        expect(zhHreflang.languages['zh-CN']).toBe('https://piyuo.com/zh-CN');

        // But x-default should point to root path (truly language-neutral)
        // This allows dynamic language selection based on user's browser settings
        expect(zhHreflang.languages['x-default']).toBe('https://piyuo.com/');
      });

      it('should handle privacy pages with x-default pointing to root privacy path', () => {
        // For non-English privacy pages, x-default should point to root privacy path
        const hreflang = generateHreflangLinksWithCanonical('zh-MO', '/privacy');

        expect(hreflang.languages['zh-MO']).toBe('https://piyuo.com/zh-MO/privacy');
        // x-default should point to root privacy path (language-neutral)
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/privacy');
      });

      it('should handle terms pages with x-default pointing to root terms path', () => {
        // For French terms pages, x-default should point to root terms path
        const hreflang = generateHreflangLinksWithCanonical('fr', '/terms');

        expect(hreflang.languages['fr']).toBe('https://piyuo.com/fr/terms');
        // x-default should point to root terms path (language-neutral)
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/terms');
      });

      it('should include all supported locales in hreflang links', () => {
        const hreflang = generateHreflangLinksWithCanonical('de', '/');

        // Should still include all 84 locales + x-default
        expect(Object.keys(hreflang.languages).length).toBe(85);

        // Should include key locales
        expect(hreflang.languages['en']).toBe('https://piyuo.com/en');
        expect(hreflang.languages['de']).toBe('https://piyuo.com/de');
        expect(hreflang.languages['zh-CN']).toBe('https://piyuo.com/zh-CN');

        // x-default should always point to root path (language-neutral)
        expect(hreflang.languages['x-default']).toBe('https://piyuo.com/');
      });

      it('should handle custom base URLs with x-default pointing to root path', () => {
        const hreflang = generateHreflangLinksWithCanonical('ja', '/', 'https://example.com');

        expect(hreflang.languages['ja']).toBe('https://example.com/ja');
        // x-default should point to root path even with custom base URL
        expect(hreflang.languages['x-default']).toBe('https://example.com/');
      });
    });
  });
});
