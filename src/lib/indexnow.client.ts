/**
 * Client-safe IndexNow functions
 */
export async function submitToIndexNow(urls: string[]): Promise<{
  success: boolean;
  submitted: number;
  successful: number;
  endpoints: number;
}> {
  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urlList: urls }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('IndexNow submission failed:', error);
    throw error;
  }
}

export async function submitUrlToIndexNow(url: string) {
  return submitToIndexNow([url]);
}
