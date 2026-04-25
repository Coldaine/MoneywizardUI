'use client';

import { useState } from 'react';

const tabs = ['All', 'Markets', 'Stocks', 'ETFs', 'Crypto', 'Your Holdings'];

type Sentiment = 'Positive' | 'Negative' | 'Neutral';

interface Article {
  id: number;
  headline: string;
  source: string;
  time: string;
  sentiment: Sentiment;
  type: 'stock' | 'etf' | 'crypto' | 'market';
  tags: string[];
}

const featuredArticle = {
  headline: 'Fed Signals Pause in Rate Hikes Amid Cooling Inflation',
  subheadline:
    'The Federal Reserve indicated it may hold rates steady at its next meeting, citing sustained progress on inflation and stabilizing labor market conditions.',
  source: 'Bloomberg',
  time: '2h ago',
  sentiment: 'Neutral' as Sentiment,
};

const articles: Article[] = [
  {
    id: 1,
    headline: 'NVIDIA Reports Record Q1 Earnings, Stock Surges 5%',
    source: 'CNBC',
    time: '3h ago',
    sentiment: 'Positive',
    type: 'stock',
    tags: ['NVDA'],
  },
  {
    id: 2,
    headline: 'Apple Faces Antitrust Scrutiny in EU Over App Store',
    source: 'Reuters',
    time: '5h ago',
    sentiment: 'Negative',
    type: 'stock',
    tags: ['AAPL'],
  },
  {
    id: 3,
    headline: 'Vanguard Cuts Fees on 87 ETFs to Record Lows',
    source: 'Morningstar',
    time: '6h ago',
    sentiment: 'Positive',
    type: 'etf',
    tags: ['VTI'],
  },
  {
    id: 4,
    headline: 'Bitcoin Falls Below $62,000 Amid Regulatory Concerns',
    source: 'CoinDesk',
    time: '8h ago',
    sentiment: 'Negative',
    type: 'crypto',
    tags: [],
  },
  {
    id: 5,
    headline: 'S&P 500 Closes at New All-Time High for Third Straight Day',
    source: 'WSJ',
    time: '9h ago',
    sentiment: 'Positive',
    type: 'market',
    tags: [],
  },
  {
    id: 6,
    headline: 'Tesla Delays Cybertruck Production Amid Parts Shortage',
    source: 'Reuters',
    time: '12h ago',
    sentiment: 'Negative',
    type: 'stock',
    tags: ['TSLA'],
  },
];

const watchlistHoldings = ['AAPL', 'NVDA', 'TSLA', 'VTI'];

function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
  const styles: Record<Sentiment, { bg: string; color: string }> = {
    Positive: { bg: '#DCFCE7', color: '#16B548' },
    Negative: { bg: '#FEE2E2', color: '#F5441D' },
    Neutral: { bg: '#F3F4F6', color: '#606060' },
  };
  const s = styles[sentiment];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {sentiment}
    </span>
  );
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [checkedHoldings, setCheckedHoldings] = useState<string[]>([]);

  function toggleHolding(ticker: string) {
    setCheckedHoldings((prev) =>
      prev.includes(ticker) ? prev.filter((t) => t !== ticker) : [...prev, ticker]
    );
  }

  const filteredArticles = articles.filter((article) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Stocks') return article.type === 'stock';
    if (activeTab === 'ETFs') return article.type === 'etf';
    if (activeTab === 'Crypto') return article.type === 'crypto';
    if (activeTab === 'Markets') return article.type === 'market';
    if (activeTab === 'Your Holdings') {
      return checkedHoldings.length === 0
        ? true
        : checkedHoldings.some((ticker) => article.tags.includes(ticker));
    }
    return true;
  });

  return (
    <div className="max-w-5xl">
      {/* Filter tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors"
            style={{
              color: activeTab === tab ? '#E0CD72' : '#606060',
              borderBottom: activeTab === tab ? '2px solid #E0CD72' : '2px solid transparent',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Main content */}
        <div className="flex-1 space-y-4">
          {/* Featured article */}
          <div
            className="rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-shadow"
            style={{ background: '#030F12' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold" style={{ color: '#606060' }}>
                {featuredArticle.source}
              </span>
              <span className="text-xs" style={{ color: '#606060' }}>
                {featuredArticle.time}
              </span>
              <SentimentBadge sentiment={featuredArticle.sentiment} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: '#E0CD72' }}>
              {featuredArticle.headline}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: '#9CA3AF' }}>
              {featuredArticle.subheadline}
            </p>
            <button
              type="button"
              className="inline-block mt-4 text-sm font-semibold"
              style={{ color: '#E0CD72' }}
            >
              Read more →
            </button>
          </div>

          {/* News feed */}
          <div className="space-y-3">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="card-magnifi flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-[#030F12] leading-snug flex-1">
                    {article.headline}
                  </h3>
                  <SentimentBadge sentiment={article.sentiment} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium" style={{ color: '#606060' }}>
                      {article.source}
                    </span>
                    <span className="text-xs" style={{ color: '#9CA3AF' }}>
                      · {article.time}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold"
                    style={{ color: '#E0CD72' }}
                  >
                    Read more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Watchlist filter sidebar */}
        <div className="w-48 shrink-0">
          <div className="card-magnifi sticky top-4">
            <h3 className="text-sm font-bold text-[#030F12] mb-3">
              Filter by your holdings
            </h3>
            <div className="space-y-2">
              {watchlistHoldings.map((ticker) => (
                <label
                  key={ticker}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checkedHoldings.includes(ticker)}
                    onChange={() => toggleHolding(ticker)}
                    className="rounded"
                    style={{ accentColor: '#E0CD72' }}
                  />
                  <span className="text-sm font-medium text-[#030F12]">{ticker}</span>
                </label>
              ))}
            </div>
            {checkedHoldings.length > 0 && (
              <button
                onClick={() => setCheckedHoldings([])}
                className="mt-4 text-xs font-semibold w-full text-center"
                style={{ color: '#E0CD72' }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
