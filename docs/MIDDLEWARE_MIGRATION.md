# Middleware Migration Guide

This document outlines the migration from manual routing in `app/page.tsx` to Next.js middleware for locale detection and redirection with OpenNext.js Cloudflare Workers.

## What Changed

### Before (Manual Routing)
- **Routing**: Server-side redirection in `app/page.tsx` using `redirect()`
- **Execution**: Handled at the page level after initial request
- **Performance**: Required full page component execution for redirection

### After (Middleware Approach)
- **Routing**: Edge-level redirection using Next.js middleware
- **Execution**: Handled at the request level before page processing
- **Performance**: Faster redirection with minimal processing overhead

## Technical Changes

### 1. Added Middleware (`middleware.ts`)
```typescript
// New middleware handles:
- Locale detection from Accept-Language headers
- Automatic redirection to appropriate locale
- Static file and API route bypassing
- Support for all 83+ locales
```

### 2. Simplified Root Page (`app/page.tsx`)
```typescript
// Before: Complex async function with headers and redirect
export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'en';
  const bestLocale = getBestMatchingLocale(acceptLanguage);
  redirect(`/${bestLocale}/`);
}

// After: Simple fallback component
export default function RootPage() {
  return <div>Redirecting...</div>;
}
```

### 3. OpenNext.js Configuration
- **Migration**: From `@cloudflare/next-on-pages` to `@opennextjs/cloudflare`
- **Runtime**: Cloudflare Workers with Node.js compatibility
- **Features**: Better ISR support and middleware execution

## Benefits

### 1. Performance Improvements
- **Faster Redirects**: Middleware executes at the edge before page rendering
- **Reduced Overhead**: No need to load page components for simple redirects
- **Better Caching**: Edge-level processing improves cache efficiency

### 2. Better Architecture
- **Separation of Concerns**: Routing logic separated from page components
- **Cleaner Code**: Simplified page components focus on content rendering
- **Standard Pattern**: Follows Next.js best practices for internationalization

### 3. Enhanced SEO
- **Faster Response**: Quicker redirects improve user experience
- **Proper Headers**: Middleware can set appropriate headers for crawlers
- **Edge Processing**: Better geographic distribution of routing logic

## Implementation Details

### Middleware Configuration
```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images|icons|videos|public|.*\\.).*)',
  ],
};
```

### Static File Handling
The middleware automatically bypasses:
- API routes (`/api/*`)
- Next.js internal files (`/_next/*`)
- Static assets (`/images/*`, `/icons/*`, `/videos/*`)
- Files with extensions (`.js`, `.css`, `.png`, etc.)

### Locale Detection Logic
1. Check if URL already contains a supported locale
2. If not, extract Accept-Language header
3. Use `getBestMatchingLocale()` for intelligent matching
4. Redirect to appropriate locale path

## Migration Steps

### 1. Create Middleware
```bash
# Create new middleware file
touch middleware.ts
```

### 2. Update Dependencies
```bash
# Ensure OpenNext.js is properly configured
pnpm install @opennextjs/cloudflare
```

### 3. Update Tests
- Modified `app/page.test.tsx` for new fallback behavior
- Added `middleware.test.ts` for comprehensive middleware testing

### 4. Deploy Configuration
```bash
# Build with OpenNext.js
pnpm run workers:build

# Preview locally
pnpm run preview
```

## Testing

### Unit Tests
```bash
# Test middleware functionality
pnpm test middleware.test.ts

# Test fallback page
pnpm test app/page.test.tsx
```

### Integration Testing
```bash
# Test with local Cloudflare Workers
pnpm run preview

# Test various Accept-Language headers
curl -H "Accept-Language: fr-FR,fr;q=0.9" http://localhost:8788/
curl -H "Accept-Language: zh-CN,zh;q=0.9" http://localhost:8788/
```

## Troubleshooting

### Common Issues

1. **Middleware Not Executing**
   - Check `matcher` configuration
   - Verify file is at project root (`middleware.ts`)
   - Ensure Next.js version supports middleware

2. **Infinite Redirects**
   - Verify locale detection logic
   - Check that supported locales are properly configured
   - Ensure static files are properly excluded

3. **OpenNext.js Build Errors**
   - Update to latest `@opennextjs/cloudflare` version
   - Check Node.js compatibility settings
   - Verify wrangler configuration

### Debug Mode

Enable debugging in development:
```typescript
// Add to middleware.ts
console.log('Middleware executing for:', request.nextUrl.pathname);
console.log('Accept-Language:', request.headers.get('accept-language'));
```

## Performance Monitoring

### Key Metrics
- **Redirect Time**: Time from request to redirect response
- **Cache Hit Rate**: Percentage of requests served from edge cache
- **Error Rate**: Failed redirections or middleware errors

### Cloudflare Analytics
Monitor middleware performance in Cloudflare Dashboard:
- Worker execution time
- Request volume by region
- Error rates and types

## Future Enhancements

### Potential Improvements
- [ ] Geolocation-based locale detection
- [ ] User preference persistence
- [ ] A/B testing for locale selection
- [ ] Advanced caching strategies
- [ ] Custom middleware for specific routes

### OpenNext.js Features
- [ ] R2 incremental cache integration
- [ ] Advanced edge-side includes
- [ ] Custom header management
- [ ] Enhanced ISR capabilities
