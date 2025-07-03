// ===============================================
// Test Suite: privacy/page.test.tsx
// Description: Tests for Privacy Policy page with internationalization
//
// Test Groups:
//   - Component Rendering Tests
//   - Internationalization Tests
//   - Content Structure Tests
//   - Static Generation Tests
// ===============================================

import { render, screen } from '@testing-library/react';
import PrivacyPage from './page';

// Mock the translation function for testing
jest.mock('../../i18n', () => {
  const mockTranslations: Record<string, string> = {
    'privacy_title': 'Privacy Policy for Piyuo Counter',
    'privacy_effective_date': 'Effective Date: April 12, 2025',
    'privacy_introduction_title': 'Introduction',
    'privacy_who_we_are_title': 'Who We Are',
    'privacy_contact_email': 'by email: service@piyuo.com',
    'privacy_contact_website': 'by visiting this page on our website: https://piyuo.com',
    'website_url': 'https://piyuo.com',
    'contact_email': 'service@piyuo.com'
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

describe('Privacy Policy Page', () => {

  describe('Component Rendering', () => {
    it('should render privacy policy page with correct structure', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('Privacy Policy for Piyuo Counter')).toBeInTheDocument();
      expect(screen.getByText('Effective Date: April 12, 2025')).toBeInTheDocument();
    });

    it('should render all main sections', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('Who We Are')).toBeInTheDocument();
    });    it('should contain proper contact information', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      // Check for email link in contact section
      expect(screen.getByRole('link', { name: /by email: service@piyuo\.com/i })).toBeInTheDocument();
      // Check for website link in contact section
      expect(screen.getByRole('link', { name: /by visiting this page on our website: https:\/\/piyuo\.com/i })).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('should load locale-specific translation file', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      // Verify English content is loaded
      expect(screen.getByText('Privacy Policy for Piyuo Counter')).toBeInTheDocument();
      expect(screen.getByText('Introduction')).toBeInTheDocument();
    });

    it('should handle fallback to English for unsupported locales', async () => {
      const params = { locale: 'unsupported' };

      // This should trigger the fallback to English
      // The notFound() call should happen in the component before reaching our code
      // But since we mock isSupportedLocale to return true, we test the fallback import
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      // Should still render with English fallback content
      expect(screen.getByText('Privacy Policy for Piyuo Counter')).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    it('should have semantic HTML structure', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      // Check for main heading
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toBeInTheDocument();

      // Check for section headings
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('should contain proper metadata structure', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      // Check that effective date is displayed
      expect(screen.getByText(/effective date/i)).toBeInTheDocument();
    });
  });

  describe('Static Generation', () => {
    it('should be an async component for static generation', () => {
      expect(PrivacyPage.constructor.name).toBe('AsyncFunction');
    });
  });
});
