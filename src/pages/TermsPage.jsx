import { RouteMeta } from '@components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { ROUTES, BRAND } from '@utils/constants';
import { getSiteHost } from '@utils/site';

export default function TermsPage() {
  const siteHost = getSiteHost();

  return (
    <>
      <RouteMeta path={ROUTES.TERMS} />
      <article className="legal-page">
        <h1>Пользовательское соглашение</h1>
        <p className="legal-updated">Дата вступления в силу: 01.01.2025</p>

        <p>
          Настоящее Соглашение определяет условия использования сервиса {BRAND}
          (Telegram-бот @zoomerskyvpn_bot и сайт {siteHost || '—'}) между Администрацией и Пользователем.
        </p>

        <h2>1. Предмет соглашения</h2>
        <p>
          Администрация предоставляет доступ к VPN-сервису на условиях, изложенных в настоящем Соглашении.
          Используя Сервис, вы подтверждаете согласие с его условиями.
        </p>

        <h2>2. Правила использования</h2>
        <p>
          Пользователь обязуется использовать Сервис в соответствии с законодательством и не использовать
          его для распространения вредоносного ПО, спама или иной незаконной деятельности.
        </p>

        <h2>3. Ответственность</h2>
        <p>
          Администрация не несёт ответственности за убытки, вызванные использованием Сервиса,
          за исключением случаев, предусмотренных законом.
        </p>

        <p style={{ marginTop: 28 }}>
          <Link to={ROUTES.PRIVACY}>Политика конфиденциальности</Link>
        </p>
      </article>
    </>
  );
}
