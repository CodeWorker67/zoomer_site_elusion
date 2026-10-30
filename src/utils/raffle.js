/** Условия розыгрыша «Зумерский дарит» */
export const RAFFLE_RULES_URL =
  'https://telegra.ph/Usloviya-rozygrysha-Zumerskij-darit-09-17-2';

/** 1 билет за каждый оплаченный месяц (30 дней) */
export function raffleTicketsForTariffDays(days) {
  if (!days || days < 30) return 0;
  return Math.floor(days / 30);
}

export function parseRaffleTicketCount(payload) {
  if (payload == null || typeof payload !== 'object') return 0;
  const raw =
    payload.raffle_tickets
    ?? payload.raffleTickets
    ?? payload.tickets
    ?? payload.user?.tickets
    ?? payload.user?.raffle_tickets
    ?? payload.raffle?.tickets
    ?? payload.raffle?.count;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function tariffLabelWithTickets(label, days) {
  const tickets = raffleTicketsForTariffDays(days);
  if (tickets <= 0) return label;
  return `${label}(${tickets} 🎟️)`;
}
