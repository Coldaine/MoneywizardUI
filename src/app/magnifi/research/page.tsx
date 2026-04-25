'use client';

import { useState } from 'react';

type ResearchTab = 'all' | 'moby';

const reports = [
  { ticker: 'VRSK', name: 'Verisk Analytics', desc: 'Q4 earnings beat; analytics division grew 12% YoY', date: 'Apr 23' },
  { ticker: 'VST', name: 'Vistra Corp.', desc: 'Nuclear capacity expansion provides 5-year earnings visibility', date: 'Apr 22' },
  { ticker: 'RSG', name: 'Republic Services', desc: 'Waste management pricing power drives margin expansion', date: 'Apr 21' },
  { ticker: 'STLD', name: 'Steel Dynamics', desc: 'Steel demand recovery; raised full-year guidance', date: 'Apr 20' },
  { ticker: 'NEE', name: 'NextEra Energy', desc: 'Renewable pipeline adds 8GW through 2026; solar tariff risk', date: 'Apr 18' },
  { ticker: 'MSFT', name: 'Microsoft', desc: 'Azure AI workloads accelerating; Copilot monetization ahead of expectations', date: 'Apr 17' },
];

const forYouItems = [
  { title: 'AI Chip Supply Chain Analysis', source: 'Goldman Sachs', date: 'Apr 24' },
  { title: 'EV Market Headwinds 2026', source: 'Morgan Stanley', date: 'Apr 23' },
  { title: 'Healthcare M&A Wave', source: 'JPMorgan', date: 'Apr 22' },
];

export default function ResearchPage() {
  const [activeTab, setActiveTab] = useState<ResearchTab>('all');

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '24px' }}>
      <h1 style={{ color: '#111827', fontSize: '22px', fontWeight: 700, margin: '0 0 20px' }}>Research</h1>

      {/* Tabs */}
      <div role="tablist" aria-label="Research views" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {(['all', 'moby'] as ResearchTab[]).map((tab) => (
          <button
            type="button"
            key={tab}
            id={`${tab}-tab`}
            role="tab"
            onClick={() => setActiveTab(tab)}
            aria-selected={activeTab === tab}
            aria-controls="research-panel"
            style={{
              backgroundColor: activeTab === tab ? '#E0CD72' : '#F3F4F6',
              color: activeTab === tab ? '#374151' : '#6B7280',
              fontWeight: activeTab === tab ? 600 : 400,
              border: 'none', borderRadius: '9999px',
              padding: '6px 16px', fontSize: '14px', cursor: 'pointer',
            }}
          >
            {tab === 'all' ? 'All' : 'Moby'}
          </button>
        ))}
      </div>

      <div id="research-panel" role="tabpanel" aria-labelledby={`${activeTab}-tab`}>
        {/* Connect banner */}
        <div style={{
          backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
          padding: '20px', marginBottom: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '16px', flexWrap: 'wrap', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '4px' }}>
              🐘 Connect Your Research to Your Investments
            </div>
            <div style={{ color: '#6B7280', fontSize: '13px' }}>
              Link Moby AI research to automatically surface insights relevant to your holdings
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={() => {}}
              style={{
                backgroundColor: '#E0CD72', color: '#374151', border: 'none',
                borderRadius: '6px', padding: '8px 20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              }}
            >
              Connect
            </button>
            <button
              type="button"
              onClick={() => {}}
              style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '13px', cursor: 'pointer' }}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Latest Research Reports */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontSize: '11px', fontWeight: 600, color: '#9CA3AF',
            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px',
          }}>
            Latest Research Reports
          </div>
          <div style={{
            backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
            overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            {reports.map((report, i) => (
              <button
                key={report.ticker}
                type="button"
                onClick={() => {}}
                className="w-full text-left transition-colors hover:bg-[#FAFAFA]"
                style={{
                  padding: '14px 16px',
                  borderBottom: i < reports.length - 1 ? '1px solid #E5E7EB' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer', backgroundColor: 'transparent',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{report.ticker}</span>
                    <span style={{ color: '#6B7280', fontSize: '13px', marginLeft: '8px' }}>{report.name}</span>
                  </div>
                  <div style={{ color: '#374151', fontSize: '13px', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {report.desc}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '16px', flexShrink: 0 }}>
                  <span style={{
                    backgroundColor: '#1A1A2E', color: '#E0CD72',
                    borderRadius: '9999px', padding: '2px 8px', fontSize: '11px', fontWeight: 500,
                  }}>
                    moby
                  </span>
                  <span style={{ color: '#9CA3AF', fontSize: '12px', minWidth: '40px', textAlign: 'right' }}>{report.date}</span>
                  <span style={{ color: '#9CA3AF', fontSize: '14px' }}>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* For You — All tab only */}
        {activeTab === 'all' && (
          <div>
            <div style={{
              fontSize: '11px', fontWeight: 600, color: '#9CA3AF',
              letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px',
            }}>
              For You
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {forYouItems.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {}}
                  style={{
                    flex: '1 1 180px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB',
                    borderRadius: '8px', padding: '14px 16px', cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textAlign: 'left',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>{item.title}</div>
                  <div style={{ color: '#6B7280', fontSize: '12px' }}>{item.source} · {item.date}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
