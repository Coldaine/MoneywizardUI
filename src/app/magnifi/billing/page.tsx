export default function BillingPage() {
  const invoices = [
    { date: 'Apr 25, 2026', amount: '$14.99', status: 'Paid' },
    { date: 'Mar 25, 2026', amount: '$14.99', status: 'Paid' },
    { date: 'Feb 25, 2026', amount: '$14.99', status: 'Paid' },
    { date: 'Jan 25, 2026', amount: '$14.99', status: 'Paid' },
  ];

  const planFeatures = [
    { feature: 'AI Chat queries', free: '10/mo', premium: 'Unlimited', annual: 'Unlimited' },
    { feature: 'Linked accounts', free: '1', premium: 'Unlimited', annual: 'Unlimited' },
    { feature: 'Tax-loss harvesting', free: false, premium: true, annual: true },
    { feature: 'Portfolio analytics', free: 'Basic', premium: 'Advanced', annual: 'Advanced' },
    { feature: 'Price', free: '$0', premium: '$14.99/mo', annual: '$9.99/mo' },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Billing</h1>
        <p className="text-sm mt-1" style={{ color: '#606060' }}>Manage your subscription and payment details</p>
      </div>

      {/* Current plan — dark card */}
      <div className="rounded-2xl p-6" style={{ background: '#030F12' }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#E0CD72' }}>Current Plan</p>
            <h2 className="text-2xl font-bold text-white">Magnifi Premium</h2>
            <p className="text-3xl font-bold mt-1" style={{ color: '#E0CD72' }}>
              $14.99<span className="text-base font-normal text-white opacity-70">/month</span>
            </p>
            <p className="text-sm mt-1 text-white opacity-60">Billed monthly</p>
          </div>
          <div className="text-right">
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2" style={{ background: '#16B548', color: '#FFFFFF' }}>
              Active ✓
            </span>
            <p className="text-sm text-white opacity-60">Next billing date</p>
            <p className="text-sm font-semibold text-white">May 25, 2026</p>
          </div>
        </div>
        <div className="flex gap-3 mt-5 flex-wrap">
          <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 text-sm hover:bg-[#E7C751] transition-colors">
            Upgrade to Annual — Save 20%
          </button>
          <button
            className="rounded-full border text-sm font-semibold px-5 py-2 transition-colors hover:bg-red-900/20"
            style={{ borderColor: '#F5441D', color: '#F5441D' }}
          >
            Cancel Plan
          </button>
        </div>
      </div>

      {/* Plan comparison table */}
      <div className="card-magnifi overflow-x-auto">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Plan Comparison</h2>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr>
              <th className="text-left py-2 pr-4 font-semibold text-[#030F12]">Feature</th>
              <th className="text-center py-2 px-4 font-semibold text-[#030F12]">Free</th>
              <th
                className="text-center py-2 px-4 font-semibold rounded-t-lg"
                style={{ color: '#E0CD72', border: '2px solid #E0CD72', borderBottom: 'none' }}
              >
                Premium ★
              </th>
              <th className="text-center py-2 px-4 font-semibold text-[#030F12]">Annual</th>
            </tr>
          </thead>
          <tbody>
            {planFeatures.map(({ feature, free, premium, annual }, idx) => (
              <tr key={feature} style={{ background: idx % 2 === 0 ? '#F8F9FA' : '#FFFFFF' }}>
                <td className="py-3 pr-4 font-medium text-[#030F12]">{feature}</td>
                <td className="py-3 px-4 text-center" style={{ color: '#606060' }}>
                  {typeof free === 'boolean' ? (free ? '✓' : '✗') : free}
                </td>
                <td
                  className="py-3 px-4 text-center font-semibold"
                  style={{ color: '#030F12', border: '2px solid #E0CD72', borderTop: 'none', borderBottom: idx === planFeatures.length - 1 ? '2px solid #E0CD72' : 'none' }}
                >
                  {typeof premium === 'boolean' ? (
                    <span style={{ color: premium ? '#16B548' : '#F5441D' }}>{premium ? '✓' : '✗'}</span>
                  ) : premium}
                </td>
                <td className="py-3 px-4 text-center" style={{ color: '#606060' }}>
                  {typeof annual === 'boolean' ? (
                    <span style={{ color: annual ? '#16B548' : '#F5441D' }}>{annual ? '✓' : '✗'}</span>
                  ) : annual}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment method */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Payment Method</h2>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
              style={{ background: '#1A1F71' }}
            >
              VISA
            </div>
            <div>
              <p className="text-sm font-medium text-[#030F12]">Visa ••••4242</p>
              <p className="text-xs" style={{ color: '#606060' }}>Expires 09/2027</p>
            </div>
          </div>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#030F12', color: '#030F12' }}
          >
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Invoice history */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Invoice History</h2>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
              <th className="text-left pb-2 font-semibold" style={{ color: '#606060' }}>Date</th>
              <th className="text-left pb-2 font-semibold" style={{ color: '#606060' }}>Amount</th>
              <th className="text-left pb-2 font-semibold" style={{ color: '#606060' }}>Status</th>
              <th className="text-right pb-2 font-semibold" style={{ color: '#606060' }}>
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(({ date, amount, status }, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #F0F0F0' }}>
                <td className="py-3 text-[#030F12]">{date}</td>
                <td className="py-3 font-medium text-[#030F12]">{amount}</td>
                <td className="py-3">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#DCFCE7', color: '#16B548' }}>
                    {status} ✓
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button
                    className="text-xs font-semibold underline transition-colors"
                    style={{ color: '#E0CD72' }}
                  >
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
