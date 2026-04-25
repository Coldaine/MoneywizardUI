'use client';

import { useState } from 'react';

interface Transaction {
  id: number;
  date: string;
  account: string;
  type: string;
  security: string;
  qty: string;
  price: string;
  total: string;
}

const allTransactions: Transaction[] = [
  { id: 1, date: 'Apr 24', account: 'Fidelity',  type: 'Buy',      security: 'NVDA', qty: '2.0',  price: '$891.33', total: '$1,782.66' },
  { id: 2, date: 'Apr 22', account: 'Robinhood', type: 'Dividend', security: 'AAPL', qty: '—',    price: '—',       total: '$42.30'    },
  { id: 3, date: 'Apr 20', account: 'Fidelity',  type: 'Buy',      security: 'VTI',  qty: '5.0',  price: '$241.87', total: '$1,209.35' },
  { id: 4, date: 'Apr 18', account: 'Coinbase',  type: 'Sell',     security: 'GBTC', qty: '5.0',  price: '$51.36',  total: '$256.80'   },
  { id: 5, date: 'Apr 15', account: 'Robinhood', type: 'Buy',      security: 'MSFT', qty: '3.0',  price: '$415.22', total: '$1,245.66' },
  { id: 6, date: 'Apr 12', account: 'Fidelity',  type: 'Sell',     security: 'TSLA', qty: '1.0',  price: '$172.40', total: '$172.40'   },
  { id: 7, date: 'Apr 10', account: 'Fidelity',  type: 'Buy',      security: 'AAPL', qty: '4.0',  price: '$175.23', total: '$700.92'   },
  { id: 8, date: 'Apr 08', account: 'Robinhood', type: 'Dividend', security: 'VTI',  qty: '—',    price: '—',       total: '$18.50'    },
];

const typeColors: Record<string, { bg: string; text: string }> = {
  Buy:      { bg: '#DCFCE7', text: '#166534' },
  Sell:     { bg: '#FEE2E2', text: '#991B1B' },
  Dividend: { bg: '#DBEAFE', text: '#1E40AF' },
};

interface Filters {
  date: string;
  account: string;
  type: string;
  security: string;
}

export default function TransactionsPage() {
  const [filters, setFilters] = useState<Filters>({ date: '', account: '', type: '', security: '' });

  function parseTransactionDate(label: string) {
    const [month, day] = label.split(' ');
    const monthIndex: Record<string, number> = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    return new Date(new Date().getFullYear(), monthIndex[month], parseInt(day.replace(',', ''), 10));
  }

  function dateMatchesFilter(dateLabel: string, selected: Filters['date']) {
    const txDate = parseTransactionDate(dateLabel);
    const today = new Date();
    const msPerDay = 24 * 60 * 60 * 1000;

    if (selected === 'Year to date') {
      return txDate >= new Date(today.getFullYear(), 0, 1);
    }

    const days = selected === 'Last 30 days' ? 30 : selected === 'Last 60 days' ? 60 : 90;
    return today.getTime() - txDate.getTime() <= days * msPerDay;
  }

  const filtered = allTransactions.filter((t) => {
    const matchDate     = !filters.date     || t.date.toLowerCase().includes(filters.date.toLowerCase());
    const matchAccount  = !filters.account  || t.account === filters.account;
    const matchType     = !filters.type     || t.type === filters.type;
    const matchSecurity = !filters.security || t.security.toLowerCase().includes(filters.security.toLowerCase());
    return matchDate && matchAccount && matchType && matchSecurity;
  });

  const accounts = Array.from(new Set(allTransactions.map((t) => t.account))).sort();
  const types    = Array.from(new Set(allTransactions.map((t) => t.type))).sort();

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '24px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>
        Transactions
      </h1>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Filter by date (e.g. Apr)"
          value={filters.date}
          onChange={(e) => setFilters((f) => ({ ...f, date: e.target.value }))}
          style={{
            padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px',
            fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none',
          }}
        />
        <select
          value={filters.account}
          onChange={(e) => setFilters((f) => ({ ...f, account: e.target.value }))}
          style={{
            padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px',
            fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none',
          }}
        >
          <option value="">All Accounts</option>
          {accounts.map((a) => <option key={a} value={a}>{a}</option>)}
        </select>
        <select
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          style={{
            padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px',
            fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none',
          }}
        >
          <option value="">All Types</option>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          type="text"
          placeholder="Security (e.g. AAPL)"
          value={filters.security}
          onChange={(e) => setFilters((f) => ({ ...f, security: e.target.value }))}
          style={{
            padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '6px',
            fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none',
          }}
        />
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
        overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Date', 'Account', 'Type', 'Security', 'Qty', 'Price', 'Total'].map((h) => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const colors = typeColors[t.type] ?? { bg: '#F3F4F6', text: '#374151' };
                return (
                  <tr
                    key={t.id}
                    style={{ borderBottom: '1px solid #F3F4F6' }}
                  >
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{t.date}</td>
                    <td style={{ padding: '10px 14px', color: '#6B7280' }}>{t.account}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        backgroundColor: colors.bg, color: colors.text,
                        borderRadius: '9999px', padding: '2px 8px', fontSize: '11px', fontWeight: 600,
                      }}>
                        {t.type}
                      </span>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#111827' }}>{t.security}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{t.qty}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{t.price}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 500, color: '#111827' }}>{t.total}</td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF' }}>
                    No transactions match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
