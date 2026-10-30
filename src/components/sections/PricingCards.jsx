import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import Button from '@components/ui/Button';
import useAuthStore from '@stores/authStore';
import { ROUTES } from '@utils/constants';

export default function PricingCards({ tariffs, columns = 3 }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleBuy = (tariffId) => {
    const checkout = `${ROUTES.CHECKOUT}?tariff=${tariffId}&devices=1&method=sbp`;
    if (!isAuthenticated) {
      navigate(`${ROUTES.LOGIN}?redirect=${encodeURIComponent(checkout)}`);
      return;
    }
    navigate(checkout);
  };

  const gridClass =
    columns === 3 ? 'md:grid-cols-3' : columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1';

  return (
    <div className={`grid grid-cols-1 ${gridClass} gap-6`}>
      {tariffs.map((t) => (
        <div
          key={t.id}
          className={`card-dark flex flex-col ${t.popular ? 'border-zoomer-neon/40 ring-1 ring-zoomer-neon/20' : ''}`}
        >
          {t.popular && (
            <span className="text-xs font-semibold text-zoomer-neon mb-2">Популярный</span>
          )}
          <h3 className="text-xl font-bold text-happ-ink mb-1">{t.label}</h3>
          <div className="text-3xl font-bold text-gradient mb-4">{t.price}₽</div>
          <ul className="space-y-2 mb-6 flex-1">
            <li className="flex items-center gap-2 text-happ-muted text-sm">
              <Check className="w-4 h-4 text-zoomer-neon shrink-0" />
              {t.traffic || 'Безлимит трафика'}
            </li>
            <li className="flex items-center gap-2 text-happ-muted text-sm">
              <Check className="w-4 h-4 text-zoomer-neon shrink-0" />
              VLESS ключ
            </li>
            <li className="flex items-center gap-2 text-happ-muted text-sm">
              <Check className="w-4 h-4 text-zoomer-neon shrink-0" />
              {t.devices === 1 ? 'От 1 устройства (в кабинете до 10)' : `До ${t.devices} устройств`}
            </li>
            <li className="flex items-center gap-2 text-happ-muted text-sm">
              <Check className="w-4 h-4 text-zoomer-neon shrink-0" />
              Все серверы
            </li>
          </ul>
          <Button className="w-full text-sm" onClick={() => handleBuy(t.id)}>
            Купить ключ
          </Button>
        </div>
      ))}
    </div>
  );
}
