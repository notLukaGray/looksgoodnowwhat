export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import SearchClientPage from './SearchClientPage';
import Breadcrumbs from '../../components/Breadcrumbs';
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
      <SearchClientPage />
    </>
  );
}
