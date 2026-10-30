import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Key,
  ShoppingCart,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';
import { ROUTES } from '@utils/constants';

export const DASHBOARD_NAV = [
  { id: 'overview', label: 'Обзор', icon: LayoutDashboard, type: 'tab' },
  { id: 'subscription', label: 'Подписки', icon: Key, type: 'tab' },
  { id: 'buy', label: 'Купить', icon: ShoppingCart, type: 'tab' },
  { id: 'earnings', label: 'Заработок', icon: TrendingUp, type: 'route', to: ROUTES.EARNINGS },
  { id: 'support', label: 'Поддержка', icon: HelpCircle, type: 'tab' },
];

function NavButton({ item, active, onTabChange }) {
  const baseClass = 'flex flex-col lg:flex-row items-center lg:items-center gap-1 lg:gap-3 px-2 lg:px-4 py-2 lg:py-3 rounded-xl text-xs lg:text-sm font-medium transition-all w-full';
  const activeClass = 'text-zoomer-neon bg-zoomer-neon/10 lg:border-l-2 lg:border-zoomer-neon lg:rounded-l-none';
  const inactiveClass = 'text-happ-muted hover:text-happ-ink hover:bg-white/5';

  if (item.type === 'route') {
    return (
      <Link
        to={item.to}
        className={`${baseClass} ${active ? activeClass : inactiveClass}`}
      >
        <item.icon className="w-5 h-5 shrink-0" />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onTabChange(item.id)}
      className={`${baseClass} ${active ? activeClass : inactiveClass}`}
    >
      <item.icon className="w-5 h-5 shrink-0" />
      <span className="truncate">{item.label}</span>
    </button>
  );
}

export default function DashboardLayout({ activeId, onTabChange, children }) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="max-w-6xl mx-auto flex">
        <aside className="hidden lg:block w-56 shrink-0 py-8 pl-4 pr-2">
          <nav className="space-y-1 sticky top-24">
            {DASHBOARD_NAV.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                active={activeId === item.id}
                onTabChange={onTabChange}
              />
            ))}
          </nav>
        </aside>

        <div className="flex-1 min-w-0 px-4 py-6 lg:py-8 pb-28 lg:pb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
          {children}
        </div>
      </div>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-t border-zoomer-border/80 safe-area-pb">
        <div className="flex items-stretch justify-around px-1 py-2 max-w-lg mx-auto">
          {DASHBOARD_NAV.map((item) => (
            <div key={item.id} className="flex-1 min-w-0 px-0.5">
              <NavButton
                item={item}
                active={activeId === item.id}
                onTabChange={onTabChange}
              />
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
