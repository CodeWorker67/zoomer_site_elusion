import { Link } from 'react-router-dom';
import { RouteMeta } from '@components/seo/PageMeta';
import PageHero from '@components/sections/PageHero';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import ComparisonTable from '@components/sections/ComparisonTable';
import Button from '@components/ui/Button';
import { ROUTES, TRIAL_OFFER_LABEL } from '@utils/constants';
import { buildTelegramBotUrl } from '@utils/botLink';

const FAQ = [
  {
    q: 'Что такое пробная подписка Happ?',
    a: 'Короткий оплаченный период — 3 дня за 9 ₽. Полный доступ к VPN для Happ, ключ выдаётся после оплаты в личном кабинете.',
  },
  {
    q: 'Где оформить триал Happ?',
    a: 'Зарегистрируйтесь на Зумерский VPN по email или Google, откройте раздел «Купить» и выберите «Триал 3 дня — 9 ₽».',
  },
  {
    q: 'На сколько дней пробная подписка Happ?',
    a: '3 дня. Тариф доступен один раз до первой активации ключа в панели.',
  },
  {
    q: 'Как оплатить пробный тариф?',
    a: 'СБП или карта РФ через Platega. Автосписаний нет — только выбранный период.',
  },
  {
    q: 'Есть ли триал 3 дня за 9 ₽ в Telegram-боте?',
    a: 'Нет, этот тариф только на сайте Зумерский VPN. В боте — другие тарифы.',
  },
  {
    q: 'Работают ли ключи после триала?',
    a: 'Да, ключи полностью рабочие. После окончания 3 дней продлите подписку — тот же ключ в Happ.',
  },
  {
    q: 'Что после окончания пробной подписки?',
    a: 'Выберите тариф от 189 ₽/мес (1 устройство) или длиннее. Ключ остаётся прежним — обновлять в Happ не нужно.',
  },
];

export default function HappFreePage() {
  return (
    <>
      <RouteMeta path={ROUTES.HAPP_FREE} />
      <PageHero
        title={`Пробная подписка Happ — ${TRIAL_OFFER_LABEL}`}
        subtitle="Оформите пробную подписку Happ за 1 минуту. Полноценный доступ на 3 дня — оплата через СБП или карту РФ."
        primaryLabel={TRIAL_OFFER_LABEL}
        secondaryLabel="Через Telegram"
        secondaryTo={ROUTES.HAPP_TELEGRAM}
      />

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-6">Что такое пробная подписка Happ</h2>
          <p className="text-happ-muted leading-relaxed mb-4">
            Пробная подписка Happ — короткий платный период {TRIAL_OFFER_LABEL}. Тот же VLESS-ключ,
            те же серверы и та же скорость, что на длинных тарифах.
          </p>
          <p className="text-happ-muted leading-relaxed">
            Без автопродления: вы платите только за 3 дня и решаете, продлевать ли доступ дальше.
          </p>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8">Как получить пробную подписку Happ</h2>
          <ol className="space-y-4 mb-12">
            {[
              `Нажмите «${TRIAL_OFFER_LABEL}»`,
              'Зарегистрируйтесь по email или Google',
              'В личном кабинете откройте раздел «Купить» и оплатите триал',
              'Откройте Happ и импортируйте QR-код или ссылку',
            ].map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-zoomer-neon/20 text-zoomer-neon flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                <span className="text-happ-muted pt-1">{s}</span>
              </li>
            ))}
          </ol>

          <h3 className="text-xl font-bold text-happ-ink mb-4">Что входит в триал</h3>
          <ul className="space-y-2 text-happ-muted mb-8">
            <li>• Полноценный доступ к VPN на 3 дня</li>
            <li>• Happ VPN ключ с QR-кодом и ссылкой</li>
            <li>• Серверы в нескольких странах</li>
            <li>• Настройка за 1 минуту</li>
            <li>• До 10 устройств (выбор в кабинете)</li>
          </ul>

          <Link to={ROUTES.LOGIN}><Button>{TRIAL_OFFER_LABEL}</Button></Link>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8 text-center">Триал vs платная подписка</h2>
          <ComparisonTable
            columns={['Функция', 'Триал 3 дня', 'Платная']}
            rows={[
              ['Срок действия', '3 дня', '1 мес — 1 год'],
              ['Серверы', 'Все серверы', 'Все серверы'],
              ['Количество устройств', 'До 10 устройств', 'До 10 устройств'],
              ['Стоимость', '9 ₽', 'От 189 ₽/мес'],
            ]}
          />
          <div className="text-center mt-8">
            <Link to={ROUTES.HAPP}><Button variant="secondary">Получить подписку Happ</Button></Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20 text-center px-4">
        <h2 className="text-xl font-bold text-happ-ink mb-4">Подписка через Telegram</h2>
        <p className="text-happ-muted mb-6">Триал 3 дня за 9 ₽ — только на сайте. В боте — платные тарифы.</p>
        <a href={buildTelegramBotUrl()} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Открыть Telegram бот</Button>
        </a>
      </section>

      <FaqSection items={FAQ} />
      <CtaBlock title="Получить подписку Happ" buttonLabel={TRIAL_OFFER_LABEL} />

      <div className="pb-12 text-center text-sm text-happ-faint">
        <Link to={ROUTES.HAPP} className="hover:text-zoomer-neon">Получить подписку Happ</Link>
        <span className="mx-2">·</span>
        <Link to={ROUTES.HAPP_TELEGRAM} className="hover:text-zoomer-neon">Подписка через Telegram</Link>
      </div>
    </>
  );
}
