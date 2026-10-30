import { useEffect, useState } from 'react';
import { TELEGRAM } from '@utils/constants';
import { getBotStartParam } from '@utils/partner';

/** Ссылка на Telegram-бота с ?start= (метка, partner_* или домен). */
export function buildTelegramBotUrl(baseUrl = TELEGRAM.BOT_URL) {
  const base = (baseUrl || TELEGRAM.BOT_URL || '').trim();
  const start = getBotStartParam();
  if (!base) {
    return `https://t.me/zoomerskyvpn_bot?start=${encodeURIComponent(start)}`;
  }
  try {
    const url = new URL(base);
    url.searchParams.set('start', start);
    return url.toString();
  } catch {
    const sep = base.includes('?') ? '&' : '?';
    return `${base}${sep}start=${encodeURIComponent(start)}`;
  }
}

/** href с актуальным start после монтирования (подвал и др.). */
export function useTelegramBotUrl() {
  const [href, setHref] = useState(() => buildTelegramBotUrl());
  useEffect(() => {
    setHref(buildTelegramBotUrl());
  }, []);
  return href;
}
