'use client';

import { useState } from 'react';

const TABS = ['Tax Report', 'Gain/Loss', 'Income Summary', 'Performance'];

// --- Tax lot data ---
const taxLots = [
  { security: 'TSLA', acquired: 'Jan 15, 2024', sold: 'Apr 8, 2025',  costBasis: '$4,200.00', proceeds: '$5,580.00', gainLoss: '+$1,380.00', gl: 1380,  type: 'Long-term'  },
  { security: 'GBTC', acquired: 'Mar 3, 2025',  sold: 'Apr 18, 2025', costBasis: '$249.00',   proceeds: '$256.80',   gainLoss: '+$7.80',     gl: 7.80,  type: 'Short-term' },
  { security: 'AAPL', acquired: 'Feb 20, 2023', sold: '—',            costBasis: '$7,200.00', proceeds: '—',         gainLoss: '(unrealized)',gl: 0,     type: 'Long-term'  },
];

// --- Unrealized positions ---
const unrealized = [
  { security: 'AAPL', cost: '$7,200.00', current: '$8,475.00', gain: '+$1,275.00', pct: '+17.7%', pos: true },
  { security: 'VTI',  cost: '$9,800.00', current: '$12,093.50', gain: '+$2,293.50', pct: '+23.4%', pos: true },
  { security: 'NVDA', cost: '$4,100.00', current: '$7,576.31', gain: '+$3,476.31', pct: '+84.8%', pos: true },
  { security: 'MSFT', cost: '$6,200.00', current: '$7,473.96', gain: '+$1,273.96', pct: '+20.5%', pos: true },
  { security: 'BND',  cost: '$7,580.00', current: '$7,342.00', gain: '-$238.00',   pct: '-3.1%',  pos: false },
];

// --- Income data ---
const incomeRows = [
  { source: 'AAPL Dividends', q1: '$42',  q2: '$42',  q3: '$43',  q4: '$43',  total: '$170' },
  { source: 'VTI Dividends',  q1: '$128', q2: '$129', q3: '$130', q4: '$131', total: '$518' },
  { source: 'BND Interest',   q1: '$37',  q2: '$38',  q3: '$38',  q4: '$39',  total: '$152' },
  { source: 'Total',          q1: '$207', q2: '$209', q3: '$211', q4: '$213', total: '$840' },
];

// Monthly dividend data for bar chart (Jan–Dec)
const monthlyDividends = [18, 22, 42, 48, 32, 55, 38, 44, 60, 52, 30, 65];
const BAR_MAX = Math.max(...monthlyDividends);
const MONTHS = ['J','F','M','A','M','J','J','A','S','O','N','D'];

