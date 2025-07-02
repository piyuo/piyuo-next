import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { supportedLocales } from '../../i18n';

interface RevalidateRequestBody {
  path?: string;
  locales?: string[];
}

// API route for on-demand revalidation
// This allows content to be updated without waiting for scheduled revalidation
export async function POST(request: NextRequest) {
  // Verify authorization (optional - add your own auth logic)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json() as RevalidateRequestBody;
    const { path, locales } = body;

    if (path) {
      // Revalidate specific path
      revalidatePath(path);
      return NextResponse.json({
        message: `Revalidated path: ${path}`,
        timestamp: new Date().toISOString()
      });
    }

    if (locales) {
      // Revalidate specific locales
      const localesToRevalidate = Array.isArray(locales) ? locales : [locales];
      for (const locale of localesToRevalidate) {
        if (supportedLocales.includes(locale)) {
          revalidatePath(`/${locale}`);
        }
      }
      return NextResponse.json({
        message: `Revalidated locales: ${localesToRevalidate.join(', ')}`,
        timestamp: new Date().toISOString()
      });
    }

    // Revalidate all locales if no specific path or locales provided
    for (const locale of supportedLocales) {
      revalidatePath(`/${locale}`);
    }

    return NextResponse.json({
      message: 'Revalidated all locales',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { message: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}

// GET endpoint to check revalidation API status
export async function GET() {
  return NextResponse.json({
    message: 'ISR Revalidation API is active',
    timestamp: new Date().toISOString(),
    usage: {
      'POST /api/revalidate': 'Trigger revalidation',
      'headers': { 'Authorization': 'Bearer YOUR_REVALIDATE_TOKEN' },
      'body': {
        'path': '/specific/path (optional)',
        'locales': '["en", "zh"] (optional)'
      }
    }
  });
}
