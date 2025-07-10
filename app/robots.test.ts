// ===============================================
// Test: robots.test.ts
// Description: Tests for robots.txt generation functionality
//
// Purpose:
//   - Verifies robots.txt allows all crawlers
//   - Ensures sitemap reference is included
//   - Validates proper URL structure
// ===============================================

import robots from './robots';

describe('Robots.txt Generation', () => {
  it('should allow all user agents', () => {
    const robotsConfig = robots();

    expect(robotsConfig.rules).toEqual({
      userAgent: '*',
      allow: '/',
    });
  });

  it('should include sitemap reference', () => {
    const robotsConfig = robots();

    expect(robotsConfig.sitemap).toBe('https://piyuo.com/sitemap.xml');
  });

  it('should have proper structure', () => {
    const robotsConfig = robots();

    expect(robotsConfig).toHaveProperty('rules');
    expect(robotsConfig).toHaveProperty('sitemap');
    expect(typeof robotsConfig.rules).toBe('object');
    expect(typeof robotsConfig.sitemap).toBe('string');
  });
});
