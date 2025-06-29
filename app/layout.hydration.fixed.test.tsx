/**
 * # Layout Hydration Tests - Fixed Version
 *
 * ## Table of Contents
 * - [Purpose](#purpose)
 * - [Test Cases](#test-cases)
 *   - [HTML Structure Validation](#html-structure-validation)
 *   - [Lang Attribute Consistency](#lang-attribute-consistency)
 *
 * ## Purpose
 * Tests to ensure consistent HTML lang attribute between server and client rendering
 * to prevent hydration errors in Next.js App Router with nested layouts.
 */

import { renderToString } from 'react-dom/server';
import LocaleLayout from './[locale]/layout';
import RootLayout from './layout';

// Mock Next.js modules
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
  }),
}));

// Mock the i18n module to return predictable results
jest.mock('./i18n', () => ({
  isSupportedLocale: (locale: string) => ['en', 'zh', 'es', 'fr', 'de'].includes(locale),
}));

describe('Layout Hydration Tests', () => {
  describe('HTML Lang Attribute Consistency', () => {
    test('should render root layout with correct lang attribute', () => {
      const TestComponent = () => <div data-testid="test-content">Test Content</div>;

      const html = renderToString(
        <RootLayout>
          <TestComponent />
        </RootLayout>
      );

      // Check that HTML tag has the expected lang attribute
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('Test Content');
    });

    test('should render locale layout with correct dynamic lang attribute', () => {
      const TestComponent = () => <div data-testid="locale-content">Locale Content</div>;

      // Test with Chinese locale
      const LocaleLayoutWithParams = () => {
        const mockParams = Promise.resolve({ locale: 'zh' });
        return (
          <LocaleLayout params={mockParams}>
            <TestComponent />
          </LocaleLayout>
        );
      };

      const html = renderToString(<LocaleLayoutWithParams />);

      // Should contain the dynamic locale
      expect(html).toContain('<html lang="zh">');
      expect(html).toContain('Locale Content');
    });

    test('should demonstrate the hydration issue with current setup', () => {
      // This test documents what happens when both layouts try to render HTML
      // In a real Next.js app, this causes hydration mismatches

      const TestContent = () => <div>Test</div>;

      // Root layout HTML structure
      const rootHtml = renderToString(
        <RootLayout>
          <TestContent />
        </RootLayout>
      );

      // Locale layout HTML structure
      const LocaleLayoutWithParams = () => {
        const mockParams = Promise.resolve({ locale: 'zh' });
        return (
          <LocaleLayout params={mockParams}>
            <TestContent />
          </LocaleLayout>
        );
      };

      const localeHtml = renderToString(<LocaleLayoutWithParams />);

      // These would have different lang attributes, causing hydration mismatch
      expect(rootHtml).toContain('lang="en"');
      expect(localeHtml).toContain('lang="zh"');

      // This demonstrates the issue - same content, different HTML lang attributes
      expect(rootHtml.includes('lang="en"')).toBe(true);
      expect(localeHtml.includes('lang="zh"')).toBe(true);
      expect(rootHtml.includes('lang="zh"')).toBe(false);
      expect(localeHtml.includes('lang="en"')).toBe(false);
    });
  });
});
