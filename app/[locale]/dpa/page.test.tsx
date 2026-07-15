// ===============================================
// Test Suite: dpa/page.test.tsx
// Description: Tests for Data Processing Agreement page with internationalization
//
// Test Groups:
//   - Component Rendering Tests
//   - Internationalization Tests
//   - Content Structure Tests
//   - Static Generation Tests
// ===============================================

import { render, screen } from '@testing-library/react';
import DpaPage from './page';

// Mock the translation function for testing
jest.mock('../../i18n', () => {
  const mockTranslations: Record<string, string> = {
    'dpa': 'Data Processing Agreement',
    'dpa_intro_title': 'Introduction',
    'dpa_intro_body': 'This Data Processing Agreement outlines how we handle and protect your data.',
    'dpa_scope_title': 'Scope',
    'dpa_scope_body': 'This agreement applies to all personal data processing activities.',
    'dpa_security_access_title': 'Security and Access',
    'dpa_security_access_body': 'We implement industry-standard security measures to protect your data.',
    'dpa_breach_title': 'Data Breach Notification',
    'dpa_breach_body': 'We will notify you of any data breaches within 72 hours.',
    'dpa_subprocessors_title': 'Sub-processors',
    'dpa_subprocessors_body': 'We may engage sub-processors to help us provide services.',
    'dpa_compliance_title': 'Compliance',
    'dpa_compliance_body': 'We comply with all applicable data protection regulations.',
    'dpa_retention_title': 'Data Retention',
    'dpa_retention_body': 'We retain data only as long as necessary for the stated purposes.',
  };

  const mockTranslator = (key: string) => mockTranslations[key] || key;

  return {
    getTranslator: jest.fn().mockResolvedValue(mockTranslator),
    isSupportedLocale: jest.fn().mockReturnValue(true),
    supportedLocales: ['en', 'zh', 'es'],
  };
});

// Mock next/navigation
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
}));

// Mock hreflang utils
jest.mock('../../utils/hreflang-utils', () => ({
  generateHreflangLinksWithCanonical: jest.fn().mockReturnValue({}),
  getCanonicalUrl: jest.fn().mockReturnValue('https://piyuo.com/dpa'),
}));

describe('Data Processing Agreement Page', () => {

  describe('Component Rendering', () => {
    it('should render DPA page with correct title', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('Data Processing Agreement')).toBeInTheDocument();
    });

    it('should render all main DPA sections', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Scope')).toBeInTheDocument();
      expect(screen.getByText('Security and Access')).toBeInTheDocument();
      expect(screen.getByText('Data Breach Notification')).toBeInTheDocument();
      expect(screen.getByText('Sub-processors')).toBeInTheDocument();
      expect(screen.getByText('Compliance')).toBeInTheDocument();
      expect(screen.getByText('Data Retention')).toBeInTheDocument();
    });

    it('should render section content correctly', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('This Data Processing Agreement outlines how we handle and protect your data.')).toBeInTheDocument();
      expect(screen.getByText('We implement industry-standard security measures to protect your data.')).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('should load locale-specific translation file', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      // Verify English content is loaded
      expect(screen.getByText('Data Processing Agreement')).toBeInTheDocument();
      expect(screen.getByText('Introduction')).toBeInTheDocument();
    });

    it('should handle unsupported locales by calling notFound', async () => {
      const { notFound } = require('next/navigation');
      const params = { locale: 'unsupported' };

      // Mock isSupportedLocale to return false for this test
      const { isSupportedLocale } = require('../../i18n');
      isSupportedLocale.mockReturnValueOnce(false);

      try {
        await DpaPage({ params: Promise.resolve(params) });
      } catch {
        // notFound() throws
      }

      expect(notFound).toHaveBeenCalled();
    });
  });

  describe('Content Structure', () => {
    it('should have semantic HTML structure', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      // Check for main heading
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();

      // Check for section headings
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBe(7); // 7 DPA sections
    });

    it('should structure content with article element', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      const { container } = render(component);

      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });
  });

  describe('Static Generation', () => {
    it('should be an async component for static generation', () => {
      expect(DpaPage.constructor.name).toBe('AsyncFunction');
    });
  });
});
