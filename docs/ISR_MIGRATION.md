# ISR Migration Guide

This document outlines the migration from Static Site Generation (SSG) to Incremental Static Regeneration (ISR) and deployment from GitHub Pages to Cloudflare Pages with Functions.

## What Changed

### Before (SSG + GitHub Pages)
- **Rendering**: Pure static export with client-side locale detection
- **Deployment**: GitHub Pages with static files
- **Updates**: Required full rebuilds for any content changes
- **Performance**: Fast initial load but no dynamic updates

### After (ISR + Cloudflare Pages)
- **Rendering**: ISR with server-side locale detection and 24-hour revalidation
- **Deployment**: Cloudflare Pages with Functions support
- **Updates**: Content can be updated without full rebuilds using on-demand revalidation
- **Performance**: Fast initial load + dynamic updates + better SEO

## Technical Changes

### 1. Next.js Configuration (`next.config.ts`)
- ❌ Removed `output: 'export'` (incompatible with ISR)
- ❌ Removed `images: { unoptimized: true }`
- ✅ Added optimized image configuration for Cloudflare
- ✅ Added security headers configuration
- ✅ Enabled ISR-compatible settings

### 2. Page Components
- **Root Page (`app/page.tsx`)**:
  - ❌ Removed client-side redirection with `useRouter`
  - ✅ Added server-side redirection with `redirect()`
  - ✅ Improved Accept-Language header parsing

- **Locale Pages (`app/[locale]/page.tsx`)**:
  - ✅ Added `export const revalidate = 86400` (24-hour ISR)
  - ✅ Maintained static generation for all locales
  - ✅ Enhanced SEO with server-side rendering

### 3. Internationalization & Middleware
- ✅ Enhanced `getBestMatchingLocale()` to handle Accept-Language headers
- ✅ Better quality value parsing (e.g., "en-US,en;q=0.9,zh;q=0.8")
- ✅ Maintained backward compatibility
- ✅ **BREAKING**: Replaced next-intl middleware with custom lightweight middleware
- ✅ Custom middleware is fully edge-compatible and Cloudflare Pages optimized
- ✅ Supports all 83 locales with proper Accept-Language header parsing

### 4. API Routes
- ✅ Added `/api/revalidate` for on-demand content updates
- ✅ Supports path-specific and locale-specific revalidation
- ✅ Includes authentication for security

### 5. Cloudflare Configuration (`wrangler.toml`)
- ✅ Created Cloudflare Pages configuration
- ✅ Added security headers and caching rules
- ✅ Configured redirects for SEO
- ✅ Set up build commands

### 6. Deployment Workflow (`.github/workflows/deploy.yml`)
- ✅ Added automated Cloudflare Pages deployment
- ✅ Integrated with GitHub Actions
- ✅ Supports both production and preview deployments
- ✅ Includes test running before deployment

### 7. Package Scripts (`package.json`)
- ✅ Added `preview` script for local Cloudflare testing
- ✅ Added `deploy` script for manual deployment
- ✅ Added `wrangler` dev dependency

## ISR Configuration Details

### Revalidation Strategy
- **Static Pages**: 24-hour revalidation (`revalidate = 86400`)
- **On-Demand**: Available via `/api/revalidate` endpoint
- **Cache Duration**: 1 year expiration for CDN caching

### Content Update Workflow
1. **Scheduled**: Content automatically revalidates every 24 hours
2. **On-Demand**: POST to `/api/revalidate` with authentication
3. **Cache Busting**: Cloudflare CDN respects revalidation signals

## Deployment Benefits

### Performance Improvements
- **First Contentful Paint**: Improved with ISR pre-rendering
- **Time to Interactive**: Better with server-side locale detection
- **Global CDN**: Cloudflare's 200+ edge locations
- **Image Optimization**: Automatic WebP/AVIF conversion

### SEO Enhancements
- **Server-Side Rendering**: Better crawler support
- **Dynamic Meta Tags**: Real-time Open Graph updates
- **Structured Data**: Enhanced schema.org support
- **Core Web Vitals**: Improved LCP, FID, and CLS scores

### Developer Experience
- **Hot Reloading**: Maintained in development
- **Type Safety**: Full TypeScript support
- **Testing**: Comprehensive Jest + Playwright coverage
- **Monitoring**: Cloudflare Analytics integration

## Environment Variables

### Required for Production
```bash
# Cloudflare API credentials (GitHub Secrets)
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Optional: On-demand revalidation security
REVALIDATE_TOKEN=your_secure_token
```

### Local Development
```bash
# .env.local
REVALIDATE_TOKEN=dev-token-for-testing
```

## Monitoring and Maintenance

### ISR Health Checks
- Monitor revalidation frequency in Cloudflare Analytics
- Track cache hit rates and edge response times
- Set up alerts for revalidation failures

### Content Update Procedures
1. **Regular Updates**: Automatic every 24 hours
2. **Urgent Updates**: Use `/api/revalidate` endpoint
3. **Full Rebuild**: Deploy new version for major changes

### Performance Monitoring
- **Core Web Vitals**: Monitor via Cloudflare RUM
- **Error Tracking**: Cloudflare Browser Insights
- **Uptime**: Cloudflare Health Checks

## Migration Validation

### ✅ Completed Tasks
- [x] Remove static export configuration
- [x] Add ISR configuration to pages
- [x] Create Cloudflare Pages configuration
- [x] Update locale detection for server-side rendering
- [x] Add on-demand revalidation API
- [x] Create deployment workflow
- [x] Update package.json scripts
- [x] Add comprehensive documentation
- [x] Test build and preview functionality
- [x] Ensure all tests pass

### 🚀 Next Steps for Production
1. Set up Cloudflare Pages project
2. Configure environment variables in Cloudflare Dashboard
3. Update DNS settings (if needed)
4. Test production deployment
5. Monitor performance metrics
6. Update any external links/integrations

## Rollback Plan

If issues arise, rollback is possible by:
1. Reverting to the previous commit
2. Re-enabling static export in `next.config.ts`
3. Updating deployment back to GitHub Pages
4. The old configuration is preserved in git history

## Support and Troubleshooting

### Common Issues
- **Build Failures**: Check Next.js compatibility with ISR
- **Revalidation Issues**: Verify API endpoint authentication
- **Performance**: Monitor Cloudflare cache hit rates

### Resources
- [Next.js ISR Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
