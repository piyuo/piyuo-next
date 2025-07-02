import { NextRequest, NextResponse } from 'next/server';
import { getBestMatchingLocale, supportedLocales } from './app/i18n';

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
    pathname.includes('.') // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For root path, detect locale and redirect
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || 'en';
    const bestLocale = getBestMatchingLocale(acceptLanguage);

    // Create redirect URL with detected locale
    const url = request.nextUrl.clone();
    url.pathname = `/${bestLocale}`;

    return NextResponse.redirect(url);
  }

  // For other paths without locale, redirect to English version
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname}`;
  return NextResponse.redirect(url);
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|videos|public|.*\\.).*)',
  ],
};
