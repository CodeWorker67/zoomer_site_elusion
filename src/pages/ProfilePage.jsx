import { useCallback, useEffect, useState } from 'react';
import { RouteMeta } from '@components/seo/PageMeta';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Send,
  Loader2,
  Settings,
  Key,
  Download,
  TrendingUp,
  HelpCircle,
  CreditCard,
  MonitorSmartphone,
} from 'lucide-react';
import useAuthStore from '@stores/authStore';
import { authApi, userApi } from '@services/api';
import TrialCtaButton from '@components/subscription/TrialCtaButton';
import Button from '@components/ui/Button';
import toast from 'react-hot-toast';
import DashboardLayout from '@components/dashboard/DashboardLayout';
import ReferralCard from '@components/dashboard/ReferralCard';
import {
  BRAND_META,
  ROUTES,
  TELEGRAM,
  DOWNLOAD_LINKS,
} from '@utils/constants';
import TariffRenewalSection from '@components/subscription/TariffRenewalSection';
import { devicesLabel } from '@utils/pricing';
import { buildTelegramBotUrl } from '@utils/botLink';
import {
  RAFFLE_RULES_URL,
  parseRaffleTicketCount,
} from '@utils/raffle';

const VALID_TABS = new Set(['overview', 'subscription', 'buy', 'support']);

export default function ProfilePage() {
  const location = useLocation();
  const initialTab = VALID_TABS.has(location.state?.tab) ? location.state.tab : 'overview';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (VALID_TABS.has(location.state?.tab)) {
      setActiveTab(location.state.tab);
    }
  }, [location.state?.tab]);

  return (
    <>
      <RouteMeta path={ROUTES.PROFILE} />
      <DashboardLayout activeId={activeTab} onTabChange={setActiveTab}>
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Личный кабинет</h1>
          <div className="flex items-center gap-2 shrink-0">
            {activeTab === 'overview' && (
              <Link
                to={ROUTES.SETTINGS}
                className="p-2 rounded-lg text-happ-muted hover:text-happ-ink hover:bg-white/5 transition-colors"
                title="Настройки"
                aria-label="Настройки"
              >
                <Settings className="w-5 h-5" />
              </Link>
            )}
            <button
              type="button"
              onClick={logout}
              className="p-2 rounded-lg text-happ-muted hover:text-red-400 transition-colors"
              title="Выйти"
              aria-label="Выйти"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {user?.email && (
          <div className="mb-5 px-4 py-3 rounded-xl bg-zoomer-card border border-zoomer-border text-sm text-happ-muted">
            {user.email}
          </div>
        )}

        {activeTab === 'overview' && (
          <OverviewTab
            onGoTab={setActiveTab}
          />
        )}
        {activeTab === 'subscription' && <SubscriptionTab />}
        {activeTab === 'buy' && <BuyTab />}
        {activeTab === 'support' && <SupportTab />}
      </DashboardLayout>
    </>
  );
}

