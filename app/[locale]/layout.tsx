import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import GoogleAnalytics from "../components/GoogleAnalytics";
import "../globals.css";
import { isSupportedLocale } from "../i18n";

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
  title: "Piyuo - AI-Powered People Counter",
  description: "Piyuo is an AI-powered counter app that automatically tracks and counts people using your phone's camera—no internet required.",
  keywords: ["AI counter", "people counter", "traffic counting", "AI-powered tracking", "offline people counting", "smart counter", "Piyuo app"],
  authors: [{ name: "Piyuo" }],
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black",
    "apple-mobile-web-app-title": "Piyuo",
  },
  openGraph: {
    title: "Piyuo - AI-Powered People Counter",
    description: "No more manual counting! Piyuo uses AI and your phone's camera to track and count people automatically—completely offline.",
    url: "https://piyuo.com",
    type: "website",
    images: [
      {
        url: "/icons/icon.png",
        width: 192,
        height: 192,
        alt: "Piyuo App Icon",
      },
    ],
  },
};

// Generate static params for priority locales (matching page.tsx)
export async function generateStaticParams() {
  const priorityLocales = [
    'en', 'es', 'fr', 'de', 'zh', 'ja', 'pt', 'ru', 'ar', 'hi', 'it', 'ko'
  ] as const;

  return priorityLocales.map((locale) => ({
    locale: locale,
  }));
}

// Enable ISR for non-priority locales
export const dynamicParams = true;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await the params
  const { locale } = await params;

  // Validate locale
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
