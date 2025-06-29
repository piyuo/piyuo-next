// ===============================================
// Test Suite: ClientPageWrapper.test.tsx
// Description: Unit tests for ClientPageWrapper component
//
// Test Groups:
//   - Setup and Teardown
//   - Translation Tests
//   - Navigation Tests
//   - Language Change Tests
//   - Scroll Behavior Tests
// ===============================================

import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import { ClientPageWrapper } from './ClientPageWrapper';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock the language utils
jest.mock('../utils/language-utils', () => ({
  getAvailableLanguages: jest.fn(() => Promise.resolve(['en', 'zh', 'fr', 'es', 'ja'])),
  getLanguageDisplayName: jest.fn((code: string) => {
    const names: Record<string, string> = {
      'en': 'English',
      'zh': '中文',
      'fr': 'Français',
      'es': 'Español',
      'ja': '日本語',
    };
    return names[code] || code;
  }),
}));

const mockPush = jest.fn();
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

const mockTranslations = {
  index_download: 'Download',
  index_language: 'Language',
};

const mockChineseTranslations = {
  index_download: '下载',
  index_language: '语言',
};

describe('ClientPageWrapper', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/en');

    // Mock scrollTo
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true,
    });

    // Mock scrollIntoView
    Element.prototype.scrollIntoView = jest.fn();
  });

  describe('Translation Tests', () => {
    it('should use next-intl translations for header text', () => {
      render(
        <ClientPageWrapper locale="en" translations={mockTranslations}>
          <div>Test content</div>
        </ClientPageWrapper>
      );

      // Check that the translated text appears
      expect(screen.getByText('Download')).toBeInTheDocument();
      expect(screen.getByText('Language')).toBeInTheDocument();
    });

    it('should use next-intl translations for Chinese locale', () => {
      render(
        <ClientPageWrapper locale="zh" translations={mockChineseTranslations}>
          <div>Test content</div>
        </ClientPageWrapper>
      );

      expect(screen.getByText('下载')).toBeInTheDocument();
      expect(screen.getByText('语言')).toBeInTheDocument();
    });
  });

  describe('Navigation Tests', () => {
    it('should navigate to correct locale when language changes', () => {
      render(
        <ClientPageWrapper locale="en" translations={mockTranslations}>
          <div>Test content</div>
        </ClientPageWrapper>
      );

      // Find and click the language selector (this will depend on implementation)
      // For now, we'll test the handleLanguageChange function logic
      const languageButton = screen.getByText('Language');
      fireEvent.click(languageButton);

      // The actual navigation logic will be tested when we implement it
    });
  });

  describe('Scroll Behavior Tests', () => {
    it('should scroll to top when logo is clicked', () => {
      render(
        <ClientPageWrapper locale="en" translations={mockTranslations}>
          <div>Test content</div>
        </ClientPageWrapper>
      );

      const logo = screen.getByText('piyuo.com');
      fireEvent.click(logo);

      expect(window.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('should scroll to download section when download button is clicked', () => {
      // Mock querySelector to return a mock element
      const mockElement = {
        scrollIntoView: jest.fn(),
      };
      document.querySelector = jest.fn().mockReturnValue(mockElement);

      render(
        <ClientPageWrapper locale="en" translations={mockTranslations}>
          <div>Test content</div>
        </ClientPageWrapper>
      );

      const downloadButton = screen.getByText('Download');
      fireEvent.click(downloadButton);

      expect(document.querySelector).toHaveBeenCalledWith('[data-download-section]');
      expect(mockElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth'
      });
    });
  });
});
