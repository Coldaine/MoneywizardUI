'use client';

import { useState } from 'react';

type EventType = 'Trade' | 'Dividend' | 'Deposit' | 'Withdrawal' | 'Reauth' | 'Fee';

interface HistoryEvent {
  id: number;
  date: string;
  type: EventType;
  description: string;
  amount: string;
  account: string;
}

const allEvents: HistoryEvent[] = [
  { id: 1,  date: 'Apr 24, 2025', type: 'Trade',      description: 'Bought 2 shares NVDA',        amount: '-$1,782.66', account: 'Fidelity'  },
  { id: 2,  date: 'Apr 22, 2025', type: 'Dividend',   description: 'AAPL Quarterly Dividend',      amount: '+$42.30',    account: 'Robinhood' },
  { id: 3,  date: 'Apr 20, 2025', type: 'Trade',      description: 'Bought 5 shares VTI',          amount: '-$1,209.35', account: 'Fidelity'  },
  { id: 4,  date: 'Apr 18, 2025', type: 'Deposit',    description: 'ACH Transfer from Checking',   amount: '+$5,000.00', account: 'Fidelity'  },
  { id: 5,  date: 'Apr 15, 2025', type: 'Trade',      description: 'Bought 3 shares MSFT',         amount: '-$1,245.66', account: 'Robinhood' },
  { id: 6,  date: 'Apr 12, 2025', type: 'Reauth',     description: 'Brokerage connection renewed', amount: '—',          account: 'Fidelity'  },
  { id: 7,  date: 'Apr 10, 2025', type: 'Fee',        description: 'Advisory fee (Q2)',             amount: '-$24.90',    account: 'Robinhood' },
  { id: 8,  date: 'Apr 08, 2025', type: 'Withdrawal', description: 'Transfer to Bank',             amount: '-$1,000.00', account: 'Coinbase'  },
  { id: 9,  date: 'Apr 05, 2025', type: 'Dividend',   description: 'VTI Quarterly Dividend',       amount: '+$18.50',    account: 'Robinhood' },
  { id: 10, date: 'Apr 01, 2025', type: 'Trade',      description: 'Sold 1 share TSLA',            amount: '+$172.40',   account: 'Fidelity'  },
];

const referenceDate = new Date(allEvents[0].date);
const referenceDayStart = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
const msPerDay = 24 * 60 * 60 * 1000;

type DateFilter = '' | 'today' | 'week' | 'month' | 'quarter';

const typeColors: Record<EventType, { bg: string; text: string }> = {
  Trade:      { bg: '#DBEAFE', text: '#1E40AF' },
  Dividend:   { bg: '#DCFCE7', text: '#166534' },
  Deposit:    { bg: '#D1FAE5', text: '#065F46' },
  Withdrawal: { bg: '#FEE2E2', text: '#991B1B' },
  Reauth:     { bg: '#FEF3C7', text: '#92400E' },
  Fee:        { bg: '#F3F4F6', text: '#374151' },
};

export default function HistoryPage() {
  const [typeFilter, setTypeFilter] = useState<EventType | ''>('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('');

  const filtered = allEvents.filter((e) => {
    if (typeFilter && e.type !== typeFilter) return false;

    if (dateFilter) {
      const eventDate = new Date(e.date);
      if (Number.isNaN(eventDate.getTime())) return true;
      const eventDayStart = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      const diffDays = Math.floor((referenceDayStart.getTime() - eventDayStart.getTime()) / msPerDay);
      if (diffDays < 0) return false;
      if (dateFilter === 'today'   && diffDays > 0)   return false;
      if (dateFilter === 'week'    && diffDays >= 7)  return false;
      if (dateFilter === 'month'   && diffDays >= 30) return false;
      if (dateFilter === 'quarter' && diffDays >= 90) return false;
    }

    return true;
  });

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '24px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>
        History
      </h1>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value as EventType | '')}
          style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }}
        >
          <option value="">All Types</option>
          {(['Trade', 'Dividend', 'Deposit', 'Withdrawal', 'Reauth', 'Fee'] as EventType[]).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value as DateFilter)}
          style={{ padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }}
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 90 Days</option>
        </select>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
        overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#9CA3AF' }}>
            No events match your filters.
          </div>
        ) : (
          filtered.map((e, i) => {
            const colors = typeColors[e.type];
            const isPositive = e.amount.startsWith('+');
            const isNeutral = e.amount === '—';
            return (
              <div
                key={e.id}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px',
                  borderBottom: i < filtered.length - 1 ? '1px solid #F3F4F6' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    backgroundColor: colors.bg, color: colors.text,
                    borderRadius: '9999px', padding: '2px 10px', fontSize: '11px', fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}>
                    {e.type}
                  </span>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>
                      {e.description}
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                      {e.date} · {e.account}
                    </div>
                  </div>
                </div>
                <div style={{
                  fontSize: '14px', fontWeight: 600,
                  color: isNeutral ? '#9CA3AF' : isPositive ? '#166534' : '#991B1B',
                  whiteSpace: 'nowrap', marginLeft: '16px',
                }}>
                  {e.amount}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
