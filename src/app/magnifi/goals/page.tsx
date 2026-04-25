'use client';

import { useState } from 'react';

type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  targetYear: number;
  onTrack: boolean;
  monthlyContrib?: string;
  behindBy?: string;
};

const goals: Goal[] = [
  {
    id: 'retirement',
    name: 'Retirement at 65',
    target: 2_000_000,
    current: 241_856,
    targetYear: 2046,
    onTrack: true,
    monthlyContrib: '$2,000/mo',
  },
  {
    id: 'emergency',
    name: 'Emergency Fund',
    target: 30_000,
    current: 18_500,
    targetYear: 2026,
    onTrack: true,
    monthlyContrib: '$500/mo',
  },
  {
    id: 'home',
    name: 'Home Down Payment',
    target: 100_000,
    current: 42_300,
    targetYear: 2028,
    onTrack: false,
    monthlyContrib: '$1,200/mo',
    behindBy: '$8,200',
  },
];

function fmtCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}

// Projection chart points for retirement goal (2026–2046, 21 points)
function buildProjectionPath(width: number, height: number) {
  const years = 21;
  const startVal = 241_856;
  const target   = 2_000_000;

  const basePoints:  [number, number][] = [];
  const targetPoints: [number, number][] = [];

  for (let i = 0; i < years; i++) {
    const x = (i / (years - 1)) * width;
    // Compound at 7% + $2000/mo
    const baseVal = startVal * Math.pow(1.07, i) + 2000 * 12 * ((Math.pow(1.07, i) - 1) / 0.07);
    const baseY   = height - (Math.min(baseVal, target * 1.1) / (target * 1.1)) * height;
    const targY   = height - (((startVal + (target - startVal) * (i / (years - 1)))) / (target * 1.1)) * height;
    basePoints.push([x, baseY]);
    targetPoints.push([x, targY]);
  }

  const toPath = (pts: [number, number][]) =>
    pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');

  const areaPath = basePoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`)
    .join(' ') +
    ` L ${(width).toFixed(1)} ${height} L 0 ${height} Z`;

  return { basePath: toPath(basePoints), targetPath: toPath(targetPoints), areaPath };
}

const { basePath, targetPath, areaPath } = buildProjectionPath(460, 160);

const milestones = [
  { label: '$500K', x: 115 },
  { label: '$1M',   x: 230 },
  { label: '$2M',   x: 460 },
];

export default function GoalsPage() {
  const [expanded, setExpanded] = useState<string | null>('retirement');

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#030F12]">Investment Goals</h1>
          <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Track and manage your financial milestones.</p>
        </div>
        <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 text-sm hover:bg-[#E7C751] transition-colors">
          + New Goal
        </button>
      </div>

      {/* Active goals grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const pct = Math.round((goal.current / goal.target) * 100 * 10) / 10;
          const isExpanded = expanded === goal.id;
          return (
            <button
              key={goal.id}
              onClick={() => setExpanded(isExpanded ? null : goal.id)}
              className="card-magnifi text-left flex flex-col gap-3 hover:shadow-lg transition-shadow cursor-pointer"
              style={{ outline: isExpanded ? '2px solid #E0CD72' : 'none' }}
            >
              {/* Status badge */}
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#030F12]">{goal.name}</span>
                {goal.onTrack ? (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(22,181,72,0.12)', color: '#16B548' }}>
                    On track ✓
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(245,185,29,0.15)', color: '#A06800' }}>
                    Needs attention ⚠
                  </span>
                )}
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs mb-1" style={{ color: '#606060' }}>
                  <span>{fmtCurrency(goal.current)}</span>
                  <span>{pct}%</span>
                  <span>{fmtCurrency(goal.target)}</span>
                </div>
                <div className="w-full rounded-full overflow-hidden" style={{ height: 8, background: '#E8E9EB' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: goal.onTrack ? '#E0CD72' : '#F5A623' }}
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="text-xs space-y-0.5" style={{ color: '#606060' }}>
                <div>Target year: <span className="font-semibold text-[#030F12]">{goal.targetYear}</span></div>
                {goal.monthlyContrib && (
                  <div>Contribute: <span className="font-semibold text-[#030F12]">{goal.monthlyContrib}</span></div>
                )}
                {goal.behindBy && (
                  <div>Behind by: <span className="font-semibold" style={{ color: '#F5441D' }}>{goal.behindBy}</span></div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded detail — retirement projection chart */}
      {expanded === 'retirement' && (
        <div className="card-magnifi space-y-4">
          <h2 className="text-base font-semibold text-[#030F12]">Retirement Projection — 2026 to 2046</h2>
          <svg width="100%" viewBox="0 0 490 190" preserveAspectRatio="xMinYMid meet">
            {/* Area under base trajectory */}
            <path d={areaPath} fill="rgba(224,205,114,0.15)" />
            {/* Target line (dashed gray) */}
            <path d={targetPath} fill="none" stroke="#B0B0B0" strokeWidth={1.5} strokeDasharray="5 4" />
            {/* Base trajectory (gold) */}
            <path d={basePath} fill="none" stroke="#E0CD72" strokeWidth={2.5} />

            {/* Milestone markers */}
            {milestones.map((m) => (
              <g key={m.label}>
                <line x1={m.x} y1={0} x2={m.x} y2={160} stroke="#E0E0E0" strokeWidth={1} strokeDasharray="3 3" />
                <text x={m.x + 3} y={12} fontSize={9} fill="#606060">{m.label}</text>
              </g>
            ))}

            {/* X-axis labels */}
            {['2026', '2031', '2036', '2041', '2046'].map((yr, i) => (
              <text key={yr} x={i * 115} y={178} fontSize={10} fill="#606060">{yr}</text>
            ))}
            <line x1={0} y1={162} x2={490} y2={162} stroke="#E0E0E0" strokeWidth={1} />

            {/* Legend */}
            <line x1={5} y1={172} x2={22} y2={172} stroke="#E0CD72" strokeWidth={2.5} />
            <text x={25} y={176} fontSize={9} fill="#606060">Current trajectory</text>
            <line x1={130} y1={172} x2={147} y2={172} stroke="#B0B0B0" strokeWidth={1.5} strokeDasharray="4 3" />
            <text x={150} y={176} fontSize={9} fill="#606060">Target</text>
          </svg>
        </div>
      )}

      {/* Completed goals */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold mb-3 text-[#030F12]">Completed Goals</h2>
        <div
          className="flex items-center justify-between py-3"
          style={{ borderBottom: '1px solid #F0F0F0' }}
        >
          <div className="flex items-center gap-3">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'rgba(22,181,72,0.12)', color: '#16B548' }}
            >
              ✓
            </span>
            <span className="font-medium text-[#030F12]">Pay off student loans</span>
          </div>
          <span className="text-sm" style={{ color: '#606060' }}>Completed Dec 2023</span>
        </div>
      </div>
    </div>
  );
}
