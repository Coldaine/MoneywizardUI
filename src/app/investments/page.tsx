'use client';

import { useState } from 'react';
import { DashboardCard } from "@/components/DashboardCard";

// Donut chart data
const allocationData = [
  { label: 'Equity', percent: 96.9, value: '$232,194', color: '#0797B9' },
  { label: 'Alternatives', percent: 2.5, value: '$5,703', color: '#FF692D' },
  { label: 'Cash & Equivalents', percent: 1.7, value: '$2,369', color: '#9CA3AF' },
];

// Donut chart SVG — outer ring only, computed from percentages
function DonutChart() {
  const cx = 90;
  const cy = 90;
  const r = 70;
  const strokeWidth = 18;
  const circumference = 2 * Math.PI * r;

  // Normalize percentages so they always sum to exactly 100
  const totalPct = allocationData.reduce((s, d) => s + d.percent, 0);

  const segments = allocationData.map((d, index) => {
    const normalizedPct = (d.percent / totalPct) * 100;
    const dash = (normalizedPct / 100) * circumference;
    const gap = circumference - dash;
    const offset = allocationData.slice(0, index).reduce((sum, prev) => {
      const prevPct = (prev.percent / totalPct) * 100;
      return sum + ((prevPct / 100) * circumference);
    }, 0);
    return { ...d, dash, gap, offset };
  });

  // Rotate so first segment starts at top (-90deg = -circumference/4 offset in stroke-dashoffset terms)
  const startOffset = circumference * 0.25;

  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      {/* Background ring */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#F3F4F6"
        strokeWidth={strokeWidth}
      />
      {segments.map((seg, i) => (
        <circle
          key={i}
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${seg.dash} ${seg.gap}`}
          strokeDashoffset={startOffset - seg.offset}
          strokeLinecap="butt"
          style={{ transform: 'rotate(-90deg)', transformOrigin: `${cx}px ${cy}px` }}
        />
      ))}
      {/* Center text */}
      <text x={cx} y={cy - 8} textAnchor="middle" className="text-xs" fill="#22201D" fontSize="13" fontWeight="700">
        $231,486.65
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#777573" fontSize="10">
        Total value
      </text>
    </svg>
  );
}

// Holdings data
const holdings = [
  {
    group: 'Alternatives',
    items: [
      { ticker: 'GBTC', name: 'Grayscale Bitcoin Trust', price: '$51.36', qty: '13,367', value: '$5,125.81', weight: '2.21%', perf: '-12.13%', pos: false },
      { ticker: 'BTC', name: 'GRAYSCALE BITCOIN MINI TR ETF', price: '$34.37', qty: '16.7073', value: '$574.23', weight: '0.25%', perf: '-13.58%', pos: false },
    ],
    total: '$5,699.04',
  },
  {
    group: 'Equity',
    items: [
      { ticker: 'AMLP', name: 'ALPS Alerian MLP ETF', price: '$51.51', qty: '14.938', value: '$769.17', weight: '0.33%', perf: '+5.40%', pos: true },
      { ticker: 'REMX', name: 'VanEck Rare Earth/Strategic Metals ETF', price: '$100.37', qty: '3.5840', value: '$360.50', weight: '0.24%', perf: '+1.94%', pos: true },
      { ticker: 'ELF', name: 'e.l.f. Beauty Inc', price: '$65.58', qty: '5.9055', value: '$387.21', weight: '0.17%', perf: '-90.50%', pos: false },
      { ticker: 'XYZ', name: 'Block Inc', price: '$70.99', qty: '0.9085', value: '$64.50', weight: '0.03%', perf: '+8.23%', pos: true },
    ],
    total: '$1,581.38',
  },
];

export default function InvestmentsPage() {
  const [mainTab, setMainTab] = useState<'Holdings' | 'Advanced'>('Holdings');
  const [subTab, setSubTab] = useState<'Market' | 'Allocation'>('Allocation');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({ Alternatives: true, Equity: true });

  function toggleGroup(group: string) {
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }

  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Investments</h1>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-md text-secondary font-medium hover:bg-gray-50 transition-colors">
            Accounts ▾
          </button>
          <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-md font-medium hover:opacity-90 transition-opacity">
            Add Position
          </button>
        </div>
      </div>

      {/* Main tabs: Holdings | Advanced */}
      <div role="tablist" aria-label="Investment view" className="border-b border-gray-200 flex gap-6">
        {(['Holdings', 'Advanced'] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={mainTab === tab}
            onClick={() => setMainTab(tab)}
            className={`pb-2 text-sm font-semibold transition-colors ${
              mainTab === tab
                ? 'border-b-2 border-primary text-primary'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {mainTab === 'Holdings' && (
        <div className="space-y-4">
          {/* Sub-tabs: Market | Allocation + dropdowns */}
          <div className="flex items-center justify-between">
            <div role="tablist" aria-label="Holdings view" className="flex gap-4">
              {(['Market', 'Allocation'] as const).map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={subTab === tab}
                  onClick={() => setSubTab(tab)}
                  className={`pb-1 text-sm font-medium transition-colors ${
                    subTab === tab
                      ? 'border-b-2 border-primary text-primary'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 text-xs bg-white border border-gray-200 rounded text-secondary hover:bg-gray-50">
                By asset class ▾
              </button>
              <button className="px-3 py-1 text-xs bg-white border border-gray-200 rounded text-secondary hover:bg-gray-50">
                3 Months ▾
              </button>
            </div>
          </div>

          {subTab === 'Allocation' && (
            <DashboardCard title="Allocation">
              {/* Donut + legend */}
              <div className="flex items-center gap-8">
                <DonutChart />
                <div className="flex-1">
                  {/* Legend table */}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-secondary">
                        <th className="text-left pb-2 font-medium">Asset Class</th>
                        <th className="text-right pb-2 font-medium">Percent</th>
                        <th className="text-right pb-2 font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {allocationData.map((d) => (
                        <tr key={d.label}>
                          <td className="py-2 flex items-center gap-2">
                            <span
                              className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: d.color }}
                            />
                            <span className="text-sm">{d.label}</span>
                          </td>
                          <td className="py-2 text-right text-sm">{d.percent}%</td>
                          <td className="py-2 text-right text-sm">{d.value}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-gray-200">
                        <td className="pt-2 text-sm font-bold">Total</td>
                        <td />
                        <td className="pt-2 text-right text-sm font-bold">$231,486.65</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </DashboardCard>
          )}

          {/* Holdings table */}
          <div className="card-monarch p-0 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 px-4 py-2 bg-gray-50 border-b border-gray-100 text-xs text-secondary font-medium">
              <span>Security</span>
              <span className="text-right">Price</span>
              <span className="text-right">Quantity</span>
              <span className="text-right">Value</span>
              <span className="text-right">Weight</span>
              <span className="text-right">Past 3 Months</span>
            </div>

            {holdings.map((group) => (
              <div key={group.group}>
                {/* Group row */}
                <button
                  onClick={() => toggleGroup(group.group)}
                  className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 text-left"
                >
                  <span className="flex items-center gap-2 font-semibold text-sm">
                    <span className={`transition-transform text-xs ${expandedGroups[group.group] ? 'rotate-90' : ''}`}>▶</span>
                    {group.group}
                  </span>
                  <span />
                  <span />
                  <span className="text-right text-sm font-semibold">{group.total}</span>
                  <span />
                  <span />
                </button>

                {/* Group items */}
                {expandedGroups[group.group] && group.items.map((item) => (
                  <div
                    key={`${group.group}-${item.ticker}`}
                    className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-2 px-4 py-3 hover:bg-gray-50 border-b border-gray-100"
                  >
                    <div className="pl-5">
                      <div className="text-sm font-semibold">{item.ticker}</div>
                      <div className="text-xs text-secondary">{item.name}</div>
                    </div>
                    <span className="text-right text-sm self-center">{item.price}</span>
                    <span className="text-right text-sm self-center">{item.qty}</span>
                    <span className="text-right text-sm self-center font-medium">{item.value}</span>
                    <span className="text-right text-sm self-center text-secondary">{item.weight}</span>
                    <div className="flex justify-end items-center">
                      <span
                        className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                          item.pos
                            ? 'bg-green-50 text-green-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {item.perf}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {mainTab === 'Advanced' && (
        <div className="card-monarch flex items-center justify-center h-40 text-secondary text-sm">
          Advanced analytics coming soon
        </div>
      )}
    </div>
  );
}
