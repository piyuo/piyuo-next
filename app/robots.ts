// ===============================================
// Robots.txt Generator: robots.ts
// Description: Generates robots.txt with sitemap reference
//
// Purpose:
//   - Allows all search engines to crawl the site
//   - Points to the sitemap for better indexing
//   - Follows SEO best practices
// ===============================================

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://piyuo.com/sitemap.xml',
  };
}
