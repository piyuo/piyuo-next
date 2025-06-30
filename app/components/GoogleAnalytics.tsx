// ===============================================
// Google Analytics Component
// Description: Next.js-optimized Google Analytics integration using @next/third-parties
//
// Purpose:
//   - Loads Google Analytics using Next.js official third-party library
//   - Handles environment-based configuration
//   - Provides optimized performance with automatic page view tracking
//
// Usage:
//   - Add to layout.tsx for site-wide tracking
//   - Requires NEXT_PUBLIC_GOOGLE_ANALYTICS_ID environment variable
//   - Uses @next/third-parties/google for optimal performance
// ===============================================

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

export default function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

  // Don't render if measurement ID is not configured
  if (!measurementId) {
    return null;
  }

  return <NextGoogleAnalytics gaId={measurementId} />;
}
