import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable ISR and Cloudflare Pages compatibility
  trailingSlash: true,
  images: {
    // Enable optimized images for Cloudflare
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    // Enable experimental features for better performance
    esmExternals: true,
  },
  compiler: {
    // Remove console.log in production builds
    removeConsole: process.env.NODE_ENV === "production"
  },

  // Note: static export and ISR are mutually exclusive
  // ISR requires server functions, so we don't use static export
  // output: 'export' is only used for fully static sites

  // Configure headers for Cloudflare Pages
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

export default nextConfig;
