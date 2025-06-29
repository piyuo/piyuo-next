/**
 * # Layout Hydration Tests - Fixed Version
 *
 * ## Table of Contents
 * - [Purpose](#purpose)
 * - [Test Cases](#test-cases)
 *   - [Root Layout Structure](#root-layout-structure)
 *   - [Architecture Documentation](#architecture-documentation)
 *
 * ## Purpose
 * Tests to document and validate the layout architecture in Next.js App Router
 * where the root layout delegates HTML structure to locale-specific layouts.
 * This prevents hydration mismatches by ensuring only one layout renders HTML.
 */

import { render } from '@testing-library/react';
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
  describe('Root Layout Structure', () => {
    test('should render root layout as children passthrough', () => {
      const TestComponent = () => <div data-testid="test-content">Test Content</div>;

      const { container, getByTestId } = render(
        <RootLayout>
          <TestComponent />
        </RootLayout>
      );

      // Check that content is rendered
      expect(getByTestId('test-content')).toBeInTheDocument();
      expect(getByTestId('test-content')).toHaveTextContent('Test Content');

      // Root layout should not add HTML structure
      const htmlElements = container.querySelectorAll('html');
      expect(htmlElements).toHaveLength(0);
    });

    test('should preserve component hierarchy and props', () => {
      const ParentComponent = ({ children }: { children: React.ReactNode }) => (
        <div data-testid="parent">{children}</div>
      );

      const ChildComponent = ({ text }: { text: string }) => (
        <span data-testid="child">{text}</span>
      );

      const { getByTestId } = render(
        <RootLayout>
          <ParentComponent>
            <ChildComponent text="Nested Content" />
          </ParentComponent>
        </RootLayout>
      );

      expect(getByTestId('parent')).toBeInTheDocument();
      expect(getByTestId('child')).toBeInTheDocument();
      expect(getByTestId('child')).toHaveTextContent('Nested Content');
    });
  });

  describe('Architecture Documentation', () => {
    test('should document the layout delegation pattern', () => {
      // This test documents the architecture decision:
      // Root layout: Delegates to locale layouts (no HTML structure)
      // Locale layout: Renders HTML with proper lang attribute

      const TestContent = () => <div data-testid="content">Content</div>;

      const { container } = render(
        <RootLayout>
          <TestContent />
        </RootLayout>
      );

      // Root layout should not render HTML elements
      expect(container.querySelectorAll('html')).toHaveLength(0);
      expect(container.querySelectorAll('body')).toHaveLength(0);

      // But content should be accessible
      expect(container.querySelector('[data-testid="content"]')).toBeInTheDocument();
    });

    test('should demonstrate hydration-safe architecture', () => {
      // This test shows how the architecture prevents hydration mismatches
      // by ensuring consistent rendering between server and client

      const TestContent = () => <div>Hydration Test</div>;

      // Simulate multiple renders (like server/client hydration)
      const render1 = render(<RootLayout><TestContent /></RootLayout>);
      const render2 = render(<RootLayout><TestContent /></RootLayout>);

      // Both renders should produce identical DOM structure
      expect(render1.container.innerHTML).toBe(render2.container.innerHTML);
    });
  });
});
