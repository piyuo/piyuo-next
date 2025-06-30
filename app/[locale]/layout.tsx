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
