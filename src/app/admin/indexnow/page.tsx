'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import IndexNowAdminClient from './IndexNowAdminClient';
import {
  getAdminBreadcrumbs,
  generateStructuredStaticBreadcrumbs,
} from '../../../lib/breadcrumbs';

export default function Page() {
  const breadcrumbs = getAdminBreadcrumbs();
  const structuredBreadcrumbs =
    generateStructuredStaticBreadcrumbs(breadcrumbs);
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredBreadcrumbs),
        }}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <IndexNowAdminClient />
      </Suspense>
    </>
  );
}
