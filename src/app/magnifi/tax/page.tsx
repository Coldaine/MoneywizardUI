const opportunities = [
  {
    ticker: 'ELF',
    name: 'ELF Beauty',
    currentValue: '$3,150.00',
    costBasis: '$5,000.00',
    unrealizedLoss: '-$1,850.00',
    taxSaving: '$407',
  },
  {
    ticker: 'GBTC',
    name: 'Grayscale Bitcoin Trust',
    currentValue: '$1,447.20',
    costBasis: '$2,027.20',
    unrealizedLoss: '-$580.00',
    taxSaving: '$128',
  },
  {
    ticker: 'EEM',
    name: 'Emerging Markets ETF',
    currentValue: '$4,188.00',
    costBasis: '$4,500.00',
    unrealizedLoss: '-$312.00',
    taxSaving: '$69',
  },
];

const docStatus = [
  { name: '1099-B',   status: 'Available',              available: true,  note: '' },
  { name: '1099-DIV', status: 'Available',              available: true,  note: '' },
  { name: '1099-INT', status: 'Pending',                available: false, note: 'Expected May 2026' },
];

export default function TaxPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Tax Center</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Optimize your tax strategy and stay compliant.</p>
      </div>

      {/* Estimated Tax Liability — prominent card */}
      <div
        className="rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{ background: '#030F12' }}
      >
        <div>
          <p className="text-sm font-medium mb-4" style={{ color: '#606060' }}>Estimated Tax Liability — 2025</p>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-xs mb-1" style={{ color: '#606060' }}>Federal</p>
              <p className="text-3xl font-bold" style={{ color: '#E0CD72' }}>$4,820</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: '#606060' }}>State</p>
              <p className="text-3xl font-bold text-white">$1,240</p>
            </div>
            <div>
              <p className="text-xs mb-1" style={{ color: '#606060' }}>Effective Rate</p>
              <p className="text-3xl font-bold text-white">22%</p>
            </div>
          </div>
        </div>
        <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-6 py-2.5 text-sm hover:bg-[#E7C751] transition-colors whitespace-nowrap self-start md:self-center">
          Review with advisor
        </button>
      </div>

      {/* Tax-Loss Harvesting */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-semibold text-[#030F12]">Tax-Loss Harvesting Opportunities</h2>
          <span
            className="rounded-full px-3 py-1 text-sm font-semibold"
            style={{ background: 'rgba(22,181,72,0.12)', color: '#16B548' }}
          >
            Potential savings: $847
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.ticker} className="card-magnifi flex flex-col gap-3">
              <div>
                <p className="text-lg font-bold text-[#030F12]">{opp.ticker}</p>
                <p className="text-xs" style={{ color: '#606060' }}>{opp.name}</p>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: '#606060' }}>Current Value</span>
                  <span className="font-medium text-[#030F12]">{opp.currentValue}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#606060' }}>Cost Basis</span>
                  <span className="font-medium text-[#030F12]">{opp.costBasis}</span>
                </div>
                <div className="flex justify-between" style={{ borderTop: '1px solid #F0F0F0', paddingTop: '0.5rem', marginTop: '0.25rem' }}>
                  <span style={{ color: '#606060' }}>Unrealized Loss</span>
                  <span className="font-semibold" style={{ color: '#F5441D' }}>{opp.unrealizedLoss}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#606060' }}>Est. Tax Saving</span>
                  <span className="font-semibold" style={{ color: '#16B548' }}>~${opp.taxSaving}</span>
                </div>
              </div>
              <button className="mt-auto rounded-full bg-[#E0CD72] text-[#030F12] font-semibold text-sm py-2 hover:bg-[#E7C751] transition-colors">
                Harvest
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Wash-Sale Warning */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[#030F12]">Wash-Sale Warnings</h2>
        <div
          className="rounded-xl p-4"
          style={{ background: 'rgba(245,185,29,0.12)', border: '1px solid rgba(245,185,29,0.4)' }}
        >
          <p className="font-semibold text-sm" style={{ color: '#A06800' }}>
            ⚠ Wash-sale rule alert: You recently sold TSLA and repurchased within 30 days.
            The $420 loss may be disallowed.
          </p>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: '#606060' }}>
          The IRS wash-sale rule disallows a tax loss if you buy the same or substantially identical
          security within 30 days before or after the sale. The disallowed loss is added to the cost
          basis of the replacement shares, deferring — not eliminating — the tax benefit.
        </p>
      </div>

      {/* Tax Document Status */}
      <div className="card-magnifi">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h2 className="text-base font-semibold text-[#030F12]">Tax Document Status</h2>
          <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 text-sm hover:bg-[#E7C751] transition-colors">
            Download All
          </button>
        </div>
        <div className="space-y-2">
          {docStatus.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between py-3 px-1"
              style={{ borderBottom: '1px solid #F0F0F0' }}
            >
              <span className="font-semibold text-sm text-[#030F12]">{doc.name}</span>
              <div className="flex items-center gap-2">
                {doc.note && (
                  <span className="text-xs" style={{ color: '#606060' }}>{doc.note}</span>
                )}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                  style={
                    doc.available
                      ? { background: 'rgba(22,181,72,0.12)', color: '#16B548' }
                      : { background: 'rgba(96,96,96,0.1)',   color: '#606060' }
                  }
                >
                  {doc.available ? '✓ Available' : '⏳ Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
