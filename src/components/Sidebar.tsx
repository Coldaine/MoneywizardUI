'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', icon: '📊', href: '/' },
  { label: 'Accounts', icon: '🏦', href: '/accounts' },
  { label: 'Transactions', icon: '📝', href: '/transactions' },
  { label: 'Cash Flow', icon: '🌊', href: '/cash-flow' },
  { label: 'Reports', icon: '📈', href: '/reports' },
  { label: 'Budget', icon: '💰', href: '/budget' },
  { label: 'Recurring', icon: '🔄', href: '/recurring', badge: '6' },
  { label: 'Goals', icon: '🎯', href: '/goals', beta: true },
  { label: 'Investments', icon: '📈', href: '/investments' },
  { label: 'Forecasting', icon: '🔮', href: '/forecasting' },
  { label: 'Advice', icon: '💡', href: '/advice' },
];

export const Sidebar = ({ onAssistantOpen }: { onAssistantOpen: () => void }) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar-monarch p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">M</div>
          <span className="font-bold text-lg">Monarch</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-white shadow-sm font-semibold text-foreground'
                    : 'text-secondary hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.beta && <span className="text-[10px] bg-gray-200 px-1 rounded font-bold">BETA</span>}
                </div>
                {item.badge && <span className="bg-primary text-white text-xs px-1.5 rounded-full">{item.badge}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 px-2 text-sm text-secondary">
        <div className="py-4 border-t border-gray-200">
          <div className="mb-4">
            <span className="block text-xs uppercase font-bold text-gray-400 mb-1">Free Trial</span>
            <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-4/5"></div>
            </div>
            <span className="text-[10px] block mt-1">1 day left</span>
          </div>

          <button
            onClick={onAssistantOpen}
            className="w-full flex items-center gap-3 p-2 text-primary font-semibold hover:bg-primary/5 rounded-lg text-left"
          >
            <span>✨</span>
            <span>AI Assistant</span>
          </button>

          <Link href="/help" className="flex items-center gap-3 p-2 text-secondary hover:bg-gray-100 rounded-lg">
            <span>?</span>
            <span>Help &amp; Support</span>
          </Link>

          <Link href="/referral" className="flex items-center gap-3 p-2 text-secondary hover:bg-gray-100 rounded-lg">
            <span>♥</span>
            <span>Invite a friend, get $30</span>
          </Link>
        </div>

        <div className="flex items-center justify-between p-2 hover:bg-gray-100 rounded-lg cursor-pointer border-t border-gray-200 pt-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
            <span className="font-semibold text-foreground">Patrick</span>
          </div>
          <span className="text-secondary text-xs">▾</span>
        </div>
      </div>
    </aside>
  );
};
