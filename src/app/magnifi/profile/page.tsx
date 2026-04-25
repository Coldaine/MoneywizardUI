const RISK_SCORE = 7;
const TOTAL_SEGMENTS = 10;
const ASSET_CLASSES = ['Stocks', 'ETFs', 'Crypto'];
const INVESTMENT_STYLES = ['Growth', 'Balanced', 'Income'] as const;

function getStyleFromRiskScore(score: number) {
  if (score >= 7) return 'Growth';
  if (score >= 4) return 'Balanced';
  return 'Income';
}

export default function ProfilePage() {
  const riskScore = RISK_SCORE;
  const totalSegments = TOTAL_SEGMENTS;
  const activeStyle = getStyleFromRiskScore(riskScore);

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile header */}
      <div className="card-magnifi flex items-center gap-5">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold flex-shrink-0"
          style={{ background: '#E0CD72', color: '#030F12' }}
        >
          P
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#030F12]">Patrick MacLyman</h1>
          <p className="text-sm" style={{ color: '#606060' }}>pmaclyman@gmail.com</p>
          <p className="text-xs mt-1" style={{ color: '#606060' }}>Member since January 2024</p>
        </div>
      </div>

      {/* Personal info */}
      <div className="card-magnifi">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#030F12]">Personal Information</h2>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#030F12', color: '#030F12' }}
          >
            Edit Profile
          </button>
        </div>
        <div className="space-y-3">
          {[
            { label: 'Full Name', value: 'Patrick MacLyman' },
            { label: 'Email', value: 'pmaclyman@gmail.com' },
            { label: 'Phone', value: '(555) 867-5309' },
            { label: 'Date of Birth', value: '••/••/1985' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: '#F0F0F0' }}>
              <span className="text-sm" style={{ color: '#606060' }}>{label}</span>
              <span className="text-sm font-medium text-[#030F12]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Investment preferences */}
      <div className="card-magnifi">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-[#030F12]">Investment Preferences</h2>
          <button
            className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
            style={{ borderColor: '#030F12', color: '#030F12' }}
          >
            Edit Preferences
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-2" style={{ color: '#606060' }}>Investment Style</p>
            <div className="flex gap-2">
              {INVESTMENT_STYLES.map((style) => (
                <span
                  key={style}
                  className="px-3 py-1 rounded-full text-sm font-semibold"
                  style={
                    style === activeStyle
                      ? { background: '#E0CD72', color: '#030F12' }
                      : { background: '#F3F4F6', color: '#606060' }
                  }
                >
                  {style}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between py-2 border-t" style={{ borderColor: '#F0F0F0' }}>
            <span className="text-sm" style={{ color: '#606060' }}>Time Horizon</span>
            <span className="text-sm font-medium text-[#030F12]">Long-term (10+ years)</span>
          </div>
          <div className="flex items-center justify-between py-2 border-t" style={{ borderColor: '#F0F0F0' }}>
            <span className="text-sm" style={{ color: '#606060' }}>Rebalancing Frequency</span>
            <span className="text-sm font-medium text-[#030F12]">Quarterly</span>
          </div>
          <div className="py-2 border-t" style={{ borderColor: '#F0F0F0' }}>
            <p className="text-sm mb-2" style={{ color: '#606060' }}>Preferred Asset Classes</p>
            <div className="flex gap-2 flex-wrap">
              {ASSET_CLASSES.map((cls) => (
                <span
                  key={cls}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: '#F3F4F6', color: '#030F12' }}
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk tolerance */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Risk Tolerance</h2>
        <div className="flex items-end gap-4 mb-3">
          <span className="text-4xl font-bold text-[#030F12]">{riskScore}</span>
          <span className="text-lg font-medium mb-1" style={{ color: '#606060' }}>/ 10</span>
          <span
            className="mb-1 px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: '#E0CD72', color: '#030F12' }}
          >
            {activeStyle === 'Growth' ? 'Aggressive Growth' : activeStyle === 'Balanced' ? 'Balanced Growth' : 'Income Focus'}
          </span>
        </div>

        {/* 10-segment bar */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: totalSegments }, (_, i) => (
            <div
              key={i}
              className="h-3 flex-1 rounded-sm"
              style={{ background: i < riskScore ? '#E0CD72' : '#E5E7EB' }}
            />
          ))}
        </div>

        <p className="text-sm mb-4" style={{ color: '#606060' }}>
          You&apos;re comfortable with significant market volatility in exchange for higher long-term growth potential.
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs" style={{ color: '#606060' }}>Last updated: Jan 15, 2024</p>
          <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 text-sm hover:bg-[#E7C751] transition-colors">
            Retake Questionnaire
          </button>
        </div>
      </div>

      {/* Connected social */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Connected Accounts</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b" style={{ borderColor: '#F0F0F0' }}>
            <div className="flex items-center gap-3">
              <div aria-hidden="true" className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#4285F4' }}>
                G
              </div>
              <div>
                <p className="text-sm font-medium text-[#030F12]">Google</p>
                <p className="text-xs" style={{ color: '#606060' }}>pmaclyman@gmail.com</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#DCFCE7', color: '#16B548' }}>
              Connected ✓
            </span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#000000', color: '#FFFFFF' }}>
                <span aria-hidden="true" className="text-white font-bold text-xs">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-[#030F12]">Apple ID</p>
                <p className="text-xs" style={{ color: '#606060' }}>Not connected</p>
              </div>
            </div>
            <button
              className="px-3 py-1 rounded-full text-sm font-semibold border transition-colors hover:bg-gray-50"
              style={{ borderColor: '#030F12', color: '#030F12' }}
            >
              + Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
