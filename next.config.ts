import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for Cloudflare Workers
  },
  experimental: {
    // Enable experimental features for better performance
    esmExternals: true,
  },
  compiler: {
    // Remove console.log in production builds
    removeConsole: process.env.NODE_ENV === "production"
  },

  // Configure headers for Cloudflare Workers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

// Suppress Cloudflare prerender warnings for dynamic routes
// These warnings don't affect functionality but can be noisy
if (process.env.NODE_ENV === 'production') {
  const originalWarn = console.warn;
  console.warn = (...args: any[]) => {
    const message = args[0];
    if (typeof message === 'string' && message.includes('Invalid prerender config')) {
      return; // Suppress prerender warnings
    }
    originalWarn.apply(console, args);
  };
}

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
initOpenNextCloudflareForDev();


export default nextConfig;
