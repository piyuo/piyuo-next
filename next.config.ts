import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Enable static export for all locales
  experimental: {
    // Optimize for static export
    esmExternals: true,
  },
  // Disable server-side features that don't work with static export
  compiler: {
    // Remove console.log in production builds
    removeConsole: process.env.NODE_ENV === "production"
  }
};

export default nextConfig;
