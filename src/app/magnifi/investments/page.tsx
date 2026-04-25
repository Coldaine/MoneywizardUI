const holdings = [
  { security: 'AAPL', price: '$187.42', qty: '45.2', value: '$8,471.38', weight: '3.50%', dayChange: '+1.2%', positive: true },
  { security: 'NVDA', price: '$891.33', qty: '8.5',  value: '$7,576.31', weight: '3.13%', dayChange: '+3.4%', positive: true },
  { security: 'MSFT', price: '$415.22', qty: '18.0', value: '$7,473.96', weight: '3.09%', dayChange: '+0.3%', positive: true },
  { security: 'TSLA', price: '$172.15', qty: '30.0', value: '$5,164.50', weight: '2.13%', dayChange: '-0.8%', positive: false },
  { security: 'VTI',  price: '$241.87', qty: '50.0', value: '$12,093.50', weight: '5.00%', dayChange: '+0.5%', positive: true },
  { security: 'BND',  price: '$73.42',  qty: '100.0', value: '$7,342.00', weight: '3.04%', dayChange: '-0.1%', positive: false },
  { security: 'GBTC', price: '$51.36',  qty: '20.0', value: '$1,027.20', weight: '0.42%', dayChange: '-2.3%', positive: false },
];

const topPositions = [
  { name: 'VTI',  weight: 5.00 },
  { name: 'AAPL', weight: 3.50 },
  { name: 'NVDA', weight: 3.13 },
  { name: 'MSFT', weight: 3.09 },
  { name: 'BND',  weight: 3.04 },
];

const accounts = [
  { name: 'Fidelity',  status: 'Synced', ok: true },
  { name: 'Robinhood', status: 'Synced', ok: true },
  { name: 'Coinbase',  status: 'Needs re-auth', ok: false },
];

const BAR_MAX = 5.5;

export default function InvestmentsPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="card-magnifi">
          <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>Total Portfolio Value</p>
          <p className="text-3xl font-bold text-[#030F12]">$241,856.42</p>
        </div>
        <div className="card-magnifi">
          <p className="text-xs font-medium mb-1" style={{ color: '#606060' }}>Buying Power</p>
          <p className="text-3xl font-bold text-[#030F12]">$3,240.00</p>
        </div>
      </div>

      {/* Account badges */}
      <div className="card-magnifi">
        <h2 className="text-sm font-semibold mb-3 text-[#030F12]">Linked Accounts</h2>
        <div className="flex flex-wrap gap-3">
          {accounts.map((acc) => (
            <span
              key={acc.name}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
              style={{
                background: acc.ok ? 'rgba(22,181,72,0.1)' : 'rgba(251,146,60,0.12)',
                color: acc.ok ? '#16B548' : '#ea580c',
                border: `1px solid ${acc.ok ? '#16B548' : '#ea580c'}`,
              }}
            >
              <span
                className="text-base leading-none"
                aria-label={acc.ok ? 'check' : 'warning'}
              >
                {acc.ok ? '✓' : '⚠'}
              </span>
              {acc.name} &mdash; {acc.status}
            </span>
          ))}
        </div>
      </div>

      {/* Holdings table */}
      <div className="card-magnifi overflow-x-auto">
        <h2 className="text-base font-semibold mb-4 text-[#030F12]">Holdings</h2>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
              {['Security', 'Price', 'Qty', 'Value', 'Weight', 'Day Change'].map((col) => (
                <th
                  key={col}
                  className="pb-2 text-left font-semibold"
                  style={{ color: '#606060' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr
                key={h.security}
                className="hover:bg-gray-50 transition-colors"
                style={{ borderBottom: '1px solid #F8F8F8' }}
              >
                <td className="py-3 font-bold text-[#030F12]">{h.security}</td>
                <td className="py-3 text-gray-700">{h.price}</td>
                <td className="py-3 text-gray-700">{h.qty}</td>
                <td className="py-3 font-medium text-[#030F12]">{h.value}</td>
                <td className="py-3 text-gray-600">{h.weight}</td>
                <td
                  className="py-3 font-semibold"
                  style={{ color: h.positive ? '#16B548' : '#F5441D' }}
                >
                  {h.dayChange}
                </td>
              </tr>
            ))}
            {/* Total row */}
            <tr style={{ borderTop: '2px solid #E0CD72', background: '#FEFDF5' }}>
              <td className="py-3 font-bold text-[#030F12]" colSpan={3}>
                All Holdings
              </td>
              <td className="py-3 font-bold text-[#030F12]">$49,148.85</td>
              <td className="py-3 font-bold text-[#030F12]">20.31%</td>
              <td className="py-3 font-semibold" style={{ color: '#16B548' }}>+0.8% avg</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Top positions bar chart */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold mb-4 text-[#030F12]">Top Positions by Weight</h2>
        <svg width="100%" viewBox="0 0 480 160" preserveAspectRatio="xMinYMid meet">
          {topPositions.map((pos, i) => {
            const barW = (pos.weight / BAR_MAX) * 360;
            const y = i * 28 + 10;
            return (
              <g key={pos.name}>
                <text x={0} y={y + 13} fontSize={12} fill="#030F12" fontWeight="600">
                  {pos.name}
                </text>
                <rect x={48} y={y} width={barW} height={18} rx={4} fill="#E0CD72" />
                <text x={48 + barW + 6} y={y + 13} fontSize={11} fill="#606060">
                  {pos.weight}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
