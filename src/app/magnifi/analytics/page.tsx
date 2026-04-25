// Analytics — no hooks needed, pure static render
const METRICS = [
  { label: 'Sharpe Ratio',  value: '1.24', sub: 'Risk-adjusted return' },
  { label: 'Beta',          value: '0.87', sub: 'Market sensitivity' },
  { label: 'Alpha',         value: '2.3%', sub: 'Excess return' },
  { label: 'Sortino Ratio', value: '1.68', sub: 'Downside risk-adjusted' },
];

// Max drawdown chart data — portfolio value over 24 months (index)
const DRAWDOWN_PTS = [
  100, 103, 107, 110, 108, 106, 101, 97, 94, 98, 103, 107,
  111, 114, 112, 109, 106, 110, 115, 119, 122, 118, 121, 124,
];
// The drawdown trough spans indices 6–8 (values 101→94→98)
const DD_START = 6;
const DD_END   = 8;

// Rolling returns
const ROLLING = [
  { period: '1M',  port: 1.3,  bench: 1.7  },
  { period: '3M',  port: 4.1,  bench: 3.5  },
  { period: '6M',  port: 7.8,  bench: 6.4  },
  { period: '1Y',  port: 14.8, bench: 12.5 },
];

// Correlation matrix
const ASSETS = ['US Eq.', "Int'l Eq.", 'Bonds', 'Alts'];
const CORR: number[][] = [
  [1.00, 0.72, 0.21, 0.45],
  [0.72, 1.00, 0.18, 0.50],
  [0.21, 0.18, 1.00, 0.30],
  [0.45, 0.50, 0.30, 1.00],
];

// SVG constants for drawdown chart
const DW = 520, DH = 130;
const DPAD = { l: 32, r: 12, t: 12, b: 24 };

function toXY(data: number[]): { x: number; y: number }[] {
  const min = Math.min(...data) - 2;
  const max = Math.max(...data) + 2;
  const iW = DW - DPAD.l - DPAD.r;
  const iH = DH - DPAD.t - DPAD.b;
  return data.map((v, i) => ({
    x: DPAD.l + (i / (data.length - 1)) * iW,
    y: DPAD.t + iH - ((v - min) / (max - min)) * iH,
  }));
}

function corrColor(v: number): string {
  // diagonal = deep gold; off-diagonal = light gold scaled to value
  if (v === 1) return '#E0CD72';
  const alpha = 0.15 + v * 0.55;
  return `rgba(224,205,114,${alpha.toFixed(2)})`;
}

