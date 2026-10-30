export const ROUTES = {
  HOME: '/',
  HAPP: '/happ',
  HAPP_FREE: '/happ/free',
  HAPP_TELEGRAM: '/happ/telegram',
  HAPP_VPN: '/happ/vpn',
  HAPP_DOWNLOAD: '/happ/download',
  INCY_VPN: '/incy-vpn',
  LOGIN: '/auth/login',
  ONBOARDING: '/onboarding',
  PROFILE: '/profile',
  DASHBOARD: '/dashboard',
  SETTINGS: '/dashboard/settings',
  EARNINGS: '/dashboard/earnings',
  ADD_DEVICE: '/dashboard/add-device',
  CHECKOUT: '/checkout',
  SUCCESS: '/success',
  PRIVACY: '/privacy',
  TERMS: '/terms',
};

export const TELEGRAM = {
  BOT_URL: import.meta.env.VITE_TELEGRAM_BOT_URL || 'https://t.me/zoomerskyvpn_bot',
  SUPPORT_URL: 'https://t.me/suppzoomvpn',
};

export const SUPPORT_URL = import.meta.env.VITE_SUPPORT_URL || TELEGRAM.SUPPORT_URL;

export const DOWNLOADS = {
  ios: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215',
  android: 'https://play.google.com/store/apps/details?id=com.happproxy',
  desktop: 'https://www.happ.su/main',
};

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/landing_v2';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

export const BRAND = 'Зумерский VPN';
export const BRAND_META = 'Зумерский ВПН';

/**
 * Тарифы для маркетинговых страниц (карточки на /happ, /incy-vpn).
 * Покупка в личном кабинете идёт через бегунки — см. @utils/pricing.
 */
/** Цены за 1 устройство; в кабинете можно выбрать до 10. */
export const TARIFFS = [
  { id: '365', label: '1 год', price: 1299, days: 365, devices: 1, traffic: 'Безлимит' },
  { id: '180', label: '6 месяцев', price: 749, days: 180, devices: 1, traffic: 'Безлимит' },
  { id: '90', label: '3 месяца', price: 449, days: 90, devices: 1, traffic: 'Безлимит', popular: true },
  { id: '30', label: '1 месяц', price: 189, days: 30, devices: 1, traffic: 'Безлимит' },
];

/** Все тарифы для страниц «Подписка» и главной */
export const HOME_TARIFFS = TARIFFS;

export const PAYMENT_METHODS = [
  { id: 'sbp', label: 'СБП' },
  { id: 'card', label: 'Карта РФ' },
];

/** Пункты меню как на kavkazvpn.ru (без переключателя языка) */
export const NAV_LINKS = [
  { path: ROUTES.HAPP, label: 'Подписка' },
  { path: ROUTES.HAPP_FREE, label: 'Бесплатно' },
  { path: ROUTES.HAPP_DOWNLOAD, label: 'Скачать Happ' },
];

export const DOWNLOAD_LINKS = [
  { platform: 'iPhone (iOS)', label: 'App Store', href: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215' },
  { platform: 'Android', label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.happproxy' },
  { platform: 'Android (APK)', label: 'GitHub', href: 'https://github.com/Happ-proxy/happ-android/releases' },
  { platform: 'macOS', label: 'App Store', href: 'https://apps.apple.com/app/happ-proxy-utility/id6504287215' },
  { platform: 'Windows', label: 'GitHub', href: 'https://github.com/Happ-proxy/happ-desktop/releases' },
];

/** Ссылки на приложения по платформе (из бота) */
export const APP_DOWNLOAD = {
  ios: {
    happ: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
    incy: 'https://apps.apple.com/ru/app/incy/id6756943388',
    label: 'iPhone',
  },
  android: {
    happ: 'https://play.google.com/store/apps/details?id=com.happproxy',
    incy: 'https://play.google.com/store/apps/details?id=llc.itdev.incy',
    label: 'Android',
  },
  windows: {
    happ: 'https://github.com/Happ-proxy/happ-desktop/releases/latest/download/setup-Happ.x64.exe',
    incy: 'https://github.com/INCY-DEV/incy-platforms/releases/latest/download/incy-windows-setup.exe',
    label: 'Windows',
  },
  macos: {
    happ: 'https://apps.apple.com/ru/app/happ-proxy-utility-plus/id6746188973',
    incy: 'https://github.com/INCY-DEV/incy-platforms/releases/latest/download/incy-macos-arm64.dmg',
    label: 'macOS',
  },
};

export function happImportUrl(subUrl) {
  if (!subUrl) return null;
  return `happ://add/${subUrl}`;
}

export function incyImportUrl(subUrl) {
  if (!subUrl) return null;
  return `incy://import/${subUrl}`;
}

export const SERVERS = [
  'Германия', 'Нидерланды', 'Польша', 'США',
];

export const HOME_FAQ = [
  {
    q: 'Что такое подписка Happ?',
    a: 'Подписка Happ — это оплаченный период доступа к VPN-сервису для приложения Happ. После оформления вы получаете готовый VLESS-ключ в личном кабинете и добавляете его в Happ по QR-коду или ссылке.',
  },
  {
    q: 'Чем подписка отличается от разового ключа?',
    a: 'Ключ — это способ подключения (строка vless:// или QR-код), а подписка — оплаченный период, в течение которого этот ключ открывает доступ. Когда подписка заканчивается, ключ в Happ остаётся, но соединение перестаёт работать — продлите подписку, и тот же ключ снова откроет интернет.',
  },
  {
    q: 'Что такое VPN ключ?',
    a: 'VPN ключ — это готовые данные для подключения, которые можно импортировать в приложение за пару секунд. После регистрации вы сразу получаете ключ для подключения.',
  },
  {
    q: 'Что такое хапп ключ?',
    a: 'Хапп ключ — это ключ для подключения в приложении Happ. Его можно импортировать по QR-коду или ссылке из личного кабинета.',
  },
  {
    q: 'Как получить хапп впн ключ?',
    a: 'Зарегистрируйтесь на Зумерский VPN по email или Google, либо перейдите в Telegram-бот. Ключ появится в личном кабинете сразу после регистрации.',
  },
  {
    q: 'Что такое VLESS ключ?',
    a: 'VLESS ключ — это формат подключения, который используется в Happ и других совместимых клиентах. Он импортируется в приложение за несколько секунд.',
  },
];
