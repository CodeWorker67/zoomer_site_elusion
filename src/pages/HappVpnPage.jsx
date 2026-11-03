import { RouteMeta } from '@components/seo/PageMeta';
import { Link } from 'react-router-dom';
import PageHero from '@components/sections/PageHero';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import Button from '@components/ui/Button';
import { BRAND, BRAND_META, ROUTES, TRIAL_OFFER_LABEL } from '@utils/constants';

const FAQ = [
  { q: 'Что такое VPN для Happ?', a: 'Happ — клиент VPN, в который импортируется готовый VLESS ключ. Ключ выдаёт Зумерский VPN после регистрации.' },
  { q: 'Какой VPN-протокол использует Happ?', a: 'Happ работает по протоколу VLESS с Reality — высокая скорость и устойчивость в мобильных сетях.' },
  { q: 'Можно ли подключить VPN в Happ без настройки?', a: 'Да. После регистрации ключ появляется в личном кабинете. QR-код или ссылка — подключение за минуту.' },
  { q: 'VPN для Happ работает на iPhone и Android?', a: 'Да. Один VLESS ключ работает на iOS и Android.' },
  { q: 'Сколько стоит VPN для Happ?', a: 'Триал 3 дня за 9 ₽. Дальше от 189 ₽/мес за 1 устройство, до 10 в кабинете.' },
  { q: 'Как оформить подписку на VPN в Happ?', a: 'Зарегистрируйтесь на Зумерский VPN, выберите тариф и оплатите через СБП. Ключ появится в личном кабинете сразу.' },
  { q: 'Сколько стоит подписка Happ VPN?', a: 'Триал 3 дня за 9 ₽. От 189 ₽/мес (1 устройство): 3 мес — 449 ₽, 6 мес — 749 ₽, год — 1 299 ₽.' },
];

export default function HappVpnPage() {
  return (
    <>
      <RouteMeta path={ROUTES.HAPP_VPN} />
      <PageHero
        title="VPN для Happ"
        subtitle={`Готовый VLESS ключ для подключения в Happ. Импорт по QR-коду или ссылке за минуту. ${TRIAL_OFFER_LABEL}.`}
        primaryLabel="Получить ключ для Happ"
        secondaryLabel={TRIAL_OFFER_LABEL}
        secondaryTo={ROUTES.HAPP_FREE}
      />

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-6">Что нужно для подключения VPN в Happ</h2>
          <ul className="space-y-3 text-happ-muted">
            <li>• Установленное приложение Happ на iPhone или Android</li>
            <li>• VLESS ключ от Зумерский VPN — выдаётся в личном кабинете</li>
            <li>• QR-код или ссылка для импорта — доступны там же</li>
          </ul>
          <p className="text-happ-faint text-sm mt-4">Готовые ключи для Happ доступны сразу после регистрации.</p>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8 text-center">Как работает VLESS ключ для Happ</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Ссылка vless://', desc: 'Содержит адрес сервера и параметры подключения. Передаётся в Happ одной строкой.' },
              { title: 'QR-код', desc: 'Та же ссылка в виде кода. Сканируется камерой прямо из Happ.' },
              { title: 'Reality + VLESS', desc: 'Современный протокол с высокой скоростью. Стабильнее старых VPN в мобильных сетях.' },
            ].map((x) => (
              <div key={x.title} className="card-dark">
                <h3 className="text-happ-ink font-semibold mb-2">{x.title}</h3>
                <p className="text-happ-muted text-sm">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8 text-center">Как подключить VPN в Happ за 1 минуту</h2>
          <ol className="space-y-4">
            {[
              { t: 'Зарегистрируйтесь на Зумерский VPN', d: 'Email или Google' },
              { t: 'Оформите триал в разделе «Купить»', d: TRIAL_OFFER_LABEL },
              { t: 'Откройте Happ', d: 'На iPhone или Android' },
              { t: 'Импортируйте ключ', d: 'QR-код из кабинета или ссылка' },
              { t: 'Подключайтесь', d: 'Включите VPN — соединение готово' },
            ].map((s, i) => (
              <li key={s.t} className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-zoomer-neon/20 text-zoomer-neon flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                <div>
                  <div className="text-happ-muted">{s.t}</div>
                  <div className="text-happ-faint text-sm">{s.d}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8 text-center">VPN для Happ на iPhone и Android</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card-dark">
              <h3 className="text-happ-ink font-semibold mb-2">iPhone (iOS)</h3>
              <p className="text-happ-muted text-sm">Установите Happ из App Store, откройте ключ из личного кабинета — Happ перехватит ссылку и добавит подключение.</p>
            </div>
            <div className="card-dark">
              <h3 className="text-happ-ink font-semibold mb-2">Android</h3>
              <p className="text-happ-muted text-sm">Установите Happ, откройте ссылку или отсканируйте QR-код из кабинета. Подключение появится в списке профилей сразу.</p>
            </div>
          </div>
          <p className="text-happ-faint text-sm text-center mt-6">Один VLESS ключ работает на обеих платформах.</p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Подписка на VPN для Happ</h2>
          <p className="text-happ-muted leading-relaxed mb-4">
            Для работы Happ нужна подписка с готовым VLESS-профилем. После регистрации Зумерский VPN выдаёт доступ,
            который добавляется в Happ по QR-коду или ссылке.
          </p>
          <p className="text-happ-muted leading-relaxed">
            Подписка оплачивается на выбранный срок, без автосписаний. Когда срок заканчивается, ключ в Happ остаётся,
            но соединение перестаёт работать — продление возвращает доступ.
          </p>
          <Link to={ROUTES.HAPP} className="inline-block mt-4 text-zoomer-neon hover:underline text-sm">
            Подробно про подписку Happ и тарифы →
          </Link>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20 text-center px-4">
        <h2 className="text-xl font-bold text-happ-ink mb-4">Пробный доступ</h2>
        <p className="text-happ-muted mb-6 max-w-xl mx-auto">{TRIAL_OFFER_LABEL} — в разделе «Купить» личного кабинета.</p>
        <Link to={ROUTES.HAPP_FREE}><Button variant="secondary">{TRIAL_OFFER_LABEL}</Button></Link>
      </section>

      <FaqSection items={FAQ} />
      <CtaBlock title="Получите ключ для Happ" subtitle={TRIAL_OFFER_LABEL} buttonLabel="Получить ключ для Happ" />

      <div className="pb-12 text-center text-sm text-happ-faint flex flex-wrap justify-center gap-4">
        <Link to={ROUTES.HAPP} className="hover:text-zoomer-neon">Подписка Happ</Link>
        <Link to={ROUTES.HAPP_FREE} className="hover:text-zoomer-neon">Пробная подписка Happ</Link>
        <Link to={ROUTES.HAPP_TELEGRAM} className="hover:text-zoomer-neon">Подписка через Telegram</Link>
      </div>
    </>
  );
}
