import { useEffect, useState } from 'react';
import { RouteMeta } from '@components/seo/PageMeta';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Loader2 } from 'lucide-react';
import { paymentApi, userApi } from '@services/api';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';
import { PAYMENT_METHODS, ROUTES } from '@utils/constants';
import { devicesLabel, formatRub } from '@utils/pricing';

function formatEndDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function errorText(err, fallback) {
  const detail = err.response?.data?.detail;
  return typeof detail === 'string' ? detail : fallback;
}

export default function AddDevicePage() {
  const navigate = useNavigate();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAdd, setSelectedAdd] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    userApi
      .addDevicesOptions()
      .then(({ data }) => setInfo(data))
      .catch((err) => {
        if (err.response?.status === 403) {
          toast(errorText(err, 'Сначала оформите подписку'), { icon: 'ℹ️' });
          navigate(ROUTES.PROFILE, { state: { tab: 'buy' }, replace: true });
          return;
        }
        toast.error('Не удалось загрузить данные');
        setInfo({ options: [], max_add: 0, failed: true });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const handlePay = async () => {
    if (!selectedAdd || !selectedMethod) return;
    setIsProcessing(true);
    try {
      const { data } = await paymentApi.createAddDevicesPayment({
        add_count: selectedAdd,
        method: selectedMethod,
      });
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        toast.error('Не удалось создать платёж');
      }
    } catch (err) {
      toast.error(errorText(err, 'Ошибка оплаты'));
    } finally {
      setIsProcessing(false);
    }
  };

  const selectedOption = info?.options?.find((o) => o.add_count === selectedAdd);

  return (
    <>
      <RouteMeta path={ROUTES.ADD_DEVICE} />
      <section className="py-12 sm:py-16 min-h-[calc(100vh-4rem)]">
        <div className="max-w-lg mx-auto px-4">
          <Link
            to={ROUTES.PROFILE}
            className="inline-flex items-center gap-1.5 text-happ-muted hover:text-happ-ink text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Личный кабинет
          </Link>

          {loading ? (
            <div className="card-dark flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-zoomer-neon animate-spin" />
            </div>
          ) : !info?.options?.length ? (
            <div className="card-dark text-center">
              <p className="text-happ-muted mb-6">
                {info?.max_add === 0 && !info?.failed
                  ? `Достигнут лимит устройств (${info?.max_devices ?? 10}).`
                  : 'Добавление устройств недоступно.'}
              </p>
              <Link to={ROUTES.PROFILE}>
                <Button className="w-full">В личный кабинет</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="card-dark">
                <h1 className="text-xl font-bold text-happ-ink mb-3">Добавить устройство</h1>
                <p className="text-happ-muted text-sm mb-1">
                  Сейчас у вас подписка на{' '}
                  <b className="text-happ-ink">{devicesLabel(info.current_devices)}</b>
                </p>
                <p className="text-happ-faint text-sm">
                  Действует до {formatEndDate(info.subscription_end)}
                </p>
                <p className="text-happ-faint text-xs mt-2">
                  {info.months_billed
                    ? `69 ₽ × устройства × ${info.months_billed} мес. до конца подписки (округление вверх). `
                    : ''}
                  Ключ и ссылка в Happ не меняются.
                </p>
              </div>

              <div className="card-dark">
                <h2 className="text-happ-ink font-semibold mb-4">
                  Сколько устройств добавить
                </h2>
                <div className="space-y-2">
                  {info.options.map((opt) => {
                    const selected = selectedAdd === opt.add_count;
                    return (
                      <button
                        key={opt.add_count}
                        type="button"
                        onClick={() => {
                          setSelectedAdd(opt.add_count);
                          setSelectedMethod(null);
                        }}
                        className={`w-full flex items-center justify-between gap-3 p-4 rounded-xl border-2 text-left text-sm font-semibold transition-all ${
                          selected
                            ? 'border-happ-blue bg-happ-blue/[0.07] text-happ-blue'
                            : 'border-zoomer-border bg-happ-gray text-happ-ink hover:border-happ-blue/40'
                        }`}
                      >
                        <span>+ {devicesLabel(opt.add_count)}</span>
                        <span>{formatRub(opt.price_rub)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedOption && (
                <div className="card-dark">
                  <h3 className="text-lg font-bold text-happ-ink text-center mb-1">Способ оплаты</h3>
                  <p className="text-center text-happ-muted text-sm mb-4">
                    Сумма:{' '}
                    <span className="text-happ-ink font-bold">{formatRub(selectedOption.price_rub)}</span>
                  </p>
                  <div className="flex gap-2.5 mb-5">
                    {PAYMENT_METHODS.map((pm) => {
                      const selected = selectedMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setSelectedMethod(pm.id)}
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
                    onClick={handlePay}
                    disabled={!selectedMethod || isProcessing}
                    className="w-full disabled:opacity-60"
                  >
                    {isProcessing ? 'Создаём платёж…' : 'Оплатить'}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
