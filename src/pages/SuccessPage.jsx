import { RouteMeta } from '@components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Button from '@components/ui/Button';
import { ROUTES, BRAND_META } from '@utils/constants';

export default function SuccessPage() {
  return (
    <>
      <RouteMeta path={ROUTES.SUCCESS} />
      <section className="py-20 min-h-[60vh] flex items-center justify-center">
        <div className="card-dark max-w-md mx-4 text-center">
          <CheckCircle className="w-16 h-16 text-zoomer-neon mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-happ-ink mb-2">Оплата прошла успешно!</h1>
          <p className="text-happ-muted text-sm mb-8">
            Подписка будет активирована в течение нескольких минут.
          </p>
          <Link to={ROUTES.DASHBOARD}><Button className="w-full">Перейти в личный кабинет</Button></Link>
        </div>
      </section>
    </>
  );
}
