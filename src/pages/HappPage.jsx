import { Link } from 'react-router-dom';
import { RouteMeta } from '@components/seo/PageMeta';
import PageHero from '@components/sections/PageHero';
import PricingCards from '@components/sections/PricingCards';
import FaqSection from '@components/sections/FaqSection';
import CtaBlock from '@components/sections/CtaBlock';
import Button from '@components/ui/Button';
import { BRAND, BRAND_META, HOME_TARIFFS, ROUTES } from '@utils/constants';

const FAQ = [
  { q: 'Что такое подписка Happ?', a: 'Подписка Happ — оплаченный период доступа к VPN с готовым VLESS-ключом для импорта в Happ по QR-коду или ссылке.' },
  { q: 'Как купить подписку Happ?', a: 'Зарегистрируйтесь на Зумерский VPN по email или Google, выберите тариф и оплатите через СБП — ключ появится в личном кабинете сразу.' },
  { q: 'Сколько стоит подписка Happ?', a: 'От 189 ₽ за 1 месяц (1 устройство): 3 мес — 449 ₽, 6 мес — 749 ₽, год — 1 299 ₽. В кабинете можно выбрать до 10 устройств. Пробный день — бесплатно.' },
  { q: 'Чем подписка отличается от разового ключа?', a: 'Ключ — формат подключения (vless://), подписка — оплаченный период. Продление возвращает доступ без замены ключа.' },
  { q: 'Как продлить подписку Happ?', a: 'В личном кабинете выберите тариф и оплатите новый период. Ключ остаётся прежним.' },
  { q: 'Где купить хапп ключ?', a: 'На Зумерский VPN — зарегистрируйтесь и оформите подписку, либо перейдите в Telegram-бот.' },
  { q: 'Как получить бесплатный ключ для хапп?', a: 'Активируйте пробный доступ — карта не нужна. Подробнее на странице бесплатной подписки.' },
  { q: 'Нужно что-то настраивать в Happ вручную?', a: 'Нет. Сканируете QR-код или вставляете ссылку — подключение готово.' },
];

export default function HappPage() {
  return (
    <>
      <RouteMeta path={ROUTES.HAPP} />
      <PageHero
        title="Подписка Happ — ключи для Happ VPN"
        subtitle="Оформите подписку Happ с моментальной активацией. Готовый ключ для приложения Happ по QR-коду или ссылке — настройка меньше минуты. От 189 ₽/мес за 1 устройство, пробный день бесплатно."
        primaryLabel="Получить подписку"
        secondaryLabel="Попробовать бесплатно"
        secondaryTo={ROUTES.HAPP_FREE}
      />

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-8 text-center">Купить подписку Happ за 1 минуту</h2>
          <ol className="space-y-4">
            {['Регистрация на Зумерский VPN', 'Выбор тарифа подписки или активация пробного периода', 'Открыть Happ', 'Импортировать QR-код или ссылку', 'Подключение'].map((s, i) => (
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
          <h2 className="text-2xl font-bold text-happ-ink mb-6">Что входит в подписку Happ</h2>
          <ul className="space-y-3 text-happ-muted">
            {['Готовая подписка Happ с первой минуты', 'QR-код и ссылка для импорта', 'Серверы в Европе и США', 'Доступ сразу после регистрации'].map((x) => (
              <li key={x}>• {x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Пробная подписка Happ бесплатно</h2>
          <p className="text-happ-muted mb-6">Хотите попробовать перед оплатой? Активируйте пробную подписку — карта не нужна.</p>
          <Link to={ROUTES.HAPP_FREE}><Button variant="secondary">Получить бесплатно →</Button></Link>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Подписка vs разовый ключ</h2>
          <p className="text-happ-muted leading-relaxed mb-4">
            Ключ — технический формат подключения (строка <code className="text-zoomer-neon">vless://...</code> или QR-код),
            который добавляется в Happ. Подписка — оплаченный период доступа к серверам.
          </p>
          <p className="text-happ-muted leading-relaxed">
            Когда подписка Happ заканчивается, ключ остаётся в приложении, но соединение перестаёт работать.
            Продлите подписку — и тот же ключ снова откроет интернет. В Зумерский VPN вы покупаете подписку Happ,
            а ключ выдаётся в личном кабинете один раз.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4 page-content">
          <h2 className="text-2xl font-bold text-happ-ink mb-6">Тарифы подписки Happ</h2>
          <div className="space-y-4 text-happ-muted">
            <p><strong className="text-happ-ink font-semibold">1 / 3 / 6 месяцев и 1 год</strong> — от 189 ₽ за месяц при 1 устройстве. Число устройств (до 10) выбирается в личном кабинете.</p>
            <p><strong className="text-happ-ink font-semibold">Пробный день</strong> — бесплатно, 1 устройство, без карты.</p>
            <p className="text-happ-faint text-sm">Все тарифы — без автосписаний. Продление только вручную.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink mb-4">Чем хапп ключ отличается от обычного VPN</h2>
          <p className="text-happ-muted leading-relaxed mb-4">
            Happ работает по протоколу VLESS с Reality — высокая скорость и хорошая совместимость с мобильными сетями
            и публичным Wi-Fi.
          </p>
          <p className="text-happ-muted leading-relaxed">
            Для пользователя Happ выглядит как обычный VPN-клиент: кнопка включения, список профилей, выбор страны.
          </p>
        </div>
      </section>

      <section className="py-16 border-t border-zoomer-border">
        <div className="max-w-3xl mx-auto px-4 page-content">
          <h2 className="text-2xl font-bold text-happ-ink mb-6">Когда подходит Happ VPN</h2>
          <ul className="space-y-4 text-happ-muted">
            <li><strong className="text-happ-ink font-semibold">Стабильное соединение</strong> — соцсети, мессенджеры, стриминг без обрывов.</li>
            <li><strong className="text-happ-ink font-semibold">Несколько устройств</strong> — от 1 до 10 на одной подписке.</li>
            <li><strong className="text-happ-ink font-semibold">Простая настройка</strong> — импорт по QR-коду или ссылке за минуту.</li>
          </ul>
        </div>
      </section>

      <section className="py-16 bg-zoomer-card/20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-happ-ink text-center mb-10">Тарифы</h2>
          <PricingCards tariffs={HOME_TARIFFS} />
        </div>
      </section>

      <FaqSection items={FAQ} />
      <CtaBlock title="Купить подписку Happ за 1 минуту" subtitle="От 189 ₽/мес, пробный день бесплатно." buttonLabel="Получить подписку" />

      <div className="pb-12 text-center text-sm text-happ-faint flex flex-wrap justify-center gap-4">
        <Link to={ROUTES.HAPP_FREE} className="hover:text-zoomer-neon">Пробная подписка Happ</Link>
        <Link to={ROUTES.HAPP_TELEGRAM} className="hover:text-zoomer-neon">Подписка через Telegram</Link>
        <Link to={ROUTES.HAPP_VPN} className="hover:text-zoomer-neon">VPN для Happ</Link>
        <Link to={ROUTES.HAPP_DOWNLOAD} className="hover:text-zoomer-neon">Скачать Happ</Link>
      </div>
    </>
  );
}
