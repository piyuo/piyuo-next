import { NextRequest, NextResponse } from 'next/server';
import { getBestMatchingLocale, normalizeLocale, supportedLocales } from './app/i18n';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and internal Next.js routes
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/videos/') ||
    pathname.startsWith('/public/') ||
    pathname.startsWith('/_vercel/') || // Vercel internals
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a locale, pass it as a header and continue
  if (pathnameHasLocale) {
    // Extract locale from pathname
    const locale = supportedLocales.find(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    const response = NextResponse.next();
    if (locale) {
      response.headers.set('x-locale', locale);
    }
    return response;
  }

  // Check for case-insensitive locale match or fallback to base locale
  const pathSegments = pathname.split('/').filter(Boolean);
  if (pathSegments.length > 0) {
    const potentialLocale = pathSegments[0];
    const normalizedLocale = normalizeLocale(potentialLocale);

    if (normalizedLocale) {
      // If the locale needs normalization (case fix or fallback), redirect
      if (normalizedLocale !== potentialLocale) {
        const remainingPath = pathSegments.slice(1).join('/');
        const newPath = remainingPath ? `/${normalizedLocale}/${remainingPath}` : `/${normalizedLocale}`;

        const url = request.nextUrl.clone();
        url.pathname = newPath;

        // Use 301 (permanent redirect) for canonical normalizations:
        // - underscore-to-hyphen conversion (zh_CN -> zh-CN)
        // - case changes (EN -> en, FR -> fr)
        // Use 307 (temporary redirect) only for fallbacks to base locales
        const isUnderscoreConversion = potentialLocale.includes('_');
        const isCaseChange = potentialLocale.toLowerCase() === normalizedLocale.toLowerCase() && potentialLocale !== normalizedLocale;
        const isPermanentNormalization = isUnderscoreConversion || isCaseChange;
        const response = NextResponse.redirect(url, isPermanentNormalization ? 301 : 307);
        response.headers.set('x-locale', normalizedLocale);
        return response;
      }
    }
  }

  // For root path, detect locale and redirect
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || 'en';
    const bestLocale = getBestMatchingLocale(acceptLanguage);

    // Create redirect URL with detected locale
    const url = request.nextUrl.clone();
    url.pathname = `/${bestLocale}`;

    const response = NextResponse.redirect(url);
    response.headers.set('x-locale', bestLocale);
    return response;
  }

  // For other paths without locale, redirect to English version
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  const response = NextResponse.redirect(url);
  response.headers.set('x-locale', 'en');
  return response;
}

export const config = {
  // Match all routes except those starting with _next, api, or containing a file extension
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - _vercel (Vercel internals)
     * - sitemap.xml, robots.txt (SEO files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|videos|public|_vercel|sitemap.xml|robots.txt|.*\\.).*)',
  ],
};
