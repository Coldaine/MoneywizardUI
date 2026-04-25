'use client';

import { useState } from 'react';

type Category = 'All' | 'Alerts' | 'Activity' | 'System';

interface Notification {
  id: number;
  title: string;
  body: string;
  time: string;
  category: 'Alerts' | 'Activity' | 'System';
  read: boolean;
  icon: string;
}

const INITIAL: Notification[] = [
  { id: 1, title: 'Price Alert: NVDA', body: 'NVIDIA crossed your alert price of $900.00 — currently trading at $912.44.', time: '2m ago', category: 'Alerts', read: false, icon: '📈' },
  { id: 2, title: 'Portfolio Update', body: 'Your portfolio gained +$1,204.32 (+0.5%) today.', time: '1h ago', category: 'Activity', read: false, icon: '📊' },
  { id: 3, title: 'Dividend Received', body: 'AAPL dividend of $42.30 deposited into Fidelity Brokerage.', time: '3h ago', category: 'Activity', read: false, icon: '💰' },
  { id: 4, title: 'Account Re-auth Required', body: 'Your Coinbase connection has expired. Relink to keep your data in sync.', time: '5h ago', category: 'System', read: false, icon: '⚠️' },
  { id: 5, title: 'Price Alert: TSLA', body: 'Tesla dropped below your alert price of $180.00 — currently at $174.20.', time: 'Yesterday', category: 'Alerts', read: true, icon: '📉' },
  { id: 6, title: 'Trade Executed: Buy VTI', body: '5 shares of VTI purchased at $241.87 in Fidelity Brokerage.', time: 'Yesterday', category: 'Activity', read: true, icon: '✅' },
  { id: 7, title: 'Weekly Summary', body: 'Your portfolio is up +2.3% this week. Top performer: NVDA +6.1%.', time: '2 days ago', category: 'System', read: true, icon: '📋' },
  { id: 8, title: 'Price Alert: BTC', body: 'Bitcoin crossed $65,000 — currently at $65,840.', time: '3 days ago', category: 'Alerts', read: true, icon: '🔔' },
];

const PREFS = [
  { id: 'price_alerts', label: 'Price Alerts', description: 'Notify when an asset hits your target price', enabled: true },
  { id: 'portfolio_updates', label: 'Portfolio Updates', description: 'Daily portfolio performance summaries', enabled: true },
  { id: 'dividends', label: 'Dividend Receipts', description: 'Alert on dividend payments', enabled: true },
  { id: 'account_health', label: 'Account Health', description: 'Connection expiry and sync warnings', enabled: true },
  { id: 'news_mentions', label: 'News Mentions', description: 'When holdings appear in major news', enabled: false },
  { id: 'weekly_summary', label: 'Weekly Summary', description: 'Digest of weekly portfolio performance', enabled: true },
  { id: 'ai_insights', label: 'AI Insights', description: 'Personalized recommendations from Magnifi AI', enabled: false },
];

const BADGE: Record<string, { bg: string; color: string }> = {
  Alerts:   { bg: 'rgba(224,205,114,0.15)', color: '#B89A00' },
  Activity: { bg: 'rgba(22,181,72,0.12)',   color: '#16B548' },
  System:   { bg: 'rgba(96,96,96,0.12)',    color: '#606060' },
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'preferences'>('inbox');
  const [category, setCategory] = useState<Category>('All');
  const [notifications, setNotifications] = useState(INITIAL);
  const [prefs, setPrefs] = useState(PREFS);

  const filtered = notifications.filter(
    (n) => category === 'All' || n.category === category
  );
  const unreadCount = notifications.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: number) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }

  function togglePref(id: string) {
    setPrefs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-[#030F12]">Notifications</h1>
            {unreadCount > 0 && (
              <span className="rounded-full bg-[#E0CD72] text-[#030F12] text-xs font-bold px-2.5 py-0.5">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Alert history and notification preferences.</p>
        </div>
        {activeTab === 'inbox' && unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="rounded-full border border-[#030F12] text-[#030F12] font-semibold px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl p-1 w-fit" style={{ background: '#F4F4F5' }}>
        {(['inbox', 'preferences'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className="rounded-lg px-5 py-1.5 text-sm font-semibold capitalize transition-colors"
            style={
              activeTab === t
                ? { background: '#fff', color: '#030F12', boxShadow: '0 1px 4px #00000014' }
                : { color: '#606060' }
            }
          >
            {t}
          </button>
        ))}
      </div>

      {activeTab === 'inbox' && (
        <>
          {/* Category filter */}
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Alerts', 'Activity', 'System'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="rounded-full px-4 py-1.5 text-sm font-semibold border transition-colors"
                style={
                  category === cat
                    ? { background: '#030F12', color: '#E0CD72', borderColor: '#030F12' }
                    : { background: 'transparent', color: '#606060', borderColor: '#E0E0E0' }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notification list */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="card-magnifi text-center py-10" style={{ color: '#606060' }}>
                No notifications in this category.
              </div>
            )}
            {filtered.map((n) => {
              const badge = BADGE[n.category];
              return (
                <button
                  type="button"
                  key={n.id}
                  onClick={() => markRead(n.id)}
                  className="card-magnifi flex items-start gap-4 cursor-pointer hover:shadow-md transition-shadow text-left w-full"
                  style={!n.read ? { borderLeft: '3px solid #E0CD72' } : {}}
                >
                  <span className="text-2xl mt-0.5" aria-hidden="true">{n.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-sm text-[#030F12]">{n.title}</p>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                        style={{ background: badge.bg, color: badge.color }}
                      >
                        {n.category}
                      </span>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-[#E0CD72] ml-auto shrink-0" />
                      )}
                    </div>
                    <p className="text-sm" style={{ color: '#606060' }}>{n.body}</p>
                    <p className="text-xs mt-1.5" style={{ color: '#9CA3AF' }}>{n.time}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'preferences' && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: '#606060' }}>
            Choose which events trigger a notification. You can always adjust these later in Settings.
          </p>
          {prefs.map((p) => (
            <div key={p.id} className="card-magnifi flex items-center gap-4">
              <div className="flex-1">
                <p id={`pref-${p.id}`} className="font-semibold text-sm text-[#030F12]">{p.label}</p>
                <p className="text-sm" style={{ color: '#606060' }}>{p.description}</p>
              </div>
              <button
                role="switch"
                aria-checked={p.enabled}
                aria-labelledby={`pref-${p.id}`}
                onClick={() => togglePref(p.id)}
                className="relative w-11 h-6 rounded-full transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-[#E0CD72] focus-visible:ring-offset-2 focus-visible:outline-none"
                style={{ background: p.enabled ? '#E0CD72' : '#E0E0E0' }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                  style={{ transform: p.enabled ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </button>
            </div>
          ))}
          <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-6 py-2 hover:bg-[#E7C751] transition-colors text-sm">
            Save Preferences
          </button>
        </div>
      )}
    </div>
  );
}
