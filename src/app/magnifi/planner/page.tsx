'use client';

import { useState } from 'react';

const IMPACT_CONTRIBS = [1500, 2000, 2500, 3000];

function projectBalance(yearsElapsed: number, rate: number, contrib: number, extraContrib = 0) {
  const r = rate / 100;
  const monthly = (contrib + extraContrib) * 12;
  const growth = Math.pow(1 + r, yearsElapsed);
  return 241_856 * growth + monthly * ((growth - 1) / r);
}

function fmtM(n: number) {
  return '$' + (n / 1_000_000).toFixed(1) + 'M';
}

// Build SVG projection bands
function buildBands(startAge: number, retireAge: number, contrib: number, rate: number) {
  const years = retireAge - startAge;
  if (years <= 0) {
    const baseVal = projectBalance(0, rate, contrib, 0);
    const optVal = projectBalance(0, rate + 3, contrib, 500);
    const pessVal = projectBalance(0, Math.max(rate - 3, 1), contrib, -200);
    return {
      baseLine: '',
      topArea: '',
      bottomArea: '',
      finalBase: [0, 0] as [number, number],
      finalOpt:  [0, 0] as [number, number],
      finalPess: [0, 0] as [number, number],
      finalBaseVal: baseVal,
      finalOptVal: optVal,
      finalPessVal: pessVal,
      xLabels: [{ label: new Date().getFullYear().toString(), x: 0 }],
      W: 460,
      H: 200,
    };
  }

  const currentYear = 2026;
  const W = 460;
  const H = 200;
  const maxVal = 3_200_000;

  const pts = (rateAdj: number, extraContrib: number) => {
    const points: [number, number][] = [];
    let finalVal = 0;
    for (let i = 0; i <= years; i++) {
      finalVal = projectBalance(i, rateAdj, contrib, extraContrib);
      const x = (i / years) * W;
      const y = H - Math.min(finalVal / maxVal, 1) * H;
      points.push([x, y]);
    }
    return { points, finalVal };
  };

  const base = pts(rate, 0);
  const optimistic = pts(rate + 3, 500);
  const pessimistic = pts(Math.max(rate - 3, 1), -200);

  const toLine = (arr: [number, number][]) =>
    arr.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');

  const topArea =
    optimistic.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') +
    ' ' +
    [...base.points].reverse().map((p, i) => `${i === 0 ? 'L' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') +
    ' Z';

  const bottomArea =
    base.points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') +
    ' ' +
    [...pessimistic.points].reverse().map((p) => `L ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') +
    ' Z';

  const finalBase = base.points[base.points.length - 1];
  const finalOpt  = optimistic.points[optimistic.points.length - 1];
  const finalPess = pessimistic.points[pessimistic.points.length - 1];

  const xLabels: { label: string; x: number }[] = [];
  for (let i = 0; i <= years; i += Math.ceil(years / 5)) {
    xLabels.push({ label: String(currentYear + i), x: (i / years) * W });
  }

  return {
    baseLine:    toLine(base.points),
    topArea,
    bottomArea,
    finalBase,
    finalOpt,
    finalPess,
    finalBaseVal: base.finalVal,
    finalOptVal: optimistic.finalVal,
    finalPessVal: pessimistic.finalVal,
    xLabels,
    W,
    H,
  };
}

export default function PlannerPage() {
  const [currentAge, setCurrentAge]    = useState(38);
  const [retireAge,  setRetireAge]     = useState(65);
  const [contrib,    setContrib]       = useState(2000);
  const [rate,       setRate]          = useState(7);
  const [expenses,   setExpenses]      = useState(6000);

  // Committed values — chart only updates when user clicks Recalculate
  const [applied, setApplied] = useState({
    currentAge: 38,
    retireAge: 65,
    contrib: 2000,
    rate: 7,
    expenses: 6000,
  });

  const safeRetireAge = Math.max(applied.retireAge, applied.currentAge + 1);
  const chart = buildBands(applied.currentAge, safeRetireAge, applied.contrib, applied.rate);
  const projectionYears = safeRetireAge - applied.currentAge;

  const impactRows = IMPACT_CONTRIBS.map((contribution) => ({
    contrib: `$${contribution.toLocaleString()}/mo`,
    final: fmtM(projectBalance(projectionYears, applied.rate, contribution)),
    highlight: contribution === applied.contrib,
  }));

  const retirementTarget = Math.round(applied.expenses * 12 / 0.04 / 100_000) * 100_000;
  const swrIncome = Math.round((chart.finalBaseVal * 0.04) / 12).toLocaleString();
  const probability = Math.min(99, Math.max(10, Math.round(60 + (applied.rate - 4) * 5 + (applied.contrib - 500) / 100)));

  function handleRecalculate() {
    setApplied({ currentAge, retireAge: Math.max(retireAge, currentAge + 1), contrib, rate, expenses });
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Retirement Planner</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Monte Carlo Projection — powered by 1,000 simulations.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* ── Input panel ── */}
        <div className="card-magnifi w-full lg:w-80 flex-shrink-0 space-y-5">
          <h2 className="text-base font-semibold text-[#030F12]">Inputs</h2>

          <SliderField
            label="Current Age"
            value={currentAge}
            min={25} max={70}
            display={`${currentAge} yrs`}
            onChange={(v) => {
              setCurrentAge(v);
              setRetireAge((prev) => Math.max(prev, v + 1));
            }}
          />
          <SliderField
            label="Retirement Age"
            value={retireAge}
            min={currentAge + 1} max={80}
            display={`${retireAge} yrs`}
            onChange={setRetireAge}
          />
          <SliderField
            label="Monthly Contribution"
            value={contrib}
            min={500} max={10000} step={100}
            display={`$${contrib.toLocaleString()}/mo`}
            onChange={setContrib}
          />
          <SliderField
            label="Expected Return"
            value={rate}
            min={4} max={12}
            display={`${rate}% avg annual`}
            onChange={setRate}
          />
          <SliderField
            label="Monthly Expenses in Retirement"
            value={expenses}
            min={3000} max={15000} step={250}
            display={`$${expenses.toLocaleString()}/mo`}
            onChange={setExpenses}
          />

          <button
            onClick={handleRecalculate}
            className="w-full rounded-full bg-[#E0CD72] text-[#030F12] font-semibold py-2.5 text-sm hover:bg-[#E7C751] transition-colors"
          >
            Recalculate
          </button>
        </div>

        {/* ── Right column ── */}
        <div className="flex-1 space-y-5 min-w-0">
          {/* Projection chart */}
          <div className="card-magnifi">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">
              Projection: {2026} – {2026 + (safeRetireAge - applied.currentAge)}
            </h2>
            <svg
              width="100%"
              viewBox={`0 0 ${chart.W + 70} ${chart.H + 40}`}
              preserveAspectRatio="xMinYMid meet"
            >
              {/* Y-axis labels */}
              {[0, 1_000_000, 2_000_000, 3_000_000].map((v) => {
                const y = chart.H - (v / 3_200_000) * chart.H;
                const label = v === 0 ? '$0' : `$${v / 1_000_000}M`;
                return (
                  <g key={v}>
                    <line x1={44} y1={y} x2={chart.W + 50} y2={y} stroke="#F0F0F0" strokeWidth={1} />
                    <text x={40} y={y + 4} fontSize={9} textAnchor="end" fill="#606060">{label}</text>
                  </g>
                );
              })}

              <g transform="translate(50, 0)">
                {/* Bands */}
                <path d={chart.topArea}    fill="rgba(224,205,114,0.18)" />
                <path d={chart.bottomArea} fill="rgba(180,180,180,0.18)" />
                {/* Base line */}
                <path d={chart.baseLine} fill="none" stroke="#E0CD72" strokeWidth={2.5} />

                {/* Final value labels — dynamic from computed values */}
                <text x={chart.finalOpt[0]  + 4} y={chart.finalOpt[1]  - 4} fontSize={9} fill="#B89A00">Opt. {fmtM(chart.finalOptVal)}</text>
                <text x={chart.finalBase[0] + 4} y={chart.finalBase[1] - 4} fontSize={9} fill="#E0CD72">Base {fmtM(chart.finalBaseVal)}</text>
                <text x={chart.finalPess[0] + 4} y={chart.finalPess[1] + 12} fontSize={9} fill="#999">Pess. {fmtM(chart.finalPessVal)}</text>

                {/* X-axis labels */}
                {chart.xLabels.map((l) => (
                  <text key={l.label} x={l.x} y={chart.H + 18} fontSize={10} textAnchor="middle" fill="#606060">{l.label}</text>
                ))}
                <line x1={0} y1={chart.H} x2={chart.W} y2={chart.H} stroke="#E0E0E0" strokeWidth={1} />
              </g>
            </svg>

            {/* Retirement income callout */}
            <div
              className="mt-3 rounded-xl px-4 py-2.5 text-sm font-medium"
              style={{ background: 'rgba(224,205,114,0.12)', color: '#030F12' }}
            >
              At <strong>{fmtM(chart.finalBaseVal)}</strong> with 4% SWR = <strong>${swrIncome}/mo</strong> in retirement income
            </div>
          </div>

          {/* Monte Carlo summary */}
          <div
            className="rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{ background: '#030F12' }}
          >
            <div>
              <p className="text-sm font-medium mb-1" style={{ color: '#606060' }}>
                Based on 1,000 simulations
              </p>
              <p className="text-base text-white">
                Probability of meeting your <span style={{ color: '#E0CD72' }}>{fmtM(retirementTarget)}</span> target:
              </p>
            </div>
            <p className="text-5xl font-bold ml-auto sm:ml-0" style={{ color: '#E0CD72' }}>{probability}%</p>
          </div>

          {/* Contribution impact table */}
          <div className="card-magnifi">
            <h2 className="text-base font-semibold mb-4 text-[#030F12]">What if I contribute…</h2>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
                  <th className="pb-2 text-left font-semibold" style={{ color: '#606060' }}>Monthly Contribution</th>
                  <th className="pb-2 text-left font-semibold" style={{ color: '#606060' }}>Projected Balance at {2026 + (applied.retireAge - applied.currentAge)}</th>
                </tr>
              </thead>
              <tbody>
                {impactRows.map((row) => (
                  <tr
                    key={row.contrib}
                    className="hover:bg-gray-50 transition-colors"
                    style={{
                      borderBottom: '1px solid #F8F8F8',
                      background: row.highlight ? '#FEFDF5' : undefined,
                    }}
                  >
                    <td className="py-3 font-semibold text-[#030F12]">
                      {row.contrib}
                      {row.highlight && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full" style={{ background: '#E0CD72', color: '#030F12' }}>
                          Current
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-bold" style={{ color: row.highlight ? '#E0CD72' : '#030F12' }}>{row.final}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderField({
  label,
  value,
  min,
  max,
  step = 1,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-medium" style={{ color: '#606060' }}>{label}</label>
        <span className="text-sm font-bold text-[#030F12]">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        style={{ accentColor: '#E0CD72' }}
      />
      <div className="flex justify-between text-xs" style={{ color: '#B0B0B0' }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
