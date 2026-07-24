/**
 * API Route: /api/v1/test
 *
 * Simple testing endpoint that:
 * - Accepts POST requests with JSON payloads
 * - Logs received data to console
 * - Stores last payload in memory
 * - Returns last payload on GET requests
 *
 * TOC:
 * - Memory storage
 * - GET handler
 * - POST handler
 */

import { NextRequest, NextResponse } from 'next/server';

// ============================================================================
// Memory storage
// ============================================================================

/**
 * In-memory storage for the last posted JSON
 * Note: This will reset when the server restarts
 */
let lastPostedData: unknown = null;
let lastPostedAt: string | null = null;

// ============================================================================
// GET handler
// ============================================================================

/**
 * GET /api/v1/test
 * Returns the last posted JSON payload
 */
export async function GET() {
  if (lastPostedData === null) {
    return NextResponse.json(
      {
        message: 'No data posted yet',
        lastPostedAt: null
      },
      { status: 200 }
    );
  }

  return NextResponse.json(
    {
      message: 'Last posted data',
      postedAt: lastPostedAt,
      data: lastPostedData,
    },
    { status: 200 }
  );
}

// ============================================================================
// POST handler
// ============================================================================

/**
 * POST /api/v1/test
 * Accepts JSON payload, logs it, and stores in memory
 */
export async function POST(request: NextRequest) {
  try {
    // Parse JSON body
    const body = await request.json();

    // Store in memory
    lastPostedData = body;
    lastPostedAt = new Date().toISOString();

    // Log to console
    console.log('='.repeat(80));
    console.log('📨 Received POST at /api/v1/test');
    console.log('⏰ Timestamp:', lastPostedAt);
    console.log('📦 Payload:');
    console.log(JSON.stringify(body, null, 2));
    console.log('='.repeat(80));

    return NextResponse.json(
      {
        success: true,
        message: 'Data received and stored',
        timestamp: lastPostedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error processing POST request:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid JSON payload'
      },
      { status: 400 }
    );
  }
}
