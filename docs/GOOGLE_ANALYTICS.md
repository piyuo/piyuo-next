# Google Analytics Integration Documentation

## Overview

This project integrates Google Analytics 4 (GA4) using the official Next.js `@next/third-parties/google` package for optimal performance and automatic page view tracking.

## Implementation Details

### Components

- **`app/components/GoogleAnalytics.tsx`**: Main wrapper component that conditionally renders Google Analytics based on environment configuration
- **`app/[locale]/layout.tsx`**: Locale-specific layout where GoogleAnalytics component is integrated

### Key Features

- **Environment-based Configuration**: Only loads when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- **Optimized Performance**: Uses Next.js official third-party library for optimized script loading
- **Automatic Page Tracking**: Handles client-side routing automatically
- **Internationalization Support**: Works with all supported locales

### Dependencies

- `@next/third-parties`: Next.js official package for third-party integrations

## Environment Variables

### Required

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

### Setup

1. **Development** (`.env.local`):

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-DEV-ID
```

2. **Production** (Cloudflare Workers Environment Variables):

Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in the Cloudflare Dashboard under Pages > Settings > Environment variables.

## Usage

The GoogleAnalytics component is automatically included in all pages through the locale layout. No additional setup is required once the environment variable is configured.

### Manual Integration (if needed elsewhere)

```tsx
import GoogleAnalytics from '../components/GoogleAnalytics';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
```

## Privacy Considerations

- Google Analytics only loads when explicitly configured via environment variables
- Uses Next.js optimized loading strategy (`afterInteractive`)
- Follows Google Analytics 4 privacy guidelines

## Testing

The integration includes comprehensive tests:

- **Unit Tests**: `app/components/GoogleAnalytics.test.tsx`
- **Integration Tests**: `app/[locale]/layout.integration.test.tsx`

Run tests with:

```bash
pnpm test GoogleAnalytics
```

## Performance Benefits

Using `@next/third-parties/google` provides:

1. **Optimized Loading**: Scripts load after page is interactive
2. **Automatic Route Tracking**: Handles Next.js client-side navigation
3. **Reduced Bundle Size**: Third-party scripts are loaded separately
4. **Better Core Web Vitals**: Minimizes impact on page load performance

## Troubleshooting

### Google Analytics Not Loading

1. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. Check that the measurement ID format is correct (starts with `G-`)
3. Ensure the environment variable is public (prefixed with `NEXT_PUBLIC_`)

### Development vs Production

- Development: Use a test GA property to avoid polluting production data
- Production: Use your main GA property

### Debugging

In development, open browser DevTools and check:

1. Network tab for gtag script loading
2. Console for any GA-related errors
3. Google Analytics Debugger extension for real-time data

## Example Measurement IDs

```bash
# Example format (replace with your actual IDs)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-HZZ3PMK1HC  # Production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-DEV123456   # Development
```
