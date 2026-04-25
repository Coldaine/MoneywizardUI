'use client';

import { useState } from 'react';

interface ScreenerResult {
  name: string;
  ticker: string;
  type: string;
  sector: string;
  marketCap: string;
  divYield: string;
  return1Y: string;
  returnPositive: boolean;
  esg: string;
}

const RESULTS: ScreenerResult[] = [
  { name: 'Apple', ticker: 'AAPL', type: 'Stock', sector: 'Technology', marketCap: '$2.9T', divYield: '0.5%', return1Y: '+18.2%', returnPositive: true, esg: 'A' },
  { name: 'Vanguard Total Market', ticker: 'VTI', type: 'ETF', sector: '', marketCap: '—', divYield: '1.4%', return1Y: '+11.4%', returnPositive: true, esg: 'B' },
  { name: 'Microsoft', ticker: 'MSFT', type: 'Stock', sector: 'Technology', marketCap: '$3.1T', divYield: '0.8%', return1Y: '+16.7%', returnPositive: true, esg: 'A' },
  { name: 'Nvidia', ticker: 'NVDA', type: 'Stock', sector: 'Technology', marketCap: '$2.2T', divYield: '0.0%', return1Y: '+87.3%', returnPositive: true, esg: 'B' },
  { name: 'iShares MSCI ESG', ticker: 'ESGU', type: 'ETF', sector: '', marketCap: '—', divYield: '1.2%', return1Y: '+9.8%', returnPositive: true, esg: 'A' },
  { name: 'Johnson & Johnson', ticker: 'JNJ', type: 'Stock', sector: 'Healthcare', marketCap: '$389B', divYield: '3.1%', return1Y: '+4.2%', returnPositive: true, esg: 'A' },
  { name: 'JPMorgan Chase', ticker: 'JPM', type: 'Stock', sector: 'Finance', marketCap: '$564B', divYield: '2.3%', return1Y: '+22.1%', returnPositive: true, esg: 'B' },
  { name: 'SPDR Gold ETF', ticker: 'GLD', type: 'ETF', sector: '', marketCap: '—', divYield: '0.0%', return1Y: '+14.7%', returnPositive: true, esg: 'C' },
];

const assetClasses = ['Stock', 'ETF', 'Mutual Fund', 'Crypto'];
const sectors = ['Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer'];
const esgRatings = ['A', 'B', 'C', 'D'];

