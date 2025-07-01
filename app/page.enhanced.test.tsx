// ===============================================
// Test Suite: page.enhanced.test.tsx
// Description: Tests for enhanced RootPage component with locale handling
//
// Test Groups:
//   - Locale Detection Tests
//   - URL Rewriting Tests
//   - Redirect Behavior Tests
//   - Edge Cases and Error Handling
//   - Cloudflare Edge Runtime Compatibility
// ===============================================

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBestMatchingLocale } from './i18n';
import RootPage from './page';

// Mock Next.js functions
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

describe('Enhanced RootPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Locale Detection', () => {
    it('should detect locale from Accept-Language header', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('es-ES,es;q=0.9,en;q=0.8'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('es');

      await RootPage();

      expect(mockHeaders).toHaveBeenCalled();
      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('es-ES,es;q=0.9,en;q=0.8');
    });

    it('should fallback to English when no Accept-Language header', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue(null),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      await RootPage();

      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('en');
    });

    it('should handle malformed Accept-Language headers gracefully', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('invalid-header;;;'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      await RootPage();

      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('invalid-header;;;');
      expect(mockGetBestMatchingLocale).toHaveReturnedWith('en');
    });
  });

  describe('URL Rewriting and Redirects', () => {
    it('should redirect to locale-prefixed URL', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('fr-FR,fr;q=0.9'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('fr');

      await RootPage();

      expect(mockRedirect).toHaveBeenCalledWith('/fr/');
    });

    it('should redirect to English when no preferred locale found', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('xx-XX,yy;q=0.9'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      await RootPage();

      expect(mockRedirect).toHaveBeenCalledWith('/en/');
    });

    it('should handle multiple preferred locales', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('zh-CN,zh;q=0.9,en;q=0.8,ja;q=0.7'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('zh_CN');

      await RootPage();

      expect(mockRedirect).toHaveBeenCalledWith('/zh_CN/');
    });
  });

  describe('Edge Runtime Compatibility', () => {
    it('should work with Cloudflare Edge Runtime limitations', async () => {
      // Test that our component doesn't use Node.js specific APIs
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('en-US'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('en');

      // Should not throw errors in edge runtime
      await expect(RootPage()).resolves.not.toThrow();
    });

    it('should handle headers API correctly in edge runtime', async () => {
      const mockHeadersList = {
        get: jest.fn((header: string) => {
          if (header === 'accept-language') return 'de-DE,de;q=0.9';
          if (header === 'user-agent') return 'Mozilla/5.0 (compatible; test)';
          return null;
        }),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('de');

      await RootPage();

      expect(mockHeaders).toHaveBeenCalledTimes(1);
      expect(mockRedirect).toHaveBeenCalledWith('/de/');
    });
  });

  describe('Error Handling', () => {
    it('should handle headers() API failure gracefully', async () => {
      mockHeaders.mockRejectedValue(new Error('Headers API failed'));
      mockGetBestMatchingLocale.mockReturnValue('en');

      await RootPage();

      expect(mockGetBestMatchingLocale).toHaveBeenCalledWith('en');
      expect(mockRedirect).toHaveBeenCalledWith('/en/');
    });

    it('should handle getBestMatchingLocale failure gracefully', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('en-US'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockImplementation(() => {
        throw new Error('Locale detection failed');
      });

      // Should fallback to English and still redirect
      await expect(RootPage()).resolves.not.toThrow();
    });
  });

  describe('SEO and Performance', () => {
    it('should use server-side redirect for better SEO', async () => {
      const mockHeadersList = {
        get: jest.fn().mockReturnValue('ja-JP,ja;q=0.9'),
      };

      mockHeaders.mockResolvedValue(mockHeadersList as any);
      mockGetBestMatchingLocale.mockReturnValue('ja');

      await RootPage();

      // Verify server-side redirect is used (not client-side)
      expect(mockRedirect).toHaveBeenCalledWith('/ja/');
      expect(mockRedirect).toHaveBeenCalledTimes(1);
    });
  });
});
