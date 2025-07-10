// ===============================================
// Sitemap Generator: sitemap.ts
// Description: Generates dynamic sitemap for all supported locales and pages
//
// Purpose:
//   - Creates sitemap entries for all 84 supported locales
//   - Includes all pages: home, privacy, terms
//   - Enables search engines to discover all localized content
//   - Supports ISR with proper URL structure
//
// Pages included:
//   - / (home page)
//   - /privacy
//   - /terms
// ===============================================

import { MetadataRoute } from 'next';
import { supportedLocales } from './i18n';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://piyuo.com';

  // Define all pages that should be included in sitemap
  const pages = [
    '',        // Home page (root)
    'privacy', // Privacy page
    'terms'    // Terms page
  ];

  // Generate sitemap entries for all locales and pages
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add entries for each locale and page combination
  // Sort locales first to ensure consistent ordering
  const sortedLocales = [...supportedLocales].sort();

  sortedLocales.forEach(locale => {
    pages.forEach(page => {
      const url = page === ''
        ? `${baseUrl}/${locale}/`
        : `${baseUrl}/${locale}/${page}/`;

      sitemapEntries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: page === '' ? 1.0 : 0.8, // Higher priority for home page
      });
    });
  });

  // Sort entries by URL for consistent ordering
  return sitemapEntries.sort((a, b) => a.url.localeCompare(b.url));
}
