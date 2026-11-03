import { RouteMeta } from '@components/seo/PageMeta';
import { Link } from 'react-router-dom';
import PageHero from '@components/sections/PageHero';
import PricingCards from '@components/sections/PricingCards';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import Button from '@components/ui/Button';
import { BRAND, BRAND_META, HOME_TARIFFS, ROUTES, SERVERS, TRIAL_OFFER_LABEL } from '@utils/constants';
import { buildTelegramBotUrl } from '@utils/botLink';

const FAQ = [
  { q: 'Что такое ключ и подписка для INCY (Инси)?', a: 'INCY — клиент. Зумерский VPN выдаёт ключ и подписку для импорта. Ключ — способ подключения, подписка — оплаченный период.' },
  { q: 'Где взять серверы для INCY?', a: 'Добавьте одну ссылку-подписку от Зумерский VPN — серверы появятся списком автоматически.' },
  { q: 'Можно ли получить пробный ключ для INCY?', a: `Да — ${TRIAL_OFFER_LABEL} на сайте. После триала доступ продлевается подпиской.` },
  { q: 'Сколько стоит подписка для INCY?', a: 'От 189 ₽ за 1 месяц (1 устройство): 3 мес — 449 ₽, 6 мес — 749 ₽, год — 1 299 ₽.' },
  { q: 'Нужен ли отдельный ключ под каждый сервер INCY?', a: 'Нет. Одна ссылка-подписка открывает все серверы.' },
  { q: 'Как добавить доступ в INCY?', a: 'Кнопкой из кабинета, по ссылке-подписке или QR-коду. Затем выберите сервер.' },
  { q: 'INCY сам выдаёт ключи и серверы?', a: 'Нет. INCY — приложение-клиент. Доступ получают у Зумерский VPN.' },
  { q: 'Какой формат у ключа?', a: 'VLESS (Reality) или ссылка-подписка, которая обновляет конфигурации автоматически.' },
];

export default function IncyVpnPage() {
  return (
    <>
      <RouteMeta path={ROUTES.INCY_VPN} />
      <PageHero
        title="INCY (Инси) ключ и подписка VPN"
        subtitle={`Получите ключ или ссылку-подписку для INCY. После добавления в приложении появятся серверы. ${TRIAL_OFFER_LABEL}.`}
        primaryLabel={TRIAL_OFFER_LABEL}
        primaryTo={ROUTES.LOGIN}
        secondaryLabel="Оформить подписку"
        secondaryTo={ROUTES.HAPP}
      />

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-happ-muted leading-relaxed mb-8">
            {BRAND} не является официальным сервисом INCY. Мы выдаём ключ доступа и ссылку-подписку
            для совместимого приложения.
          </p>
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Что такое INCY (Инси): ключ и подписка</h2>
          <p className="text-happ-muted leading-relaxed">
            INCY (Инси) — приложение-клиент, а не отдельный VPN-сервис. Чтобы подключиться, в INCY добавляют
            готовый ключ или ссылку-подписку от провайдера. Тот же доступ работает в Happ и других клиентах.
          </p>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">INCY ключ и пробная подписка</h2>
          <p className="text-happ-muted leading-relaxed mb-6">
            {TRIAL_OFFER_LABEL} — на Зумерский VPN, без автосписаний. После триала доступ продлевается подпиской.
          </p>
          <Link to={ROUTES.HAPP_FREE}><Button variant="secondary">{TRIAL_OFFER_LABEL}</Button></Link>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Серверы для INCY VPN</h2>
          <p className="text-happ-muted mb-6 text-sm">Одна ссылка-подписка открывает все серверы — переключение в один тап.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {SERVERS.map((s) => (
              <span key={s} className="px-3 py-1.5 rounded-lg bg-white/5 border border-zoomer-border text-happ-muted text-sm">{s}</span>
            ))}
          </div>
          <p className="text-happ-faint text-sm">Список серверов в INCY обновляется автоматически.</p>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8">Как получить ключ и подписку INCY</h2>
          <ol className="space-y-3 text-happ-muted mb-8">
            {['Регистрация по email или Google', 'Пробный доступ или тариф', 'Подписка в личном кабинете', 'Добавить в INCY и выбрать сервер'].map((s, i) => (
              <li key={s} className="flex gap-4">
                <span className="text-zoomer-neon font-bold">{i + 1}.</span> {s}
              </li>
            ))}
          </ol>
          <Link to={ROUTES.LOGIN}><Button>Получить доступ →</Button></Link>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8">Как добавить доступ в INCY</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Кнопкой из кабинета', desc: 'Нажмите «Подключить» — доступ добавится сам.' },
              { title: 'По ссылке-подписке', desc: 'Скопируйте ссылку из кабинета — серверы появятся списком.' },
              { title: 'По QR-коду', desc: 'В INCY выберите сканирование и наведите камеру на QR.' },
            ].map((x) => (
              <div key={x.title} className="card-dark">
                <h3 className="text-happ-ink font-semibold mb-2 text-sm">{x.title}</h3>
                <p className="text-happ-muted text-xs">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink text-center mb-10">Сколько стоит подписка для INCY VPN</h2>
          <PricingCards tariffs={HOME_TARIFFS} />
          <p className="text-happ-faint text-sm text-center mt-6">Оплата через СБП, без автосписаний. При продлении ключ не меняется.</p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-6">INCY ключ или сервер не работает</h2>
          <ul className="space-y-2 text-happ-muted text-sm">
            <li>• Проверьте срок подписки</li>
            <li>• Обновите ссылку-подписку в INCY (потяните список вниз)</li>
            <li>• Попробуйте другой сервер из списка</li>
            <li>• Проверьте интернет без подключения</li>
            <li>• Заново добавьте доступ кнопкой / отсканируйте QR</li>
            <li>• Напишите в поддержку Зумерский VPN</li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20 text-center px-4">
        <h2 className="text-xl font-bold text-happ-ink mb-4">Доступ для INCY через Telegram</h2>
        <p className="text-happ-muted mb-6 text-sm">Получите ключ, ссылку и QR прямо в боте — без регистрации на сайте.</p>
        <a href={buildTelegramBotUrl()} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">Открыть Telegram бот</Button>
        </a>
      </section>

      <FaqSection items={FAQ} />
      <CtaBlock title="Получите ключ и подписку для INCY за минуту" subtitle={TRIAL_OFFER_LABEL} buttonLabel={TRIAL_OFFER_LABEL} />
    </>
  );
}
