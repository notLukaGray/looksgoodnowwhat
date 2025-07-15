import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    // Server-side environment variable (not exposed to client)
    const ADMIN_SECRET = process.env.INDEXNOW_ADMIN_SECRET || 'letmein';

    if (secret === ADMIN_SECRET) {
      return NextResponse.json({ authorized: true });
    } else {
      return NextResponse.json({ authorized: false }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
