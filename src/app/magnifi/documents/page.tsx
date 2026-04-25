'use client';

import { useState } from 'react';

const taxDocs = [
  { name: 'Form 1099-B (Proceeds from Broker)', account: 'Fidelity', date: 'Available Feb 15, 2026', pending: false },
  { name: 'Form 1099-DIV (Dividends)', account: 'Fidelity', date: 'Available Feb 15, 2026', pending: false },
  { name: 'Form 1099-DIV (Dividends)', account: 'Robinhood', date: 'Available Feb 28, 2026', pending: false },
  { name: 'Form 1099-B (Proceeds from Broker)', account: 'Coinbase', date: 'Pending (expected Mar 2026)', pending: true },
];

const tradeConfirms = [
  { date: 'Apr 24', trade: 'NVDA Buy 2 shares', account: 'Fidelity' },
  { date: 'Apr 20', trade: 'VTI Buy 5 shares', account: 'Fidelity' },
  { date: 'Apr 18', trade: 'GBTC Sell 5 shares', account: 'Coinbase' },
  { date: 'Apr 15', trade: 'MSFT Buy 3 shares', account: 'Robinhood' },
  { date: 'Apr 10', trade: 'AAPL Buy 10 shares', account: 'Fidelity' },
];

const statements = [
  { period: 'Mar 2026', account: 'Fidelity' },
  { period: 'Feb 2026', account: 'Fidelity' },
  { period: 'Jan 2026', account: 'Fidelity' },
];

const years = ['2025', '2024', '2023'] as const;
type Year = (typeof years)[number];

export default function DocumentsPage() {
  const [selectedYear, setSelectedYear] = useState<Year>('2025');

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Page header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#030F12]">Documents</h1>
          <p className="text-sm mt-1" style={{ color: '#606060' }}>Tax documents, trade confirms, and account statements</p>
        </div>
        {/* Year pill toggle */}
        <div className="flex rounded-full overflow-hidden border" style={{ borderColor: '#E5E7EB' }}>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className="px-4 py-1.5 text-sm font-semibold transition-colors"
              style={
                selectedYear === year
                  ? { background: '#E0CD72', color: '#030F12' }
                  : { background: '#FFFFFF', color: '#606060' }
              }
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search documents..."
          className="w-full rounded-xl border px-4 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2"
          style={{ borderColor: '#E5E7EB', color: '#030F12' }}
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="6.5" cy="6.5" r="5" stroke="#606060" strokeWidth="1.5" />
          <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#606060" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Tax documents */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">
          Tax Documents &mdash; {selectedYear}
        </h2>
        <div className="space-y-1">
          {taxDocs.map((doc, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-3 border-b last:border-b-0 flex-wrap gap-3"
              style={{ borderColor: '#F0F0F0' }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0 mt-0.5">📄</span>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: doc.pending ? '#606060' : '#030F12' }}
                  >
                    {doc.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#606060' }}>
                    {doc.account} &nbsp;·&nbsp; {doc.date}
                  </p>
                </div>
              </div>
              {doc.pending ? (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: '#F3F4F6', color: '#606060' }}>
                  Pending
                </span>
              ) : (
                <button
                  className="text-xs font-semibold rounded-full px-3 py-1.5 transition-colors hover:bg-[#E7C751]"
                  style={{ background: '#E0CD72', color: '#030F12' }}
                >
                  Download PDF
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trade confirmations */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Trade Confirmations</h2>
        <div className="space-y-1">
          {tradeConfirms.map((t, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2.5 border-b last:border-b-0 flex-wrap gap-2"
              style={{ borderColor: '#F0F0F0' }}
            >
              <div>
                <p className="text-sm font-medium text-[#030F12]">
                  <span className="text-xs font-semibold mr-2 px-2 py-0.5 rounded" style={{ background: '#F3F4F6', color: '#606060' }}>
                    {t.date}
                  </span>
                  {t.trade}
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#606060' }}>{t.account}</p>
              </div>
              <button
                className="text-xs font-semibold underline"
                style={{ color: '#E0CD72' }}
              >
                Download
              </button>
            </div>
          ))}
        </div>
        <button
          className="mt-3 text-sm font-semibold"
          style={{ color: '#E0CD72' }}
        >
          View all trade confirms →
        </button>
      </div>

      {/* Account statements */}
      <div className="card-magnifi">
        <h2 className="text-base font-semibold text-[#030F12] mb-4">Account Statements</h2>
        <div className="space-y-1">
          {statements.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between py-2.5 border-b last:border-b-0"
              style={{ borderColor: '#F0F0F0' }}
            >
              <div>
                <p className="text-sm font-medium text-[#030F12]">
                  {s.period} Statement
                </p>
                <p className="text-xs mt-0.5" style={{ color: '#606060' }}>{s.account}</p>
              </div>
              <button
                className="text-xs font-semibold underline"
                style={{ color: '#E0CD72' }}
              >
                Download
              </button>
            </div>
          ))}
        </div>
        <button
          className="mt-3 text-sm font-semibold"
          style={{ color: '#E0CD72' }}
        >
          View all statements →
        </button>
      </div>
    </div>
  );
}
