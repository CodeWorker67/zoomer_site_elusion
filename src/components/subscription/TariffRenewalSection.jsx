import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Loader2, MonitorSmartphone } from 'lucide-react';
import Button from '@components/ui/Button';
import RangeSlider from '@components/ui/RangeSlider';
import { ROUTES, PAYMENT_METHODS } from '@utils/constants';
import { configApi, userApi } from '@services/api';
import { tariffLabelWithTickets } from '@utils/raffle';
import {
  DEVICES_MAX,
  DEVICES_MIN,
  FALLBACK_PRICES,
  SUBSCRIPTION_PERIODS,
  devicesLabel,
  formatRub,
  priceFor,
} from '@utils/pricing';

/** Первая покупка (ещё не было оплаченной подписки): 1 мес. × 1 устройство = 189 ₽ */
const DEFAULT_PERIOD_ID = '30';

const PERIOD_OPTIONS = SUBSCRIPTION_PERIODS.map((p) => ({ value: p.id, label: p.short }));
const DEVICE_OPTIONS = Array.from({ length: DEVICES_MAX - DEVICES_MIN + 1 }, (_, i) => {
  const n = DEVICES_MIN + i;
  return { value: n, label: String(n) };
});

function clampDevices(n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return DEVICES_MIN;
  return Math.min(DEVICES_MAX, Math.max(DEVICES_MIN, Math.round(v)));
}

export default function TariffRenewalSection({ showHeader = true, showPaymentMethod = true }) {
  const navigate = useNavigate();
  const [method, setMethod] = useState('sbp');
  const [prices, setPrices] = useState(FALLBACK_PRICES);
  const [profile, setProfile] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [periodId, setPeriodId] = useState(DEFAULT_PERIOD_ID);
  const [devices, setDevices] = useState(DEVICES_MIN);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      configApi.tariffs().then(({ data }) => data?.prices).catch(() => null),
      userApi.subscription().then(({ data }) => data).catch(() => null),
    ]).then(([serverPrices, sub]) => {
      if (cancelled) return;
      if (serverPrices && Object.keys(serverPrices).length > 0) setPrices(serverPrices);
      setProfile(sub);
      if (!sub?.has_paid_subscription) {
        setDevices(DEVICES_MIN);
        setPeriodId(DEFAULT_PERIOD_ID);
      } else if (sub.devices_selectable !== false && Number(sub.devices) >= DEVICES_MIN) {
        setDevices(clampDevices(sub.devices));
      }
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, []);

  /** Пока нет активной оплаченной подписки — два бегунка; иначе устройства берём из БД. */
  const selectable = profile?.devices_selectable !== false;
  const lockedDevices = clampDevices(profile?.renewal_devices ?? profile?.devices ?? 5);
  const effectiveDevices = selectable ? devices : lockedDevices;

  const period = useMemo(
    () => SUBSCRIPTION_PERIODS.find((p) => p.id === periodId) || SUBSCRIPTION_PERIODS[0],
    [periodId],
  );
  const price = priceFor(prices, effectiveDevices, period.id);
  const isFirstPurchase = profile?.has_paid_subscription !== true;
  const primaryActionLabel = isFirstPurchase ? 'Купить' : 'Продлить';

  const goCheckout = (tariffId) => {
    const params = new URLSearchParams({
      tariff: tariffId,
      devices: String(effectiveDevices),
      method,
    });
    navigate(`${ROUTES.CHECKOUT}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {showHeader && (
        <div className="card-dark">
          <h2 className="text-lg font-bold text-happ-ink mb-2">Тарифы</h2>
          <p className="text-happ-muted text-sm">
            Выберите срок подписки и количество устройств. VLESS-ключ и ссылка в Happ останутся
            прежними — меняется только оплаченный период доступа.
          </p>
        </div>
      )}

      {showPaymentMethod && (
        <div className="card-dark">
          <p className="text-happ-muted text-sm mb-3">Способ оплаты</p>
          <div className="flex gap-2.5">
            {PAYMENT_METHODS.map((pm) => {
              const selected = method === pm.id;
              return (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setMethod(pm.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-sm font-semibold border-2 transition-all ${
                    selected
                      ? 'border-happ-blue bg-happ-blue text-white shadow-[0_4px_14px_rgba(10,108,255,0.35)]'
                      : 'border-happ-blue/30 bg-happ-gray text-happ-ink hover:border-happ-blue/55 hover:bg-white'
                  }`}
                >
                  {pm.id === 'card' && (
                    <CreditCard className={`w-4 h-4 shrink-0 ${selected ? 'text-white' : 'text-happ-blue'}`} />
                  )}
                  {pm.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!loaded ? (
        <div className="card-dark flex items-center justify-center py-12">
          <Loader2 className="w-7 h-7 text-zoomer-neon animate-spin" />
        </div>
      ) : selectable ? (
        <div className="card-dark space-y-7">
          <RangeSlider
            title="Длительность подписки"
            valueLabel={tariffLabelWithTickets(period.label, period.days)}
            options={PERIOD_OPTIONS}
            value={periodId}
            onChange={setPeriodId}
          />
          <RangeSlider
            title="Устройства"
            valueLabel={devicesLabel(devices)}
            options={DEVICE_OPTIONS}
            value={devices}
            onChange={setDevices}
          />

          <div className="pt-1">
            <Button
              type="button"
              className="w-full !py-4 !text-base"
              disabled={price == null}
              onClick={() => goCheckout(period.id)}
            >
              {primaryActionLabel}{price != null ? ` · ${formatRub(price)}` : ''}
            </Button>
            <p className="text-center text-xs text-happ-faint mt-3">
              Цена зависит от срока и количества устройств. Добавить устройства можно и позже.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="card-dark flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-happ-blue/10 flex items-center justify-center shrink-0">
                <MonitorSmartphone className="w-5 h-5 text-happ-blue" />
              </div>
              <div className="min-w-0">
                <div className="text-happ-ink font-semibold">Ваша подписка: {devicesLabel(lockedDevices)}</div>
                <div className="text-happ-faint text-xs mt-0.5">
                  Цена продления считается для текущего количества устройств
                </div>
              </div>
            </div>
            <Link
              to={ROUTES.ADD_DEVICE}
              className="text-sm font-semibold text-happ-blue hover:underline shrink-0"
            >
              Добавить
            </Link>
          </div>

          <div className="space-y-3">
            {SUBSCRIPTION_PERIODS.map((p) => {
              const periodPrice = priceFor(prices, lockedDevices, p.id);
              return (
                <div key={p.id} className="card-dark flex items-center justify-between gap-4">
                  <div>
                    <div className="text-happ-ink font-semibold">
                      {tariffLabelWithTickets(p.label, p.days)}
                    </div>
                    <div className="text-happ-faint text-xs mt-0.5">
                      {`Продление на ${p.label.toLowerCase()}`}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold text-gradient mb-2">
                      {periodPrice != null ? formatRub(periodPrice) : '—'}
                    </div>
                    <Button
                      type="button"
                      className="text-sm px-4 py-2"
                      disabled={periodPrice == null}
                      onClick={() => goCheckout(p.id)}
                    >
                      Продлить
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <p className="text-center text-xs text-happ-faint">
        Оплата через СБП или карту РФ. Без автосписаний.
      </p>
    </div>
  );
}