export default function ReportsPage() {
  const [tab, setTab] = useState('Tax Report');

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Reports</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Detailed financial reports for tax, performance, and income analysis.</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 rounded-xl p-1" style={{ background: '#E8E9EB', width: 'fit-content' }}>
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={
              tab === t
                ? { background: '#ffffff', color: '#030F12', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }
                : { background: 'transparent', color: '#606060' }
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Tax Report tab ── */}
      {tab === 'Tax Report' && (
        <div className="space-y-5">
          <div className="card-magnifi flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-xs font-medium mb-0.5" style={{ color: '#606060' }}>Tax Year</p>
              <p className="text-xl font-bold text-[#030F12]">2025</p>
            </div>
            <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 text-sm hover:bg-[#E7C751] transition-colors">
              Download PDF
            </button>
          </div>

          <div className="card-magnifi overflow-x-auto">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">Tax Lot Detail</h2>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
                  {['Security', 'Acquired', 'Sold', 'Cost Basis', 'Proceeds', 'Gain/Loss', 'Type'].map((col) => (
                    <th key={col} className="pb-2 text-left font-semibold pr-4" style={{ color: '#606060' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {taxLots.map((row) => (
                  <tr key={row.security} className="hover:bg-gray-50" style={{ borderBottom: '1px solid #F8F8F8' }}>
                    <td className="py-3 pr-4 font-bold text-[#030F12]">{row.security}</td>
                    <td className="py-3 pr-4 text-gray-600">{row.acquired}</td>
                    <td className="py-3 pr-4 text-gray-600">{row.sold}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.costBasis}</td>
                    <td className="py-3 pr-4 text-gray-700">{row.proceeds}</td>
                    <td
                      className="py-3 pr-4 font-semibold"
                      style={{ color: row.gl > 0 ? '#16B548' : row.gl < 0 ? '#F5441D' : '#606060' }}
                    >
                      {row.gainLoss}
                    </td>
                    <td className="py-3">
                      <span
                        className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={
                          row.type === 'Short-term'
                            ? { background: 'rgba(245,68,29,0.1)', color: '#F5441D' }
                            : { background: 'rgba(22,181,72,0.1)', color: '#16B548' }
                        }
                      >
                        {row.type === 'Short-term' ? 'ST' : 'LT'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Realized Gains', value: '$1,387.80', color: '#16B548' },
              { label: 'Short-term Gains',     value: '$7.80',     color: '#F5441D' },
              { label: 'Long-term Gains',      value: '$1,380.00', color: '#16B548' },
              { label: 'Estimated Tax',        value: '$227.49',   color: '#030F12' },
            ].map((s) => (
              <div key={s.label} className="card-magnifi">
                <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>{s.label}</p>
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Gain/Loss tab ── */}
      {tab === 'Gain/Loss' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="card-magnifi">
              <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>Realized Gains</p>
              <p className="text-3xl font-bold" style={{ color: '#16B548' }}>$1,387.80</p>
              <p className="text-xs mt-1" style={{ color: '#606060' }}>Tax year 2025</p>
            </div>
            <div className="card-magnifi">
              <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>Unrealized Gains</p>
              <p className="text-3xl font-bold" style={{ color: '#16B548' }}>$18,420.00</p>
              <p className="text-xs mt-1" style={{ color: '#606060' }}>Across all positions</p>
            </div>
          </div>

          <div className="card-magnifi overflow-x-auto">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">Top Unrealized Positions</h2>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
                  {['Security', 'Cost Basis', 'Current Value', 'Gain/Loss', 'Return'].map((col) => (
                    <th key={col} className="pb-2 text-left font-semibold pr-4" style={{ color: '#606060' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {unrealized.map((r) => (
                  <tr key={r.security} className="hover:bg-gray-50" style={{ borderBottom: '1px solid #F8F8F8' }}>
                    <td className="py-3 pr-4 font-bold text-[#030F12]">{r.security}</td>
                    <td className="py-3 pr-4 text-gray-600">{r.cost}</td>
                    <td className="py-3 pr-4 font-medium text-[#030F12]">{r.current}</td>
                    <td className="py-3 pr-4 font-semibold" style={{ color: r.pos ? '#16B548' : '#F5441D' }}>{r.gain}</td>
                    <td className="py-3 font-semibold" style={{ color: r.pos ? '#16B548' : '#F5441D' }}>{r.pct}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Income Summary tab ── */}
      {tab === 'Income Summary' && (
        <div className="space-y-5">
          {/* Bar chart SVG */}
          <div className="card-magnifi">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">Monthly Dividend Income — 2025</h2>
            <svg width="100%" viewBox="0 0 520 140" preserveAspectRatio="xMinYMid meet">
              {monthlyDividends.map((val, i) => {
                const barH = (val / BAR_MAX) * 100;
                const x = i * 43 + 4;
                const y = 110 - barH;
                return (
                  <g key={i}>
                    <rect x={x} y={y} width={34} height={barH} rx={4} fill="#E0CD72" />
                    <text x={x + 17} y={128} fontSize={10} textAnchor="middle" fill="#606060">{MONTHS[i]}</text>
                    <text x={x + 17} y={y - 4} fontSize={9} textAnchor="middle" fill="#606060">${val}</text>
                  </g>
                );
              })}
              <line x1={0} y1={111} x2={520} y2={111} stroke="#E0E0E0" strokeWidth={1} />
            </svg>
          </div>

          <div className="card-magnifi overflow-x-auto">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">Income by Source</h2>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
                  {['Source', 'Q1', 'Q2', 'Q3', 'Q4', 'Total'].map((col) => (
                    <th key={col} className="pb-2 text-left font-semibold pr-6" style={{ color: '#606060' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {incomeRows.map((row, i) => (
                  <tr
                    key={row.source}
                    className="hover:bg-gray-50"
                    style={{
                      borderBottom: '1px solid #F8F8F8',
                      background: i === incomeRows.length - 1 ? '#FEFDF5' : undefined,
                      borderTop: i === incomeRows.length - 1 ? '2px solid #E0CD72' : undefined,
                    }}
                  >
                    <td className="py-3 pr-6 font-semibold text-[#030F12]">{row.source}</td>
                    <td className="py-3 pr-6 text-gray-700">{row.q1}</td>
                    <td className="py-3 pr-6 text-gray-700">{row.q2}</td>
                    <td className="py-3 pr-6 text-gray-700">{row.q3}</td>
                    <td className="py-3 pr-6 text-gray-700">{row.q4}</td>
                    <td className="py-3 font-bold text-[#030F12]">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Performance tab ── */}
      {tab === 'Performance' && (
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'YTD Return',   value: '+12.4%', color: '#16B548' },
              { label: '1-Year Return',value: '+18.7%', color: '#16B548' },
              { label: 'vs S&P 500',   value: '+2.3%',  color: '#16B548' },
            ].map((s) => (
              <div key={s.label} className="card-magnifi">
                <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </div>
            ))}
          </div>
          <div className="card-magnifi">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">Annual Performance</h2>
            <svg width="100%" viewBox="0 0 520 160" preserveAspectRatio="xMinYMid meet">
              {[
                { year: '2021', port: 28, sp: 27 },
                { year: '2022', port: -8, sp: -18 },
                { year: '2023', port: 22, sp: 24 },
                { year: '2024', port: 31, sp: 25 },
                { year: '2025', port: 12, sp: 10 },
              ].map((d, i) => {
                const x = i * 100 + 10;
                const baseY = 100;
                const scale = 2.2;
                const portH = Math.abs(d.port) * scale;
                const spH   = Math.abs(d.sp)   * scale;
                return (
                  <g key={d.year}>
                    <rect x={x}      y={d.port >= 0 ? baseY - portH : baseY} width={30} height={portH} rx={3} fill="#E0CD72" />
                    <rect x={x + 34} y={d.sp   >= 0 ? baseY - spH   : baseY} width={30} height={spH}   rx={3} fill="#B0C4C8" />
                    <text x={x + 32} y={145} fontSize={11} textAnchor="middle" fill="#606060">{d.year}</text>
                    <text x={x + 15} y={d.port >= 0 ? baseY - portH - 4 : baseY + portH + 12} fontSize={9} textAnchor="middle" fill="#030F12">{d.port > 0 ? '+' : ''}{d.port}%</text>
                  </g>
                );
              })}
              <line x1={0} y1={100} x2={520} y2={100} stroke="#E0E0E0" strokeWidth={1} strokeDasharray="4 3" />
              <text x={8} y={155} fontSize={10} fill="#E0CD72">■ Portfolio</text>
              <text x={80} y={155} fontSize={10} fill="#B0C4C8">■ S&amp;P 500</text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