export default function AnalyticsPage() {
  const pts = toXY(DRAWDOWN_PTS);
  const polyPts = pts.map((p) => `${p.x},${p.y}`).join(' ');

  // Area path
  const baseY = DH - DPAD.b;
  const areaPath = `M${pts[0].x},${baseY} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(' ') +
    ` L${pts[pts.length - 1].x},${baseY} Z`;

  // Highlight path for drawdown trough
  const ddPts = pts.slice(DD_START, DD_END + 1);
  const ddArea =
    `M${ddPts[0].x},${baseY} ` +
    ddPts.map((p) => `L${p.x},${p.y}`).join(' ') +
    ` L${ddPts[ddPts.length - 1].x},${baseY} Z`;

  // Bar chart helpers
  const BAR_W = 36, BAR_GAP = 8, GROUP_GAP = 28;
  const BAR_H = 120;
  const barChartW = ROLLING.length * (2 * BAR_W + BAR_GAP + GROUP_GAP) + 20;
  const maxPct = 16;

  return (
    <div className="space-y-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-[#030F12]">Analytics</h1>

      {/* Key metric cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {METRICS.map((m) => (
          <div key={m.label} className="card-magnifi text-center">
            <p className="text-xs mb-1" style={{ color: '#606060' }}>{m.label}</p>
            <p className="text-3xl font-bold text-[#030F12]">{m.value}</p>
            <p className="text-xs mt-1" style={{ color: '#9CA3AF' }}>{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Max drawdown chart */}
      <div className="card-magnifi">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#030F12]">Max Drawdown</h2>
          <span
            className="text-sm font-bold px-3 py-1 rounded-full"
            style={{ background: 'rgba(245,68,29,0.1)', color: '#F5441D' }}
          >
            -11.2% peak-to-trough
          </span>
        </div>
        <svg width="100%" viewBox={`0 0 ${DW} ${DH}`} preserveAspectRatio="xMinYMid meet">
          <defs>
            <linearGradient id="ddGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0CD72" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#E0CD72" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          {/* Gold area */}
          <path d={areaPath} fill="url(#ddGold)" />
          {/* Red trough highlight */}
          <path d={ddArea} fill="rgba(245,68,29,0.18)" />
          {/* Portfolio line */}
          <polyline points={polyPts} fill="none" stroke="#E0CD72" strokeWidth={2} strokeLinejoin="round" />
          {/* Baseline */}
          <line x1={DPAD.l} x2={DW - DPAD.r} y1={baseY} y2={baseY} stroke="#E5E7EB" strokeWidth={1} />
          {/* Trough annotation */}
          <text
            x={(ddPts[0].x + ddPts[ddPts.length - 1].x) / 2}
            y={Math.min(...ddPts.map((p) => p.y)) - 6}
            textAnchor="middle"
            fontSize={9}
            fill="#F5441D"
            fontWeight="700"
          >
            -11.2%
          </text>
        </svg>
      </div>

      {/* Rolling returns bar chart */}
      <div className="card-magnifi overflow-x-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#030F12]">Rolling Returns vs Benchmark</h2>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#E0CD72' }} />
              Portfolio
            </span>
            <span className="flex items-center gap-1.5" style={{ color: '#9CA3AF' }}>
              <span className="inline-block w-3 h-3 rounded-sm" style={{ background: '#9CA3AF' }} />
              Benchmark
            </span>
          </div>
        </div>
        <svg width="100%" viewBox={`0 0 ${barChartW} ${BAR_H + 40}`} preserveAspectRatio="xMinYMid meet">
          {ROLLING.map((row, i) => {
            const groupX = 10 + i * (2 * BAR_W + BAR_GAP + GROUP_GAP);
            const portH  = (row.port  / maxPct) * BAR_H;
            const benchH = (row.bench / maxPct) * BAR_H;
            const top    = BAR_H + 8;
            return (
              <g key={row.period}>
                {/* Portfolio bar */}
                <rect
                  x={groupX}
                  y={top - portH}
                  width={BAR_W}
                  height={portH}
                  rx={3}
                  fill="#E0CD72"
                />
                <text x={groupX + BAR_W / 2} y={top - portH - 4} textAnchor="middle" fontSize={9} fill="#030F12" fontWeight="700">
                  {row.port}%
                </text>
                {/* Benchmark bar */}
                <rect
                  x={groupX + BAR_W + BAR_GAP}
                  y={top - benchH}
                  width={BAR_W}
                  height={benchH}
                  rx={3}
                  fill="#D1D5DB"
                />
                <text x={groupX + BAR_W + BAR_GAP + BAR_W / 2} y={top - benchH - 4} textAnchor="middle" fontSize={9} fill="#606060" fontWeight="700">
                  {row.bench}%
                </text>
                {/* Period label */}
                <text
                  x={groupX + BAR_W + BAR_GAP / 2}
                  y={top + 16}
                  textAnchor="middle"
                  fontSize={11}
                  fill="#030F12"
                  fontWeight="600"
                >
                  {row.period}
                </text>
              </g>
            );
          })}
          {/* Baseline */}
          <line x1={0} x2={barChartW} y1={BAR_H + 8} y2={BAR_H + 8} stroke="#E5E7EB" strokeWidth={1} />
        </svg>
      </div>

      {/* Correlation matrix */}
      <div className="card-magnifi overflow-x-auto">
        <h2 className="text-base font-semibold mb-4 text-[#030F12]">Correlation Matrix</h2>
        <table className="text-sm border-separate" style={{ borderSpacing: '4px' }}>
          <thead>
            <tr>
              <th className="w-24" />
              {ASSETS.map((a) => (
                <th key={a} className="text-center text-xs font-semibold pb-1" style={{ color: '#606060', minWidth: '72px' }}>
                  {a}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CORR.map((row, ri) => (
              <tr key={ASSETS[ri]}>
                <td className="text-xs font-semibold pr-3 text-right" style={{ color: '#030F12' }}>
                  {ASSETS[ri]}
                </td>
                {row.map((v, ci) => (
                  <td
                    key={ci}
                    className="text-center text-xs font-bold rounded-lg py-3"
                    style={{
                      background: corrColor(v),
                      color: v === 1 ? '#030F12' : '#374151',
                      minWidth: '72px',
                    }}
                  >
                    {v.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs mt-3" style={{ color: '#9CA3AF' }}>
          Deeper gold = higher correlation. Diagonal = self-correlation (1.00).
        </p>
      </div>
    </div>
  );
}
