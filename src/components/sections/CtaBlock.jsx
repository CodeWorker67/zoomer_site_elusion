import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';

export default function CtaBlock({
  title,
  subtitle,
  buttonLabel = 'Получить ключ',
  buttonTo = ROUTES.LOGIN,
}) {
  return (
    <section
      style={{
        background: '#0A6CFF',
        padding: 'clamp(64px,8vw,104px) clamp(20px,4vw,56px)',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(28px,3.6vw,44px)',
          fontWeight: 800,
          letterSpacing: -1.4,
          color: '#fff',
          marginBottom: 14,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,.75)', marginBottom: 32 }}>{subtitle}</p>
      )}
      <Link className="cta-white" to={buttonTo}>
        {buttonLabel}
      </Link>
    </section>
  );
}
