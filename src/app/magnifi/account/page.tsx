export default function LinkedAccountsPage() {
  const connected = [
    {
      name: 'Fidelity Brokerage',
      accountNum: '••••4821',
      lastSynced: 'Today at 9:42 AM',
      balance: '$198,420.00',
      status: 'connected' as const,
    },
    {
      name: 'Robinhood',
      accountNum: '••••7293',
      lastSynced: 'Today at 9:42 AM',
      balance: '$38,204.00',
      status: 'connected' as const,
    },
    {
      name: 'Coinbase',
      accountNum: '••••1847',
      lastSynced: '3 days ago',
      balance: '$5,232.42',
      status: 'needs-reauth' as const,
    },
  ];

  const brokerages = [
    'Fidelity', 'Schwab', 'TD Ameritrade', 'E*Trade',
    'Interactive Brokers', 'Coinbase', 'Gemini', 'Kraken',
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#030F12]">Linked Accounts</h1>
          <p className="text-sm mt-1" style={{ color: '#606060' }}>Manage your connected brokerages and investment accounts</p>
        </div>
        <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 hover:bg-[#E7C751] transition-colors text-sm">
          + Link Account
        </button>
      </div>

      {/* Connected accounts */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#606060' }}>Connected Accounts</h2>
        {connected.map((acct) => (
          <div key={acct.accountNum} className="card-magnifi">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-[#030F12]">{acct.name}</h3>
                  {acct.status === 'connected' ? (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#DCFCE7', color: '#16B548' }}>
                      Connected ✓
                    </span>
                  ) : (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#FFF7ED', color: '#F59E0B' }}>
                      Needs Re-auth ⚠
                    </span>
                  )}
                </div>
                <p className="text-sm" style={{ color: '#606060' }}>
                  Account {acct.accountNum} &nbsp;·&nbsp; Last synced: {acct.lastSynced}
                </p>
                <p className="text-xl font-bold text-[#030F12] mt-2">{acct.balance}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {acct.status === 'connected' ? (
                  <>
                    <button
                      className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
                      style={{ borderColor: '#030F12', color: '#030F12' }}
                    >
                      Re-sync
                    </button>
                    <button
                      className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-red-50"
                      style={{ borderColor: '#F5441D', color: '#F5441D' }}
                    >
                      Unlink
                    </button>
                  </>
                ) : (
                  <>
                    <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-4 py-1.5 text-sm hover:bg-[#E7C751] transition-colors">
                      Re-authenticate
                    </button>
                    <button
                      className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-red-50"
                      style={{ borderColor: '#F5441D', color: '#F5441D' }}
                    >
                      Unlink
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manual accounts */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#606060' }}>Manual Accounts</h2>
        <div className="card-magnifi">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-base font-semibold text-[#030F12]">401(k) at Employer</h3>
              <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Manually entered &nbsp;·&nbsp; Last updated: Apr 10, 2026</p>
              <p className="text-xl font-bold text-[#030F12] mt-2">$84,200.00</p>
            </div>
            <div className="flex gap-2">
              <button
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
                style={{ borderColor: '#030F12', color: '#030F12' }}
              >
                Edit
              </button>
              <button
                className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-red-50"
                style={{ borderColor: '#F5441D', color: '#F5441D' }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add account — brokerage grid */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-1">Add a New Account</h2>
        <p className="text-sm mb-4" style={{ color: '#606060' }}>Select a brokerage or exchange to connect</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {brokerages.map((b) => (
            <div
              key={b}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border cursor-pointer hover:border-[#E0CD72] transition-colors"
              style={{ borderColor: '#E5E7EB' }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#F8F9FA', color: '#030F12' }}
              >
                {b.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-xs font-medium text-[#030F12] text-center leading-tight">{b}</span>
              <button className="text-xs font-semibold rounded-full px-3 py-1 transition-colors hover:bg-[#E7C751]" style={{ background: '#E0CD72', color: '#030F12' }}>
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
