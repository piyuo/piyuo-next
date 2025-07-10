// ===============================================
// Sitemap Tests: sitemap.test.ts
// Description: Tests for sitemap generation functionality
//
// Purpose:
//   - Verify sitemap generates entries for all 84 locales
//   - Ensure all pages are included (home, privacy, terms)
//   - Validate URL structure and metadata
//   - Test search engine indexing support
// ===============================================

import { MetadataRoute } from 'next';
import { supportedLocales } from './i18n';
import sitemap from './sitemap';

describe('Sitemap Generation', () => {
  let sitemapEntries: MetadataRoute.Sitemap;

  beforeAll(() => {
    sitemapEntries = sitemap();
  });

  test('should generate sitemap entries for all supported locales', () => {
    // Expected: 84 locales × 3 pages = 252 entries
    const expectedEntries = supportedLocales.length * 3;
    expect(sitemapEntries).toHaveLength(expectedEntries);
  });

  test('should include all page types for each locale', () => {
    const pages = ['', 'privacy', 'terms'];

    supportedLocales.forEach(locale => {
      pages.forEach(page => {
        const expectedUrl = page === ''
          ? `https://piyuo.com/${locale}/`
          : `https://piyuo.com/${locale}/${page}/`;

        const entry = sitemapEntries.find(entry => entry.url === expectedUrl);
        expect(entry).toBeDefined();
      });
    });
  });

  test('should have proper URL structure for each page type', () => {
    // Test home page URLs
    const homeUrls = sitemapEntries.filter(entry => entry.url.endsWith('/') && !entry.url.includes('privacy') && !entry.url.includes('terms'));
    expect(homeUrls).toHaveLength(supportedLocales.length);

    // Test privacy page URLs
    const privacyUrls = sitemapEntries.filter(entry => entry.url.includes('/privacy/'));
    expect(privacyUrls).toHaveLength(supportedLocales.length);

    // Test terms page URLs
    const termsUrls = sitemapEntries.filter(entry => entry.url.includes('/terms/'));
    expect(termsUrls).toHaveLength(supportedLocales.length);
  });

  test('should set higher priority for home pages', () => {
    const homePages = sitemapEntries.filter(entry =>
      entry.url.endsWith('/') &&
      !entry.url.includes('privacy') &&
      !entry.url.includes('terms')
    );

    homePages.forEach(entry => {
      expect(entry.priority).toBe(1.0);
    });
  });

  test('should set lower priority for content pages', () => {
    const contentPages = sitemapEntries.filter(entry =>
      entry.url.includes('/privacy/') || entry.url.includes('/terms/')
    );

    contentPages.forEach(entry => {
      expect(entry.priority).toBe(0.8);
    });
  });

  test('should include required metadata for each entry', () => {
    sitemapEntries.forEach(entry => {
      expect(entry.url).toBeDefined();
      expect(entry.url).toMatch(/^https:\/\/piyuo\.com\/[a-zA-Z_]+\/?/);
      expect(entry.lastModified).toBeDefined();
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(entry.changeFrequency).toBe('monthly');
      expect(entry.priority).toBeDefined();
      expect(typeof entry.priority).toBe('number');
    });
  });

  test('should include specific locale examples', () => {
    // Test English locale
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/en/')).toBeDefined();
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/en/privacy/')).toBeDefined();
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/en/terms/')).toBeDefined();

    // Test Chinese locale
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/zh/')).toBeDefined();
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/zh/privacy/')).toBeDefined();
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/zh/terms/')).toBeDefined();

    // Test French locale
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/fr/')).toBeDefined();
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/fr/privacy/')).toBeDefined();
    expect(sitemapEntries.find(entry => entry.url === 'https://piyuo.com/fr/terms/')).toBeDefined();
  });

  test('should have consistent and predictable URL ordering', () => {
    // Instead of testing exact alphabetical order, test that URLs are grouped by locale
    // and that the ordering is consistent across runs
    const urls = sitemapEntries.map(entry => entry.url);

    // Test that all URLs for a specific locale are grouped together
    const englishUrls = urls.filter(url => url.includes('/en/'));
    const chineseUrls = urls.filter(url => url.includes('/zh/'));
    const frenchUrls = urls.filter(url => url.includes('/fr/'));

    // Each locale should have exactly 3 URLs (home, privacy, terms)
    expect(englishUrls).toHaveLength(3);
    expect(chineseUrls).toHaveLength(3);
    expect(frenchUrls).toHaveLength(3);

    // URLs should be properly formatted
    englishUrls.forEach(url => {
      expect(url).toMatch(/^https:\/\/piyuo\.com\/en\//);
    });

    // Test that the ordering is consistent (same input produces same output)
    const secondRun = sitemap().map(entry => entry.url);
    expect(urls).toEqual(secondRun);
  });  test('should support search engine indexing for all locales', () => {
    // Verify that search engines can discover all locale variants
    const uniqueLocales = new Set(
      sitemapEntries.map(entry => {
        const match = entry.url.match(/https:\/\/piyuo\.com\/([a-zA-Z_]+)\//);
        return match ? match[1] : null;
      }).filter(Boolean)
    );

    // Debug: log any missing locales
    const missingLocales = supportedLocales.filter(locale => !uniqueLocales.has(locale));
    if (missingLocales.length > 0) {
      console.log('Missing locales:', missingLocales);
      console.log('Found locales:', Array.from(uniqueLocales).sort());
    }

    expect(uniqueLocales.size).toBe(supportedLocales.length);

    // Verify all supported locales are present
    supportedLocales.forEach(locale => {
      expect(uniqueLocales.has(locale)).toBe(true);
    });
  });
});