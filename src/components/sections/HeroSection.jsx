import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';
import HeroIllustration from './HeroIllustration';

export default function HeroSection() {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        padding: 'clamp(40px,5vw,72px) clamp(20px,4vw,56px) clamp(60px,7vw,96px)',
        overflow: 'hidden',
        background: '#fff',
      }}
    >
      <div className="hero-grid">
        <div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                background: '#EDF9F1',
                border: '1px solid rgba(52,199,89,.22)',
                borderRadius: 980,
                padding: '9px 18px',
                fontSize: 14,
                fontWeight: 600,
                color: '#1a7c3c',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#34C759',
                  boxShadow: '0 0 6px rgba(52,199,89,.8)',
                  animation: 'glowdot 2s ease-in-out infinite',
                }}
              />
              Работает в России
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                background: '#EFF6FF',
                border: '1px solid rgba(10,108,255,.18)',
                borderRadius: 980,
                padding: '9px 18px',
                fontSize: 14,
                fontWeight: 600,
                color: '#0052CC',
              }}
            >
              95 000+ пользователей
            </span>
          </div>
          <h1
            style={{
              fontSize: 'clamp(38px,4.4vw,66px)',
              fontWeight: 800,
              letterSpacing: -2.4,
              lineHeight: 1.04,
              marginBottom: 20,
              textWrap: 'balance',
            }}
          >
            Получите Подписку
            <br />
            <span
              style={{
                background: 'linear-gradient(90deg,#22B8F0 0%,#4A7BFF 45%,#8B5CF6 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              для Happ
            </span>
          </h1>
          <p
            style={{
              fontSize: 'clamp(17px,1.4vw,20px)',
              color: '#5A5A6A',
              lineHeight: 1.6,
              marginBottom: 40,
              maxWidth: 460,
              textWrap: 'pretty',
            }}
          >
            Работает на iOS, Android и Windows. Один аккаунт — от 1 до 10 устройств.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Link className="btn-primary" to={ROUTES.LOGIN}>
              Получить ключ
            </Link>
            <Link className="btn-outline" to={ROUTES.LOGIN}>
              Попробовать
            </Link>
          </div>
          <p style={{ marginTop: 22, fontSize: 14, color: '#8A8A99' }}>
            1 день бесплатно · аккаунт создаётся автоматически ·{' '}
            <Link to={ROUTES.LOGIN} style={{ fontWeight: 700, color: '#0A6CFF' }}>
              уже есть аккаунт?
            </Link>
          </p>
        </div>

        <HeroIllustration />
      </div>
    </section>
  );
}