export default function ScreenerPage() {
  const [checkedAssets, setCheckedAssets] = useState<string[]>([]);
  const [checkedSectors, setCheckedSectors] = useState<string[]>([]);
  const [marketCap, setMarketCap] = useState('Any');
  const [checkedEsg, setCheckedEsg] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  function toggle(list: string[], setList: (v: string[]) => void, val: string) {
    setList(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);
  }

  function parseMarketCap(raw: string) {
    const match = raw.match(/\$([\d.]+)([TBM])/);
    if (!match) return null;
    const value = parseFloat(match[1]);
    if (Number.isNaN(value)) return null;
    const multiplier = match[2] === 'T' ? 1_000 : match[2] === 'B' ? 1 : 0.001;
    return value * multiplier;
  }

  const filteredResults = RESULTS.filter((row) => {
    if (checkedAssets.length > 0 && !checkedAssets.includes(row.type)) return false;
    if (checkedSectors.length > 0) {
      if (!row.sector && row.type !== 'ETF') return false;
      if (row.sector && !checkedSectors.includes(row.sector)) return false;
    }
    if (checkedEsg.length > 0 && !checkedEsg.includes(row.esg)) return false;
    if (marketCap !== 'Any') {
      const cap = parseMarketCap(row.marketCap);
      if (cap == null) return false;
      if (marketCap.startsWith('Large') && cap < 10) return false;
      if (marketCap.startsWith('Mid') && (cap < 2 || cap > 10)) return false;
      if (marketCap.startsWith('Small') && cap >= 2) return false;
    }
    return true;
  });

  return (
    <div className="flex gap-6 max-w-6xl">
      {/* Filter panel */}
      <aside className="w-64 shrink-0 space-y-5">
        {/* Asset class */}
        <div className="card-magnifi">
          <h3 className="text-sm font-bold text-[#030F12] mb-3">Asset Class</h3>
          <div className="space-y-2">
            {assetClasses.map((a) => (
              <label key={a} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedAssets.includes(a)}
                  onChange={() => toggle(checkedAssets, setCheckedAssets, a)}
                  style={{ accentColor: '#E0CD72' }}
                />
                <span className="text-sm text-[#030F12]">{a}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sector */}
        <div className="card-magnifi">
          <h3 className="text-sm font-bold text-[#030F12] mb-3">Sector</h3>
          <div className="space-y-2">
            {sectors.map((s) => (
              <label key={s} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedSectors.includes(s)}
                  onChange={() => toggle(checkedSectors, setCheckedSectors, s)}
                  style={{ accentColor: '#E0CD72' }}
                />
                <span className="text-sm text-[#030F12]">{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Market cap */}
        <div className="card-magnifi">
          <h3 className="text-sm font-bold text-[#030F12] mb-3">Market Cap</h3>
          <div className="space-y-2">
            {['Any', 'Large (>$10B)', 'Mid ($2B–$10B)', 'Small (<$2B)'].map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="marketCap"
                  value={opt}
                  checked={marketCap === opt}
                  onChange={() => setMarketCap(opt)}
                  style={{ accentColor: '#E0CD72' }}
                />
                <span className="text-sm text-[#030F12]">{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Dividend yield */}
        <div className="card-magnifi">
          <h3 className="text-sm font-bold text-[#030F12] mb-3">Dividend Yield</h3>
          <div className="flex justify-between text-xs mb-1" style={{ color: '#606060' }}>
            <span>0%</span>
            <span>10%</span>
          </div>
          <div className="relative h-2 rounded-full" style={{ background: '#E5E7EB' }}>
            <div
              className="absolute left-0 h-2 rounded-full"
              style={{ width: '40%', background: '#E0CD72' }}
            />
          </div>
          <p className="text-xs mt-1.5 text-center" style={{ color: '#606060' }}>
            0% – 4%
          </p>
        </div>

        {/* 1Y Performance */}
        <div className="card-magnifi">
          <h3 className="text-sm font-bold text-[#030F12] mb-3">1Y Performance</h3>
          <div className="flex justify-between text-xs mb-1" style={{ color: '#606060' }}>
            <span>-50%</span>
            <span>+100%</span>
          </div>
          <div className="relative h-2 rounded-full" style={{ background: '#E5E7EB' }}>
            <div
              className="absolute h-2 rounded-full"
              style={{ left: '33%', width: '40%', background: '#E0CD72' }}
            />
          </div>
          <p className="text-xs mt-1.5 text-center" style={{ color: '#606060' }}>
            -17% – +40%
          </p>
        </div>

        {/* ESG rating */}
        <div className="card-magnifi">
          <h3 className="text-sm font-bold text-[#030F12] mb-3">ESG Rating</h3>
          <div className="space-y-2">
            {esgRatings.map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedEsg.includes(r)}
                  onChange={() => toggle(checkedEsg, setCheckedEsg, r)}
                  style={{ accentColor: '#E0CD72' }}
                />
                <span className="text-sm text-[#030F12]">{r}</span>
              </label>
            ))}
          </div>
        </div>

      </aside>

      {/* Results */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-[#030F12]">Results</h2>
          <span className="text-sm" style={{ color: '#606060' }}>
            {filteredResults.length} results found
          </span>
        </div>

        <div className="card-magnifi overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
                {['Name', 'Ticker', 'Type', 'Market Cap', 'Div Yield', '1Y Return', 'ESG', ''].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{ color: '#606060' }}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((row) => (
                <tr
                  key={row.ticker}
                  onMouseEnter={() => setHoveredRow(row.ticker)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="transition-colors"
                  style={{
                    borderBottom: '1px solid #F0F0F0',
                    background: hoveredRow === row.ticker ? '#FAFAFA' : 'transparent',
                  }}
                >
                  <td className="px-4 py-3 font-medium text-[#030F12]">{row.name}</td>
                  <td className="px-4 py-3 font-bold text-[#030F12]">{row.ticker}</td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: row.type === 'ETF' ? '#EFF6FF' : '#F0FDF4',
                        color: row.type === 'ETF' ? '#1D4ED8' : '#15803D',
                      }}
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-4 py-3" style={{ color: '#606060' }}>
                    {row.marketCap}
                  </td>
                  <td className="px-4 py-3" style={{ color: '#606060' }}>
                    {row.divYield}
                  </td>
                  <td
                    className="px-4 py-3 font-semibold"
                    style={{ color: row.returnPositive ? '#16B548' : '#F5441D' }}
                  >
                    {row.return1Y}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-semibold"
                      style={{
                        background: '#FEFCE8',
                        color: '#92400E',
                      }}
                    >
                      {row.esg}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="text-xs font-semibold px-3 py-1 rounded-full transition-colors"
                      style={{
                        border: '1.5px solid #E0CD72',
                        color: '#E0CD72',
                      }}
                    >
                      + Watchlist
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
