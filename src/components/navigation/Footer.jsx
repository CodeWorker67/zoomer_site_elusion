import { Link } from 'react-router-dom';
import { DOWNLOADS, ROUTES, SUPPORT_URL } from '@utils/constants';

const footerLinks = [
  { path: ROUTES.HAPP, label: 'Подписка' },
  { path: ROUTES.HAPP_FREE, label: 'Бесплатно' },
  { path: ROUTES.HAPP_VPN, label: 'VPN' },
  { path: ROUTES.HAPP_DOWNLOAD, label: 'Скачать' },
  { path: ROUTES.HAPP_TELEGRAM, label: 'Telegram' },
  { path: ROUTES.INCY_VPN, label: 'INCY' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#0B0D12', padding: '52px clamp(20px,4vw,56px) 28px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 36,
            marginBottom: 36,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 11,
                  background: '#fff',
                  color: '#0B0D12',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  fontWeight: 800,
                  fontStyle: 'italic',
                }}
              >
                H
              </span>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>Happ</span>
            </div>
            <p style={{ fontSize: 13, color: '#3F424D', lineHeight: 1.9 }}>
              Конфигурацию предоставляет Zoomersky FZE
              <br />
              License No. UAE-FZE-2023-38521
              <br />
              Business Bay, Dubai, UAE
            </p>
          </div>
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#3F424D',
                marginBottom: 14,
              }}
            >
              Скачать Happ
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <li>
                <a className="ftr-link" href={DOWNLOADS.ios} target="_blank" rel="noopener noreferrer">
                  App Store (iOS)
                </a>
              </li>
              <li>
                <a className="ftr-link" href={DOWNLOADS.android} target="_blank" rel="noopener noreferrer">
                  Google Play (Android)
                </a>
              </li>
              <li>
                <a className="ftr-link" href={DOWNLOADS.desktop} target="_blank" rel="noopener noreferrer">
                  Windows / macOS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4
              style={{
                fontSize: 11,
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: 1,
                color: '#3F424D',
                marginBottom: 14,
              }}
            >
              Сервис
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {footerLinks.map((l) => (
                <li key={l.path}>
                  <Link className="ftr-link" to={l.path}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a className="ftr-link" href={SUPPORT_URL} target="_blank" rel="noopener noreferrer">
                  Поддержка
                </a>
              </li>
              <li>
                <a className="ftr-link" href="/#pricing">
                  Тарифы
                </a>
              </li>
              <li>
                <a className="ftr-link" href="/#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 10,
            paddingTop: 20,
            borderTop: '1px solid #1A1D24',
            fontSize: 12,
            color: '#3F424D',
          }}
        >
          <span>© {new Date().getFullYear()} Zoomersky FZE</span>
          <span style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            <Link className="ftr-legal" to={ROUTES.PRIVACY}>
              Политика конфиденциальности
            </Link>
            <Link className="ftr-legal" to={ROUTES.TERMS}>
              Пользовательское соглашение
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
