import { DashboardCard } from "@/components/DashboardCard";

interface InsightCard {
  category: string;
  categoryColor: string;
  confidence: 'High' | 'Medium';
  icon: string;
  headline: string;
  body: string;
}

const insights: InsightCard[] = [
  {
    category: 'Spending',
    categoryColor: 'bg-red-100 text-red-700',
    confidence: 'High',
    icon: '📊',
    headline: 'Unusual restaurant spending detected',
    body: 'Your dining spending of $702 this month is 14x your budgeted amount of $50. Consider reviewing recent transactions to identify any one-time charges.',
  },
  {
    category: 'Savings',
    categoryColor: 'bg-green-100 text-green-700',
    confidence: 'High',
    icon: '💰',
    headline: 'Savings rate above target',
    body: 'Your 69% savings rate this month exceeds your 20% target. Consider maxing your IRA contribution to take full advantage of tax-advantaged growth.',
  },
  {
    category: 'Investments',
    categoryColor: 'bg-blue-100 text-blue-700',
    confidence: 'Medium',
    icon: '📈',
    headline: 'Portfolio rebalancing opportunity',
    body: 'Your equity allocation is 96.9%, above your 90% target. Consider adding bond exposure to reduce volatility and stay aligned with your risk profile.',
  },
  {
    category: 'Budget',
    categoryColor: 'bg-orange-100 text-orange-700',
    confidence: 'Medium',
    icon: '📋',
    headline: '3 budget categories over limit',
    body: 'Fixed expenses exceeded budget by $737 this month. Restaurants & Bars was the largest overage at $652 over budget.',
  },
];

const confidenceColor: Record<string, string> = {
  High: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
};

const FILTER_TABS = ['All', 'Spending', 'Savings', 'Investments', 'Budget'];

export default function AdvicePage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold">Advice</h1>
        <p className="text-secondary text-sm mt-1">Personalized insights powered by AI</p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-semibold transition-colors ${
              tab === 'All'
                ? 'text-accent border-b-2 border-accent'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 2x2 grid of insight cards */}
      <div className="grid grid-cols-2 gap-6">
        {insights.map((insight) => (
          <DashboardCard key={insight.headline} title="">
            <div className="flex flex-col h-full">
              {/* Badges */}
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${insight.categoryColor}`}>
                  {insight.category}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${confidenceColor[insight.confidence]}`}>
                  {insight.confidence}
                </span>
              </div>

              {/* Icon + headline */}
              <div className="flex items-start gap-2 mb-2">
                <span className="text-2xl">{insight.icon}</span>
                <h3 className="font-bold text-sm leading-snug">{insight.headline}</h3>
              </div>

              {/* Body */}
              <p className="text-secondary text-sm flex-grow">{insight.body}</p>

              {/* CTA */}
              <div className="mt-4">
                <button className="text-accent text-sm font-semibold hover:underline">
                  Explore →
                </button>
              </div>
            </div>
          </DashboardCard>
        ))}
      </div>
    </div>
  );
}
