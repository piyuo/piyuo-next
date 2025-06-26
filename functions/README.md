# Cloudflare Functions

This directory contains Cloudflare Functions for serverless edge computing.

## Function Structure

Each function should be placed in its own file with the following structure:

```typescript
// functions/api/example.ts
export async function onRequest(context: EventContext) {
  return new Response('Hello from Cloudflare Functions!');
}
```

## Available Functions

- Currently no custom functions are implemented
- All functionality is handled by Next.js ISR and static assets

## Development

To test functions locally:

```bash
pnpm run preview
```

This will start a local development server with Cloudflare Functions support.

## Deployment

Functions are automatically deployed when you push to the main branch via GitHub Actions.
