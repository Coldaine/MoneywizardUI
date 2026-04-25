'use client';

import { useEffect, useRef, useState } from 'react';

type TradeTab = 'tradelist' | 'pending' | 'history' | 'cash';

const tabLabels: { key: TradeTab; label: string }[] = [
  { key: 'tradelist', label: 'Tradelist' },
  { key: 'pending', label: 'Pending' },
  { key: 'history', label: 'Transaction History' },
  { key: 'cash', label: 'Cash & Transfers' },
];

const tradeItems = [
  { ticker: 'AAPL', name: 'Apple Inc.', side: 'BUY' as const, shares: 10, price: '$175.00' },
  { ticker: 'MSFT', name: 'Microsoft', side: 'BUY' as const, shares: 5, price: '$415.00' },
  { ticker: 'TSLA', name: 'Tesla', side: 'SELL' as const, shares: 8, price: '$172.00' },
];

const historyRows = [
  { date: '2024-04-15', symbol: 'AAPL', side: 'BUY', qty: 10, price: '$175.23', total: '$1,752.30', status: 'Filled' },
  { date: '2024-04-12', symbol: 'MSFT', side: 'SELL', qty: 5, price: '$415.67', total: '$2,078.35', status: 'Filled' },
  { date: '2024-04-10', symbol: 'NVDA', side: 'BUY', qty: 3, price: '$875.50', total: '$2,626.50', status: 'Filled' },
  { date: '2024-04-08', symbol: 'GOOGL', side: 'BUY', qty: 8, price: '$158.90', total: '$1,271.20', status: 'Cancelled' },
  { date: '2024-04-05', symbol: 'TSLA', side: 'SELL', qty: 15, price: '$172.40', total: '$2,586.00', status: 'Filled' },
];

