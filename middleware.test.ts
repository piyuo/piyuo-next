// ===============================================
// Test Suite: middleware.test.ts
// Description: Tests for Next.js middleware locale detection and redirection
//
// Test Groups:
//   - Locale Detection Tests
//   - Static File Handling
//   - Existing Locale Routes
//   - Edge Cases and Error Handling
// ===============================================

import { NextRequest, NextResponse } from 'next/server';
import { middleware } from './middleware';

// Mock the i18n module
jest.mock('./app/i18n', () => {
  let mockSupportedLocales = ['en', 'fr', 'es', 'de', 'zh', 'zh-CN', 'ja'];

  return {
    getBestMatchingLocale: jest.fn(),
    get supportedLocales() {
      return mockSupportedLocales;
    },
    normalizeLocale: jest.fn(),
    __setSupportedLocales: (locales: string[]) => {
      mockSupportedLocales = locales;
    }
  };
});const { getBestMatchingLocale, normalizeLocale } = require('./app/i18n');

describe('Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock: return null for non-locale paths
    normalizeLocale.mockReturnValue(null);
  });

  describe('static file handling', () => {
    const staticPaths = [
      '/_next/static/css/app.css',
      '/api/revalidate',
      '/images/background.webp',
      '/icons/favicon.ico',
      '/videos/demo.mp4',
      '/public/file.txt',
      '/favicon.ico',
      '/robots.txt',
    ];

    staticPaths.forEach((path) => {
      it(`should skip middleware for ${path}`, async () => {
        const request = new NextRequest(`https://example.com${path}`);
        const response = middleware(request);

        // Should return NextResponse.next() which passes through
        expect(response).toBeInstanceOf(NextResponse);
      });
    });
  });

  describe('existing locale routes', () => {
    const localeRoutes = [
      '/en',
      '/en/',
      '/en/about',
      '/fr',
      '/fr/',
      '/fr/contact',
      '/zh-CN',
      '/zh-CN/',
      '/zh-CN/products',
    ];

    localeRoutes.forEach((path) => {
      it(`should pass through for existing locale route ${path}`, async () => {
        const request = new NextRequest(`https://example.com${path}`);
        const response = middleware(request);

        // Should return NextResponse.next() which passes through
        expect(response).toBeInstanceOf(NextResponse);

        // Should set the x-locale header
        const expectedLocale = path.split('/')[1]; // Extract locale from path
        if (expectedLocale) {
          expect(response.headers.get('x-locale')).toBe(expectedLocale);
        }
      });
    });
  });

  describe('root path redirection', () => {
    it('should redirect root path to detected locale', async () => {
      getBestMatchingLocale.mockReturnValue('fr');

      const request = new NextRequest('https://example.com/', {
        headers: { 'accept-language': 'fr-FR,fr;q=0.9,en;q=0.8' },
      });

      const response = middleware(request);

      expect(getBestMatchingLocale).toHaveBeenCalledWith('fr-FR,fr;q=0.9,en;q=0.8');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307); // Temporary redirect
      expect(response.headers.get('location')).toBe('https://example.com/fr');
      expect(response.headers.get('x-locale')).toBe('fr');
    });

    it('should fallback to English for missing accept-language', async () => {
      getBestMatchingLocale.mockReturnValue('en');

      const request = new NextRequest('https://example.com/');
      const response = middleware(request);

      expect(getBestMatchingLocale).toHaveBeenCalledWith('en');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('https://example.com/en');
      expect(response.headers.get('x-locale')).toBe('en');
    });

    it('should redirect root path to detected locale', async () => {
      getBestMatchingLocale.mockReturnValue('zh-CN');

      const request = new NextRequest('https://example.com/', {
        headers: {
          'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
        },
      });

      const response = await middleware(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('https://example.com/zh-CN');
      expect(response.headers.get('x-locale')).toBe('zh-CN');
    });
  });

  describe('non-root paths without locale', () => {
    const pathsWithoutLocale = [
      '/about',
      '/contact',
      '/products',
      '/blog/post-1',
    ];

    pathsWithoutLocale.forEach((path) => {
      it(`should redirect ${path} to English version`, async () => {
        const request = new NextRequest(`https://example.com${path}`);
        const response = middleware(request);

        expect(response).toBeInstanceOf(NextResponse);
        expect(response.status).toBe(307); // Temporary redirect
        expect(response.headers.get('location')).toBe(`https://example.com/en${path}`);
      });
    });

    it('should redirect /about to English version', async () => {
      const request = new NextRequest('https://example.com/about');
      const response = middleware(request);

      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('https://example.com/en/about');
      expect(response.headers.get('x-locale')).toBe('en');
    });

    it('should redirect /contact to English version', async () => {
      const request = new NextRequest('https://example.com/contact');
      const response = middleware(request);

      expect(response).toBeInstanceOf(NextResponse);
      expect(response.headers.get('x-locale')).toBe('en');
    });

    it('should redirect /products to English version', async () => {
      const request = new NextRequest('https://example.com/products');
      const response = middleware(request);

      expect(response).toBeInstanceOf(NextResponse);
      expect(response.headers.get('x-locale')).toBe('en');
    });

    it('should redirect /blog/post-1 to English version', async () => {
      const request = new NextRequest('https://example.com/blog/post-1');
      const response = middleware(request);

      expect(response).toBeInstanceOf(NextResponse);
      expect(response.headers.get('x-locale')).toBe('en');
    });
  });

  describe('edge cases', () => {
    it('should handle URLs with query parameters', async () => {
      getBestMatchingLocale.mockReturnValue('en');

      const request = new NextRequest('https://example.com/?utm_source=test');
      const response = middleware(request);

      expect(response.headers.get('location')).toBe('https://example.com/en?utm_source=test');
    });

    it('should handle URLs with fragments', async () => {
      getBestMatchingLocale.mockReturnValue('en');

      const request = new NextRequest('https://example.com/#section');
      const response = middleware(request);

      expect(response.headers.get('location')).toBe('https://example.com/en#section');
    });

    it('should preserve port numbers', async () => {
      getBestMatchingLocale.mockReturnValue('en');

      const request = new NextRequest('http://localhost:3000/');
      const response = middleware(request);

      expect(response.headers.get('location')).toBe('http://localhost:3000/en');
    });

    // Issue #125: Test for case-sensitive locale handling
    it('should handle case-sensitive locale codes by redirecting to correct case', async () => {
      // Mock en-GB as a supported locale
      const mockSupportedLocales = ['en', 'fr', 'es', 'de', 'zh', 'zh-CN', 'ja', 'en-GB'];
      require('./app/i18n').__setSupportedLocales(mockSupportedLocales);

      // Mock normalizeLocale to return 'en-GB' for 'en-gb'
      normalizeLocale.mockReturnValue('en-GB');

      const request = new NextRequest('https://example.com/en-gb/');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('en-gb');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307); // Temporary redirect
      expect(response.headers.get('location')).toBe('https://example.com/en-GB/');
      expect(response.headers.get('x-locale')).toBe('en-GB');
    });

    it('should handle case-sensitive locale codes with path by redirecting to correct case', async () => {
      // Mock en-GB as a supported locale
      const mockSupportedLocales = ['en', 'fr', 'es', 'de', 'zh', 'zh-CN', 'ja', 'en-GB'];
      require('./app/i18n').__setSupportedLocales(mockSupportedLocales);

      // Mock normalizeLocale to return 'en-GB' for 'en-gb'
      normalizeLocale.mockReturnValue('en-GB');

      const request = new NextRequest('https://example.com/en-gb/about');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('en-gb');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307); // Temporary redirect
      expect(response.headers.get('location')).toBe('https://example.com/en-GB/about');
      expect(response.headers.get('x-locale')).toBe('en-GB');
    });

    it('should handle invalid locale codes by redirecting to base locale', async () => {
      // Mock normalizeLocale to return 'en' for 'en-notexist'
      normalizeLocale.mockReturnValue('en');

      const request = new NextRequest('https://example.com/en-notexist/');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('en-notexist');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307); // Temporary redirect
      expect(response.headers.get('location')).toBe('https://example.com/en/');
      expect(response.headers.get('x-locale')).toBe('en');
    });

    it('should handle invalid locale codes with path by redirecting to base locale', async () => {
      // Mock normalizeLocale to return 'en' for 'en-notexist'
      normalizeLocale.mockReturnValue('en');

      const request = new NextRequest('https://example.com/en-notexist/about');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('en-notexist');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(307); // Temporary redirect
      expect(response.headers.get('location')).toBe('https://example.com/en/about');
      expect(response.headers.get('x-locale')).toBe('en');
    });

    // Issue #145: Test for underscore to hyphen conversion
    it('should redirect underscore locale format to hyphen format', async () => {
      // Mock en-IN as a supported locale
      const mockSupportedLocales = ['en', 'fr', 'es', 'de', 'zh', 'zh-CN', 'ja', 'en-IN'];
      require('./app/i18n').__setSupportedLocales(mockSupportedLocales);

      // Mock normalizeLocale to return 'en-IN' for 'en_IN'
      normalizeLocale.mockReturnValue('en-IN');

      const request = new NextRequest('https://example.com/en_IN/');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('en_IN');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(301); // Permanent redirect for underscore conversion
      expect(response.headers.get('location')).toBe('https://example.com/en-IN/');
      expect(response.headers.get('x-locale')).toBe('en-IN');
    });

    it('should redirect underscore locale format with path to hyphen format', async () => {
      // Mock en-IN as a supported locale
      const mockSupportedLocales = ['en', 'fr', 'es', 'de', 'zh', 'zh-CN', 'ja', 'en-IN'];
      require('./app/i18n').__setSupportedLocales(mockSupportedLocales);

      // Mock normalizeLocale to return 'en-IN' for 'en_IN'
      normalizeLocale.mockReturnValue('en-IN');

      const request = new NextRequest('https://example.com/en_IN/about');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('en_IN');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(301); // Permanent redirect for underscore conversion
      expect(response.headers.get('location')).toBe('https://example.com/en-IN/about');
      expect(response.headers.get('x-locale')).toBe('en-IN');
    });

    it('should redirect underscore locale format to base locale when regional not supported', async () => {
      // Mock normalizeLocale to return 'en' for 'en_XX'
      normalizeLocale.mockReturnValue('en');

      const request = new NextRequest('https://example.com/en_XX/');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('en_XX');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(301); // Permanent redirect for underscore conversion
      expect(response.headers.get('location')).toBe('https://example.com/en/');
      expect(response.headers.get('x-locale')).toBe('en');
    });

    it('should handle case-insensitive underscore locale codes', async () => {
      // Mock zh-CN as a supported locale
      const mockSupportedLocales = ['en', 'fr', 'es', 'de', 'zh', 'zh-CN', 'ja'];
      require('./app/i18n').__setSupportedLocales(mockSupportedLocales);

      // Mock normalizeLocale to return 'zh-CN' for 'zh_cn'
      normalizeLocale.mockReturnValue('zh-CN');

      const request = new NextRequest('https://example.com/zh_cn/products');
      const response = middleware(request);

      expect(normalizeLocale).toHaveBeenCalledWith('zh_cn');
      expect(response).toBeInstanceOf(NextResponse);
      expect(response.status).toBe(301); // Permanent redirect for underscore conversion
      expect(response.headers.get('location')).toBe('https://example.com/zh-CN/products');
      expect(response.headers.get('x-locale')).toBe('zh-CN');
    });
  });
});
