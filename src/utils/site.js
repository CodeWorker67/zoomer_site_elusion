export function getSiteOrigin() {
  if (typeof window === 'undefined') return '';
  return window.location.origin;
}

export function getSiteHost() {
  if (typeof window === 'undefined') return '';
  return window.location.host;
}

/** Убирает «/» перед query: https://site.com/?x=1 → https://site.com?x=1 */
export function normalizeAttributionSiteUrl(url) {
  if (!url) return url || '';
  try {
    const parsed = new URL(url);
    if (parsed.pathname === '/' && parsed.search) {
      return `${parsed.origin}${parsed.search}${parsed.hash}`;
    }
    return url;
  } catch {
    return String(url).replace('/?', '?');
  }
}

/** Подставляет домен, с которого открыт сайт (для мультидоменного деплоя). */
export function localizeSiteLink(url) {
  if (!url || typeof window === 'undefined') return url || '';
  try {
    const parsed = new URL(url);
    parsed.protocol = window.location.protocol;
    parsed.host = window.location.host;
    return normalizeAttributionSiteUrl(parsed.toString());
  } catch {
    return normalizeAttributionSiteUrl(url);
  }
}

export function buildPartnerSiteLink(partnerCode) {
  if (!partnerCode || typeof window === 'undefined') return '';
  const raw = String(partnerCode).trim();
  const id = raw.startsWith('partner_') ? raw.slice('partner_'.length) : raw;
  return `${getSiteOrigin()}?partner=${encodeURIComponent(id)}`;
}

export function resolvePartnerSiteLink(apiLink, partnerCode) {
  if (apiLink) return localizeSiteLink(apiLink);
  return buildPartnerSiteLink(partnerCode);
}
