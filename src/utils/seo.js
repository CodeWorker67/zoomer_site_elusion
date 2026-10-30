export const SITE_NAME = 'Зумерский VPN';

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://zoomersky.win').replace(/\/$/, '');

export const DEFAULT_TITLE = 'Зумерский VPN — защищённая передача данных | VLESS Reality';

export const DEFAULT_DESCRIPTION =
  'Зумерский ВПН: защищённая передача данных, приватная маршрутизация, VLESS Reality, стабильное соединение. Попробуй бесплатно!';

export function canonicalFor(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  if (p === '/') return `${SITE_URL}/`;
  return `${SITE_URL}${p}`;
}
