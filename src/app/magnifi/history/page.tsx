'use client';

import { useState } from 'react';

type EventType = 'Trade' | 'Dividend' | 'Deposit' | 'Withdrawal' | 'Reauth' | 'Fee';

interface HistoryEvent {
  id: number;
  date: string;
  type: EventType;
  account: string;
  description: string;
  amount: string;
  amountSign: 'positive' | 'negative' | 'neutral';
}

const EVENTS: HistoryEvent[] = [
  { id: 1,  date: 'Apr 25, 2026', type: 'Trade',      account: 'Robinhood', description: 'Bought 2 shares of NVDA',           amount: '-$1,824.88', amountSign: 'negative' },
  { id: 2,  date: 'Apr 24, 2026', type: 'Trade',      account: 'Fidelity',  description: 'Sold 5 shares of BND',              amount: '+$367.10',   amountSign: 'positive' },
  { id: 3,  date: 'Apr 22, 2026', type: 'Dividend',   account: 'Fidelity',  description: 'AAPL dividend payment',              amount: '+$42.30',    amountSign: 'positive' },
  { id: 4,  date: 'Apr 20, 2026', type: 'Deposit',    account: 'Fidelity',  description: 'ACH transfer from Chase Checking',  amount: '+$2,500.00', amountSign: 'positive' },
  { id: 5,  date: 'Apr 18, 2026', type: 'Trade',      account: 'Coinbase',  description: 'Sold 5 shares of GBTC',             amount: '+$256.80',   amountSign: 'positive' },
  { id: 6,  date: 'Apr 15, 2026', type: 'Trade',      account: 'Robinhood', description: 'Bought 3 shares of MSFT',           amount: '-$1,245.66', amountSign: 'negative' },
  { id: 7,  date: 'Apr 14, 2026', type: 'Reauth',     account: 'Coinbase',  description: 'Account re-linked via Plaid',       amount: '—',          amountSign: 'neutral'  },
  { id: 8,  date: 'Apr 12, 2026', type: 'Dividend',   account: 'Fidelity',  description: 'VTI dividend payment',              amount: '+$128.50',   amountSign: 'positive' },
  { id: 9,  date: 'Apr 10, 2026', type: 'Trade',      account: 'Fidelity',  description: 'Bought 10 shares of AAPL',         amount: '-$1,842.00', amountSign: 'negative' },
  { id: 10, date: 'Apr 8, 2026',  type: 'Withdrawal', account: 'Fidelity',  description: 'ACH withdrawal to Chase Checking', amount: '-$500.00',   amountSign: 'negative' },
  { id: 11, date: 'Apr 5, 2026',  type: 'Trade',      account: 'Robinhood', description: 'Sold 8 shares of TSLA',            amount: '+$1,404.00', amountSign: 'positive' },
  { id: 12, date: 'Apr 3, 2026',  type: 'Fee',        account: 'Fidelity',  description: 'Platform subscription fee',         amount: '-$12.99',    amountSign: 'negative' },
  { id: 13, date: 'Apr 2, 2026',  type: 'Trade',      account: 'Fidelity',  description: 'Bought 15 shares of BND',          amount: '-$1,101.30', amountSign: 'negative' },
  { id: 14, date: 'Mar 28, 2026', type: 'Trade',      account: 'Coinbase',  description: 'Bought 10 shares of GBTC',         amount: '-$498.00',   amountSign: 'negative' },
  { id: 15, date: 'Mar 25, 2026', type: 'Deposit',    account: 'Robinhood', description: 'ACH transfer from Chase Checking', amount: '+$1,000.00', amountSign: 'positive' },
];

const TYPE_STYLE: Record<EventType, { bg: string; color: string; icon: string }> = {
  Trade:      { bg: 'rgba(3,15,18,0.08)',    color: '#030F12', icon: '↕' },
  Dividend:   { bg: 'rgba(224,205,114,0.2)', color: '#B89A00', icon: '💰' },
  Deposit:    { bg: 'rgba(22,181,72,0.12)',  color: '#16B548', icon: '⬇' },
  Withdrawal: { bg: 'rgba(245,68,29,0.12)',  color: '#F5441D', icon: '⬆' },
  Reauth:     { bg: 'rgba(96,96,96,0.12)',   color: '#606060', icon: '🔗' },
  Fee:        { bg: 'rgba(245,68,29,0.08)',  color: '#F5441D', icon: '📄' },
};

const EVENT_TYPES: (EventType | 'All')[] = ['All', 'Trade', 'Dividend', 'Deposit', 'Withdrawal', 'Fee', 'Reauth'];
const ACCOUNTS = ['All Accounts', 'Fidelity', 'Robinhood', 'Coinbase'];
const MONTHS = ['Last 30 days', 'Last 60 days', 'Last 90 days', 'Year to date'];

export default function HistoryPage() {
  const [typeFilter, setTypeFilter] = useState<EventType | 'All'>('All');
  const [accountFilter, setAccountFilter] = useState('All Accounts');
  const [dateFilter, setDateFilter] = useState('Last 30 days');

  const filtered = EVENTS.filter((e) => {
    if (typeFilter !== 'All' && e.type !== typeFilter) return false;
    if (accountFilter !== 'All Accounts' && e.account !== accountFilter) return false;
    return true;
  });

  // Group by date
  const grouped = filtered.reduce<Record<string, HistoryEvent[]>>((acc, e) => {
    (acc[e.date] ||= []).push(e);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Activity History</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Complete account activity log across all linked accounts.</p>
      </div>

      {/* Filters */}
      <div className="card-magnifi flex flex-wrap gap-3 items-center">
        <div className="flex gap-2 flex-wrap">
          {EVENT_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className="rounded-full px-3 py-1 text-xs font-semibold border transition-colors"
              style={
                typeFilter === t
                  ? { background: '#030F12', color: '#E0CD72', borderColor: '#030F12' }
                  : { background: 'transparent', color: '#606060', borderColor: '#E0E0E0' }
              }
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="rounded-full border px-3 py-1.5 text-sm outline-none"
            style={{ borderColor: '#E0E0E0', color: '#030F12' }}
          >
            {ACCOUNTS.map((a) => <option key={a}>{a}</option>)}
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="rounded-full border px-3 py-1.5 text-sm outline-none"
            style={{ borderColor: '#E0E0E0', color: '#030F12' }}
          >
            {MONTHS.map((m) => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      {/* Grouped events */}
      {Object.keys(grouped).length === 0 ? (
        <div className="card-magnifi text-center py-10" style={{ color: '#606060' }}>
          No activity matches current filters.
        </div>
      ) : (
        Object.entries(grouped).map(([date, events]) => (
          <div key={date} className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider px-1" style={{ color: '#9CA3AF' }}>
              {date}
            </h2>
            {events.map((e) => {
              const ts = TYPE_STYLE[e.type];
              const amtColor = e.amountSign === 'positive' ? '#16B548' : e.amountSign === 'negative' ? '#F5441D' : '#606060';
              return (
                <div key={e.id} className="card-magnifi flex items-center gap-4">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0"
                    style={{ background: ts.bg, color: ts.color }}
                    aria-hidden="true"
                  >
                    {ts.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#030F12] truncate">{e.description}</p>
                    <p className="text-xs" style={{ color: '#606060' }}>{e.account}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold" style={{ color: amtColor }}>{e.amount}</p>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase"
                      style={{ background: ts.bg, color: ts.color }}
                    >
                      {e.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ))
      )}
    </div>
  );
}
