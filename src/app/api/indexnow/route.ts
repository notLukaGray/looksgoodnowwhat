import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = '57de06cb34e30d81';
const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { urlList } = body;

    if (!urlList || !Array.isArray(urlList)) {
      return NextResponse.json(
        { error: 'urlList is required and must be an array' },
        { status: 400 }
      );
    }

    // Validate URLs are from your domain
    const validUrls = urlList.filter((url: string) => {
      try {
        const urlObj = new URL(url);
        return (
          urlObj.hostname === 'looksgoodnowwhat.com' ||
          urlObj.hostname === 'lgnw.space'
        );
      } catch {
        return false;
      }
    });

    if (validUrls.length === 0) {
      return NextResponse.json(
        { error: 'No valid URLs found' },
        { status: 400 }
      );
    }

    // Prepare IndexNow payload
    const payload = {
      host: 'looksgoodnowwhat.com',
      key: INDEXNOW_KEY,
      keyLocation: 'https://looksgoodnowwhat.com/57de06cb34e30d81.txt',
      urlList: validUrls,
    };

    // Submit to all IndexNow endpoints
    const results = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map(endpoint =>
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      )
    );

    const successful = results.filter(
      result => result.status === 'fulfilled' && result.value.ok
    ).length;

    return NextResponse.json({
      success: true,
      submitted: validUrls.length,
      successful,
      endpoints: INDEXNOW_ENDPOINTS.length,
    });
  } catch (error) {
    console.error('IndexNow error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API endpoint',
    key: INDEXNOW_KEY,
    keyLocation: 'https://looksgoodnowwhat.com/57de06cb34e30d81.txt',
    endpoints: INDEXNOW_ENDPOINTS,
  });
}
