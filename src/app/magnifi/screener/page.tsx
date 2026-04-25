'use client';

import { useState } from 'react';

interface Stock {
  ticker: string;
  name: string;
  sector: string;
  marketCapB: number;
  peRatio: number;
  dividendYield: number;
  price: number;
  change: number;
}

const universe: Stock[] = [
  { ticker: 'AAPL', name: 'Apple Inc.',         sector: 'Technology', marketCapB: 2850, peRatio: 28.5, dividendYield: 0.5,  price: 175.23, change:  1.2 },
  { ticker: 'MSFT', name: 'Microsoft Corp.',     sector: 'Technology', marketCapB: 3100, peRatio: 35.2, dividendYield: 0.7,  price: 415.67, change:  0.8 },
  { ticker: 'NVDA', name: 'NVIDIA Corp.',         sector: 'Technology', marketCapB: 2200, peRatio: 72.4, dividendYield: 0.03, price: 875.50, change:  3.4 },
  { ticker: 'JPM',  name: 'JPMorgan Chase',      sector: 'Financials', marketCapB:  580, peRatio: 12.1, dividendYield: 2.3,  price: 198.40, change: -0.5 },
  { ticker: 'JNJ',  name: 'Johnson & Johnson',   sector: 'Healthcare', marketCapB:  430, peRatio: 16.8, dividendYield: 2.9,  price: 162.75, change: -0.3 },
  { ticker: 'XOM',  name: 'ExxonMobil Corp.',    sector: 'Energy',     marketCapB:  510, peRatio: 14.2, dividendYield: 3.4,  price: 118.90, change:  0.7 },
  { ticker: 'AMZN', name: 'Amazon.com Inc.',     sector: 'Consumer',   marketCapB: 1900, peRatio: 62.3, dividendYield: 0,    price: 185.10, change:  2.1 },
  { ticker: 'TSLA', name: 'Tesla Inc.',           sector: 'Consumer',   marketCapB:  560, peRatio: 45.6, dividendYield: 0,    price: 172.40, change: -1.8 },
  { ticker: 'META', name: 'Meta Platforms',      sector: 'Technology', marketCapB: 1350, peRatio: 28.9, dividendYield: 0.4,  price: 527.30, change:  1.5 },
  { ticker: 'VZ',   name: 'Verizon Comm.',        sector: 'Telecom',    marketCapB:  165, peRatio:  8.9, dividendYield: 6.7,  price:  39.80, change: -0.2 },
];

const marketCapRanges: Record<string, [number, number]> = {
  mega:  [500, Infinity],
  large: [10,  500],
  mid:   [2,   10],
  small: [0,   2],
};

interface Filters {
  sector: string;
  marketCap: string;
  minPE: string;
  maxPE: string;
  minDividend: string;
}

const defaultFilters: Filters = { sector: '', marketCap: '', minPE: '', maxPE: '', minDividend: '' };

function applyFilters(stocks: Stock[], f: Filters): Stock[] {
  return stocks.filter((s) => {
    if (f.sector && s.sector !== f.sector) return false;
    if (f.marketCap) {
      const range = marketCapRanges[f.marketCap];
      if (range && (s.marketCapB < range[0] || s.marketCapB >= range[1])) return false;
    }
    if (f.minPE && s.peRatio < parseFloat(f.minPE)) return false;
    if (f.maxPE && s.peRatio > parseFloat(f.maxPE)) return false;
    if (f.minDividend && s.dividendYield < parseFloat(f.minDividend)) return false;
    return true;
  });
}

export default function ScreenerPage() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(defaultFilters);

  const filteredResults = applyFilters(universe, appliedFilters);
  const sectors = Array.from(new Set(universe.map((s) => s.sector))).sort();

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '24px' }}>
      <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: '0 0 20px' }}>
        Stock Screener
      </h1>

      {/* Filter panel */}
      <div style={{
        backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
        padding: '16px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase' }}>Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters((f) => ({ ...f, sector: e.target.value }))}
              style={{ padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }}
            >
              <option value="">All Sectors</option>
              {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase' }}>Market Cap</label>
            <select
              value={filters.marketCap}
              onChange={(e) => setFilters((f) => ({ ...f, marketCap: e.target.value }))}
              style={{ padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }}
            >
              <option value="">Any Size</option>
              <option value="mega">Mega (&gt;$500B)</option>
              <option value="large">Large ($10B–$500B)</option>
              <option value="mid">Mid ($2B–$10B)</option>
              <option value="small">Small (&lt;$2B)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase' }}>P/E Ratio</label>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <input type="number" placeholder="Min" value={filters.minPE} onChange={(e) => setFilters((f) => ({ ...f, minPE: e.target.value }))}
                style={{ width: '70px', padding: '8px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }} />
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>–</span>
              <input type="number" placeholder="Max" value={filters.maxPE} onChange={(e) => setFilters((f) => ({ ...f, maxPE: e.target.value }))}
                style={{ width: '70px', padding: '8px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6B7280', marginBottom: '4px', textTransform: 'uppercase' }}>Min Div %</label>
            <input type="number" step="0.1" placeholder="0.0" value={filters.minDividend}
              onChange={(e) => setFilters((f) => ({ ...f, minDividend: e.target.value }))}
              style={{ width: '80px', padding: '8px 10px', border: '1px solid #E5E7EB', borderRadius: '6px', fontSize: '13px', color: '#374151', backgroundColor: '#FFFFFF', outline: 'none' }} />
          </div>

          <button
            type="button"
            onClick={() => setAppliedFilters({ ...filters })}
            style={{
              padding: '8px 20px', backgroundColor: '#E0CD72', border: 'none',
              borderRadius: '6px', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer',
            }}
          >
            Apply Filters
          </button>
        </div>
      </div>

      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
        {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
      </div>

      <div style={{
        backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
        overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '2px solid #E5E7EB' }}>
                {['Ticker', 'Name', 'Sector', 'Mkt Cap ($B)', 'P/E', 'Div %', 'Price', 'Change %'].map((h) => (
                  <th key={h} style={{ padding: '10px 12px', textAlign: h === 'Ticker' || h === 'Name' || h === 'Sector' ? 'left' : 'right', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((s) => (
                <tr key={s.ticker} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#111827' }}>{s.ticker}</td>
                  <td style={{ padding: '10px 12px', color: '#374151' }}>{s.name}</td>
                  <td style={{ padding: '10px 12px', color: '#6B7280' }}>{s.sector}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: '#374151' }}>${s.marketCapB.toLocaleString()}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: '#374151' }}>{s.peRatio.toFixed(1)}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', color: '#374151' }}>{s.dividendYield.toFixed(2)}%</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 500, color: '#111827' }}>${s.price.toFixed(2)}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 500, color: s.change >= 0 ? '#166534' : '#991B1B' }}>
                    {s.change >= 0 ? '+' : ''}{s.change.toFixed(2)}%
                  </td>
                </tr>
              ))}
              {filteredResults.length === 0 && (
                <tr><td colSpan={8} style={{ padding: '32px', textAlign: 'center', color: '#9CA3AF' }}>No stocks match your criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
