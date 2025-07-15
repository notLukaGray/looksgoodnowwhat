'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import IndexNowAdminClient from './IndexNowAdminClient';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IndexNowAdminClient />
    </Suspense>
  );
}
