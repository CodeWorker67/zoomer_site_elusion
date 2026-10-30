import { Link } from 'react-router-dom';
import { RouteMeta } from '@components/seo/PageMeta';
import FaqSection from '@components/sections/FaqSection';
import Button from '@components/ui/Button';
import { BRAND, BRAND_META, ROUTES } from '@utils/constants';
import { buildTelegramBotUrl } from '@utils/botLink';

const STEPS = [
  { title: 'Откройте бота', desc: 'Telegram-бот Зумерский VPN → «Старт»' },
  { title: 'Нажмите кнопку', desc: '«Открыть Зумерский VPN» — запустится мини-приложение' },
  { title: 'Активируйте доступ', desc: 'Пробный доступ или платный тариф' },
  { title: 'Добавьте в Happ', desc: 'Кнопка «Добавить в Happ» импортирует ключ' },
];

const FEATURES = [
  { title: 'Ключ и подписка', desc: 'Ссылка-подписка, QR-код и кнопка импорта в Happ' },
  { title: 'Оплата и продление', desc: 'СБП, QR-код или карта — как на сайте' },
  { title: 'Устройства', desc: 'Список подключённых, перевыпуск ключа' },
  { title: 'Рефералы и поддержка', desc: 'Приглашения, баланс, чат с поддержкой' },
];

const FAQ = [
  { q: 'Как получить Happ VPN через Telegram?', a: 'Откройте Telegram-бот Зумерский VPN и нажмите «Старт». Бот пришлёт кнопку «Открыть Зумерский VPN» — она запускает мини-приложение. Там активируется доступ и выдаётся ключ для Happ.' },
  { q: 'Что умеет Telegram-бот?', a: 'Бот открывает мини-приложение с тем же функционалом, что личный кабинет: ключ, оплата, тарифы, устройства, перевыпуск ключа и поддержка.' },
  { q: 'Нужно ли регистрироваться, чтобы пользоваться через Telegram?', a: 'На сайте — нет, если вы заходите через бота. На сайте вход по email или Google. Можно пользоваться и тем, и другим.' },
  { q: 'Чем Telegram отличается от личного кабинета на сайте?', a: 'Возможности одинаковые — одна учётная запись и один ключ. На сайте вход по email/Google, в Telegram — через бота.' },
  { q: 'Как оплатить подписку Happ в Telegram?', a: 'В мини-приложении выберите тариф и срок. Способы оплаты те же: СБП и банковская карта РФ.' },
  { q: 'Где скачать приложение Happ?', a: 'Happ скачивается из App Store, Google Play или с GitHub разработчика. Бот его не заменяет — он выдаёт ключ-подписку.' },
  { q: 'Как добавить ключ из Telegram в Happ?', a: 'В мини-приложении нажмите «Добавить в Happ» — ключ импортируется одним нажатием. Можно также скопировать ссылку или отсканировать QR-код.' },
  { q: 'Работает ли этот ключ в других приложениях?', a: 'Да. Ссылка-подписка VLESS подходит для Happ, INCY, v2rayTun, Streisand и других совместимых клиентов.' },
  { q: 'Сколько стоит подписка и есть ли бесплатный период?', a: 'Пробный день без карты (1 устройство). Дальше — от 189 ₽/мес, сроки 1/3/6 мес и год в личном кабинете.' },
];

export default function HappTelegramPage() {
  return (
    <>
      <RouteMeta path={ROUTES.HAPP_TELEGRAM} />
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 bg-radial-glow pointer-events-none" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-happ-ink mb-6">Happ VPN в Telegram</h1>
          <p className="text-happ-muted text-lg mb-8">
            Telegram-бот открывает мини-приложение, где есть всё то же, что в личном кабинете —
            ключ, подписка, оплата и устройства. Пробный доступ без карты.
          </p>
          <a href={buildTelegramBotUrl()} target="_blank" rel="noopener noreferrer">
            <Button className="px-10">Открыть Telegram бот</Button>
          </a>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-10 text-center">Как получить ключ Happ через Telegram</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <div key={s.title} className="card-dark">
                <div className="text-zoomer-neon font-bold mb-2">{i + 1}</div>
                <h3 className="text-happ-ink font-semibold mb-1">{s.title}</h3>
                <p className="text-happ-muted text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4 text-center">В Telegram доступно всё то же, что в кабинете</h2>
          <p className="text-happ-muted text-center mb-8 text-sm">Одна учётная запись и один ключ. Разница только во входе.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-dark">
                <h3 className="text-happ-ink font-semibold mb-2">{f.title}</h3>
                <p className="text-happ-muted text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Бот не заменяет приложение Happ</h2>
          <p className="text-happ-muted leading-relaxed mb-4">
            Happ — отдельное приложение, его нужно скачать из App Store, Google Play или с сайта разработчика.
            Бот выдаёт ключ-подписку, который в это приложение добавляется.
            Тот же ключ работает в INCY, v2rayTun, Streisand.
          </p>
          <Link to={ROUTES.HAPP_DOWNLOAD} className="text-zoomer-neon hover:underline text-sm">
            Где скачать Happ и как настроить →
          </Link>
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {[
              { title: 'Без регистрации на сайте', desc: 'Вход через Telegram-аккаунт в боте.' },
              { title: 'Ничего не теряется', desc: 'Ключ всегда в чате — не нужно искать письмо.' },
              { title: 'Пробный доступ', desc: 'Без карты — сразу после запуска бота.' },
            ].map((x) => (
              <div key={x.title} className="card-dark">
                <h3 className="text-happ-ink font-semibold mb-2 text-sm">{x.title}</h3>
                <p className="text-happ-muted text-xs">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20 text-center px-4">
        <a href={buildTelegramBotUrl()} target="_blank" rel="noopener noreferrer">
          <Button className="px-10">Открыть бота в Telegram</Button>
        </a>
        <p className="text-happ-muted mt-6 text-sm">
          Предпочитаете сайт?{' '}
          <Link to={ROUTES.HAPP_FREE} className="text-zoomer-neon hover:underline">Получить бесплатно на сайте</Link>
          {' · '}
          <Link to={ROUTES.HAPP} className="text-zoomer-neon hover:underline">Как оплатить подписку</Link>
        </p>
      </section>

      <FaqSection items={FAQ} />
    </>
  );
}
