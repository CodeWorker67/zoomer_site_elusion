import { ROUTES } from '@utils/constants';

/** Title / description в стиле zoomer_site (публичные страницы — с description и OG). */
export const PAGE_SEO = {
  [ROUTES.HOME]: {
    title: 'Зумерский VPN — защищённая передача данных | VLESS Reality',
    description:
      'Зумерский ВПН: защищённая передача данных, VLESS Reality, стабильное соединение. До 10 Гбит/с, 4 страны. Триал 3 дня за 9 ₽.',
  },
  [ROUTES.HAPP]: {
    title: 'Тарифы — Зумерский VPN',
    description:
      'Тарифы Зумерский VPN от 189 ₽/мес за 1 устройство: безлимит, до 10 устройств в кабинете, VLESS ключ для Happ.',
  },
  [ROUTES.HAPP_FREE]: {
    title: 'Пробный доступ — Зумерский VPN',
    description:
      'Зумерский ВПН: триал 3 дня за 9 ₽, VLESS ключ для Happ. Защищённая передача данных, стабильное соединение.',
  },
  [ROUTES.HAPP_TELEGRAM]: {
    title: 'Happ VPN в Telegram | Зумерский VPN',
    description:
      'Telegram-бот Зумерский VPN: ключ, подписка, оплата и поддержка. Помощь с защищённым подключением и доступом к сервисам.',
  },
  [ROUTES.HAPP_VPN]: {
    title: 'Подключение — Зумерский VPN',
    description:
      'Подключение Зумерский VPN: защищённая передача данных на Android, iOS, Windows и macOS.',
  },
  [ROUTES.HAPP_DOWNLOAD]: {
    title: 'Инструкции по VPN на всех устройствах | Зумерский VPN',
    description:
      'Гайды VPN: защищённая передача данных, iPhone, Android, Windows VLESS. Скачать Happ. Зумерский VPN.',
  },
  [ROUTES.INCY_VPN]: {
    title: 'VPN для телефона — iPhone и Android | Зумерский ВПН',
    description:
      'VPN для iPhone и Android: оптимизация под мобильные сети, INCY и Happ, VLESS Reality. Ключ из личного кабинета.',
  },
  [ROUTES.PRIVACY]: {
    title: 'Политика конфиденциальности — Зумерский VPN',
  },
  [ROUTES.TERMS]: {
    title: 'Пользовательское соглашение — Зумерский VPN',
  },
  [ROUTES.LOGIN]: {
    title: 'Вход — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.ONBOARDING]: {
    title: 'Установка приложения — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.PROFILE]: {
    title: 'Личный кабинет — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.DASHBOARD]: {
    title: 'Личный кабинет — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.SETTINGS]: {
    title: 'Настройки — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.EARNINGS]: {
    title: 'Заработок — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.ADD_DEVICE]: {
    title: 'Добавить устройство — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.CHECKOUT]: {
    title: 'Оплата — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.TRIAL]: {
    title: 'Триал 3 дня за 9 ₽ — Зумерский VPN',
    noindex: true,
  },
  [ROUTES.SUCCESS]: {
    title: 'Оплата успешна — Зумерский VPN',
    noindex: true,
  },
};
