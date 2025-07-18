'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import IndexNowAdminClient from './IndexNowAdminClient';
import {
  getAdminBreadcrumbs,
  generateStructuredStaticBreadcrumbs,
} from '../../../lib/breadcrumbs';
import Head from 'next/head';

export default function Page() {
  const breadcrumbs = getAdminBreadcrumbs();
  const structuredBreadcrumbs =
    generateStructuredStaticBreadcrumbs(breadcrumbs);
  return (
    <>
      <Head>
        <title>IndexNow Admin - Looks Good, Now What</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Head>
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
