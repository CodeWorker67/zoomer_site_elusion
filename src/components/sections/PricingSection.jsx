import { Link } from 'react-router-dom';
import { ROUTES } from '@utils/constants';

function Rub({ children, color = '#5A5A6A' }) {
  return (
    <span style={{ fontSize: 16, fontWeight: 500, color }}>{children}</span>
  );
}

/** Цены за 1 устройство (в кабинете — до 10). */
const ROWS = [
  { key: 'trial', title: '1 день', badge: 'Пробный', sub: 'Полный доступ, все локации', total: null, perMonth: 'бесплатно', perHint: 'за 1 день', hot: false },
  { key: '30', title: '1 месяц', sub: '189 ₽ итого', total: 189, perMonth: 189, perHint: 'в месяц', hot: false },
  { key: '90', title: '3 месяца', badge: 'Популярный', sub: '449 ₽ итого', total: 449, perMonth: 150, perHint: 'в месяц', hot: true, save: '−21%' },
  { key: '180', title: '6 месяцев', sub: '749 ₽ итого', total: 749, perMonth: 125, perHint: 'в месяц', hot: false, save: '−34%' },
  { key: '365', title: '1 год', sub: '1 299 ₽ итого', total: 1299, perMonth: 108, perHint: 'в месяц', hot: false, save: '−43%' },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="section" style={{ background: '#F4F5F9' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <p className="kicker">Тарифы</p>
          <h2 className="h2">Начните бесплатно</h2>
          <p style={{ fontSize: 16, color: '#5A5A6A', marginTop: 10 }}>1 день бесплатно · 1 устройство</p>
        </div>
        <div style={{ border: '1.5px solid rgba(0,0,0,.07)', borderRadius: 22, overflow: 'hidden', background: '#fff' }}>
          {ROWS.map((row) => (
            <div key={row.key} className={`price-row${row.hot ? ' price-row--hot' : ''}`}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 17, fontWeight: 800 }}>{row.title}</span>
                  {row.badge && (
                    <span
                      style={{
                        background: row.hot ? '#0A6CFF' : '#EDF9F1',
                        color: row.hot ? '#fff' : '#1a7c3c',
                        border: row.hot ? 'none' : '1px solid rgba(52,199,89,.25)',
                        fontSize: row.hot ? 10 : 11,
                        fontWeight: 800,
                        letterSpacing: row.hot ? 0.5 : 0,
                        textTransform: row.hot ? 'uppercase' : 'none',
                        padding: '4px 10px',
                        borderRadius: 980,
                      }}
                    >
                      {row.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 13, color: '#5A5A6A', marginTop: 2 }}>{row.sub}</div>
              </div>
              <div className="price-col">
                <div
                  style={{
                    fontSize: row.key === 'trial' ? 26 : 30,
                    fontWeight: 800,
                    letterSpacing: -1.5,
                    lineHeight: 1,
                    color: row.hot ? '#0A6CFF' : undefined,
                  }}
                >
                  {row.key === 'trial' ? (
                    row.perMonth
                  ) : (
                    <>
                      {row.perMonth} <Rub color={row.hot ? 'rgba(10,108,255,.6)' : '#5A5A6A'}>₽</Rub>
                    </>
                  )}
                </div>
                <div style={{ fontSize: 12, color: '#9A9AAA', marginTop: 3 }}>{row.perHint}</div>
                {row.save && (
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'rgba(52,199,89,.14)',
                      color: '#1a8c38',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '3px 9px',
                      borderRadius: 980,
                      marginTop: 6,
                    }}
                  >
                    {row.save}
                  </span>
                )}
              </div>
              <Link className={`price-btn${row.hot ? ' price-btn--hot' : ''}`} to={ROUTES.LOGIN}>
                {row.key === 'trial' ? 'Попробовать' : 'Выбрать'}
              </Link>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ от 1 устройства (до 10)</span>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ 10 локаций</span>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ Безлимитный трафик</span>
          <span style={{ fontSize: 13, color: '#5A5A6A' }}>✓ Поддержка 24/7</span>
        </div>
      </div>
    </section>
  );
}
