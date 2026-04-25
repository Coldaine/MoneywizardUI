'use client';

import { useState } from 'react';

const trendingSearches = [
  'AI stocks',
  'Dividend ETFs',
  'Tech sector',
  'Emerging markets',
  'Bonds',
  'Gold',
];

const forYouCards = [
  {
    id: 1,
    title: 'Growth ETFs matching your risk profile',
    description:
      'Based on your moderate-aggressive risk tolerance, these growth-focused ETFs align with your long-term goals.',
  },
  {
    id: 2,
    title: 'Dividend income ideas',
    description:
      'High-yield dividend stocks and ETFs to supplement your portfolio income with reliable payouts.',
  },
  {
    id: 3,
    title: 'Sector rotation opportunities',
    description:
      'Macro signals suggest rotating from technology into energy and healthcare this quarter.',
  },
];

const thematicCategories = [
  {
    id: 1,
    icon: '🌱',
    title: 'Long-Term Wealth',
    description: 'Diversified growth strategies built for decades, not quarters.',
    count: 24,
  },
  {
    id: 2,
    icon: '💰',
    title: 'Income',
    description: 'Dividend payers, bonds, and REITs for steady cash flow.',
    count: 18,
  },
  {
    id: 3,
    icon: '♻️',
    title: 'Values Alignment',
    description: 'ESG-screened investments that reflect what you care about.',
    count: 31,
  },
  {
    id: 4,
    icon: '🛡',
    title: 'Stability',
    description: 'Low-volatility assets to anchor your portfolio in uncertain markets.',
    count: 15,
  },
];

const collections = [
  {
    id: 1,
    title: 'Fed Rate Decision',
    description:
      'Assets positioned around Federal Reserve interest rate policy shifts and their market impact.',
  },
  {
    id: 2,
    title: 'Tech Earnings Season',
    description:
      'Plays around major technology company earnings reports — momentum and volatility ideas.',
  },
  {
    id: 3,
    title: 'Election Impact Plays',
    description:
      'Sectors historically sensitive to election outcomes: defense, energy, healthcare, and financials.',
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Search bar */}
      <div className="flex gap-3">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What investments are you searching for?"
          className="flex-1 rounded-full px-6 py-3 text-sm border-2 outline-none focus:border-[#E0CD72] text-[#030F12] bg-white"
          style={{ borderColor: '#E0CD72' }}
        />
        <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-6 py-3 text-sm hover:bg-[#E7C751] transition-colors whitespace-nowrap">
          Search
        </button>
      </div>

      {/* Trending searches */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#606060' }}>
          Trending searches
        </p>
        <div className="flex flex-wrap gap-2">
          {trendingSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors hover:bg-[#E0CD72] hover:text-[#030F12]"
              style={{
                border: '1.5px solid #E0CD72',
                color: '#E0CD72',
                background: 'transparent',
              }}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* For You */}
      <div>
        <h2 className="text-lg font-bold text-[#030F12] mb-4">For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {forYouCards.map((card) => (
            <div key={card.id} className="card-magnifi flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-[#030F12]">{card.title}</h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: '#606060' }}>
                {card.description}
              </p>
              <button
                type="button"
                className="text-xs font-semibold text-left"
                style={{ color: '#E0CD72' }}
              >
                Explore →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Guide me CTA banner */}
      <div
        className="rounded-2xl p-6 flex items-center justify-between gap-6 flex-wrap"
        style={{ background: '#030F12' }}
      >
        <div>
          <p className="text-base font-semibold mb-1" style={{ color: '#E0CD72' }}>
            Not sure where to start?
          </p>
          <p className="text-sm" style={{ color: '#9CA3AF' }}>
            Let AI guide you through building your portfolio.
          </p>
        </div>
        <button className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2 text-sm hover:bg-[#E7C751] transition-colors whitespace-nowrap">
          Start Guided Tour
        </button>
      </div>

      {/* Thematic categories */}
      <div>
        <h2 className="text-lg font-bold text-[#030F12] mb-4">Thematic Investing</h2>
        <div className="grid grid-cols-2 gap-4">
          {thematicCategories.map((cat) => (
            <div
              key={cat.id}
              className="card-magnifi flex flex-col gap-2 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <span className="text-2xl">{cat.icon}</span>
              <h3 className="text-sm font-bold text-[#030F12]">{cat.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: '#606060' }}>
                {cat.description}
              </p>
              <p className="text-xs font-semibold mt-1" style={{ color: '#E0CD72' }}>
                {cat.count} ideas
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Collections — Macro & Events */}
      <div>
        <h2 className="text-lg font-bold text-[#030F12] mb-1">Macro &amp; Events</h2>
        <p className="text-sm mb-4" style={{ color: '#606060' }}>
          Investment ideas tied to major macro events and market catalysts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {collections.map((col) => (
            <div
              key={col.id}
              className="card-magnifi flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: '#E0CD72', color: '#030F12' }}
              >
                {col.title[0]}
              </div>
              <h3 className="text-sm font-semibold text-[#030F12]">{col.title}</h3>
              <p className="text-xs leading-relaxed flex-1" style={{ color: '#606060' }}>
                {col.description}
              </p>
              <button type="button" className="text-xs font-semibold text-left" style={{ color: '#E0CD72' }}>
                Explore →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
