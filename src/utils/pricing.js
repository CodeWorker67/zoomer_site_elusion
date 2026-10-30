/**
 * Тарифы «срок × устройства» (landing_v2).
 * Источник истины — бэкенд (GET /config/tariffs); эта таблица — запасной вариант
 * на время загрузки и должна совпадать с payments/landing_v2_pricing.py.
 */

export const DEVICES_MIN = 1;
export const DEVICES_MAX = 10;

/** id совпадает с duration в payload платежа (дней) */
export const SUBSCRIPTION_PERIODS = [
  { id: '30', months: 1, days: 30, label: '1 месяц', short: '1 мес.' },
  { id: '90', months: 3, days: 90, label: '3 месяца', short: '3 мес.' },
  { id: '180', months: 6, days: 180, label: '6 месяцев', short: '6 мес.' },
  { id: '365', months: 12, days: 365, label: '1 год', short: '1 год' },
];

/** devices -> { periodId: price } */
export const FALLBACK_PRICES = {
  1: { 30: 189, 90: 449, 180: 749, 365: 1299 },
  2: { 30: 258, 90: 628, 180: 1078, 365: 1998 },
  3: { 30: 327, 90: 807, 180: 1407, 365: 2697 },
  4: { 30: 396, 90: 986, 180: 1736, 365: 3396 },
  5: { 30: 465, 90: 1165, 180: 2065, 365: 4095 },
  6: { 30: 534, 90: 1344, 180: 2394, 365: 4794 },
  7: { 30: 603, 90: 1523, 180: 2723, 365: 5493 },
  8: { 30: 672, 90: 1702, 180: 3052, 365: 6192 },
  9: { 30: 741, 90: 1881, 180: 3381, 365: 6891 },
  10: { 30: 810, 90: 2060, 180: 3710, 365: 7590 },
};

export function findPeriod(periodId) {
  return SUBSCRIPTION_PERIODS.find((p) => p.id === String(periodId)) || null;
}

export function priceFor(prices, devices, periodId) {
  const row = (prices || FALLBACK_PRICES)[devices];
  if (!row) return null;
  const value = row[periodId];
  return Number.isFinite(Number(value)) ? Number(value) : null;
}

/** «1 устройство», «2 устройства», «5 устройств» */
export function devicesLabel(n) {
  const v = Math.abs(Number(n)) % 100;
  const last = v % 10;
  if (v > 10 && v < 20) return `${n} устройств`;
  if (last === 1) return `${n} устройство`;
  if (last >= 2 && last <= 4) return `${n} устройства`;
  return `${n} устройств`;
}

export function formatRub(value) {
  return `${Number(value).toLocaleString('ru-RU')} ₽`;
}
