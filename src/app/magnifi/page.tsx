export default function MagnifiDashboard() {
  const asOfDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const quickActions = [
    'How am I doing?',
    'Show my top holdings',
    'What should I rebalance?',
    'Explain my risk',
    'Find opportunities',
  ];

  const watchlist = [
    { ticker: 'AAPL', price: '$187.42', change: '+1.2%', positive: true },
    { ticker: 'TSLA', price: '$172.15', change: '-0.8%', positive: false },
    { ticker: 'NVDA', price: '$891.33', change: '+3.4%', positive: true },
    { ticker: 'MSFT', price: '$415.22', change: '+0.3%', positive: true },
  ];

  const marketSnapshot = [
    { label: 'S&P 500', value: '5,247', change: '+0.41%', positive: true },
    { label: 'NASDAQ', value: '16,428', change: '+0.67%', positive: true },
    { label: 'DOW', value: '39,124', change: '+0.22%', positive: true },
    { label: 'VIX', value: '14.2', change: '-2.1%', positive: false },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Hero */}
      <div
        className="rounded-2xl p-8"
        style={{ background: '#030F12' }}
      >
        <p className="text-sm font-medium mb-1" style={{ color: '#606060' }}>
          Total Portfolio Value &mdash; As of {asOfDate}
        </p>
        <p
          className="text-5xl font-bold tracking-tight mb-2"
          style={{ color: '#E0CD72' }}
        >
          $241,856.42
        </p>
        <p className="text-lg font-semibold" style={{ color: '#16B548' }}>
          +$1,247.33 &nbsp;<span className="text-base">(+0.52%)</span>{' '}
          <span className="text-sm font-normal" style={{ color: '#606060' }}>
            today
          </span>
        </p>
      </div>

      {/* AI Quick-Action Chips */}
      <div className="overflow-x-auto pb-1">
        <div className="flex gap-3" style={{ minWidth: 'max-content' }}>
          {quickActions.map((action) => (
            <button
              key={action}
              className="px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap cursor-pointer transition-colors hover:bg-[#E0CD72] hover:text-[#030F12]"
              style={{
                border: '1.5px solid #E0CD72',
                color: '#E0CD72',
                background: 'transparent',
              }}
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Watchlist */}
        <div className="card-magnifi">
          <h2 className="text-base font-semibold mb-4 text-[#030F12]">Watchlist</h2>
          <div className="space-y-3">
            {watchlist.map((item) => (
              <div
                key={item.ticker}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
                style={{ borderColor: '#F0F0F0' }}
              >
                <span className="font-bold text-sm text-[#030F12]">{item.ticker}</span>
                <span className="text-sm text-gray-700">{item.price}</span>
                <span
                  className="text-sm font-semibold"
                  style={{ color: item.positive ? '#16B548' : '#F5441D' }}
                >
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Market Snapshot */}
        <div className="card-magnifi">
          <h2 className="text-base font-semibold mb-4 text-[#030F12]">Daily Market Snapshot</h2>
          <div className="grid grid-cols-2 gap-4">
            {marketSnapshot.map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-3"
                style={{ background: '#F8F9FA' }}
              >
                <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>
                  {item.label}
                </p>
                <p className="text-lg font-bold text-[#030F12]">{item.value}</p>
                <p
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: item.positive ? '#16B548' : '#F5441D' }}
                >
                  {item.change}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account Link CTA */}
      <div className="card-magnifi flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-base font-semibold text-[#030F12] mb-1">
            Connect your brokerage
          </h2>
          <p className="text-sm" style={{ color: '#606060' }}>
            Link your accounts to get a complete picture of your portfolio and personalized AI insights.
          </p>
        </div>
        <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 whitespace-nowrap hover:bg-[#E7C751] transition-colors">
          Link Account
        </button>
      </div>
    </div>
  );
}
