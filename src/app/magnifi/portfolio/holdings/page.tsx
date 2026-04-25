'use client';

import { useState } from 'react';

type AssetClass = 'All' | 'Stocks' | 'ETFs' | 'Crypto';
type SortKey = 'value' | 'gain' | 'pct';

interface Holding {
  symbol: string;
  name: string;
  account: string;
  assetClass: Exclude<AssetClass, 'All'>;
  qty: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  totalReturn: number;
  totalReturnPct: number;
  dayChange: number;
  dayChangePct: number;
}

const HOLDINGS: Holding[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp',            account: 'Fidelity',  assetClass: 'Stocks', qty: 12,  avgCost: 720.00, currentPrice: 912.44, value: 10949.28, totalReturn: 2309.28, totalReturnPct: 26.73, dayChange: 240.56, dayChangePct: 2.25 },
  { symbol: 'AAPL', name: 'Apple Inc',              account: 'Fidelity',  assetClass: 'Stocks', qty: 25,  avgCost: 171.00, currentPrice: 184.20, value:  4605.00, totalReturn:  330.00, totalReturnPct:  7.72, dayChange:  92.10, dayChangePct: 2.04 },
  { symbol: 'VTI',  name: 'Vanguard Total Market',  account: 'Fidelity',  assetClass: 'ETFs',   qty: 32,  avgCost: 228.00, currentPrice: 241.87, value:  7739.84, totalReturn:  443.84, totalReturnPct:  6.08, dayChange:  56.64, dayChangePct: 0.74 },
  { symbol: 'MSFT', name: 'Microsoft Corp',         account: 'Robinhood', assetClass: 'Stocks', qty: 8,   avgCost: 392.00, currentPrice: 415.22, value:  3321.76, totalReturn:  185.76, totalReturnPct:  5.91, dayChange: -33.20, dayChangePct: -0.99 },
  { symbol: 'TSLA', name: 'Tesla Inc',              account: 'Robinhood', assetClass: 'Stocks', qty: 15,  avgCost: 215.00, currentPrice: 174.20, value:  2613.00, totalReturn: -612.00, totalReturnPct: -19.00, dayChange: -26.10, dayChangePct: -0.99 },
  { symbol: 'BND',  name: 'Vanguard Total Bond',    account: 'Fidelity',  assetClass: 'ETFs',   qty: 45,  avgCost:  75.00, currentPrice:  73.42, value:  3303.90, totalReturn:  -71.10, totalReturnPct:  -2.11, dayChange:  -9.90, dayChangePct: -0.30 },
  { symbol: 'GBTC', name: 'Grayscale Bitcoin Trust',account: 'Coinbase',  assetClass: 'Crypto', qty: 50,  avgCost:  48.00, currentPrice:  51.36, value:  2568.00, totalReturn:  168.00, totalReturnPct:   7.00, dayChange: -51.36, dayChangePct: -1.96 },
  { symbol: 'QQQ',  name: 'Invesco QQQ Trust',      account: 'Fidelity',  assetClass: 'ETFs',   qty: 10,  avgCost: 395.00, currentPrice: 434.80, value:  4348.00, totalReturn:  398.00, totalReturnPct:  10.08, dayChange:  65.22, dayChangePct: 1.52 },
  { symbol: 'AMZN', name: 'Amazon.com Inc',         account: 'Robinhood', assetClass: 'Stocks', qty: 6,   avgCost: 170.00, currentPrice: 188.40, value:  1130.40, totalReturn:  110.40, totalReturnPct:  10.82, dayChange:  18.84, dayChangePct: 1.01 },
];

const ACCOUNTS = ['All Accounts', 'Fidelity', 'Robinhood', 'Coinbase'];

function fmt(n: number, sign = false) {
  const s = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return (sign ? (n >= 0 ? '+$' : '-$') : '$') + s;
}

function fmtPct(n: number) {
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}

