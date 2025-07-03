// ===============================================
// Root Layout: layout.tsx
// Description: Root layout that provides HTML structure fallback
//
// Purpose:
//   - Provides base HTML structure for Next.js App Router
//   - Delegates to locale-specific layouts when possible
//   - Handles fallback cases (404, errors) with proper HTML structure
// ===============================================

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from 'next/headers';
import GoogleAnalytics from './components/GoogleAnalytics';
import "./globals.css";
import { isSupportedLocale } from './i18n';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://piyuo.com'),
  icons: {
    icon: '/favicon.png',
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-title": "piyuo.com",
  },
  openGraph: {
    url: "https://piyuo.com",
    type: "website",
    images: [
      {
        url: "/icons/Icon-192.png",
        width: 192,
        height: 192,
        alt: "piyuo.com",
      },
    ],
  },
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get locale from middleware header
  const headersList = await headers();
  const locale = headersList.get('x-locale');

  // Validate locale and fallback to 'en' if invalid
  const htmlLang = locale && isSupportedLocale(locale ?? '') ? locale : 'en';

  return (
    <html lang={htmlLang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <main>{children}</main>
      <GoogleAnalytics />
      </body>
    </html>
  );
}