export default function TradePage() {
  const [activeTab, setActiveTab] = useState<TradeTab>('tradelist');
  const [showTradeForm, setShowTradeForm] = useState(false);
  const openTradeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTradeButtonRef = useRef<HTMLButtonElement>(null);

  function closeTradeForm() {
    setShowTradeForm(false);
    openTradeButtonRef.current?.focus();
  }

  useEffect(() => {
    if (showTradeForm) {
      closeTradeButtonRef.current?.focus();
    }
  }, [showTradeForm]);

  useEffect(() => {
    if (!showTradeForm) return undefined;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeTradeForm();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showTradeForm]);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100%', padding: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <h1 style={{ color: '#111827', fontSize: '22px', fontWeight: 700, margin: 0 }}>Trade</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block' }} />
          <span style={{ color: '#6B7280', fontSize: '13px' }}>Closed · Opens in 47h 23m</span>
        </div>
        <button
          ref={openTradeButtonRef}
          type="button"
          aria-haspopup="dialog"
          aria-expanded={showTradeForm}
          aria-controls="new-trade-dialog"
          onClick={() => setShowTradeForm(true)}
          style={{
            backgroundColor: '#E0CD72', color: '#374151', border: 'none',
            borderRadius: '9999px', padding: '8px 20px', fontWeight: 600,
            fontSize: '13px', cursor: 'pointer', letterSpacing: '0.05em',
          }}
        >
          NEW TRADE
        </button>
      </div>

      {/* New Trade modal */}
      {showTradeForm && (
        <div
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50,
          }}
          onClick={closeTradeForm}
        >
          <div
            id="new-trade-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-trade-title"
            aria-describedby="new-trade-description"
            tabIndex={-1}
            style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', width: '360px', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="new-trade-title" style={{ color: '#111827', fontSize: '18px', fontWeight: 700, marginTop: 0, marginBottom: '8px' }}>New Trade</h2>
            <p id="new-trade-description" style={{ color: '#6B7280', fontSize: '13px', marginBottom: '16px' }}>Connect a brokerage to place live trades.</p>
            <button
              ref={closeTradeButtonRef}
              type="button"
              onClick={closeTradeForm}
              style={{
                backgroundColor: '#E0CD72', color: '#374151', border: 'none',
                borderRadius: '6px', padding: '8px 20px', fontWeight: 600,
                cursor: 'pointer', width: '100%',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div role="tablist" aria-label="Trade sections" style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {tabLabels.map(({ key, label }) => (
          <button
            type="button"
            key={key}
            id={`trade-tab-${key}`}
            role="tab"
            onClick={() => setActiveTab(key)}
            aria-selected={activeTab === key}
            aria-controls={`trade-panel-${key}`}
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

      {/* Connect brokerage card */}
      <div style={{
        backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
        padding: '16px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>
          🏦 Connect Your Brokerage Account
        </div>
        <p style={{ color: '#6B7280', fontSize: '13px', margin: '0 0 12px' }}>
          Link E*TRADE or another brokerage to enable live trading
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => {}}
            style={{
              backgroundColor: '#E0CD72', color: '#374151', border: 'none',
              borderRadius: '6px', padding: '8px 20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
            }}
          >
            Connect E*TRADE
          </button>
          <button
            onClick={() => {}}
            style={{ background: 'none', border: 'none', color: '#6B7280', fontSize: '13px', cursor: 'pointer' }}
          >
            Connect Other
          </button>
        </div>
      </div>

      {/* Tradelist tab */}
      {activeTab === 'tradelist' && (
        <div id="trade-panel-tradelist" role="tabpanel" aria-labelledby="trade-tab-tradelist" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tradeItems.map((item) => (
            <div
              key={item.ticker}
              style={{
                backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
                padding: '14px 16px', display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                flexWrap: 'wrap', gap: '10px',
              }}
            >
              <div>
                <span style={{ fontWeight: 700, color: '#111827', fontSize: '14px' }}>{item.ticker}</span>
                <span style={{ color: '#6B7280', fontSize: '13px', marginLeft: '8px' }}>{item.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  backgroundColor: item.side === 'BUY' ? '#DCFCE7' : '#FEE2E2',
                  color: item.side === 'BUY' ? '#166534' : '#991B1B',
                  borderRadius: '9999px', padding: '2px 10px', fontSize: '12px', fontWeight: 600,
                }}>
                  {item.side}
                </span>
                <span style={{ color: '#374151', fontSize: '13px' }}>
                  {item.shares} shares · {item.price}
                </span>
                <button
                  type="button"
                  onClick={() => {}}
                  style={{
                    backgroundColor: '#E0CD72', color: '#374151', border: 'none',
                    borderRadius: '6px', padding: '5px 14px', fontWeight: 600, fontSize: '12px', cursor: 'pointer',
                  }}
                >
                  ↕ Trade
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pending tab */}
      {activeTab === 'pending' && (
        <div id="trade-panel-pending" role="tabpanel" aria-labelledby="trade-tab-pending" style={{
          backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
          padding: '48px 24px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <p style={{ color: '#6B7280', fontSize: '15px', marginBottom: '16px' }}>No pending orders</p>
          <button
            type="button"
            onClick={() => setShowTradeForm(true)}
            style={{
              backgroundColor: '#E0CD72', color: '#374151', border: 'none',
              borderRadius: '6px', padding: '8px 20px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            ＋ Place Order
          </button>
        </div>
      )}

      {/* Transaction History tab */}
      {activeTab === 'history' && (
        <div id="trade-panel-history" role="tabpanel" aria-labelledby="trade-tab-history" style={{
          backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px',
          overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                  {['Date', 'Symbol', 'Side', 'Qty', 'Price', 'Total', 'Status'].map((h) => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: '#6B7280', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {historyRows.map((row) => (
                  <tr key={`${row.date}-${row.symbol}-${row.side}`} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{row.date}</td>
                    <td style={{ padding: '10px 14px', fontWeight: 600, color: '#111827' }}>{row.symbol}</td>
                    <td style={{ padding: '10px 14px', color: row.side === 'BUY' ? '#166534' : '#991B1B', fontWeight: 600 }}>{row.side}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{row.qty}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{row.price}</td>
                    <td style={{ padding: '10px 14px', color: '#374151' }}>{row.total}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{
                        backgroundColor: row.status === 'Filled' ? '#DCFCE7' : '#F3F4F6',
                        color: row.status === 'Filled' ? '#166534' : '#6B7280',
                        borderRadius: '9999px', padding: '2px 10px', fontSize: '11px', fontWeight: 600,
                      }}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cash & Transfers tab */}
      {activeTab === 'cash' && (
        <div id="trade-panel-cash" role="tabpanel" aria-labelledby="trade-tab-cash">
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {[
              { label: 'Available Cash', value: '$0.00', sub: 'Cash available for trading' },
              { label: 'Buying Power', value: '$0.00', sub: 'Including margin' },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  flex: '1 1 160px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB',
                  borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ color: '#6B7280', fontSize: '12px', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase' }}>{card.label}</div>
                <div style={{ color: '#111827', fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{card.value}</div>
                <div style={{ color: '#9CA3AF', fontSize: '12px' }}>{card.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: '16px' }}>
            <button
              type="button"
              onClick={() => {}}
              style={{
                backgroundColor: 'transparent', color: '#374151',
                border: '1px solid #E0CD72', borderRadius: '6px',
                padding: '8px 20px', fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              }}
            >
              Transfer Funds
            </button>
          </div>
          <div style={{
            backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px',
            padding: '14px 16px', color: '#1E40AF', fontSize: '13px',
          }}>
            Connect a brokerage account to enable live trading and see real balances.
          </div>
        </div>
      )}
    </div>
  );
}
