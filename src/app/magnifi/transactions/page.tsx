'use client';

import { useState } from 'react';

const allTransactions = [
  { date: 'Apr 24', account: 'Fidelity',  type: 'Buy',      security: 'NVDA', qty: '2.0',  price: '$891.33', total: '$1,782.66' },
  { date: 'Apr 22', account: 'Robinhood', type: 'Dividend', security: 'AAPL', qty: '—',    price: '—',       total: '$42.30'    },
  { date: 'Apr 20', account: 'Fidelity',  type: 'Buy',      security: 'VTI',  qty: '5.0',  price: '$241.87', total: '$1,209.35' },
  { date: 'Apr 18', account: 'Coinbase',  type: 'Sell',     security: 'GBTC', qty: '5.0',  price: '$51.36',  total: '$256.80'   },
  { date: 'Apr 15', account: 'Robinhood', type: 'Buy',      security: 'MSFT', qty: '3.0',  price: '$415.22', total: '$1,245.66' },
  { date: 'Apr 12', account: 'Fidelity',  type: 'Dividend', security: 'VTI',  qty: '—',    price: '—',       total: '$128.50'   },
  { date: 'Apr 10', account: 'Fidelity',  type: 'Buy',      security: 'AAPL', qty: '10.0', price: '$184.20', total: '$1,842.00' },
  { date: 'Apr 5',  account: 'Robinhood', type: 'Sell',     security: 'TSLA', qty: '8.0',  price: '$175.50', total: '$1,404.00' },
  { date: 'Apr 2',  account: 'Fidelity',  type: 'Buy',      security: 'BND',  qty: '15.0', price: '$73.42',  total: '$1,101.30' },
  { date: 'Feb 28', account: 'Coinbase',  type: 'Buy',      security: 'GBTC', qty: '10.0', price: '$49.80',  total: '$498.00'   },
];

const BADGE: Record<string, { bg: string; color: string }> = {
  Buy:      { bg: 'rgba(22,181,72,0.12)',   color: '#16B548' },
  Sell:     { bg: 'rgba(245,68,29,0.12)',   color: '#F5441D' },
  Dividend: { bg: 'rgba(224,205,114,0.2)',  color: '#B89A00' },
  Transfer: { bg: 'rgba(96,96,96,0.12)',    color: '#606060' },
};

const ACCOUNTS = ['All Accounts', 'Fidelity', 'Robinhood', 'Coinbase'];
const TYPES    = ['All', 'Buy', 'Sell', 'Dividend', 'Transfer'];
const DATES    = ['Last 30 days', 'Last 60 days', 'Last 90 days', 'Year to date'];

interface Filters {
  account: string;
  type: string;
  date: string;
}

const DEFAULT_FILTERS: Filters = { account: 'All Accounts', type: 'All', date: 'Last 30 days' };

export default function TransactionsPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [pendingFilters, setPendingFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [visibleCount, setVisibleCount] = useState(10);

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
    if (filters.account !== 'All Accounts' && t.account !== filters.account) return false;
    if (filters.type !== 'All' && t.type !== filters.type) return false;
    if (!dateMatchesFilter(t.date, filters.date)) return false;
    return true;
  });

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Transactions</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Trade history and account activity across all linked accounts.</p>
      </div>

      {/* Filter bar */}
      <div className="card-magnifi flex flex-wrap gap-3 items-center">
        <Select
          label="Account"
          value={pendingFilters.account}
          options={ACCOUNTS}
          onChange={(v) => setPendingFilters((f) => ({ ...f, account: v }))}
        />
        <Select
          label="Type"
          value={pendingFilters.type}
          options={TYPES}
          onChange={(v) => setPendingFilters((f) => ({ ...f, type: v }))}
        />
        <Select
          label="Date"
          value={pendingFilters.date}
          options={DATES}
          onChange={(v) => setPendingFilters((f) => ({ ...f, date: v }))}
        />
        <button
          onClick={() => { setFilters(pendingFilters); setVisibleCount(10); }}
          className="ml-auto rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 text-sm hover:bg-[#E7C751] transition-colors"
        >
          Apply Filters
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Bought"        value="$12,450.00" color="#030F12" />
        <StatCard label="Total Sold"          value="$3,200.00"  color="#F5441D" />
        <StatCard label="Dividends Received"  value="$847.00"    color="#16B548" />
      </div>

      {/* Table */}
      <div className="card-magnifi overflow-x-auto">
        <h2 className="text-base font-semibold mb-4 text-[#030F12]">Transaction History</h2>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
              {['Date', 'Account', 'Type', 'Security', 'Qty', 'Price', 'Total'].map((col) => (
                <th key={col} className="pb-2 text-left font-semibold pr-4" style={{ color: '#606060' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((t, i) => {
              const badge = BADGE[t.type] ?? BADGE.Transfer;
              return (
                <tr
                  key={i}
                  className="hover:bg-gray-50 transition-colors"
                  style={{ borderBottom: '1px solid #F8F8F8' }}
                >
                  <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{t.date}</td>
                  <td className="py-3 pr-4 font-medium text-[#030F12]">{t.account}</td>
                  <td className="py-3 pr-4">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: badge.bg, color: badge.color }}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td className="py-3 pr-4 font-bold text-[#030F12]">{t.security}</td>
                  <td className="py-3 pr-4 text-gray-600">{t.qty}</td>
                  <td className="py-3 pr-4 text-gray-600">{t.price}</td>
                  <td className="py-3 font-semibold text-[#030F12]">{t.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-5 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid #F0F0F0' }}>
          <p className="text-sm" style={{ color: '#606060' }}>
            Showing {visible.length} of {filtered.length} transactions
          </p>
          {visibleCount < filtered.length && (
            <button
              onClick={() => setVisibleCount((c) => c + 10)}
              className="rounded-full border font-semibold text-sm px-5 py-2 hover:bg-[#E0CD72] hover:text-[#030F12] transition-colors"
              style={{ borderColor: '#E0CD72', color: '#B89A00' }}
            >
              Load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium" style={{ color: '#606060' }}>{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-1.5 text-sm text-[#030F12] bg-white focus:outline-none focus:ring-2 focus:ring-[#E0CD72] cursor-pointer"
        style={{ borderColor: '#E0E0E0' }}
      >
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="card-magnifi">
      <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>{label}</p>
      <p className="text-2xl font-bold" style={{ color }}>{value}</p>
    </div>
  );
}
