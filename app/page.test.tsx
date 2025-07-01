// ===============================================
// Test Suite: page.test.tsx
// Description: Tests for RootPage locale detection and redirection
//
// Test Groups:
//   - Locale Detection Tests
//   - Redirection Tests
//   - Edge Cases and Error Handling
//   - Accept-Language Header Parsing
// ===============================================

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBestMatchingLocale } from './i18n';
import RootPage from './page';

// Mock the Next.js functions
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));

jest.mock('./i18n', () => ({
  getBestMatchingLocale: jest.fn(),
}));

const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;
const mockHeaders = headers as jest.MockedFunction<typeof headers>;
const mockGetBestMatchingLocale = getBestMatchingLocale as jest.MockedFunction<typeof getBestMatchingLocale>;

describe('RootPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('locale detection and redirection', () => {
    it('should redirect to English for no accept-language header', async () => {
      // Arrange
      const mockHeadersList = {
        get: jest.fn().mockReturnValue(null),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      // Act
      await RootPage();

      // Assert
      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('en');
      expect(mockRedirect).toHaveBeenCalledWith('/en/');
    });

    it('should redirect to detected locale from accept-language header', async () => {
      // Arrange
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('fr-FR,fr;q=0.9,en;q=0.8'),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('fr');

      // Act
      await RootPage();

      // Assert
      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('fr-FR,fr;q=0.9,en;q=0.8');
      expect(mockRedirect).toHaveBeenCalledWith('/fr/');
    });

    it('should handle complex accept-language headers', async () => {
      // Arrange
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('zh_CN');

      // Act
      await RootPage();

      // Assert
      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7');
      expect(mockRedirect).toHaveBeenCalledWith('/zh_CN/');
    });

    it('should fallback to English for unsupported locales', async () => {
      // Arrange
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('unsupported-locale'),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      // Act
      await RootPage();

      // Assert
      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('unsupported-locale');
      expect(mockRedirect).toHaveBeenCalledWith('/en/');
    });
  });

  describe('edge cases', () => {
    it('should handle empty accept-language header', async () => {
      // Arrange
      const mockHeadersList = {
        get: jest.fn().mockReturnValue(''),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      // Act
      await RootPage();

      // Assert
      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('en');
      expect(mockRedirect).toHaveBeenCalledWith('/en/');
    });

    it('should handle malformed accept-language header', async () => {
      // Arrange
      const mockHeadersList = {
        get: jest.fn().mockReturnValue(';;;invalid;;;'),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      // Act
      await RootPage();

      // Assert
      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith(';;;invalid;;;');
      expect(mockRedirect).toHaveBeenCalledWith('/en/');
    });
  });

  describe('URL structure consistency', () => {
    it('should always redirect with trailing slash for consistency', async () => {
      // Arrange
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('es-ES'),
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('es');

      // Act
      await RootPage();

      // Assert
      expect(mockRedirect).toHaveBeenCalledWith('/es/');
      expect(mockRedirect).not.toHaveBeenCalledWith('/es');
    });
  });
});
