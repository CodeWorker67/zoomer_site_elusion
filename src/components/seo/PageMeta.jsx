import { Helmet } from 'react-helmet-async';
import { PAGE_SEO } from '@utils/pageSeo';
import { SITE_NAME, canonicalFor } from '@utils/seo';

export default function PageMeta({
  title,
  description,
  path,
  noindex = false,
}) {
  const canonical = path != null ? canonicalFor(path) : null;
  const withOg = Boolean(description && canonical && !noindex);

  return (
    <Helmet>
      <title>{title}</title>
      {description ? <meta name="description" content={description} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
      {withOg ? (
        <>
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={SITE_NAME} />
          <meta property="og:locale" content="ru_RU" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={canonical} />
        </>
      ) : null}
    </Helmet>
  );
}

export function RouteMeta({
  path,
  title: titleOverride,
  description: descriptionOverride,
  noindex: noindexOverride,
}) {
  const base = PAGE_SEO[path];
  if (!base && !titleOverride) return null;

  return (
    <PageMeta
      path={path}
      title={titleOverride ?? base.title}
      description={descriptionOverride ?? base?.description}
      noindex={noindexOverride ?? base?.noindex ?? false}
    />
  );
}
