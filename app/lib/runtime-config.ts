/**
 * Table of Contents
 * - Runtime configuration utilities for application settings
 * - appVersion: Application version from package.json
 * - getBaseUrl: Dynamic base URL detection for server/client environments
 * - Environment-aware URL handling for development and production
 */

// lib/runtime-config.ts
import pkg from '../../package.json';

export const appVersion = pkg.version;

export const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return ''; // relative URL in browser
  }

  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const defaultUrl = 'http://localhost:8080';

  return envUrl || defaultUrl;
};