function OverviewTab({ onGoTab }) {
  const [sub, setSub] = useState(null);
  const [raffleTickets, setRaffleTickets] = useState(0);
  const [loading, setLoading] = useState(true);
  const loadOverview = useCallback(async () => {
    try {
      const [subRes, meRes] = await Promise.all([
        userApi.subscription(),
        authApi.me(),
      ]);
      setSub(subRes.data);
      setRaffleTickets(
        Math.max(parseRaffleTicketCount(subRes.data), parseRaffleTicketCount(meRes.data)),
      );
    } catch {
      setSub(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  const isActive = sub?.active || sub?.pro?.active;
  const expires = sub?.expires || sub?.pro?.expires;
  const hasPaid =
    sub?.has_paid_subscription === true || sub?.pro?.has_paid_subscription === true;
  const planName =
    sub?.plan_name
    || sub?.pro?.plan_name
    || (isActive && !hasPaid ? 'Пробный' : 'Подписка');
  const inPanel = Boolean(sub?.in_panel);
  /** Триал доступен до первой активации ключа в панели. */
  const showTrialCta = !inPanel && !isActive && !hasPaid;
  const devicesNum = isActive ? Number(sub?.devices) : 0;
  const devicesText = devicesNum >= 1 ? devicesLabel(devicesNum) : '—';

  if (loading) return <LoadingBlock />;

  const quickActions = [
    { label: 'Подписки', icon: Key, action: () => onGoTab('subscription') },
    { label: 'Купить', icon: CreditCard, action: () => onGoTab('buy') },
    { label: 'Добавить устройство', icon: MonitorSmartphone, to: ROUTES.ADD_DEVICE },
    { label: 'Приложения', icon: Download, to: `${ROUTES.ONBOARDING}?setup=1` },
    { label: 'Рефералы', icon: TrendingUp, to: ROUTES.EARNINGS },
  ];

  return (
    <div className="space-y-5">
      <div className="card-dark border-purple-500/25 bg-gradient-to-br from-purple-500/[0.07] to-transparent">
        <h2 className="text-lg font-bold text-happ-ink mb-2">Розыгрыш</h2>
        <p className="text-happ-muted text-sm mb-3">
          Ваше количество билетов:{' '}
          <span className="text-happ-ink font-semibold">{raffleTickets} 🎟️</span>
        </p>
        <a
          href={RAFFLE_RULES_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zoomer-neon hover:underline inline-flex items-center gap-1"
        >
          Условия участия в конкурсе
          <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden />
        </a>
      </div>

      <Link
        to={`${ROUTES.ONBOARDING}?setup=1`}
        className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon hover:opacity-95 transition-opacity group"
      >
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
          <Shield className="w-5 h-5 text-zoomer-dark" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <div className="text-zoomer-dark font-bold text-base">Подключить VPN</div>
          <div className="text-zoomer-dark/80 text-xs sm:text-sm">
            Пошаговая инструкция — установка и подключение
          </div>
        </div>
        <ArrowRight className="w-5 h-5 text-zoomer-dark shrink-0 group-hover:translate-x-0.5 transition-transform" />
      </Link>

      <div className="card-dark">
        <div className="flex items-center gap-2 mb-3">
          <Shield className={`w-5 h-5 ${isActive ? 'text-zoomer-neon' : 'text-happ-faint'}`} />
          <span className="text-happ-ink font-semibold">{planName}</span>
        </div>
        {isActive && expires ? (
          <p className="text-sm text-zoomer-neon/90 mb-2">Активна до {expires}</p>
        ) : (
          <p className="text-sm text-red-400 mb-2">Подписка не активна</p>
        )}
        <p className="text-sm text-happ-muted mb-4">
          Устройств:{' '}
          <span className="text-happ-ink font-medium">{devicesText}</span>
        </p>
        {showTrialCta && (
          <div className="mb-4">
            <TrialCtaButton />
          </div>
        )}
        {isActive && (
          <div className="mb-5">
            <div className="flex justify-between text-xs text-happ-faint mb-1.5">
              <span>Трафик</span>
              <span>Безлимит</span>
            </div>
            <div className="h-1.5 rounded-full bg-zoomer-dark overflow-hidden">
              <div className="h-full w-0 rounded-full bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon" />
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onGoTab('subscription')}
            className="flex-1 py-2.5 px-4 rounded-xl border-2 border-happ-blue/45 bg-happ-blue/[0.07] text-happ-blue text-sm font-semibold hover:bg-happ-blue/10 hover:border-happ-blue/70 transition-colors"
          >
            Управлять
          </button>
          <button
            type="button"
            onClick={() => onGoTab('buy')}
            className="flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon text-zoomer-dark hover:opacity-90 transition-opacity"
          >
            Продлить
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-happ-ink mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((item, idx) => {
            const content = (
              <>
                <item.icon className="w-6 h-6 text-zoomer-neon mb-2" />
                <span className="text-happ-ink text-sm font-medium">{item.label}</span>
              </>
            );
            const isLastOdd = idx === quickActions.length - 1 && quickActions.length % 2 === 1;
            const className = `card-dark flex flex-col items-center justify-center text-center py-5 hover:border-zoomer-neon/30 transition-colors min-h-[100px]${isLastOdd ? ' col-span-2' : ''}`;

            if (item.to) {
              return (
                <Link key={item.label} to={item.to} className={className}>
                  {content}
                </Link>
              );
            }
            return (
              <button key={item.label} type="button" onClick={item.action} className={className}>
                {content}
              </button>
            );
          })}
        </div>
      </div>

      <ReferralCard />
    </div>
  );
}

function SubscriptionTab() {
  const [sub, setSub] = useState(null);
  const [keys, setKeys] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [autopayBusy, setAutopayBusy] = useState(false);

  useEffect(() => {
    Promise.all([
      userApi.subscription().then(({ data }) => setSub(data)).catch(() => setSub(null)),
      userApi.keys().then(({ data }) => setKeys(data)).catch(() => setKeys(null)),
    ]).finally(() => setLoading(false));
  }, []);

  const isActive = sub?.active || sub?.pro?.active;
  const subUrl = keys?.subscription_url || keys?.pro_url;
  const expires = sub?.expires || sub?.pro?.expires;
  const devicesCount = isActive ? Number(sub?.devices) || 0 : 0;
  const autopayOn = sub?.autopay_enabled === true || sub?.autopay_active === true;

  const disableAutopay = async () => {
    setAutopayBusy(true);
    try {
      await userApi.disableAutopay();
      toast.success('Автоплатежи отключены');
      const { data } = await userApi.subscription();
      setSub(data);
    } catch (err) {
      const detail = err.response?.data?.detail;
      toast.error(typeof detail === 'string' ? detail : 'Не удалось отключить автоплатежи');
    } finally {
      setAutopayBusy(false);
    }
  };

  const copyUrl = () => {
    if (!subUrl) return;
    navigator.clipboard.writeText(subUrl);
    setCopied(true);
    toast.success('Ссылка скопирована');
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <LoadingBlock />;

  return (
    <div className="space-y-4">
      <div className="card-dark">
        <h2 className="text-lg font-bold text-happ-ink mb-4">Ваша подписка</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 py-2 border-b border-zoomer-border">
            <span className="text-happ-muted">Статус</span>
            <span className={isActive ? 'text-zoomer-neon font-medium' : 'text-red-400 font-medium'}>
              {isActive ? 'Активна' : 'Не активна'}
            </span>
          </div>
          <div className="flex justify-between gap-4 py-2 border-b border-zoomer-border">
            <span className="text-happ-muted">Срок действия</span>
            <span className="text-happ-ink text-right">{expires || '—'}</span>
          </div>
          <div className="flex justify-between gap-4 py-2 border-b border-zoomer-border">
            <span className="text-happ-muted">Устройств</span>
            <span className="text-happ-ink">{devicesCount ? devicesLabel(devicesCount) : '—'}</span>
          </div>
          <div className="flex justify-between gap-4 py-2 items-center">
            <span className="text-happ-muted">Автоплатежи</span>
            <span className={`font-medium ${autopayOn ? 'text-zoomer-neon' : 'text-happ-faint'}`}>
              {autopayOn ? 'включены' : 'отключены'}
            </span>
          </div>
        </div>
        {autopayOn && (
          <button
            type="button"
            onClick={disableAutopay}
            disabled={autopayBusy}
            className="mt-3 w-full py-2.5 px-4 rounded-xl border-2 border-red-400/40 text-red-400 text-sm font-semibold hover:bg-red-400/10 transition-colors disabled:opacity-60"
          >
            {autopayBusy ? 'Отключаем…' : 'Отключить автоплатеж'}
          </button>
        )}
        <Link
          to={ROUTES.ADD_DEVICE}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-happ-blue/45 bg-happ-blue/[0.07] text-happ-blue text-sm font-semibold hover:bg-happ-blue/10 hover:border-happ-blue/70 transition-colors"
        >
          <MonitorSmartphone className="w-4 h-4 shrink-0" />
          Добавить устройство
        </Link>
      </div>

      {subUrl ? (
        <div className="card-dark">
          <h3 className="text-happ-ink font-semibold mb-3">Ссылка-подписка</h3>
          <p className="text-happ-faint text-sm mb-4">
            Скопируйте ссылку или откройте её в Happ. При продлении подписки ключ не меняется.
          </p>
          <div className="p-3 bg-happ-gray rounded-xl border border-black/[0.07] mb-3">
            <code className="text-xs text-happ-blue font-mono break-all block">{subUrl}</code>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={copyUrl}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-happ-blue/45 bg-happ-blue/[0.07] text-happ-blue text-sm font-semibold hover:bg-happ-blue/10 hover:border-happ-blue/70 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 shrink-0" /> : <Copy className="w-4 h-4 shrink-0" />}
              {copied ? 'Скопировано' : 'Копировать'}
            </button>
            <a
              href={subUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold bg-happ-blue text-white hover:bg-happ-blue-hover transition-colors"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              Открыть
            </a>
          </div>
        </div>
      ) : (
        <div className="card-dark text-center py-10">
          <Shield className="w-10 h-10 text-happ-faint mx-auto mb-3" />
          <p className="text-happ-muted text-sm mb-1">Подписка ещё не активирована</p>
          <p className="text-happ-faint text-xs">Продлите подписку в разделе «Купить»</p>
        </div>
      )}

      <div className="card-dark">
        <h3 className="text-happ-ink font-semibold mb-3">Как добавить в Happ</h3>
        <ol className="space-y-2 text-sm text-happ-muted list-decimal list-inside">
          <li>Скачайте Happ на своё устройство</li>
          <li>Нажмите «Открыть» или вставьте ссылку-подписку</li>
          <li>Выберите сервер и подключитесь</li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          {DOWNLOAD_LINKS.slice(0, 3).map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zoomer-neon hover:underline"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>

      <TariffRenewalSection />
    </div>
  );
}

function BuyTab() {
  return (
    <div className="space-y-4">
      <div className="card-dark">
        <h2 className="text-lg font-bold text-happ-ink mb-2">Продление подписки</h2>
        <p className="text-happ-muted text-sm mb-3">
          Выберите срок продления текущей подписки. VLESS-ключ и ссылка в Happ останутся прежними —
          меняется только оплаченный период доступа.
        </p>
        <p className="text-sm font-semibold text-zoomer-neon leading-relaxed border-t border-zoomer-border pt-3 mb-3">
          💯Мы даем гарантию возврата средств, если VPN не заработает!
        </p>
        {/* <p className="text-sm text-happ-muted leading-relaxed">
          🎟️Покупая любой тариф от 1 месяца, вы автоматически участвуете в розыгрыше более 100
          призов🎟️
        </p> */}
      </div>
      <TariffRenewalSection showHeader={false} />
    </div>
  );
}

function SupportTab() {
  return (
    <div className="space-y-4">
      <div className="card-dark">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-zoomer-neon/10 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-zoomer-neon" />
          </div>
          <h2 className="text-lg font-bold text-white">Поддержка</h2>
        </div>
        <p className="text-happ-muted text-sm mb-6">
          Если возникли вопросы по подключению, оплате или работе VPN — напишите нам в Telegram.
          Среднее время ответа — несколько минут.
        </p>
        <a
          href={TELEGRAM.SUPPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-zoomer-neon-dim to-zoomer-neon text-zoomer-dark font-semibold hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5" />
          Написать в поддержку
        </a>
      </div>

      <div className="card-dark">
        <h3 className="text-happ-ink font-semibold mb-2">Telegram-бот</h3>
        <p className="text-happ-faint text-sm mb-4">
          Управляйте подпиской и получайте ключи прямо в боте.
        </p>
        <a
          href={buildTelegramBotUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-zoomer-neon text-sm hover:underline"
        >
          Открыть бота →
        </a>
      </div>
    </div>
  );
}

function LoadingBlock() {
  return (
    <div className="card-dark flex items-center justify-center py-16">
      <Loader2 className="w-8 h-8 text-zoomer-neon animate-spin" />
    </div>
  );
}
