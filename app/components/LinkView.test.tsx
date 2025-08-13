// ===============================================
// Test Suite: LinkView.test.tsx
// Description: Unit tests for LinkView component locale-aware routing
//
// Test Groups:
//   - Component Rendering Tests
//   - Locale-aware URL Tests
//   - Translation Display Tests
//   - Email Functionality Tests
// ===============================================

import { render, screen } from '@testing-library/react';
import { LinkView } from './LinkView';

// Mock translations for testing
const mockTranslations = {
  index_email_us: 'Email Us',
  terms: 'Terms of Service',
  privacy: 'Privacy Policy',
};

describe('LinkView', () => {
  describe('Component Rendering', () => {
    it('renders all elements correctly without locale', () => {
      render(<LinkView translations={mockTranslations} />);

      expect(screen.getByText('Email Us')).toBeInTheDocument();
      expect(screen.getByText('service@piyuo.com')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });

    it('renders all elements correctly with locale', () => {
      render(<LinkView translations={mockTranslations} locale="en" />);

      expect(screen.getByText('Email Us')).toBeInTheDocument();
      expect(screen.getByText('service@piyuo.com')).toBeInTheDocument();
      expect(screen.getByText('Terms of Service')).toBeInTheDocument();
      expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    });
  });

  describe('Locale-aware URL Tests', () => {
    it('creates locale-prefixed URLs when locale is provided', () => {
      render(<LinkView translations={mockTranslations} locale="en" />);

      const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

      expect(termsLink).toHaveAttribute('href', '/en/terms');
      expect(privacyLink).toHaveAttribute('href', '/en/privacy');
    });

    it('creates locale-prefixed URLs for different locales', () => {
      render(<LinkView translations={mockTranslations} locale="zh" />);

      const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

      expect(termsLink).toHaveAttribute('href', '/zh/terms');
      expect(privacyLink).toHaveAttribute('href', '/zh/privacy');
    });

    it('creates locale-prefixed URLs for complex locales', () => {
      render(<LinkView translations={mockTranslations} locale="zh-CN" />);

      const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

      expect(termsLink).toHaveAttribute('href', '/zh-CN/terms');
      expect(privacyLink).toHaveAttribute('href', '/zh-CN/privacy');
    });

    it('falls back to non-prefixed URLs when locale is not provided', () => {
      render(<LinkView translations={mockTranslations} />);

      const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

      expect(termsLink).toHaveAttribute('href', '/terms');
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });

    it('falls back to non-prefixed URLs when locale is empty string', () => {
      render(<LinkView translations={mockTranslations} locale="" />);

      const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
      const privacyLink = screen.getByRole('link', { name: 'Privacy Policy' });

      expect(termsLink).toHaveAttribute('href', '/terms');
      expect(privacyLink).toHaveAttribute('href', '/privacy');
    });
  });

  describe('Translation Display Tests', () => {
    it('displays correct translation text', () => {
      const customTranslations = {
        index_email_us: 'Contact Us',
        terms: 'Terms & Conditions',
        privacy: 'Privacy Notice',
      };

      render(<LinkView translations={customTranslations} locale="en" />);

      expect(screen.getByText('Contact Us')).toBeInTheDocument();
      expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
      expect(screen.getByText('Privacy Notice')).toBeInTheDocument();
    });
  });

  describe('Email Functionality Tests', () => {
    it('renders email button with correct text', () => {
      render(<LinkView translations={mockTranslations} locale="en" />);

      const emailButton = screen.getByRole('button', { name: 'Email Us' });
      expect(emailButton).toBeInTheDocument();
    });

    it('shows email address correctly', () => {
      render(<LinkView translations={mockTranslations} locale="en" />);

      expect(screen.getByText('service@piyuo.com')).toBeInTheDocument();
    });
  });
});
