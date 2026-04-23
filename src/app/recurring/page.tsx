import { DashboardCard } from "@/components/DashboardCard";

const monthlySubscriptions = [
  { icon: '🎬', name: 'Netflix', amount: 17.99, nextDate: 'May 1', category: 'Entertainment' },
  { icon: '🎵', name: 'Spotify', amount: 9.99, nextDate: 'May 3', category: 'Entertainment' },
  { icon: '📦', name: 'Amazon Prime', amount: 14.99, nextDate: 'May 5', category: 'Shopping' },
  { icon: '☁️', name: 'iCloud', amount: 2.99, nextDate: 'May 10', category: 'Technology' },
  { icon: '🏋️', name: 'Gym Membership', amount: 45.00, nextDate: 'May 15', category: 'Health' },
];

const annualSubscriptions = [
  { icon: '🎨', name: 'Adobe Creative Cloud', amount: 54.99, annualAmount: 659.88, nextDate: 'June 1', category: 'Software' },
];

const monthlyTotal = monthlySubscriptions.reduce((s, r) => s + r.amount, 0);
const annualTotal = monthlyTotal * 12 + annualSubscriptions.reduce((s, r) => s + (r.annualAmount ?? 0), 0);
const totalMonthlyEquivalent = monthlyTotal + annualSubscriptions.reduce((s, r) => s + (r.annualAmount ?? 0) / 12, 0);

const categoryColors: Record<string, string> = {
  Entertainment: 'bg-purple-100 text-purple-700',
  Shopping: 'bg-blue-100 text-blue-700',
  Technology: 'bg-gray-100 text-gray-700',
  Health: 'bg-green-100 text-green-700',
  Software: 'bg-orange-100 text-orange-700',
};

interface Subscription {
  icon: string;
  name: string;
  amount: number;
  annualAmount?: number;
  nextDate: string;
  category: string;
}

function SubscriptionRow({ sub }: { sub: Subscription }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-3">
        <span className="text-xl">{sub.icon}</span>
        <div>
          <div className="font-semibold text-sm">{sub.name}</div>
          <div className="text-xs text-secondary">
            Next: {sub.nextDate}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <div className="font-bold text-sm">${sub.amount.toFixed(2)}/mo</div>
          {sub.annualAmount && (
            <div className="text-xs text-secondary">(${sub.annualAmount.toFixed(2)}/yr)</div>
          )}
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${categoryColors[sub.category] ?? 'bg-gray-100 text-gray-700'}`}>
          {sub.category}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-bold">
          Active
        </span>
      </div>
    </div>
  );
}

export default function RecurringPage() {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Recurring</h1>
        <div role="tablist" aria-label="Frequency" className="flex rounded-lg border border-gray-200 overflow-hidden bg-white text-sm font-semibold">
          <button role="tab" aria-selected={true} className="px-4 py-2 bg-primary text-white">Monthly</button>
          <button role="tab" aria-selected={false} aria-disabled="true" className="px-4 py-2 text-secondary hover:bg-gray-50 transition-colors">Weekly</button>
          <button role="tab" aria-selected={false} aria-disabled="true" className="px-4 py-2 text-secondary hover:bg-gray-50 transition-colors">Annual</button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Monthly Total">
          <div className="text-2xl font-bold text-chart-teal">${monthlyTotal.toFixed(2)}</div>
          <div className="text-secondary text-sm mt-1">per month</div>
        </DashboardCard>
        <DashboardCard title="Annual Total">
          <div className="text-2xl font-bold">${annualTotal.toFixed(2)}</div>
          <div className="text-secondary text-sm mt-1">per year</div>
        </DashboardCard>
      </div>

      {/* Subscription list */}
      <div className="card-monarch">
        {/* Monthly group */}
        <div className="mb-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-secondary">Monthly</h2>
            <span className="text-xs text-secondary">{monthlySubscriptions.length} subscriptions</span>
          </div>
          {monthlySubscriptions.map((sub) => (
            <SubscriptionRow key={sub.name} sub={sub} />
          ))}
        </div>

        {/* Annual group */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-secondary">Annual</h2>
            <span className="text-xs text-secondary">{annualSubscriptions.length} subscription</span>
          </div>
          {annualSubscriptions.map((sub) => (
            <SubscriptionRow key={sub.name} sub={sub} />
          ))}
        </div>
      </div>

      {/* Footer total */}
      <div className="flex justify-between items-center px-2 text-sm">
        <span className="text-secondary font-medium">Total ({monthlySubscriptions.length + annualSubscriptions.length} items)</span>
        <span className="font-bold">${totalMonthlyEquivalent.toFixed(2)}/mo</span>
      </div>
    </div>
  );
}
