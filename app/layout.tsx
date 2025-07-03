// ===============================================
// Root Layout: layout.tsx
// Description: Root layout that provides HTML structure fallback
//
// Purpose:
//   - Provides base HTML structure for Next.js App Router
//   - Delegates to locale-specific layouts when possible
//   - Handles fallback cases (404, errors) with proper HTML structure
// ===============================================

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}