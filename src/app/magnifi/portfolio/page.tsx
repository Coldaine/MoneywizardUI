'use client';

import { useState } from 'react';

type Tab = 'allocation' | 'performance' | 'risk';

// ── Allocation data ───────────────────────────────────────────
const SLICES = [
  { label: 'US Equity',     pct: 52, value: '$125,765', color: '#E0CD72' },
  { label: "Int'l Equity",  pct: 18, value: '$43,534',  color: '#030F12' },
  { label: 'Fixed Income',  pct: 14, value: '$33,860',  color: '#9CA3AF' },
  { label: 'Alternatives',  pct: 9,  value: '$21,767',  color: '#60A5FA' },
  { label: 'Cash',          pct: 7,  value: '$16,930',  color: '#D1FAE5' },
];

function DonutChart() {
  const cx = 90, cy = 90, r = 68, stroke = 28;
  const circ = 2 * Math.PI * r;
  const total = SLICES.reduce((acc, s) => acc + s.pct, 0);
  const cumOffsets = SLICES.reduce<number[]>((acc, s, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + (SLICES[i - 1].pct / total) * 100);
    return acc;
  }, []);
  return (
    <svg width={180} height={180} viewBox="0 0 180 180">
      {SLICES.map((s, i) => {
        const dash = (s.pct / 100) * circ;
        const gap  = circ - dash;
        return (
          <circle
            key={s.label}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={stroke}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-(cumOffsets[i] / 100) * circ + circ / 4}
            style={{ transition: 'stroke-dashoffset 0.3s' }}
          />
        );
      })}
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={13} fontWeight="700" fill="#030F12">
        $241k
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize={9} fill="#606060">
        Total
      </text>
    </svg>
  );
}

// ── Performance data ──────────────────────────────────────────
const PORT_PTS  = [210, 214, 209, 218, 222, 219, 226, 230, 228, 235, 238, 241];
const SP500_PTS = [208, 211, 207, 215, 218, 216, 221, 225, 224, 228, 231, 235];
const W = 460, H = 160;
const PAD = { l: 12, r: 12, t: 8, b: 20 };

function toPolyline(data: number[], allData: number[]): string {
  const min = Math.min(...allData) - 3;
  const max = Math.max(...allData) + 3;
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;
  return data
    .map((v, i) => {
      const x = PAD.l + (i / (data.length - 1)) * iW;
      const y = PAD.t + iH - ((v - min) / (max - min)) * iH;
      return `${x},${y}`;
    })
    .join(' ');
}

// ── Risk data ─────────────────────────────────────────────────
const SECTORS = [
  { label: 'Tech',       pct: 28 },
  { label: 'Healthcare', pct: 14 },
  { label: 'Finance',    pct: 12 },
  { label: 'Consumer',   pct: 11 },
  { label: 'Energy',     pct: 8  },
  { label: 'Other',      pct: 27 },
];

export default function PortfolioPage() {
  const [tab, setTab] = useState<Tab>('allocation');
  const allData = [...PORT_PTS, ...SP500_PTS];

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-[#030F12]">Portfolio</h1>

      {/* Tab bar */}
      <div
        role="tablist"
        className="flex gap-1 rounded-full p-1 self-start"
        style={{ background: '#F0F0F0', width: 'fit-content' }}
      >
        {(['allocation', 'performance', 'risk'] as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            aria-selected={tab === t}
            id={t + '-tab'}
            aria-controls={t + '-panel'}
            tabIndex={tab === t ? 0 : -1}
            onClick={() => setTab(t)}
            className="px-5 py-1.5 rounded-full text-sm font-semibold capitalize transition-colors"
            style={
              tab === t
                ? { background: '#E0CD72', color: '#030F12' }
                : { color: '#606060' }
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Allocation tab ── */}
      {tab === 'allocation' && (
        <div role="tabpanel" id="allocation-panel" aria-labelledby="allocation-tab" className="card-magnifi">
          <h2 className="text-base font-semibold mb-6 text-[#030F12]">Asset Allocation</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <DonutChart />
            <div className="flex-1">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
                    {['', 'Asset Class', '%', 'Value'].map((h) => (
                      <th key={h} className="pb-2 text-left font-semibold" style={{ color: '#606060' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SLICES.map((s) => (
                    <tr key={s.label} style={{ borderBottom: '1px solid #F8F8F8' }}>
                      <td className="py-2.5 pr-3">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ background: s.color, border: '1px solid #E5E7EB' }}
                        />
                      </td>
                      <td className="py-2.5 font-medium text-[#030F12]">{s.label}</td>
                      <td className="py-2.5 text-gray-600">{s.pct}%</td>
                      <td className="py-2.5 font-medium text-[#030F12]">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── Performance tab ── */}
      {tab === 'performance' && (
        <div role="tabpanel" id="performance-panel" aria-labelledby="performance-tab" className="space-y-6">
          <div className="card-magnifi">
            <div className="flex items-center gap-6 mb-4">
              <span className="flex items-center gap-2 text-sm font-medium text-[#030F12]">
                <span className="inline-block w-8 h-0.5 rounded" style={{ background: '#E0CD72' }} />
                Portfolio
              </span>
              <span className="flex items-center gap-2 text-sm font-medium" style={{ color: '#606060' }}>
                <span className="inline-block w-8" style={{ borderTop: '2px dashed #9CA3AF', height: 0 }} />
                S&amp;P 500
              </span>
            </div>
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMinYMid meet">
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0CD72" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#E0CD72" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polyline points={toPolyline(SP500_PTS, allData)} fill="none" stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="6 4" />
              <polyline points={toPolyline(PORT_PTS, allData)} fill="none" stroke="#E0CD72" strokeWidth={2.5} strokeLinejoin="round" />
            </svg>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'YTD Return', value: '+8.4%' },
              { label: '1Y Return',  value: '+12.3%' },
              { label: '3Y Annualized', value: '+9.1%' },
            ].map((s) => (
              <div key={s.label} className="card-magnifi text-center">
                <p className="text-xs mb-1" style={{ color: '#606060' }}>{s.label}</p>
                <p className="text-2xl font-bold" style={{ color: '#16B548' }}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Risk tab ── */}
      {tab === 'risk' && (
        <div role="tabpanel" id="risk-panel" aria-labelledby="risk-tab" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Beta',         value: '0.87' },
              { label: 'Sharpe Ratio', value: '1.24' },
              { label: 'Max Drawdown', value: '-11.2%' },
              { label: 'Volatility',   value: '14.3%' },
            ].map((m) => (
              <div key={m.label} className="card-magnifi text-center">
                <p className="text-xs mb-1" style={{ color: '#606060' }}>{m.label}</p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: m.value.startsWith('-') ? '#F5441D' : '#030F12' }}
                >
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          <div className="card-magnifi">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">Sector Exposure</h2>
            <svg width="100%" viewBox="0 0 400 150" preserveAspectRatio="xMinYMid meet">
              {SECTORS.map((s, i) => {
                const barW = (s.pct / 30) * 300;
                const y = i * 22 + 4;
                return (
                  <g key={s.label}>
                    <text x={0} y={y + 13} fontSize={11} fill="#030F12" fontWeight="600">
                      {s.label}
                    </text>
                    <rect x={80} y={y} width={barW} height={16} rx={3} fill="#E0CD72" />
                    <text x={80 + barW + 6} y={y + 12} fontSize={10} fill="#606060">
                      {s.pct}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
