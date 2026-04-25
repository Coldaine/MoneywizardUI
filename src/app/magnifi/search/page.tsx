'use client';

import { useState } from 'react';

type SearchTab = 'search' | 'saved';
type IdeasFilter = 'foryou' | 'stocks' | 'funds';

const trendingChips = [
  'AI & Machine Learning →',
  'Clean Energy →',
  'Dividend Stocks →',
  'Emerging Markets →',
  'Healthcare Innovation →',
  'Defense & Aerospace →',
];

const ideasData: Record<IdeasFilter, { ticker: string; name: string; price: string; change: string; positive: boolean }[]> = {
  foryou: [
    { ticker: 'NVDA', name: 'Nvidia', price: '$875.50', change: '+3.4%', positive: true },
    { ticker: 'AAPL', name: 'Apple Inc.', price: '$175.23', change: '+1.2%', positive: true },
    { ticker: 'AMZN', name: 'Amazon', price: '$185.10', change: '+2.1%', positive: true },
  ],
  stocks: [
    { ticker: 'META', name: 'Meta Platforms', price: '$527.30', change: '+1.5%', positive: true },
    { ticker: 'MSFT', name: 'Microsoft', price: '$415.67', change: '+0.8%', positive: true },
    { ticker: 'GOOGL', name: 'Alphabet', price: '$159.20', change: '+0.6%', positive: true },
  ],
  funds: [
    { ticker: 'VTI', name: 'Vanguard Total Market ETF', price: '$253.40', change: '+0.9%', positive: true },
    { ticker: 'QQQ', name: 'Invesco QQQ Trust', price: '$448.20', change: '+1.1%', positive: true },
    { ticker: 'SPY', name: 'SPDR S&P 500 ETF', price: '$521.30', change: '+0.7%', positive: true },
  ],
};

const motivations = [
  { label: 'Growth Investing', count: 47 },
  { label: 'Income Investing', count: 23 },
  { label: 'ESG / Sustainable', count: 31 },
  { label: 'Dividend Growth', count: 18 },
  { label: 'Value Investing', count: 29 },
];

const majorEvents = [
  { label: 'Earnings Season', count: 12 },
  { label: 'Fed Rate Decision', count: 8 },
  { label: 'Sector Rotation', count: 15 },
  { label: 'IPO Pipeline', count: 6 },
];

const ideasFilterLabels: { key: IdeasFilter; label: string }[] = [
  { key: 'foryou', label: 'For You' },
  { key: 'stocks', label: 'Stocks' },
  { key: 'funds', label: 'Funds' },
];

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<SearchTab>('search');
  const [query, setQuery] = useState('');
  const [ideasFilter, setIdeasFilter] = useState<IdeasFilter>('foryou');

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '24px' }}>
      {/* Tab pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        {([
          { key: 'search' as SearchTab, label: 'Search' },
          { key: 'saved' as SearchTab, label: 'Saved Searches' },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              backgroundColor: activeTab === key ? '#E0CD72' : '#F3F4F6',
              color: activeTab === key ? '#374151' : '#6B7280',
              fontWeight: activeTab === key ? 600 : 400,
              border: 'none', borderRadius: '9999px',
              padding: '6px 16px', fontSize: '14px', cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'search' && (
        <div>
          <div style={{
            fontSize: '14px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase',
            textAlign: 'center', margin: '24px 0 16px', letterSpacing: '0.04em',
          }}>
            What investments are you searching for?
          </div>

          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <span style={{
              position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)',
              color: '#9CA3AF', fontSize: '16px', pointerEvents: 'none',
            }}>
              🔍
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stocks, ETFs, funds..."
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '12px 16px 12px 42px', fontSize: '15px',
                borderRadius: '8px', border: '1px solid #E5E7EB',
                backgroundColor: '#FFFFFF', color: '#111827', outline: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '10px', fontWeight: 600, color: '#9CA3AF',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px',
            }}>
              Trending
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {trendingChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => setQuery(chip.replace(' →', ''))}
                  style={{
                    backgroundColor: '#F3F4F6', color: '#374151', borderRadius: '9999px',
                    padding: '6px 14px', fontSize: '13px', border: 'none', cursor: 'pointer',
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
            padding: '16px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <div style={{ fontWeight: 700, fontSize: '16px', color: '#111827', marginBottom: '12px' }}>
              Need some new ideas?
            </div>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
              {ideasFilterLabels.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setIdeasFilter(key)}
                  style={{
                    backgroundColor: ideasFilter === key ? '#E0CD72' : '#F3F4F6',
                    color: ideasFilter === key ? '#374151' : '#6B7280',
                    fontWeight: ideasFilter === key ? 600 : 400,
                    border: 'none', borderRadius: '9999px',
                    padding: '5px 14px', fontSize: '13px', cursor: 'pointer',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {ideasData[ideasFilter].map((item) => (
                <div
                  key={item.ticker}
                  onClick={() => setQuery(item.ticker)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 12px', borderRadius: '6px',
                    border: '1px solid #E5E7EB', cursor: 'pointer', backgroundColor: '#FAFAFA',
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{item.ticker}</span>
                    <span style={{ color: '#6B7280', fontSize: '13px', marginLeft: '8px' }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: '#374151', fontSize: '13px', fontWeight: 500 }}>{item.price}</span>
                    <span style={{ color: item.positive ? '#166534' : '#991B1B', fontSize: '13px', fontWeight: 600 }}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div style={{
              fontSize: '10px', fontWeight: 600, color: '#9CA3AF',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px',
            }}>
              Investing Motivations
            </div>
            <div style={{
              backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
              overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              {motivations.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => setQuery(item.label)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', border: 'none',
                    borderBottom: i < motivations.length - 1 ? '1px solid #E5E7EB' : 'none',
                    backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ color: '#374151', fontSize: '14px' }}>{item.label}</span>
                  <span style={{
                    backgroundColor: '#F3F4F6', color: '#374151',
                    borderRadius: '9999px', padding: '2px 8px', fontSize: '11px', fontWeight: 600,
                  }}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '10px', fontWeight: 600, color: '#9CA3AF',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px',
            }}>
              Major Events
            </div>
            <div style={{
              backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
              overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              {majorEvents.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => setQuery(item.label)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px', border: 'none',
                    borderBottom: i < majorEvents.length - 1 ? '1px solid #E5E7EB' : 'none',
                    backgroundColor: 'transparent', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ color: '#374151', fontSize: '14px' }}>{item.label}</span>
                  <span style={{
                    backgroundColor: '#F3F4F6', color: '#374151',
                    borderRadius: '9999px', padding: '2px 8px', fontSize: '11px', fontWeight: 600,
                  }}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'saved' && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', padding: '64px 24px', textAlign: 'center',
        }}>
          <p style={{ color: '#6B7280', fontSize: '16px', fontWeight: 500, margin: '0 0 6px' }}>
            No saved searches yet
          </p>
          <p style={{ color: '#9CA3AF', fontSize: '13px', margin: 0 }}>
            Try searching for a stock or theme
          </p>
        </div>
      )}
    </div>
  );
}
