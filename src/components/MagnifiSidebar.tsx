'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const mainNav = [
  { label: 'Dashboard', icon: '◈', href: '/magnifi' },
  { label: 'Investments', icon: '📊', href: '/magnifi/investments' },
  { label: 'Portfolio', icon: '🗂', href: '/magnifi/portfolio' },
  { label: 'Search', icon: '🔍', href: '/magnifi/search' },
  { label: 'Transactions', icon: '↕', href: '/magnifi/transactions' },
  { label: 'News', icon: '📰', href: '/magnifi/news' },
  { label: 'Screener', icon: '⚗', href: '/magnifi/screener' },
  { label: 'Compare', icon: '⊞', href: '/magnifi/compare' },
  { label: 'AI Chat', icon: '💬', href: '/magnifi/chat' },
];

const analyticsNav = [
  { label: 'Analytics', icon: '📈', href: '/magnifi/analytics' },
  { label: 'Performance', icon: '📉', href: '/magnifi/performance' },
  { label: 'Reports', icon: '📋', href: '/magnifi/reports' },
  { label: 'Tax', icon: '🧾', href: '/magnifi/tax' },
];

const planningNav = [
  { label: 'Goals', icon: '🎯', href: '/magnifi/goals' },
  { label: 'Planner', icon: '📅', href: '/magnifi/planner' },
];

const accountNav = [
  { label: 'Settings', icon: '⚙️', href: '/magnifi/settings' },
  { label: 'Account', icon: '🏦', href: '/magnifi/account' },
  { label: 'Profile', icon: '👤', href: '/magnifi/profile' },
  { label: 'Billing', icon: '💳', href: '/magnifi/billing' },
  { label: 'Documents', icon: '📄', href: '/magnifi/documents' },
];

function NavSection({ label, items, pathname }: {
  label: string;
  items: { label: string; icon: string; href: string }[];
  pathname: string;
}) {
  return (
    <div className="mb-4">
      <div className="px-3 mb-1 text-[10px] uppercase font-bold tracking-wider" style={{ color: '#606060' }}>
        {label}
      </div>
      {items.map((item) => {
        const isActive = item.href === '/magnifi'
          ? pathname === '/magnifi'
          : pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2 mx-1 rounded-lg text-sm transition-colors"
            style={{
              color: isActive ? '#E0CD72' : '#CCCCCC',
              background: isActive ? 'rgba(224,205,114,0.08)' : 'transparent',
            }}
          >
            <span className="text-base w-5 text-center" aria-hidden="true">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
            {isActive && (
              <span className="ml-auto w-1 h-4 rounded-full" style={{ background: '#E0CD72' }} />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function MagnifiSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar-magnifi flex flex-col py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 mb-6">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
          style={{ background: '#E0CD72', color: '#030F12' }}
        >
          M
        </div>
        <span className="font-bold text-white text-lg">Magnifi</span>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto">
        <NavSection label="Invest" items={mainNav} pathname={pathname} />
        <NavSection label="Analyze" items={analyticsNav} pathname={pathname} />
        <NavSection label="Plan" items={planningNav} pathname={pathname} />
        <NavSection label="Account" items={accountNav} pathname={pathname} />
      </nav>

      {/* Back to Monarch */}
      <div className="px-4 pt-4 border-t" style={{ borderColor: '#1a2a2f' }}>
        <Link
          href="/"
          className="flex items-center gap-2 text-xs py-2 px-1 rounded transition-colors"
          style={{ color: '#606060' }}
        >
          <span>←</span>
          <span>Back to Monarch</span>
        </Link>
      </div>
    </aside>
  );
}
