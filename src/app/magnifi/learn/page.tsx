'use client';

import { useState } from 'react';

type Category = 'All' | 'Basics' | 'Portfolio' | 'AI & Tools' | 'Tax & Planning';

interface Article {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, 'All'>;
  readTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
}

const articles: Article[] = [
  { id: 1,  title: 'What is a Brokerage Account?',          description: 'Learn the difference between a brokerage account, IRA, and 401(k) — and how to choose the right one for your goals.',      category: 'Basics',       readTime: '4 min', level: 'Beginner',     icon: '🏦' },
  { id: 2,  title: 'How to Read a Stock Quote',              description: 'Understand ticker symbols, bid/ask spreads, volume, and what 52-week high/low means for your investment decisions.',        category: 'Basics',       readTime: '3 min', level: 'Beginner',     icon: '📊' },
  { id: 3,  title: 'ETFs vs Mutual Funds',                   description: 'Side-by-side comparison of two popular diversified investment vehicles — fees, tax efficiency, and trading flexibility.',  category: 'Basics',       readTime: '5 min', level: 'Beginner',     icon: '⚖️' },
  { id: 4,  title: 'Dollar-Cost Averaging Explained',        description: 'A disciplined strategy for long-term investors: buy a fixed dollar amount regularly regardless of market conditions.',      category: 'Basics',       readTime: '4 min', level: 'Beginner',     icon: '📅' },
  { id: 5,  title: 'Understanding Portfolio Allocation',     description: 'Why spreading investments across asset classes reduces risk and how to choose the right mix for your risk tolerance.',      category: 'Portfolio',    readTime: '6 min', level: 'Intermediate', icon: '🗂️' },
  { id: 6,  title: 'How to Benchmark Your Portfolio',        description: "Compare your returns against the S&P 500, total market, or bond indices to see if you're truly outperforming.",          category: 'Portfolio',    readTime: '5 min', level: 'Intermediate', icon: '📈' },
  { id: 7,  title: 'Sharpe Ratio: Measuring Risk-Adjusted Returns', description: 'The Sharpe ratio tells you how much return you get per unit of risk — a critical metric for portfolio quality.',  category: 'Portfolio',    readTime: '7 min', level: 'Advanced',     icon: '📐' },
  { id: 8,  title: 'Rebalancing Your Portfolio',             description: 'Over time, winners drift your allocation off-target. Learn when and how to rebalance without triggering tax events.',       category: 'Portfolio',    readTime: '5 min', level: 'Intermediate', icon: '🔄' },
  { id: 9,  title: 'How Magnifi AI Search Works',            description: "Natural language investing — type 'funds tracking clean energy' and let the AI find matching ETFs, stocks, and funds.",   category: 'AI & Tools',   readTime: '3 min', level: 'Beginner',     icon: '🤖' },
  { id: 10, title: 'Using the Screener Effectively',         description: 'Filter 10,000+ assets by sector, market cap, dividend yield, P/E ratio, ESG rating, and custom criteria.',                 category: 'AI & Tools',   readTime: '6 min', level: 'Intermediate', icon: '⚗️' },
  { id: 11, title: 'Asset Comparison Deep Dive',             description: 'How to use Magnifi Compare to evaluate two investments side-by-side: charts, fundamentals, AI summary, and risk scores.',  category: 'AI & Tools',   readTime: '5 min', level: 'Intermediate', icon: '⊞' },
  { id: 12, title: 'Understanding Tax-Loss Harvesting',      description: 'Realize losses to offset gains and reduce your tax bill — without fundamentally changing your investment exposure.',        category: 'Tax & Planning', readTime: '7 min', level: 'Advanced',   icon: '🧾' },
  { id: 13, title: 'Wash-Sale Rule Explained',               description: 'The IRS wash-sale rule disallows a loss if you repurchase the same security within 30 days. Here\'s how to avoid it.',     category: 'Tax & Planning', readTime: '5 min', level: 'Advanced',   icon: '⚠️' },
  { id: 14, title: 'Retirement Planning with Monte Carlo',   description: 'Probabilistic modeling of retirement outcomes — how the Magnifi Planner estimates your chances of meeting your goal.',      category: 'Tax & Planning', readTime: '8 min', level: 'Advanced',   icon: '🎲' },
];

const LEVEL_STYLE: Record<string, { bg: string; color: string }> = {
  Beginner:     { bg: '#DCFCE7', color: '#16B548' },
  Intermediate: { bg: 'rgba(224,205,114,0.2)', color: '#B89A00' },
  Advanced:     { bg: '#FEE2E2', color: '#F5441D' },
};

const CATEGORIES: Category[] = ['All', 'Basics', 'Portfolio', 'AI & Tools', 'Tax & Planning'];

export default function LearnPage() {
  const [category, setCategory] = useState<Category>('All');
  const [search, setSearch] = useState('');
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());

  function toggleBookmark(id: number) {
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const filtered = articles.filter((a) => {
    if (category !== 'All' && a.category !== category) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Learn</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Educational resources and tutorials to help you invest smarter.</p>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg" aria-hidden="true">🔍</span>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles…"
          className="w-full pl-10 pr-4 py-2.5 rounded-full border text-sm outline-none"
          style={{ borderColor: '#E0E0E0', background: '#FAFAFA', color: '#030F12' }}
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className="rounded-full px-4 py-1.5 text-sm font-semibold border transition-colors"
            style={
              category === cat
                ? { background: '#030F12', color: '#E0CD72', borderColor: '#030F12' }
                : { background: 'transparent', color: '#606060', borderColor: '#E0E0E0' }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Articles',   value: String(articles.length) },
          { label: 'Bookmarked', value: String(bookmarked.size) },
          { label: 'Topics',     value: '4' },
        ].map(({ label, value }) => (
          <div key={label} className="card-magnifi text-center py-4">
            <p className="text-2xl font-bold text-[#030F12]">{value}</p>
            <p className="text-xs mt-1" style={{ color: '#606060' }}>{label}</p>
          </div>
        ))}
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <div className="card-magnifi text-center py-10" style={{ color: '#606060' }}>
          No articles match your search.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((a) => {
            const lvl = LEVEL_STYLE[a.level];
            const isBookmarked = bookmarked.has(a.id);
            return (
              <div key={a.id} className="card-magnifi flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl" aria-hidden="true">{a.icon}</span>
                  <button
                    onClick={() => toggleBookmark(a.id)}
                    aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                    className="text-lg transition-transform hover:scale-110"
                  >
                    {isBookmarked ? '🔖' : '🏷️'}
                  </button>
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-[#030F12] leading-snug mb-1">{a.title}</h2>
                  <p className="text-xs leading-relaxed" style={{ color: '#606060' }}>{a.description}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap mt-auto pt-2" style={{ borderTop: '1px solid #F0F0F0' }}>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                    style={{ background: lvl.bg, color: lvl.color }}
                  >
                    {a.level}
                  </span>
                  <span className="text-xs" style={{ color: '#9CA3AF' }}>{a.readTime} read</span>
                  <button
                    className="ml-auto text-xs font-semibold"
                    style={{ color: '#E0CD72' }}
                  >
                    Read →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
