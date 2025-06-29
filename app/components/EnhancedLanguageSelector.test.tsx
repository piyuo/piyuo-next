/**
 * Table of Contents
 * - Tests for enhanced LanguageSelector component
 * - Tests for dynamic language loading
 * - Tests for URL redirection functionality
 * - Tests for language display and selection
 */

import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import type { SupportedLocale } from '../i18n';
import { getAvailableLanguages, getLanguageDisplayName } from '../utils/language-utils';
import { EnhancedLanguageSelector } from './EnhancedLanguageSelector';

const mockGetAvailableLanguages = getAvailableLanguages as jest.MockedFunction<typeof getAvailableLanguages>;
const mockGetLanguageDisplayName = getLanguageDisplayName as jest.MockedFunction<typeof getLanguageDisplayName>;

// Mock Next.js navigation hooks
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

describe('EnhancedLanguageSelector', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    });
    mockUsePathname.mockReturnValue('/en');

    // Reset mocks
    mockGetAvailableLanguages.mockResolvedValue(['en', 'zh', 'fr', 'es', 'ja']);
    mockGetLanguageDisplayName.mockImplementation((code: string) => {
      const names: Record<string, string> = {
        'en': 'English',
        'zh': '中文',
        'fr': 'Français',
        'es': 'Español',
        'ja': '日本語',
      };
      return names[code] || code;
    });
  });

  it('renders language selector button', async () => {
    render(<EnhancedLanguageSelector currentLocale="en" languageLabel="Language" />);

    // Wait for the async language loading to complete
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    expect(screen.getByText('Language')).toBeInTheDocument();
  });

  it('displays translated language label', async () => {
    render(<EnhancedLanguageSelector currentLocale="zh" languageLabel="語言" />);

    // Wait for the async language loading to complete
    await waitFor(() => {
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    expect(screen.getByText('語言')).toBeInTheDocument();
  });

  it('opens dropdown when button is clicked', async () => {
    render(<EnhancedLanguageSelector currentLocale="en" languageLabel="Language" />);

    const button = screen.getByRole('button');

    // Wait for component to fully load before interaction
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    // Wait for languages to load and dropdown to appear
    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('中文')).toBeInTheDocument();
      expect(screen.getByText('Français')).toBeInTheDocument();
    });
  });

  it('shows current language with check mark', async () => {
    render(<EnhancedLanguageSelector currentLocale="zh" languageLabel="語言" />);

    const button = screen.getByRole('button');

    // Wait for component to fully load before interaction
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      const currentLanguageButton = screen.getByText('中文').closest('button');
      expect(currentLanguageButton).toBeInTheDocument();
      // Check for check mark SVG in the current language
      const svg = currentLanguageButton?.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('redirects to correct URL when language is selected', async () => {
    mockUsePathname.mockReturnValue('/en/about');

    render(<EnhancedLanguageSelector currentLocale="en" languageLabel="Language" />);

    const button = screen.getByRole('button');

    // Wait for component to fully load before interaction
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      const frenchButton = screen.getByText('Français').closest('button');
      expect(frenchButton).toBeInTheDocument();

      if (frenchButton) {
        fireEvent.click(frenchButton);
      }
    });

    expect(mockPush).toHaveBeenCalledWith('/fr/about');
  });

  it('handles root path correctly', async () => {
    mockUsePathname.mockReturnValue('/en');

    render(<EnhancedLanguageSelector currentLocale="en" languageLabel="Language" />);

    const button = screen.getByRole('button');

    // Wait for component to fully load before interaction
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      const spanishButton = screen.getByText('Español').closest('button');
      expect(spanishButton).toBeInTheDocument();

      if (spanishButton) {
        fireEvent.click(spanishButton);
      }
    });

    expect(mockPush).toHaveBeenCalledWith('/es');
  });

  it('closes dropdown when clicking outside', async () => {
    render(<EnhancedLanguageSelector currentLocale="en" languageLabel="Language" />);

    const button = screen.getByRole('button');

    // Wait for component to fully load before interaction
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    // Click outside
    fireEvent.mouseDown(document.body);

    await waitFor(() => {
      expect(screen.queryByText('English')).not.toBeInTheDocument();
    });
  });

  it('handles loading state gracefully', async () => {
    // Make it resolve slowly to test the loading state
    let resolvePromise: (value: SupportedLocale[]) => void;
    const slowPromise = new Promise<SupportedLocale[]>(resolve => {
      resolvePromise = resolve;
    });
    mockGetAvailableLanguages.mockReturnValue(slowPromise);

    render(<EnhancedLanguageSelector currentLocale="en" languageLabel="Language" />);

    const button = screen.getByRole('button');

    // Button should be disabled while loading
    expect(button).toBeDisabled();

    // Resolve the promise
    act(() => {
      resolvePromise!(['en', 'zh']);
    });

    // Wait for button to be enabled
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });
  });

  it('falls back gracefully when language loading fails', async () => {
    // Mock console.error to suppress the expected error message during this test
    const originalConsoleError = console.error;
    console.error = jest.fn();

    mockGetAvailableLanguages.mockRejectedValue(new Error('Failed to load languages'));

    render(<EnhancedLanguageSelector currentLocale="en" languageLabel="Language" />);

    const button = screen.getByRole('button');

    // Wait for component to load and handle error
    await waitFor(() => {
      expect(button).not.toBeDisabled();
    });

    fireEvent.click(button);

    // Wait for error handling and fallback
    await waitFor(() => {
      // Should show fallback languages (en, zh)
      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('中文')).toBeInTheDocument();
    });

    // Verify that console.error was called (testing the error handling)
    expect(console.error).toHaveBeenCalledWith('Failed to load available languages:', expect.any(Error));

    // Restore original console.error
    console.error = originalConsoleError;
  });
});
