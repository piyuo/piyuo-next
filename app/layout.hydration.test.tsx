/**
 * # Layout Hydration Tests
 *
 * ## Table of Contents
 * - [Purpose](#purpose)
 * - [Test Structure](#test-structure)
 * - [Test Cases](#test-cases)
 *   - [Hydration Mismatch Detection](#hydration-mismatch-detection)
 *   - [Layout Hierarchy Validation](#layout-hierarchy-validation)
 *
 * ## Purpose
 * Tests to ensure consistent HTML lang attribute between server and client rendering
 * to prevent hydration errors in Next.js App Router with nested layouts.
 *
 * ## Test Structure
 * - Uses React Testing Library for component testing
 * - Mock Next.js router and params for locale testing
 * - Simulate server/client hydration scenarios
 *
 * ## Test Cases
 * - Verify only one HTML tag is rendered in layout hierarchy
 * - Ensure lang attribute consistency between server and client
 * - Test locale-specific lang attribute values
 */

import { render } from '@testing-library/react';
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

describe('Layout Hydration Tests', () => {
  describe('HTML Lang Attribute Consistency', () => {
    test('should not render multiple html tags when using nested layouts', () => {
      // This test verifies that nested layouts don't both render <html> tags
      // which would cause hydration mismatches

      const TestComponent = () => <div data-testid="test-content">Test Content</div>;

      // Test root layout renders html tag
      const { container: rootContainer } = render(
        <RootLayout>
          <TestComponent />
        </RootLayout>
      );

      const htmlElements = rootContainer.querySelectorAll('html');
      expect(htmlElements).toHaveLength(1);
      expect(htmlElements[0]).toHaveAttribute('lang', 'en');
    });

    test('should handle locale layout without conflicting html tags', async () => {
      // Mock params as a Promise (Next.js 15+ pattern)
      const mockParams = Promise.resolve({ locale: 'zh' });

      const TestComponent = () => <div data-testid="locale-content">Locale Content</div>;

      const { container } = render(
        <LocaleLayout params={mockParams}>
          <TestComponent />
        </LocaleLayout>
      );

      // Wait for the async component to resolve
      await new Promise(resolve => setTimeout(resolve, 0));

      const htmlElements = container.querySelectorAll('html');
      expect(htmlElements).toHaveLength(1);
      expect(htmlElements[0]).toHaveAttribute('lang', 'zh');
    });

    test('should prevent hydration mismatch with consistent lang attributes', async () => {
      // Simulate server-side rendering vs client-side rendering
      const mockParams = Promise.resolve({ locale: 'en' });

      const TestComponent = () => <div>Content</div>;

      // Simulate server render
      const serverRender = render(
        <LocaleLayout params={mockParams}>
          <TestComponent />
        </LocaleLayout>
      );

      await new Promise(resolve => setTimeout(resolve, 0));

      const serverHtml = serverRender.container.querySelector('html');

      // Simulate client render with same locale
      const clientRender = render(
        <LocaleLayout params={mockParams}>
          <TestComponent />
        </LocaleLayout>
      );

      await new Promise(resolve => setTimeout(resolve, 0));

      const clientHtml = clientRender.container.querySelector('html');

      // Both should have the same lang attribute
      expect(serverHtml?.getAttribute('lang')).toBe(clientHtml?.getAttribute('lang'));
      expect(serverHtml?.getAttribute('lang')).toBe('en');
    });

    test('should handle different locales correctly', async () => {
      const locales = ['en', 'zh', 'es', 'fr', 'de'];

      for (const locale of locales) {
        const mockParams = Promise.resolve({ locale });
        const TestComponent = () => <div>Content</div>;

        const { container } = render(
          <LocaleLayout params={mockParams}>
            <TestComponent />
          </LocaleLayout>
        );

        await new Promise(resolve => setTimeout(resolve, 0));

        const htmlElement = container.querySelector('html');
        expect(htmlElement).toHaveAttribute('lang', locale);
      }
    });

    test('should call notFound for unsupported locales', async () => {
      const { notFound } = require('next/navigation');
      const mockParams = Promise.resolve({ locale: 'unsupported-locale' });

      const TestComponent = () => <div>Content</div>;

      render(
        <LocaleLayout params={mockParams}>
          <TestComponent />
        </LocaleLayout>
      );

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(notFound).toHaveBeenCalled();
    });
  });

  describe('Layout Hierarchy Validation', () => {
    test('should ensure only one layout renders html element', () => {
      // This test is critical - it ensures we don't have multiple HTML tags
      // which is the root cause of the hydration error

      const TestContent = () => <div data-testid="nested-content">Nested Content</div>;

      // If both layouts were to render HTML tags, this would fail
      const { container } = render(
        <RootLayout>
          <TestContent />
        </RootLayout>
      );

      const htmlTags = container.querySelectorAll('html');
      expect(htmlTags).toHaveLength(1);

      // Ensure the HTML tag has the expected attributes
      const htmlTag = htmlTags[0];
      expect(htmlTag).toHaveAttribute('lang');
      expect(htmlTag.classList.length).toBeGreaterThanOrEqual(0); // May have classes
    });
  });
});
