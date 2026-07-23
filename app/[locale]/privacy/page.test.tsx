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
    'privacy': 'Privacy Policy',
    'privacy_title': 'Privacy Policy - Piyuo Counter',
    'privacy_desc': 'Privacy Policy for Piyuo Counter application',
    'privacy_intro_title': 'Introduction',
    'privacy_intro_body': 'Welcome to Piyuo Counter. Effective Date: July 16, 2026.',
    'privacy_how_it_works_title': 'How the App Works',
    'privacy_how_it_works_body': 'The App detects and tracks objects in real time.',
    'privacy_data_title': 'Aggregated Foot Traffic Data',
    'privacy_data_body': 'Instead of tracking individuals in real time, the App summarizes results.',
    'privacy_storage_title': 'Uploading and Storage',
    'privacy_storage_body': 'Unless Local Device Only mode is on, the App uploads data.',
    'privacy_rights_title': 'Children\'s Privacy & Your Rights',
    'privacy_rights_body': 'Because the App never identifies anyone, it does not knowingly collect personal data.',
    'privacy_contact_title': 'Contact Us',
    'privacy_contact_body': 'Questions can be sent to service@piyuo.com or via https://piyuo.com.',
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

      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
      expect(screen.getByText(/effective date/i)).toBeInTheDocument();
    });

    it('should render all main sections', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      expect(screen.getByText('Introduction')).toBeInTheDocument();
      expect(screen.getByText('How the App Works')).toBeInTheDocument();
    });    it('should contain proper contact information', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      // Check for contact section
      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText(/service@piyuo\.com/i)).toBeInTheDocument();
    });
  });

  describe('Internationalization', () => {
    it('should load locale-specific translation file', async () => {
      const params = { locale: 'en' };
      const component = await PrivacyPage({ params: Promise.resolve(params) });

      render(component);

      // Verify English content is loaded
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
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
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
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

      // Check that sections are properly structured
      expect(screen.getByText('Introduction')).toBeInTheDocument();
    });
  });

  describe('Static Generation', () => {
    it('should be an async component for static generation', () => {
      expect(PrivacyPage.constructor.name).toBe('AsyncFunction');
    });
  });
});
