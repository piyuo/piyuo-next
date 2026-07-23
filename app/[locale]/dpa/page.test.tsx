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
import { notFound } from 'next/navigation';
import { isSupportedLocale } from '../../i18n';
import DpaPage from './page';

// Mock the translation function for testing
jest.mock('../../i18n', () => {
  const mockTranslations: Record<string, string> = {
    'dpa_intro_title': 'Data Processing Agreement (DPA)',
    'dpa_intro_body': 'This Data Processing Agreement outlines how we handle and protect your data.',
    'dpa_scope_title': '1. Optional Cloud & Scope of Processing',
    'dpa_scope_body': 'Piyuo Cloud is entirely optional.',
    'dpa_security_access_title': '2. Access Control & Security Responsibilities',
    'dpa_security_access_body': 'For customers utilizing Piyuo Cloud, access to your Enterprise dashboard is secured.',
    'dpa_breach_title': '3. Personal Data Breaches',
    'dpa_breach_body': 'If we become aware of a confirmed security breach, we will notify you.',
    'dpa_subprocessors_title': '4. Sub-processors',
    'dpa_subprocessors_body': 'If you opt into Piyuo Cloud, you authorize us to engage third-party cloud providers.',
    'dpa_compliance_title': '5. Compliance, Rights, and Audits',
    'dpa_compliance_body': 'Because the Payloads are strictly anonymous and aggregated, standard individual data requests do not apply.',
    'dpa_retention_title': '6. Data Retention and Deletion',
    'dpa_retention_body': 'We will retain and process your Payloads only for the duration of your active subscription.',
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

      expect(screen.getByRole('heading', { level: 1, name: 'Data Processing Agreement (DPA)' })).toBeInTheDocument();
    });

    it('should render all main DPA sections', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('1. Optional Cloud & Scope of Processing')).toBeInTheDocument();
      expect(screen.getByText('2. Access Control & Security Responsibilities')).toBeInTheDocument();
      expect(screen.getByText('3. Personal Data Breaches')).toBeInTheDocument();
      expect(screen.getByText('4. Sub-processors')).toBeInTheDocument();
      expect(screen.getByText('5. Compliance, Rights, and Audits')).toBeInTheDocument();
      expect(screen.getByText('6. Data Retention and Deletion')).toBeInTheDocument();
    });

    it('should render section content correctly', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('This Data Processing Agreement outlines how we handle and protect your data.')).toBeInTheDocument();
      expect(screen.getByText(/Piyuo Cloud is entirely optional/i)).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('should load locale-specific translation file', async () => {
      const params = { locale: 'en' };
      const component = await DpaPage({ params: Promise.resolve(params) });

      render(component);

      // Verify English content is loaded
      expect(screen.getByRole('heading', { level: 1, name: 'Data Processing Agreement (DPA)' })).toBeInTheDocument();
      expect(screen.getByText('1. Optional Cloud & Scope of Processing')).toBeInTheDocument();
    });

    it('should handle unsupported locales by calling notFound', async () => {
      const params = { locale: 'unsupported' };

      // Mock isSupportedLocale to return false for this test
      (isSupportedLocale as jest.Mock).mockReturnValueOnce(false);

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
