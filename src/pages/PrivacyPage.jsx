import { RouteMeta } from '@components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { ROUTES, BRAND } from '@utils/constants';

export default function PrivacyPage() {
  return (
    <>
      <RouteMeta path={ROUTES.PRIVACY} />
      <article className="legal-page">
        <h1>Политика конфиденциальности</h1>
        <p className="legal-updated">Дата вступления в силу: 01.01.2025</p>

        <p>
          Настоящая Политика описывает, какие данные обрабатывает сервис {BRAND}
          (Telegram-бот @zoomerskyvpn_bot, далее — «Сервис») при предоставлении услуг VPN.
        </p>

        <h2>1. Какие данные мы обрабатываем</h2>
        <ul>
          <li>Email или Google ID — для идентификации учётной записи на сайте</li>
          <li>Идентификатор Telegram — при использовании бота</li>
          <li>Данные о подписке — тариф, срок, статус оплаты</li>
          <li>Платёжные сведения обрабатываются платёжными провайдерами</li>
        </ul>

        <h2>2. Что мы НЕ собираем</h2>
        <p>
          Сервис не ведёт журналов посещаемых сайтов, истории просмотров, содержимого трафика
          и DNS-запросов внутри VPN-соединения.
        </p>

        <h2>3. Контакты</h2>
        <p>По вопросам обработки данных — через Telegram-бот @zoomerskyvpn_bot</p>

        <p style={{ marginTop: 28 }}>
          <Link to={ROUTES.TERMS}>Пользовательское соглашение</Link>
        </p>
      </article>
    </>
  );
}
