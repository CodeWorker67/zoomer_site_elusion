import { normalizeAttributionSiteUrl } from '@utils/site';

const PARTNER_STORAGE_KEY = 'landing_partner_ref';
const STAMP_STORAGE_KEY = 'landing_attribution_stamp';
const YANDEX_ID_STORAGE_KEY = 'landing_yandex_client_id';

/** Метки кампаний → целевая SEO-страница (редирект только с главной). */
export const CAMPAIGN_LANDING_PATHS = {
  happ_lab: '/happ/vpn',
  incy_lab: '/incy-vpn',
};

export function getCampaignLandingPath(stamp) {
  if (!stamp) return null;
  const key = String(stamp).trim();
  return CAMPAIGN_LANDING_PATHS[key] ?? null;
}

export function parsePartnerFromStart(value) {
  if (!value) return null;
  const raw = String(value).trim();
  const id = raw.startsWith('partner_') ? raw.slice('partner_'.length) : raw;
  if (!/^-?\d+$/.test(id)) return null;
  const num = Number(id);
  if (!Number.isFinite(num) || num === 0) return null;
  return String(num);
}

function normalizeStamp(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw || raw.startsWith('partner_')) return null;
  if (raw.startsWith('YD')) return null;
  if (parsePartnerFromStart(raw)) return null;
  return raw.slice(0, 100);
}

function normalizeYandexId(value) {
  if (!value) return null;
  const raw = String(value).trim();
  if (!raw) return null;
  return raw.slice(0, 100);
}

export function capturePartnerFromUrl() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const startRaw = params.get('start');
  const fromStart = parsePartnerFromStart(startRaw);
  const fromPartner = parsePartnerFromStart(params.get('partner'));
  const partner = fromStart || fromPartner;
  if (partner) {
    localStorage.setItem(PARTNER_STORAGE_KEY, partner);
  }
  const stampFromUrl = normalizeStamp(startRaw);
  if (stampFromUrl) {
    localStorage.setItem(STAMP_STORAGE_KEY, stampFromUrl);
  }
  const yandexId =
    normalizeYandexId(params.get('ClientIDYandex'))
    || normalizeYandexId(params.get('clientIDYandex'));
  if (yandexId) {
    localStorage.setItem(YANDEX_ID_STORAGE_KEY, yandexId);
  }

  const href = window.location.href;
  const normalizedHref = normalizeAttributionSiteUrl(href);
  if (normalizedHref !== href) {
    window.history.replaceState(window.history.state, '', normalizedHref);
  }

  return {
    partner,
    stamp: stampFromUrl,
    yandexId,
    campaignLandingPath: getCampaignLandingPath(stampFromUrl),
  };
}

export function getStoredPartnerRef() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(PARTNER_STORAGE_KEY);
}

export function getStoredStamp() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STAMP_STORAGE_KEY);
}

export function getStoredYandexId() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(YANDEX_ID_STORAGE_KEY);
}

export function clearStoredPartnerRef() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PARTNER_STORAGE_KEY);
}

export function clearStoredStamp() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STAMP_STORAGE_KEY);
}

export function clearStoredYandexId() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(YANDEX_ID_STORAGE_KEY);
}

/** Домен без www — fallback для ?start= в ссылке на бота. */
export function getAttributionDomain() {
  if (typeof window === 'undefined') return '';
  return window.location.hostname.replace(/^www\./i, '');
}

/** Telegram не передаёт точки в start — заменяем на _. */
export function formatStartForTelegram(value) {
  const s = String(value ?? '').trim();
  if (!s) return 'site';
  return s.replace(/\./g, '_').slice(0, 64);
}

/** start для бота: YD{stamp}_{yandex_id} при наличии обоих значений. */
export function buildYandexTelegramStart(stamp, yandexId) {
  const s = formatStartForTelegram(stamp);
  const y = String(yandexId ?? '').trim();
  if (!s || !y || s === 'site') return null;
  return `YD${s}_${y}`.slice(0, 64);
}

/** Значение для t.me/...?start= (всегда непустое). */
export function getBotStartParam() {
  if (typeof window !== 'undefined') {
    capturePartnerFromUrl();
  }
  const partner = getStoredPartnerRef();
  if (partner) return formatStartForTelegram(`partner_${partner}`);
  const stamp = getStoredStamp();
  const yandexId = getStoredYandexId();
  const ydStart = buildYandexTelegramStart(stamp, yandexId);
  if (ydStart) return ydStart;
  if (stamp) return formatStartForTelegram(stamp);
  return formatStartForTelegram(getAttributionDomain() || 'site');
}

export function partnerPayload() {
  const partner = getStoredPartnerRef();
  return partner ? { partner: `partner_${partner}` } : {};
}

export function attributionPayload() {
  const payload = { ...partnerPayload() };
  const stamp = getStoredStamp();
  const yandexId = getStoredYandexId();
  if (stamp) payload.stamp = stamp;
  if (yandexId) payload.yandex_id = yandexId;
  return payload;
}
