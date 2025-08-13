import { NextResponse } from 'next/server';
import packageJson from '../../../package.json';

// API route to get version information
export async function GET() {
  try {
    return NextResponse.json({
      version: packageJson.version,
      name: packageJson.name,
      timestamp: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to retrieve version information' },
      { status: 500 }
    );
  }
}
