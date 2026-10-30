import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';

export default function PageHero({
  title,
  subtitle,
  primaryLabel = 'Получить ключ',
  primaryTo = ROUTES.LOGIN,
  secondaryLabel,
  secondaryTo,
}) {
  return (
    <section className="section" style={{ background: '#fff', paddingTop: 'clamp(48px, 6vw, 80px)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
        <h1 className="h2" style={{ marginBottom: 20 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 18, color: '#5A5A6A', lineHeight: 1.6, marginBottom: 32 }}>{subtitle}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          <Link className="btn-primary" to={primaryTo}>
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryTo && (
            <Link className="btn-outline" to={secondaryTo}>
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
