'use client';

import { useState } from 'react';
import { DashboardCard } from "@/components/DashboardCard";

// Life event pins for the chart
const lifeEvents = [
  { year: 2028, label: '🏠 Buy a home' },
  { year: 2031, label: '👶 Have a kid' },
  { year: 2037, label: '💸 Expense' },
  { year: 2041, label: '💰 Income' },
  { year: 2044, label: '👴 Retire' },
];

// Chart constants
const CHART_START_YEAR = 2026;
const CHART_END_YEAR = 2046;
const CHART_WIDTH = 800;
const CHART_HEIGHT = 220;
const PAD_LEFT = 56;
const PAD_RIGHT = 16;
const PAD_TOP = 32;
const PAD_BOTTOM = 32;

const PLOT_W = CHART_WIDTH - PAD_LEFT - PAD_RIGHT;
const PLOT_H = CHART_HEIGHT - PAD_TOP - PAD_BOTTOM;

const Y_MAX = 2500000;
const Y_LABELS = [500000, 1000000, 1500000, 2000000, 2500000];
const X_LABEL_YEARS = [2026, 2030, 2034, 2038, 2042, 2046];

function yearToX(year: number) {
  return PAD_LEFT + ((year - CHART_START_YEAR) / (CHART_END_YEAR - CHART_START_YEAR)) * PLOT_W;
}

function valueToY(value: number) {
  return PAD_TOP + PLOT_H - (value / Y_MAX) * PLOT_H;
}

// Cubic bezier path from ~$200k (2026) rising to ~$2.5M (2046)
const curvePoints = [
  { year: 2026, value: 200000 },
  { year: 2030, value: 320000 },
  { year: 2034, value: 580000 },
  { year: 2038, value: 950000 },
  { year: 2042, value: 1600000 },
  { year: 2046, value: 2500000 },
];

function buildCurvePath(): string {
  const pts = curvePoints.map((p) => ({ x: yearToX(p.year), y: valueToY(p.value) }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C ${cpx} ${prev.y}, ${cpx} ${curr.y}, ${curr.x} ${curr.y}`;
  }
  return d;
}

function buildFillPath(): string {
  const curve = buildCurvePath();
  const lastPt = curvePoints[curvePoints.length - 1];
  const firstPt = curvePoints[0];
  return `${curve} L ${yearToX(lastPt.year)} ${PAD_TOP + PLOT_H} L ${yearToX(firstPt.year)} ${PAD_TOP + PLOT_H} Z`;
}

function ForecastChart() {
  const curvePath = buildCurvePath();
  const fillPath = buildFillPath();

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      width="100%"
      height="280"
      preserveAspectRatio="none"
      className="w-full"
    >
      {/* Y-axis grid lines and labels */}
      {Y_LABELS.map((v) => {
        const y = valueToY(v);
        const label = v >= 1000000 ? `$${v / 1000000}M` : `$${v / 1000}k`;
        return (
          <g key={v}>
            <line
              x1={PAD_LEFT} y1={y}
              x2={CHART_WIDTH - PAD_RIGHT} y2={y}
              stroke="#E5E7EB" strokeWidth="0.5"
            />
            <text x={PAD_LEFT - 4} y={y + 4} textAnchor="end" fontSize="8" fill="#777573">
              {label}
            </text>
          </g>
        );
      })}

      {/* X-axis labels */}
      {X_LABEL_YEARS.map((yr) => (
        <text key={yr} x={yearToX(yr)} y={PAD_TOP + PLOT_H + 14} textAnchor="middle" fontSize="8" fill="#777573">
          {yr}
        </text>
      ))}

      {/* Fill area under curve */}
      <path d={fillPath} fill="rgba(7, 151, 185, 0.08)" />

      {/* Dashed orange curve */}
      <path
        d={curvePath}
        fill="none"
        stroke="#FF692D"
        strokeWidth="2"
        strokeDasharray="6 3"
      />

      {/* Life event pins */}
      {lifeEvents.map((ev) => {
        const x = yearToX(ev.year);
        const curveY = valueToY(
          curvePoints.reduce((acc, p) => {
            if (p.year <= ev.year) return p.value;
            return acc;
          }, curvePoints[0].value)
        );
        return (
          <g key={ev.year}>
            <line
              x1={x} y1={PAD_TOP}
              x2={x} y2={curveY}
              stroke="#9CA3AF" strokeWidth="1" strokeDasharray="3 2"
            />
            <text
              x={x} y={PAD_TOP - 4}
              textAnchor="middle"
              fontSize="7"
              fill="#22201D"
              style={{ fontSize: '7px' }}
            >
              {ev.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// Scenario cards data
const scenarioCards = [
  {
    icon: '🏠',
    title: 'Buy a home',
    description: 'Plan for home ownership',
  },
  {
    icon: '👶',
    title: 'Have a kid',
    description: 'Model the impact of raising children',
  },
  {
    icon: '❓',
    title: 'When can I retire?',
    description: 'Test different assumptions to land on a plan you understand and trust that is grounded in your real numbers.',
  },
  {
    icon: '🏡',
    title: 'Can I afford this house?',
    description: 'Understand how big decisions affect your long-term picture.',
  },
  {
    icon: '📈',
    title: 'How does my future play out?',
    description: 'See where your money is headed based on your current trajectory.',
  },
];

export default function ForecastingPage() {
  const [retirementAge, setRetirementAge] = useState(65);

  return (
    <div className="space-y-8">
      {/* Hero section */}
      <div className="flex flex-col items-center text-center pt-6 pb-2 space-y-4">
        <h1 className="text-3xl font-semibold leading-tight">
          See how your{' '}
          <em className="italic">future</em>{' '}
          plays out
        </h1>
        <p className="text-secondary max-w-xl text-sm leading-relaxed">
          Use your real Monarch data to model life events, then drag and play with scenarios to see
          exactly how each decision shapes your future.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
          Try Forecasting
        </button>
      </div>

      {/* Forecast chart */}
      <div className="card-monarch p-4">
        <ForecastChart />
      </div>

      {/* Scenario cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Retirement age slider */}
        <div className="card-monarch space-y-3">
          <div id="retirement-age-label" className="text-sm font-semibold text-secondary uppercase tracking-wider">
            Choose a retirement age
          </div>
          <div className="text-4xl font-bold text-primary">{retirementAge}</div>
          <input
            type="range"
            min={50}
            max={80}
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            aria-labelledby="retirement-age-label"
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-secondary">
            <span>50</span>
            <span>80</span>
          </div>
        </div>

        {/* Cards 2-6: scenario cards */}
        {scenarioCards.map((card, i) => (
          <DashboardCard key={i} title="">
            <div className="space-y-2">
              <div className="text-2xl">{card.icon}</div>
              <div className="font-semibold text-sm">{card.title}</div>
              <div className="text-xs text-secondary leading-relaxed">{card.description}</div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
