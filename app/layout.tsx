// ===============================================
// Root Layout: layout.tsx
// Description: Root layout that passes through to locale-specific layouts
//
// Purpose:
//   - Provides base structure for Next.js App Router
//   - Delegates HTML structure to locale-specific layouts
//   - All metadata and fonts are handled in locale layouts
// ===============================================

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}