'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import IndexNowAdminClient from './IndexNowAdminClient';
import Breadcrumbs from '../../../components/Breadcrumbs';
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
      {/* Visual Breadcrumbs */}
      <div className="w-full max-w-5xl mx-auto mb-4">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
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