export default function HoldingsPage() {
  const [assetClass, setAssetClass] = useState<AssetClass>('All');
  const [account, setAccount] = useState('All Accounts');
  const [sortKey, setSortKey] = useState<SortKey>('value');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  function setSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else { setSortKey(key); setSortDir('desc'); }
  }

  const filtered = HOLDINGS.filter((h) => {
    if (assetClass !== 'All' && h.assetClass !== assetClass) return false;
    if (account !== 'All Accounts' && h.account !== account) return false;
    return true;
  }).sort((a, b) => {
    const sign = sortDir === 'desc' ? -1 : 1;
    if (sortKey === 'value') return sign * (a.value - b.value);
    if (sortKey === 'gain')  return sign * (a.totalReturn - b.totalReturn);
    return sign * (a.totalReturnPct - b.totalReturnPct);
  });

  const totalValue   = filtered.reduce((s, h) => s + h.value, 0);
  const totalGain    = filtered.reduce((s, h) => s + h.totalReturn, 0);
  const totalDayChg  = filtered.reduce((s, h) => s + h.dayChange, 0);

  const renderSortBtn = (k: SortKey, label: string) => (
    <button
      onClick={() => setSort(k)}
      className="text-left font-semibold flex items-center gap-1 hover:text-[#030F12] transition-colors"
      style={{ color: sortKey === k ? '#030F12' : '#606060' }}
    >
      {label}
      <span className="text-[10px]">{sortKey === k ? (sortDir === 'desc' ? '▼' : '▲') : '⇅'}</span>
    </button>
  );

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Holdings</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>All positions across your linked accounts, with cost basis and return data.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-magnifi">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#606060' }}>Total Value</p>
          <p className="text-2xl font-bold text-[#030F12]">{fmt(totalValue)}</p>
        </div>
        <div className="card-magnifi">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#606060' }}>Total Return</p>
          <p className="text-2xl font-bold" style={{ color: totalGain >= 0 ? '#16B548' : '#F5441D' }}>
            {fmt(totalGain, true)}
          </p>
        </div>
        <div className="card-magnifi">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#606060' }}>Today&apos;s Change</p>
          <p className="text-2xl font-bold" style={{ color: totalDayChg >= 0 ? '#16B548' : '#F5441D' }}>
            {fmt(totalDayChg, true)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-magnifi flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          {(['All', 'Stocks', 'ETFs', 'Crypto'] as AssetClass[]).map((ac) => (
            <button
              key={ac}
              onClick={() => setAssetClass(ac)}
              className="rounded-full px-3 py-1 text-xs font-semibold border transition-colors"
              style={
                assetClass === ac
                  ? { background: '#030F12', color: '#E0CD72', borderColor: '#030F12' }
                  : { background: 'transparent', color: '#606060', borderColor: '#E0E0E0' }
              }
            >
              {ac}
            </button>
          ))}
        </div>
        <div className="ml-auto">
          <select
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="rounded-full border px-3 py-1.5 text-sm outline-none"
            style={{ borderColor: '#E0E0E0', color: '#030F12' }}
          >
            {ACCOUNTS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card-magnifi overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
              <th className="pb-2 text-left font-semibold pr-4" style={{ color: '#606060' }}>Symbol</th>
              <th className="pb-2 text-left font-semibold pr-4" style={{ color: '#606060' }}>Name</th>
              <th className="pb-2 text-left font-semibold pr-4" style={{ color: '#606060' }}>Account</th>
              <th className="pb-2 text-right font-semibold pr-4" style={{ color: '#606060' }}>Qty</th>
              <th className="pb-2 text-right font-semibold pr-4" style={{ color: '#606060' }}>Avg Cost</th>
              <th className="pb-2 text-right font-semibold pr-4" style={{ color: '#606060' }}>Current</th>
              <th className="pb-2 text-right font-semibold pr-4">{renderSortBtn('value', 'Value')}</th>
              <th className="pb-2 text-right font-semibold pr-4">{renderSortBtn('gain', 'Return $')}</th>
              <th className="pb-2 text-right font-semibold pr-4">{renderSortBtn('pct', 'Return %')}</th>
              <th className="pb-2 text-right font-semibold" style={{ color: '#606060' }}>Day Chg</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((h) => {
              const gainColor = h.totalReturn >= 0 ? '#16B548' : '#F5441D';
              const dayColor  = h.dayChange  >= 0 ? '#16B548' : '#F5441D';
              return (
                <tr key={`${h.symbol}-${h.account}`} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #F8F8F8' }}>
                  <td className="py-3 pr-4 font-bold text-[#030F12]">{h.symbol}</td>
                  <td className="py-3 pr-4" style={{ color: '#606060' }}>{h.name}</td>
                  <td className="py-3 pr-4 text-[#030F12]">{h.account}</td>
                  <td className="py-3 pr-4 text-right text-[#030F12]">{h.qty}</td>
                  <td className="py-3 pr-4 text-right" style={{ color: '#606060' }}>{fmt(h.avgCost)}</td>
                  <td className="py-3 pr-4 text-right font-medium text-[#030F12]">{fmt(h.currentPrice)}</td>
                  <td className="py-3 pr-4 text-right font-semibold text-[#030F12]">{fmt(h.value)}</td>
                  <td className="py-3 pr-4 text-right font-semibold" style={{ color: gainColor }}>{fmt(h.totalReturn, true)}</td>
                  <td className="py-3 pr-4 text-right font-semibold" style={{ color: gainColor }}>{fmtPct(h.totalReturnPct)}</td>
                  <td className="py-3 text-right font-semibold" style={{ color: dayColor }}>{fmtPct(h.dayChangePct)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
