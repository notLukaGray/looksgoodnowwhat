export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import SearchClientPage from './SearchClientPage';
import {
  getSearchBreadcrumbs,
  generateStructuredStaticBreadcrumbs,
} from '../../lib/breadcrumbs';

export default function SearchPage() {
  const breadcrumbs = getSearchBreadcrumbs();
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
      <SearchClientPage />
    </>
  );
}
