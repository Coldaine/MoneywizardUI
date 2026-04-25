'use client';

import { useState } from 'react';

interface Asset {
  ticker: string;
  color: string;
}

const INITIAL_ASSETS: Asset[] = [
  { ticker: 'AAPL', color: '#E0CD72' },
  { ticker: 'NVDA', color: '#0797B9' },
];

const AVAILABLE_ASSETS = ['MSFT', 'TSLA', 'VTI', 'GOOGL'];

interface FundamentalRow {
  metric: string;
  aapl: string;
  nvda: string;
  aaplPositive?: boolean;
  nvdaPositive?: boolean;
}

const fundamentals: FundamentalRow[] = [
  { metric: 'Price', aapl: '$187.42', nvda: '$891.33' },
  { metric: 'Market Cap', aapl: '$2.9T', nvda: '$2.2T' },
  { metric: 'P/E Ratio', aapl: '29.4', nvda: '68.2' },
  { metric: 'EPS', aapl: '$6.43', nvda: '$13.07' },
  { metric: 'Dividend Yield', aapl: '0.5%', nvda: '0.0%' },
  { metric: '1Y Return', aapl: '+18.2%', nvda: '+87.3%', aaplPositive: true, nvdaPositive: true },
  { metric: 'Beta', aapl: '1.24', nvda: '1.68' },
  { metric: '52W High', aapl: '$198.23', nvda: '$974.00' },
  { metric: '52W Low', aapl: '$143.90', nvda: '$392.30' },
];

// Normalized % return data over 12 months — NVDA dramatically outperforms
const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

// AAPL: modest upward trend ~+18% over the year
const aaplData = [0, 2, 4, 6, 3, 7, 9, 11, 13, 15, 17, 18.2];

// NVDA: dramatic surge ~+87% over the year
const nvdaData = [0, 5, 12, 20, 15, 28, 40, 55, 65, 72, 80, 87.3];

const CHART_W = 580;
const CHART_H = 220;
const PAD_L = 48;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 36;
const PLOT_W = CHART_W - PAD_L - PAD_R;
const PLOT_H = CHART_H - PAD_T - PAD_B;

function toX(i: number) {
  return PAD_L + (i / (months.length - 1)) * PLOT_W;
}

function toY(val: number, minY: number, maxY: number) {
  return PAD_T + PLOT_H - ((val - minY) / (maxY - minY)) * PLOT_H;
}

function polyline(data: number[], minY: number, maxY: number) {
  return data.map((v, i) => `${toX(i)},${toY(v, minY, maxY)}`).join(' ');
}

