'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'New Conversation', icon: '✏️', href: '/magnifi/chat' },
  { label: 'Home', icon: '🏠', href: '/magnifi' },
  { label: 'Notifications', icon: '🔔', href: '/magnifi/notifications', badge: '3' },
  { label: 'Investments', icon: '📊', href: '/magnifi/investments' },
  { label: 'Research', icon: '📄', href: '/magnifi/research' },
  { label: 'Search', icon: '🔍', href: '/magnifi/search' },
  { label: 'Trade', icon: '⇄', href: '/magnifi/trade' },
];

const recentHistory = [
  "What's my biggest position?",
  'Show me tech sector perf...',
  'Compare AAPL vs MSFT',
];

export function MagnifiSidebar() {
  const pathname = usePathname();

  return (
    <div
      className="sidebar-magnifi"
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ fontSize: '18px', fontWeight: 700, color: '#111827', letterSpacing: '-0.02em' }}>
          Magnifi
        </div>
        <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '2px' }}>by Monarch</div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 0', overflowY: 'auto' }}>
        {navItems.map((item) => {
          const isActive =
            item.href === '/magnifi'
              ? pathname === '/magnifi'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 16px',
                textDecoration: 'none',
                color: isActive ? '#B8A000' : '#374151',
                backgroundColor: isActive ? '#F9F5E7' : 'transparent',
                borderLeft: isActive ? '3px solid #E0CD72' : '3px solid transparent',
                fontSize: '14px',
                fontWeight: isActive ? 600 : 400,
                position: 'relative',
              }}
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{
                  backgroundColor: '#EF4444', color: '#FFFFFF',
                  fontSize: '10px', fontWeight: 600, borderRadius: '9999px',
                  padding: '1px 6px', lineHeight: '16px',
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* History */}
        <div style={{ padding: '16px 16px 8px' }}>
          <div style={{
            fontSize: '10px', fontWeight: 600, color: '#9CA3AF',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px',
          }}>
            HISTORY
          </div>
          {recentHistory.map((query) => (
            <Link
              key={query}
              href="/magnifi/chat"
              style={{
                display: 'block', padding: '5px 0', fontSize: '12px',
                color: '#9CA3AF', textDecoration: 'none',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}
            >
              {query}
            </Link>
          ))}
        </div>
      </nav>

      {/* User footer */}
      <div style={{ borderTop: '1px solid #E5E7EB', padding: '12px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            backgroundColor: '#E0CD72', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '13px', fontWeight: 700,
            color: '#374151', flexShrink: 0,
          }}>
            PM
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{
              fontSize: '14px', fontWeight: 500, color: '#111827',
              whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              Patrick MacLyman
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>$542,678.31</div>
          </div>
        </div>
        <Link
          href="/"
          style={{ display: 'block', fontSize: '12px', color: '#9CA3AF', textDecoration: 'none' }}
        >
          ← Back to Monarch
        </Link>
      </div>
    </div>
  );
}
