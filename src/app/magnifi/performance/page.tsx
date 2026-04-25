'use client';

import { useState } from 'react';

const RANGES = ['1D', '1W', '1M', '3M', '1Y', 'All'] as const;
type Range = typeof RANGES[number];

// 1Y monthly portfolio values (in $k) and S&P index values
const PORTFOLIO_PTS = [210, 214, 209, 218, 222, 219, 226, 230, 228, 235, 238, 241];
const SP500_PTS     = [208, 211, 207, 215, 218, 216, 221, 225, 224, 228, 231, 235];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const MONTHLY_RETURNS = [
  { month: 'Jan', port: '+1.9%', sp: '+1.4%', diff: '+0.5%', pos: true },
  { month: 'Feb', port: '+1.9%', sp: '+1.4%', diff: '+0.5%', pos: true },
  { month: 'Mar', port: '-2.3%', sp: '-1.9%', diff: '-0.4%', pos: false },
  { month: 'Apr', port: '+4.3%', sp: '+3.9%', diff: '+0.4%', pos: true },
  { month: 'May', port: '+1.8%', sp: '+1.4%', diff: '+0.4%', pos: true },
  { month: 'Jun', port: '-1.4%', sp: '-0.9%', diff: '-0.5%', pos: false },
  { month: 'Jul', port: '+3.2%', sp: '+2.3%', diff: '+0.9%', pos: true },
  { month: 'Aug', port: '+1.8%', sp: '+1.8%', diff: '+0.0%', pos: true },
  { month: 'Sep', port: '-0.9%', sp: '-0.4%', diff: '-0.5%', pos: false },
  { month: 'Oct', port: '+3.1%', sp: '+1.8%', diff: '+1.3%', pos: true },
  { month: 'Nov', port: '+1.3%', sp: '+1.3%', diff: '+0.0%', pos: true },
  { month: 'Dec', port: '+1.3%', sp: '+1.7%', diff: '-0.4%', pos: false },
];

// SVG helpers — map data arrays into SVG polyline points
const W = 520;
const H = 180;
const PAD = { l: 48, r: 16, t: 12, b: 28 };
const innerW = W - PAD.l - PAD.r;
const innerH = H - PAD.t - PAD.b;

function toPoints(data: number[]): string {
  const min = Math.min(...data) - 3;
  const max = Math.max(...data) + 3;
  return data
    .map((v, i) => {
      const x = PAD.l + (i / (data.length - 1)) * innerW;
      const y = PAD.t + innerH - ((v - min) / (max - min)) * innerH;
      return `${x},${y}`;
    })
    .join(' ');
}

function toAreaPath(data: number[]): string {
  const min = Math.min(...data) - 3;
  const max = Math.max(...data) + 3;
  const pts = data.map((v, i) => {
    const x = PAD.l + (i / (data.length - 1)) * innerW;
    const y = PAD.t + innerH - ((v - min) / (max - min)) * innerH;
    return `${x},${y}`;
  });
  const bottom = PAD.t + innerH;
  return `M${PAD.l},${bottom} L${pts.join(' L')} L${PAD.l + innerW},${bottom} Z`;
}

export default function PerformancePage() {
  const [range, setRange] = useState<Range>('1Y');

  const portfolioPoints = toPoints(PORTFOLIO_PTS);
  const sp500Points     = toPoints(SP500_PTS);
  const areaPath        = toAreaPath(PORTFOLIO_PTS);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-[#030F12]">Performance</h1>
        {/* Range selector */}
        <div
          className="flex gap-1 rounded-full p-1"
          style={{ background: '#F0F0F0' }}
        >
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors"
              style={
                range === r
                  ? { background: '#E0CD72', color: '#030F12' }
                  : { color: '#606060' }
              }
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart card */}
      <div className="card-magnifi">
        <div className="flex items-center gap-6 mb-4">
          <span className="flex items-center gap-2 text-sm font-medium text-[#030F12]">
            <span className="inline-block w-8 h-0.5 rounded" style={{ background: '#E0CD72' }} />
            Portfolio
          </span>
          <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#606060' }}>
            <span
              className="inline-block w-8"
              style={{
                borderTop: '2px dashed #9CA3AF',
                height: 0,
              }}
            />
            S&amp;P 500
          </span>
        </div>

        <svg
          width="100%"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMinYMid meet"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0CD72" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E0CD72" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => {
            const y = PAD.t + (i / 3) * innerH;
            return (
              <line
                key={i}
                x1={PAD.l}
                x2={PAD.l + innerW}
                y1={y}
                y2={y}
                stroke="#F0F0F0"
                strokeWidth={1}
              />
            );
          })}

          {/* Month labels */}
          {MONTHS.map((m, i) => (
            <text
              key={m}
              x={PAD.l + (i / (MONTHS.length - 1)) * innerW}
              y={H - 6}
              fontSize={9}
              fill="#9CA3AF"
              textAnchor="middle"
            >
              {m}
            </text>
          ))}

          {/* Area fill */}
          <path d={areaPath} fill="url(#goldGrad)" />

          {/* S&P dashed line */}
          <polyline
            points={sp500Points}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />

          {/* Portfolio line */}
          <polyline
            points={portfolioPoints}
            fill="none"
            stroke="#E0CD72"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Return',   value: '+14.8%', positive: true },
          { label: 'vs Benchmark',   value: '+2.3%',  positive: true },
          { label: 'Best Month',     value: '+4.2%',  positive: true },
          { label: 'Worst Month',    value: '-3.1%',  positive: false },
        ].map((s) => (
          <div key={s.label} className="card-magnifi text-center">
            <p className="text-xs mb-1" style={{ color: '#606060' }}>{s.label}</p>
            <p
              className="text-2xl font-bold"
              style={{ color: s.positive ? '#16B548' : '#F5441D' }}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly returns table */}
      <div className="card-magnifi overflow-x-auto">
        <h2 className="text-base font-semibold mb-4 text-[#030F12]">Monthly Returns</h2>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
              {['Month', 'Portfolio', 'S&P 500', 'Difference'].map((col) => (
                <th
                  key={col}
                  className="pb-2 text-left font-semibold"
                  style={{ color: '#606060' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MONTHLY_RETURNS.map((row) => (
              <tr
                key={row.month}
                className="hover:bg-gray-50"
                style={{ borderBottom: '1px solid #F8F8F8' }}
              >
                <td className="py-2.5 font-medium text-[#030F12]">{row.month}</td>
                <td
                  className="py-2.5 font-semibold"
                  style={{ color: row.pos ? '#16B548' : '#F5441D' }}
                >
                  {row.port}
                </td>
                <td className="py-2.5 text-gray-600">{row.sp}</td>
                <td
                  className="py-2.5 font-semibold"
                  style={{ color: row.diff.startsWith('+') && row.diff !== '+0.0%' ? '#16B548' : row.diff.startsWith('-') ? '#F5441D' : '#606060' }}
                >
                  {row.diff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