export default function ComparePage() {
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [showAddMenu, setShowAddMenu] = useState(false);

  function removeAsset(ticker: string) {
    setAssets((prev) => prev.filter((a) => a.ticker !== ticker));
  }

  function addAsset(ticker: string) {
    const colors = ['#16B548', '#F5441D'];
    const color = colors[assets.length - 2] ?? '#9CA3AF';
    setAssets((prev) => [...prev, { ticker, color }]);
    setShowAddMenu(false);
  }

  const allY = [...aaplData, ...nvdaData];
  const minY = Math.min(...allY) - 5;
  const maxY = Math.max(...allY) + 5;

  // Y-axis tick values
  const yTicks = [0, 25, 50, 75, 87];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Asset selector row */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-sm font-semibold text-[#030F12]">Comparing:</span>
        {assets.map((asset) => (
          <span
            key={asset.ticker}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold"
            style={{ background: asset.color, color: '#030F12' }}
          >
            {asset.ticker}
            <button
              onClick={() => removeAsset(asset.ticker)}
              className="hover:opacity-70 transition-opacity font-bold leading-none"
            >
              ×
            </button>
          </span>
        ))}
        {assets.length < 4 && (
          <div className="relative">
            <button
              onClick={() => setShowAddMenu((v) => !v)}
              className="px-3 py-1 rounded-full text-sm font-semibold transition-colors hover:bg-[#E7C751]"
              style={{ border: '1.5px solid #E0CD72', color: '#E0CD72', background: 'transparent' }}
            >
              + Add asset
            </button>
            {showAddMenu && (
              <div
                className="absolute top-full mt-1 left-0 rounded-xl shadow-lg py-1 z-10 w-36"
                style={{ background: '#030F12', border: '1px solid #0F2329' }}
              >
                {AVAILABLE_ASSETS.filter((t) => !assets.find((a) => a.ticker === t)).map((t) => (
                  <button
                    key={t}
                    onClick={() => addAsset(t)}
                    className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-[rgba(224,205,114,0.1)] transition-colors"
                    style={{ color: '#D1D5DB' }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Price chart */}
      <div className="card-magnifi">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-[#030F12]">1-Year Return (% normalized)</h2>
          <div className="flex items-center gap-4">
            {assets.map((a) => (
              <span key={a.ticker} className="flex items-center gap-1.5 text-xs font-semibold text-[#030F12]">
                <span
                  className="inline-block w-8 h-0.5 rounded"
                  style={{ background: a.color }}
                />
                {a.ticker}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            width={CHART_W}
            height={CHART_H}
            style={{ display: 'block', maxWidth: '100%' }}
          >
            {/* Grid lines */}
            {yTicks.map((tick) => {
              const y = toY(tick, minY, maxY);
              return (
                <g key={tick}>
                  <line
                    x1={PAD_L}
                    y1={y}
                    x2={CHART_W - PAD_R}
                    y2={y}
                    stroke="#E5E7EB"
                    strokeWidth={1}
                  />
                  <text
                    x={PAD_L - 6}
                    y={y + 4}
                    textAnchor="end"
                    fontSize={10}
                    fill="#9CA3AF"
                  >
                    {tick}%
                  </text>
                </g>
              );
            })}

            {/* Zero line */}
            <line
              x1={PAD_L}
              y1={toY(0, minY, maxY)}
              x2={CHART_W - PAD_R}
              y2={toY(0, minY, maxY)}
              stroke="#606060"
              strokeWidth={1}
              strokeDasharray="4 2"
            />

            {/* X-axis labels */}
            {months.map((m, i) => (
              <text
                key={m}
                x={toX(i)}
                y={CHART_H - 8}
                textAnchor="middle"
                fontSize={10}
                fill="#9CA3AF"
              >
                {m}
              </text>
            ))}

            {/* AAPL line */}
            {assets.find((a) => a.ticker === 'AAPL') && (
              <polyline
                points={polyline(aaplData, minY, maxY)}
                fill="none"
                stroke="#E0CD72"
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}

            {/* NVDA line */}
            {assets.find((a) => a.ticker === 'NVDA') && (
              <polyline
                points={polyline(nvdaData, minY, maxY)}
                fill="none"
                stroke="#0797B9"
                strokeWidth={2.5}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            )}

            {/* End-point dots */}
            {assets.find((a) => a.ticker === 'AAPL') && (
              <circle
                cx={toX(months.length - 1)}
                cy={toY(aaplData[aaplData.length - 1], minY, maxY)}
                r={4}
                fill="#E0CD72"
              />
            )}
            {assets.find((a) => a.ticker === 'NVDA') && (
              <circle
                cx={toX(months.length - 1)}
                cy={toY(nvdaData[nvdaData.length - 1], minY, maxY)}
                r={4}
                fill="#0797B9"
              />
            )}
          </svg>
        </div>
      </div>

      {/* Fundamentals table */}
      <div className="card-magnifi overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
              <th
                className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: '#606060' }}
              >
                Metric
              </th>
              <th className="px-5 py-3 text-center">
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: '#E0CD72', color: '#030F12' }}
                >
                  AAPL
                </span>
              </th>
              <th className="px-5 py-3 text-center">
                <span
                  className="inline-block px-3 py-0.5 rounded-full text-xs font-bold"
                  style={{ background: '#0797B9', color: '#FFFFFF' }}
                >
                  NVDA
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {fundamentals.map((row, i) => (
              <tr
                key={row.metric}
                style={{
                  borderBottom: i < fundamentals.length - 1 ? '1px solid #F0F0F0' : 'none',
                  background: i % 2 === 0 ? '#FAFAFA' : '#FFFFFF',
                }}
              >
                <td
                  className="px-5 py-3 font-medium"
                  style={{ color: '#606060' }}
                >
                  {row.metric}
                </td>
                <td
                  className="px-5 py-3 text-center font-semibold"
                  style={{
                    color:
                      row.aaplPositive !== undefined
                        ? row.aaplPositive
                          ? '#16B548'
                          : '#F5441D'
                        : '#030F12',
                  }}
                >
                  {row.aapl}
                </td>
                <td
                  className="px-5 py-3 text-center font-semibold"
                  style={{
                    color:
                      row.nvdaPositive !== undefined
                        ? row.nvdaPositive
                          ? '#16B548'
                          : '#F5441D'
                        : '#030F12',
                  }}
                >
                  {row.nvda}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI summary card */}
      <div className="rounded-2xl p-6" style={{ background: '#030F12' }}>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#E0CD72' }}>
          AI Summary
        </p>
        <p className="text-sm leading-relaxed" style={{ color: '#D1D5DB' }}>
          NVDA has dramatically outperformed AAPL over the past year (+87% vs +18%), driven by
          explosive AI chip demand. However, AAPL offers more stability (lower beta, dividend yield)
          and lower valuation risk (P/E 29 vs 68). For growth investors, NVDA remains compelling;
          for income/stability, AAPL is the better fit.
        </p>
      </div>
    </div>
  );
}
