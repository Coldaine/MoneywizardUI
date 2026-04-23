'use client';

import { useState } from "react";
import { DashboardCard } from "@/components/DashboardCard";

type Tab = "save-up" | "pay-down";

const strategies = [
  {
    id: "planned",
    label: "Planned payments",
    description: "You pay only the scheduled minimum or planned amounts each month.",
  },
  {
    id: "avalanche",
    label: "Avalanche",
    description: "You target the highest-interest debt first to minimize total interest paid.",
  },
  {
    id: "snowball",
    label: "Snowball",
    description: "You pay off the smallest balances first to build momentum.",
  },
];

// Circular SVG progress ring helper
function ProgressRing({
  radius,
  pct,
  color,
}: {
  radius: number;
  pct: number;
  color: string;
}) {
  const stroke = 6;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset = circumference - (pct / 100) * circumference;
  const size = radius * 2;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        stroke="#E5E7EB"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={color}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
}

const mockGoals = [
  { name: "Emergency Fund", target: "$10,000", current: "$6,200", pct: 62, monthly: "$400/mo", color: "#0797B9" },
  { name: "Vacation 2026", target: "$3,000", current: "$900", pct: 30, monthly: "$150/mo", color: "#FF692D" },
];

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("save-up");
  const [strategy, setStrategy] = useState("planned");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Goals</h1>
      {/* Tab bar */}
      <div role="tablist" className="flex gap-6 border-b border-gray-200 text-sm font-semibold">
        <button
          className={`pb-2 border-b-2 transition-colors ${activeTab === "save-up" ? "border-primary text-primary" : "border-transparent text-secondary hover:text-foreground"}`}
          onClick={() => setActiveTab("save-up")}
        >
          Save up
        </button>
        <button
          className={`pb-2 border-b-2 transition-colors ${activeTab === "pay-down" ? "border-primary text-primary" : "border-transparent text-secondary hover:text-foreground"}`}
          onClick={() => setActiveTab("pay-down")}
        >
          Pay down
        </button>
      </div>

      {activeTab === "pay-down" && (
        <div className="flex gap-6">
          {/* Left main area */}
          <div className="flex-1 space-y-6">
            {/* Summary cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="card-monarch text-center py-5">
                <p className="text-[10px] text-secondary uppercase tracking-wider mb-1">Current Debt Principal</p>
                <p className="text-xl font-bold">$0</p>
              </div>
              <div className="card-monarch text-center py-5">
                <p className="text-[10px] text-secondary uppercase tracking-wider mb-1">Projected Interest</p>
                <p className="text-xl font-bold">$0</p>
              </div>
              <div className="card-monarch text-center py-5">
                <p className="text-[10px] text-secondary uppercase tracking-wider mb-1">Total Principal &amp; Interest</p>
                <p className="text-xl font-bold">$0</p>
              </div>
              <div className="card-monarch text-center py-5">
                <p className="text-[10px] text-secondary uppercase tracking-wider mb-1">Debt Free Date</p>
                <p className="text-xl font-bold text-secondary">&mdash;</p>
              </div>
            </div>

            {/* Overview section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold">Overview</h2>
                <div className="flex items-center gap-3">
                  <div className="flex bg-gray-100 rounded-lg p-1 text-xs font-semibold">
                    <button className="bg-white shadow px-3 py-1 rounded-md">Timeline</button>
                    <button className="px-3 py-1 text-secondary hover:text-foreground">Principal &amp; Interest</button>
                  </div>
                  <button className="border border-gray-200 bg-white px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-50">Export</button>
                </div>
              </div>

              {/* Not enough data empty state */}
              <div className="card-monarch flex items-center justify-center py-16">
                <span className="bg-gray-100 text-secondary px-4 py-2 rounded-full text-sm font-semibold">
                  Not enough data
                </span>
              </div>
            </div>

            {/* Credit Card section */}
            <div>
              <h2 className="font-bold mb-3">Credit Card</h2>
              <div className="card-monarch p-0 overflow-hidden">
                <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-chart-teal rounded-full flex items-center justify-center text-white text-sm">
                      🏦
                    </div>
                    <div>
                      <div className="font-semibold text-sm">SoFi Credit Card (...2503)</div>
                      <div className="text-xs text-secondary">3 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold">$6,706.59</span>
                    <button className="text-secondary hover:text-foreground text-lg leading-none">&#8943;</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel — Savings Calculator */}
          <div className="w-72 flex-shrink-0">
            <DashboardCard title="Savings Calculator">
              <div className="space-y-4">
                {strategies.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-start gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="strategy"
                      value={s.id}
                      checked={strategy === s.id}
                      onChange={() => setStrategy(s.id)}
                      className="sr-only"
                    />
                    <span className="mt-0.5 flex-shrink-0">
                      <span
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center inline-flex ${
                          strategy === s.id ? "border-primary" : "border-gray-300"
                        }`}
                      >
                        {strategy === s.id && (
                          <span className="w-2 h-2 rounded-full bg-primary block"></span>
                        )}
                      </span>
                    </span>
                    <div>
                      <p className={`text-sm font-semibold ${strategy === s.id ? "text-foreground" : "text-secondary"}`}>
                        {s.label}
                      </p>
                      <p className="text-xs text-secondary leading-relaxed">{s.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>
      )}

      {activeTab === "save-up" && (
        <div className="space-y-6">
          {mockGoals.length === 0 ? (
            <div className="card-monarch flex flex-col items-center justify-center py-20 gap-4">
              <p className="text-secondary font-semibold">No savings goals yet</p>
              <button className="bg-primary text-white px-5 py-2 rounded-md font-bold hover:bg-primary/90 transition-colors text-sm">
                Create a goal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {mockGoals.map((goal) => (
                <div key={goal.name} className="card-monarch flex items-center gap-5">
                  <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
                    <ProgressRing radius={32} pct={goal.pct} color={goal.color} />
                    <span className="absolute text-xs font-bold">{goal.pct}%</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">{goal.name}</p>
                    <p className="text-sm text-secondary">{goal.current} of {goal.target}</p>
                    <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${goal.pct}%`, backgroundColor: goal.color }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-secondary">{goal.monthly}</p>
                    <p className="text-xs text-secondary mt-1">contribution</p>
                  </div>
                </div>
              ))}
              <button className="bg-primary text-white px-5 py-2 rounded-md font-bold hover:bg-primary/90 transition-colors text-sm">
                Create a goal
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
