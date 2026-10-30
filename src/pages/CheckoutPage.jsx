import { useEffect, useState } from 'react';
import { RouteMeta } from '@components/seo/PageMeta';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { paymentApi } from '@services/api';
import useAuthStore from '@stores/authStore';
import { ROUTES } from '@utils/constants';
import {
  DEVICES_MAX,
  DEVICES_MIN,
  FALLBACK_PRICES,
  devicesLabel,
  findPeriod,
  formatRub,
  priceFor,
} from '@utils/pricing';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [status, setStatus] = useState('creating');
  const [errorMsg, setErrorMsg] = useState('');

  const tariffId = searchParams.get('tariff');
  const method = searchParams.get('method');
  const devices = Number.parseInt(searchParams.get('devices') || '', 10);
  const period = findPeriod(tariffId);
  const devicesValid = Number.isInteger(devices) && devices >= DEVICES_MIN && devices <= DEVICES_MAX;

  useEffect(() => {
    if (!isAuthenticated) {
      toast('Войдите, чтобы оплатить', { icon: '🔑' });
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`);
      return;
    }

    if (!period || !devicesValid || !['sbp', 'card'].includes(method)) {
      navigate(ROUTES.HOME);
      return;
    }

    let cancelled = false;
    paymentApi.createPayment({ tariff_id: period.id, devices, method })
      .then(({ data }) => {
        if (cancelled) return;
        if (data.payment_url) {
          window.location.href = data.payment_url;
        } else {
          setStatus('error');
          setErrorMsg('Не удалось получить ссылку на оплату');
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setStatus('error');
        const detail = err.response?.data?.detail;
        setErrorMsg(typeof detail === 'string' ? detail : 'Ошибка при создании платежа');
      });

    return () => { cancelled = true; };
  }, [period, devices, devicesValid, method, isAuthenticated, navigate]);

  const price = period && devicesValid ? priceFor(FALLBACK_PRICES, devices, period.id) : null;

  return (
    <>
      <RouteMeta path={ROUTES.CHECKOUT} />
      <section className="py-20 min-h-screen flex items-center justify-center">
        <div className="card-dark max-w-md mx-4 text-center">
          {status === 'creating' && (
            <>
              <Loader2 className="w-12 h-12 text-zoomer-neon mx-auto mb-4 animate-spin" />
              <h1 className="text-xl font-bold text-happ-ink mb-2">Создаём платёж</h1>
              <p className="text-happ-muted text-sm">
                {period && devicesValid
                  ? `${period.label} · ${devicesLabel(devices)}${price != null ? ` — ${formatRub(price)}` : ''}`
                  : 'Загрузка...'}
              </p>
              <p className="text-happ-faint text-xs mt-4">Перенаправляем на страницу оплаты...</p>
            </>
          )}
          {status === 'error' && (
            <>
              <h1 className="text-xl font-bold text-happ-ink mb-2">Ошибка</h1>
              <p className="text-red-400 text-sm mb-6">{errorMsg}</p>
              <Button onClick={() => navigate(ROUTES.PROFILE, { state: { tab: 'buy' } })} className="w-full">
                В личный кабинет
              </Button>
            </>
          )}
        </div>
      </section>
    </>
  );
}
