'use client';

import { useState, useEffect } from 'react';
import { DashboardCard } from "@/components/DashboardCard";

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface BudgetRow {
  icon: string;
  name: string;
  budget: number;
  actual: number;
}

const incomeRows: BudgetRow[] = [
  { icon: '💼', name: 'Paychecks', budget: 8420, actual: 2089 },
  { icon: '💵', name: 'Interest', budget: 0, actual: -20 },
  { icon: '📦', name: 'Other Income', budget: 0, actual: 2089 },
];

const fixedRows: BudgetRow[] = [
  { icon: '🏠', name: 'Mortgage', budget: 1380, actual: 1380 },
  { icon: '🔧', name: 'Home Improvement', budget: 0, actual: 0 },
  { icon: '🍽️', name: 'Restaurants & Bars', budget: 50, actual: 702 },
  { icon: '🛒', name: 'Shopping', budget: 511, actual: 555 },
];

function fmt(n: number) {
  if (n === 0) return '—';
  const abs = Math.abs(n);
  const str = abs.toLocaleString('en-US', { minimumFractionDigits: 0 });
  return (n < 0 ? '-' : '') + '$' + str;
}

function remaining(row: BudgetRow) {
  return row.budget - row.actual;
}

function ProgressBar({ row }: { row: BudgetRow }) {
  const over = row.budget > 0 && row.actual > row.budget;
  const pct = row.budget > 0 ? Math.min((row.actual / row.budget) * 100, 100) : 0;
  return (
    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-1">
      <div
        className={`h-full rounded-full ${over ? 'bg-red-400' : 'bg-green-400'}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function BudgetRowItem({ row }: { row: BudgetRow }) {
  const rem = remaining(row);
  const over = rem < 0;
  return (
    <div className="py-2 border-b border-gray-50 last:border-0">
      <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 items-center text-sm">
        <div className="flex items-center gap-2">
          <span>{row.icon}</span>
          <span className="font-medium">{row.name}</span>
        </div>
        <div className="text-right text-secondary">{row.budget === 0 ? '—' : '$' + row.budget.toLocaleString()}</div>
        <div className="text-right">{fmt(row.actual)}</div>
        <div className={`text-right font-semibold ${over ? 'text-red-500' : 'text-chart-teal'}`}>
          {row.budget === 0 ? '—' : fmt(rem)}
        </div>
      </div>
      <ProgressBar row={row} />
    </div>
  );
}

interface SectionProps {
  title: string;
  rows: BudgetRow[];
  defaultOpen?: boolean;
}

function Section({ title, rows, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const totalActual = rows.reduce((s, r) => s + r.actual, 0);
  const totalBudget = rows.reduce((s, r) => s + r.budget, 0);
  const totalRem = totalBudget - totalActual;

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-2 font-bold text-sm uppercase tracking-wider text-secondary hover:text-foreground transition-colors"
      >
        <div className="flex items-center gap-2">
          <span>{open ? '▾' : '▸'}</span>
          <span>{title}</span>
        </div>
        <div className="grid grid-cols-[100px_100px_100px] gap-2 text-right">
          <span>{totalBudget === 0 ? '—' : '$' + totalBudget.toLocaleString()}</span>
          <span>{fmt(totalActual)}</span>
          <span className={totalRem < 0 ? 'text-red-500' : 'text-chart-teal'}>{totalBudget === 0 ? '—' : fmt(totalRem)}</span>
        </div>
      </button>
      {open && (
        <div className="pl-2">
          {rows.map((row) => <BudgetRowItem key={row.name} row={row} />)}
          <button className="text-accent text-xs font-semibold mt-1 hover:underline">Show 1 uncategorized</button>
        </div>
      )}
    </div>
  );
}

export default function BudgetPage() {
  const [monthIndex, setMonthIndex] = useState(3); // April = index 3
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!showModal) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [showModal]);

  const totalIncomeActual = incomeRows.reduce((s, r) => s + r.actual, 0);
  const totalIncomeBudget = incomeRows.reduce((s, r) => s + r.budget, 0);
  const totalIncomeRem = totalIncomeBudget - totalIncomeActual;

  return (
    <div className="space-y-6">
      <h1 className="sr-only">Budget</h1>
      {/* Month Navigator + Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            aria-label="Previous month"
            disabled={monthIndex === 0}
            onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <span className="font-bold text-lg">{MONTHS[monthIndex]} 2026</span>
          <button
            aria-label="Next month"
            disabled={monthIndex === 11}
            onClick={() => setMonthIndex((i) => Math.min(11, i + 1))}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 font-bold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-secondary">Month progress:</span>
            <div className="w-32 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div className="bg-accent h-full w-1/2" />
            </div>
            <span className="text-sm text-secondary">50%</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-accent text-white px-3 py-1.5 rounded-md text-sm font-bold hover:bg-accent/90 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* Left main area */}
        <div>
          {/* Column headers */}
          <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 text-right text-xs font-bold text-secondary uppercase tracking-wider mb-2 pr-0">
            <div className="text-left pl-6">Category</div>
            <div>Budget</div>
            <div>Actual</div>
            <div>Remaining</div>
          </div>

          <div className="card-monarch">
            {/* Income section */}
            <Section title="Income" rows={incomeRows} defaultOpen={true} />

            {/* Income total */}
            <div className="grid grid-cols-[1fr_100px_100px_100px] gap-2 items-center text-sm font-bold border-t border-gray-200 pt-2 mb-6">
              <div className="text-secondary uppercase tracking-wider text-xs">Total Income</div>
              <div className="text-right">${totalIncomeBudget.toLocaleString()}</div>
              <div className="text-right">{fmt(totalIncomeActual)}</div>
              <div className={`text-right ${totalIncomeRem < 0 ? 'text-red-500' : 'text-chart-teal'}`}>{fmt(totalIncomeRem)}</div>
            </div>

            {/* Fixed expenses */}
            <Section title="Fixed" rows={fixedRows} defaultOpen={true} />

            {/* Flexible (collapsed) */}
            <Section title="Flexible" rows={[]} defaultOpen={false} />

            {/* Non Monthly (collapsed) */}
            <Section title="Non Monthly" rows={[]} defaultOpen={false} />
          </div>
        </div>

        {/* Right sticky sidebar */}
        <div className="sticky top-6 space-y-4 h-fit">
          <DashboardCard title="Budget Summary">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold">$5,390</div>
              <div className="text-secondary text-sm">Left to budget</div>
            </div>
            {/* Tabs */}
            <div role="tablist" aria-label="Budget view" className="flex border-b border-gray-200 mb-4">
              {['Income', 'Expenses', 'Remaining'].map((tab) => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={tab === 'Expenses'}
                  className={`flex-1 text-xs font-semibold py-2 transition-colors ${
                    tab === 'Expenses'
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-secondary font-medium">Fixed</span>
                <div className="text-right">
                  <div className="font-semibold">$2,471 spent</div>
                  <div className="text-chart-teal text-xs">$641 remaining</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-secondary font-medium">Non Monthly</span>
                <div className="text-right">
                  <div className="font-semibold">$1,368 spent</div>
                  <div className="text-chart-teal text-xs">$2,068 remaining</div>
                </div>
              </div>
            </div>
          </DashboardCard>

          <button
            onClick={() => setShowModal(true)}
            className="w-full bg-accent text-white py-2 rounded-lg font-bold text-sm hover:bg-accent/90 transition-colors"
          >
            + Create a budget
          </button>
        </div>
      </div>

      {/* Create Budget Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="budget-modal-title" className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 id="budget-modal-title" className="text-xl font-bold mb-2">Create a budget</h2>
            <p className="text-secondary text-sm mb-6">
              Set up your monthly budget to track spending and reach your financial goals. We&apos;ll use your transaction history to suggest budget amounts.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors"
            >
              Create my budget
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-3 text-secondary text-sm hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
