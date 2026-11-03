import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Loader2 } from 'lucide-react';
import { RouteMeta } from '@components/seo/PageMeta';
import Button from '@components/ui/Button';
import RangeSlider from '@components/ui/RangeSlider';
import useAuthStore from '@stores/authStore';
import { configApi, paymentApi, userApi } from '@services/api';
import { ROUTES, PAYMENT_METHODS } from '@utils/constants';
import {
  DEVICES_MAX,
  DEVICES_MIN,
  FALLBACK_PRICES,
  devicesLabel,
  formatRub,
  priceFor,
} from '@utils/pricing';
import toast from 'react-hot-toast';

const TRIAL_PRICE_FALLBACK = 9;
const MONTHLY_PERIOD_ID = '30';

const DEVICE_OPTIONS = Array.from({ length: DEVICES_MAX - DEVICES_MIN + 1 }, (_, i) => {
  const n = DEVICES_MIN + i;
  return { value: n, label: String(n) };
});

export default function TrialPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [devices, setDevices] = useState(DEVICES_MIN);
  const [method, setMethod] = useState('sbp');
  const [prices, setPrices] = useState(FALLBACK_PRICES);
  const [trialPrice, setTrialPrice] = useState(TRIAL_PRICE_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [trialAvailable, setTrialAvailable] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast('Войдите, чтобы оформить триал', { icon: '🔑' });
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(ROUTES.TRIAL)}`);
      return;
    }
    let cancelled = false;
    Promise.all([
      configApi.trial().catch(() => null),
      userApi.subscription().catch(() => null),
    ]).then(([trialCfg, sub]) => {
      if (cancelled) return;
      if (trialCfg?.prices) setPrices(trialCfg.prices);
      if (Number.isFinite(Number(trialCfg?.trial_price_rub))) {
        setTrialPrice(Number(trialCfg.trial_price_rub));
      }
      const available = sub?.trial_available !== false && !sub?.in_panel;
      setTrialAvailable(available);
      if (!available) {
        toast.error('Пробный период уже был активирован');
        navigate(ROUTES.PROFILE, { state: { tab: 'buy' } });
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [isAuthenticated, navigate]);

  const monthlyPrice = useMemo(
    () => priceFor(prices, devices, MONTHLY_PERIOD_ID),
    [prices, devices],
  );

  const handlePay = async () => {
    setPaying(true);
    try {
      const { data } = await paymentApi.createTrialPayment({ devices, method });
      if (data.payment_url) {
        window.location.href = data.payment_url;
        return;
      }
      toast.error('Не удалось получить ссылку на оплату');
    } catch (err) {
      const detail = err.response?.data?.detail;
      toast.error(typeof detail === 'string' ? detail : 'Ошибка при создании платежа');
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <RouteMeta path={ROUTES.TRIAL} />
      <section className="py-12 min-h-screen">
        <div className="max-w-lg mx-auto px-4 space-y-4">
          <Link to={ROUTES.PROFILE} className="text-sm text-happ-muted hover:text-happ-ink">
            ← Личный кабинет
          </Link>

          <div className="card-dark">
            <h1 className="text-xl font-bold text-happ-ink mb-2">Пробный период</h1>
            <p className="text-happ-muted text-sm">
              Выберите кол-во устройств и протестируйте триал 3 дня за {formatRub(trialPrice)}.
            </p>
            <p className="text-happ-faint text-xs mt-3 leading-relaxed">
              После окончания тестовой подписки произойдёт автосписание средств для оплаты
              месячной подписки. Вы можете отключить автосписание в разделе «Подписки».
            </p>
          </div>

          {loading ? (
            <div className="card-dark flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-zoomer-neon animate-spin" />
            </div>
          ) : trialAvailable ? (
            <>
              <div className="card-dark space-y-6">
                <RangeSlider
                  title="Устройства"
                  valueLabel={devicesLabel(devices)}
                  options={DEVICE_OPTIONS}
                  value={devices}
                  onChange={setDevices}
                />
                <div className="flex justify-between items-baseline text-sm border-t border-zoomer-border pt-4">
                  <span className="text-happ-muted">Подписка после триала (1 мес.)</span>
                  <span className="text-happ-ink font-semibold text-lg">
                    {monthlyPrice != null ? `${formatRub(monthlyPrice)} / мес.` : '—'}
                  </span>
                </div>
              </div>

              <div className="card-dark">
                <p className="text-happ-muted text-sm mb-3">Способ оплаты</p>
                <div className="flex gap-2.5 mb-4">
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
                <Button
                  type="button"
                  className="w-full !py-4 !text-base"
                  disabled={paying || monthlyPrice == null}
                  onClick={handlePay}
                >
                  {paying ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Создаём платёж…
                    </span>
                  ) : (
                    `Купить 3 дня за ${formatRub(trialPrice)}`
                  )}
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  );
}
