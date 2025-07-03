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
jest.mock('./app/i18n', () => ({
  getBestMatchingLocale: jest.fn(),
  supportedLocales: ['en', 'fr', 'es', 'de', 'zh', 'zh_CN', 'ja'],
}));

const { getBestMatchingLocale } = require('./app/i18n');

describe('Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
      '/zh_CN',
      '/zh_CN/',
      '/zh_CN/products',
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

    it('should handle complex accept-language headers', async () => {
      getBestMatchingLocale.mockReturnValue('zh_CN');

      const request = new NextRequest('https://example.com/', {
        headers: { 'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8' },
      });

      const response = middleware(request);

      expect(getBestMatchingLocale).toHaveBeenCalledWith('zh-CN,zh;q=0.9,en;q=0.8');
      expect(response.headers.get('x-locale')).toBe('zh_CN');
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
  });
});
