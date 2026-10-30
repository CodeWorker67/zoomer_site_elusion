import { RouteMeta } from '@components/seo/PageMeta';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import PageHero from '@components/sections/PageHero';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import Button from '@components/ui/Button';
import { BRAND, BRAND_META, DOWNLOAD_LINKS, ROUTES } from '@utils/constants';
import { buildTelegramBotUrl } from '@utils/botLink';

const FAQ = [
  { q: 'Где безопасно скачать Happ VPN?', a: 'Только из официальных магазинов: App Store для iPhone и macOS, Google Play для Android. APK — на GitHub разработчика.' },
  { q: 'Можно ли скачать Happ VPN на Зумерский VPN?', a: 'Нет. Зумерский VPN не является разработчиком Happ. Мы даём доступ к подписке из личного кабинета.' },
  { q: 'Что делать после установки Happ?', a: 'Зарегистрируйтесь по email или Google, откройте личный кабинет и импортируйте ключ в Happ.' },
  { q: 'Можно ли войти по email?', a: 'Да. Вход по email (код на почту) или Google. Также доступен Telegram-бот.' },
  { q: 'Сколько стоит подключение?', a: 'Пробный день — бесплатно, 1 устройство. Платные тарифы от 189 ₽/мес за 1 устройство.' },
  { q: 'Нужно ли что-то настраивать вручную?', a: 'Нет. Скопируйте ссылку или QR-код из личного кабинета — все параметры уже внутри.' },
];

export default function HappDownloadPage() {
  return (
    <>
      <RouteMeta path={ROUTES.HAPP_DOWNLOAD} />
      <PageHero
        title="Скачать Happ VPN и подключить подписку"
        subtitle="Официальные ссылки на Happ для iPhone, Android, macOS и Windows. После установки зарегистрируйтесь по email или Google — ключ в личном кабинете. Пробный доступ без карты."
        primaryLabel="Начать"
        secondaryLabel="Попробовать бесплатно"
        secondaryTo={ROUTES.HAPP_FREE}
      />

      <p className="text-center text-happ-faint text-sm px-4 max-w-2xl mx-auto -mt-8 mb-8">
        {BRAND} не является разработчиком Happ. Мы даём доступ к подписке — она добавляется в Happ из личного кабинета.
        Сам Happ скачивается из официальных магазинов — ссылки ниже.
      </p>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8 text-center">Где скачать Happ VPN</h2>
          <div className="space-y-4">
            {DOWNLOAD_LINKS.map((d) => (
              <a
                key={d.platform}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-dark flex items-center justify-between hover:border-zoomer-neon/30 transition-colors"
              >
                <div>
                  <div className="text-happ-ink font-medium">{d.platform}</div>
                  <div className="text-happ-faint text-sm">{d.label}</div>
                </div>
                <ExternalLink className="w-5 h-5 text-zoomer-neon" />
              </a>
            ))}
          </div>
          <p className="text-happ-faint text-sm text-center mt-6">Все ссылки ведут на официальные ресурсы разработчика Happ.</p>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20 text-center px-4">
        <h2 className="text-xl font-bold text-happ-ink mb-4">Что нужно после установки Happ</h2>
        <p className="text-happ-muted mb-6 max-w-xl mx-auto">
          Сам Happ — клиент. Чтобы он заработал, нужна подписка. Зарегистрируйтесь по email или Google —
          ключ появится в личном кабинете.
        </p>
        <Link to={ROUTES.LOGIN}><Button>Перейти в личный кабинет</Button></Link>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8">Как подключить подписку в Happ</h2>
          <ol className="space-y-4">
            {[
              'Зарегистрируйтесь на Зумерский VPN по email или Google — пробный доступ активируется',
              'Откройте личный кабинет — там уже есть ваша подписка',
              'Скопируйте ссылку или QR-код для импорта',
              'Импортируйте в Happ',
              'Включите VPN в Happ — соединение готово',
            ].map((s, i) => (
              <li key={s} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-zoomer-neon/20 text-zoomer-neon flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                <span className="text-happ-muted pt-1">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Как получить доступ к VPN</h2>
          <p className="text-happ-muted leading-relaxed mb-4">
            Зарегистрируйтесь на Зумерский VPN — по email (код придёт на почту) или через Google.
            Также можно подключиться через{' '}
            <a href={buildTelegramBotUrl()} target="_blank" rel="noopener noreferrer" className="text-zoomer-neon hover:underline">Telegram-бота</a>.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border text-center px-4">
        <h2 className="text-xl font-bold text-happ-ink mb-4">Пробный доступ</h2>
        <p className="text-happ-muted mb-6 max-w-xl mx-auto">Бесплатный доступ без карты. Проверьте скорость Happ перед оплатой.</p>
        <Link to={ROUTES.HAPP_FREE}><Button variant="secondary">Попробовать бесплатно</Button></Link>
      </section>

      <FaqSection items={FAQ} />

      <div className="pb-4 text-center text-sm text-happ-faint">
        <Link to={ROUTES.HAPP} className="hover:text-zoomer-neon">Оформить подписку Happ</Link>
        <span className="mx-2">·</span>
        <Link to={ROUTES.HAPP_FREE} className="hover:text-zoomer-neon">Пробная подписка Happ</Link>
      </div>

      <CtaBlock title="Готовы подключиться?" subtitle="Скачайте Happ, зарегистрируйтесь по email или Google — и подключитесь за минуту." buttonLabel="Начать" />
    </>
  );
}
