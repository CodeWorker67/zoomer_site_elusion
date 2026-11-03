import { Link } from 'react-router-dom';
import { ROUTES, TRIAL_OFFER_LABEL } from '@utils/constants';

/** Кнопка перехода на страницу платного триала (3 дня за 9 ₽). */
export default function TrialCtaButton({ className = '' }) {
  return (
    <Link
      to={ROUTES.TRIAL}
      className={
        className
        || 'w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold bg-happ-blue text-white hover:bg-happ-blue-hover transition-colors'
      }
    >
      {TRIAL_OFFER_LABEL}
    </Link>
  );
}
