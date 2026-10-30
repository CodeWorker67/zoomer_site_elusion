import { Link } from 'react-router-dom';
import { RouteMeta } from '@components/seo/PageMeta';
import PageHero from '@components/sections/PageHero';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import ComparisonTable from '@components/sections/ComparisonTable';
import Button from '@components/ui/Button';
import { BRAND, BRAND_META, ROUTES } from '@utils/constants';
import { buildTelegramBotUrl } from '@utils/botLink';

const FAQ = [
  { q: 'Что такое пробная подписка Happ?', a: 'Пробная подписка — бесплатный доступ к VPN для Happ без оплаты и без привязки карты. Ключ выдаётся сразу после регистрации.' },
  { q: 'Хапп подписка бесплатно — где взять?', a: 'Зарегистрируйтесь на Зумерский VPN по email или Google, либо перейдите в Telegram-бот — ключ появится сразу.' },
  { q: 'На сколько дней пробная подписка Happ?', a: 'Срок пробного доступа зависит от выбранного тарифа в боте или на сайте. Карта не запрашивается.' },
  { q: 'Нужна ли карта для пробной подписки?', a: 'Нет. Ни при регистрации, ни при активации карта не запрашивается. Скрытых списаний нет.' },
  { q: 'Как получить подписку Happ бесплатно через Telegram?', a: 'Откройте Telegram-бот Зумерский VPN, нажмите «Старт» и активируйте пробный доступ — ключ придёт в бота.' },
  { q: 'Работают ли бесплатные ключи?', a: 'Да, ключи полностью рабочие. Отличие от платной подписки — срок действия и объём доступа.' },
  { q: 'Что после окончания пробной подписки?', a: 'Можно перейти на платную подписку от 189 ₽/мес (1 устройство). Ключ остаётся прежним — обновлять в Happ не нужно.' },
];

export default function HappFreePage() {
  return (
    <>
      <RouteMeta path={ROUTES.HAPP_FREE} />
      <PageHero
        title="Пробная подписка Happ — бесплатный старт"
        subtitle="Оформите пробную подписку Happ за 1 минуту. Полноценный доступ без оплаты — карта не нужна."
        primaryLabel="Получить бесплатную подписку"
        secondaryLabel="Через Telegram"
        secondaryTo={ROUTES.HAPP_TELEGRAM}
      />

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-6">Что такое пробная подписка Happ</h2>
          <p className="text-happ-muted leading-relaxed mb-4">
            Пробная подписка Happ — доступ к VPN-сервису бесплатно, без оплаты и без карты.
            Тот же VLESS-ключ, те же серверы и та же скорость. Единственная разница — срок.
          </p>
          <p className="text-happ-muted leading-relaxed">
            Карту мы не запрашиваем — никаких автосписаний. Это сделано, чтобы вы проверили,
            подходит ли Happ для ваших задач, прежде чем выбирать тариф.
          </p>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8">Как получить подписку Happ бесплатно</h2>
          <ol className="space-y-4 mb-12">
            {['Нажмите «Получить бесплатную подписку»', 'Зарегистрируйтесь по email или Google', 'Активируйте пробный доступ в личном кабинете', 'Откройте Happ и импортируйте QR-код или ссылку'].map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-zoomer-neon/20 text-zoomer-neon flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                <span className="text-happ-muted pt-1">{s}</span>
              </li>
            ))}
          </ol>

          <h3 className="text-xl font-bold text-happ-ink mb-4">Что входит в бесплатную подписку</h3>
          <ul className="space-y-2 text-happ-muted mb-8">
            <li>• Полноценный доступ к VPN</li>
            <li>• Happ VPN ключ с QR-кодом и ссылкой</li>
            <li>• Серверы в нескольких странах</li>
            <li>• Настройка за 1 минуту</li>
            <li>• Карта не нужна</li>
          </ul>

          <h3 className="text-xl font-bold text-happ-ink mb-4">Ограничения пробной подписки</h3>
          <ul className="space-y-2 text-happ-muted mb-8">
            <li>• Ограниченный срок действия</li>
            <li>• Ограниченный выбор серверов</li>
            <li>• 1 устройство</li>
          </ul>

          <Link to={ROUTES.LOGIN}><Button>Получить бесплатную подписку</Button></Link>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8 text-center">Бесплатная подписка vs Платная</h2>
          <ComparisonTable
            columns={['Функция', 'Пробная', 'Платная']}
            rows={[
              ['Срок действия', 'Ограниченный', '7 дней — 2 года'],
              ['Серверы', 'Ограниченный выбор', 'Все серверы'],
              ['Количество устройств', '1 устройство', 'От 1 до 10 устройств'],
              ['Карта при регистрации', 'Не нужна', 'Не нужна'],
            ]}
          />
          <div className="text-center mt-8">
            <Link to={ROUTES.HAPP}><Button variant="secondary">Получить подписку Happ</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20 text-center px-4">
        <h2 className="text-xl font-bold text-happ-ink mb-4">Бесплатная подписка через Telegram</h2>
        <p className="text-happ-muted mb-6">Хапп подписка бесплатно — получите ключ прямо в боте</p>
        <a href={buildTelegramBotUrl()} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Открыть Telegram бот</Button>
        </a>
      </section>

      <FaqSection items={FAQ} />
      <CtaBlock title="Получить подписку Happ" buttonLabel="Получить бесплатную подписку" />

      <div className="pb-12 text-center text-sm text-happ-faint">
        <Link to={ROUTES.HAPP} className="hover:text-zoomer-neon">Получить подписку Happ</Link>
        <span className="mx-2">·</span>
        <Link to={ROUTES.HAPP_TELEGRAM} className="hover:text-zoomer-neon">Подписка через Telegram</Link>
      </div>
    </>
  );
}
