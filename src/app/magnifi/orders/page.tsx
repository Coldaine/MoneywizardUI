'use client';

import { useState } from 'react';

type OrderStatus = 'Open' | 'Pending' | 'Filled' | 'Cancelled';
type OrderSide = 'Buy' | 'Sell';
type OrderType = 'Market' | 'Limit' | 'Stop';

interface Order {
  id: string;
  date: string;
  account: string;
  side: OrderSide;
  type: OrderType;
  security: string;
  qty: number;
  limitPrice?: string;
  filledPrice?: string;
  status: OrderStatus;
  expiry: string;
}

const ORDERS: Order[] = [
  { id: 'ORD-1001', date: 'Apr 25, 9:31 AM', account: 'Fidelity',  side: 'Buy',  type: 'Limit',  security: 'AAPL', qty: 5,  limitPrice: '$182.00', filledPrice: undefined,  status: 'Open',      expiry: 'GTC' },
  { id: 'ORD-1002', date: 'Apr 25, 9:15 AM', account: 'Robinhood', side: 'Buy',  type: 'Market', security: 'NVDA', qty: 2,  limitPrice: undefined,  filledPrice: '$912.44', status: 'Filled',    expiry: 'Day' },
  { id: 'ORD-1003', date: 'Apr 24, 3:42 PM', account: 'Fidelity',  side: 'Sell', type: 'Stop',   security: 'TSLA', qty: 10, limitPrice: '$170.00', filledPrice: undefined,  status: 'Open',      expiry: 'GTC' },
  { id: 'ORD-1004', date: 'Apr 24, 11:02 AM',account: 'Robinhood', side: 'Buy',  type: 'Limit',  security: 'MSFT', qty: 3,  limitPrice: '$413.00', filledPrice: undefined,  status: 'Pending',   expiry: 'Day' },
  { id: 'ORD-1005', date: 'Apr 23, 2:18 PM', account: 'Fidelity',  side: 'Buy',  type: 'Limit',  security: 'VTI',  qty: 8,  limitPrice: '$238.00', filledPrice: '$241.87',  status: 'Filled',    expiry: 'Day' },
  { id: 'ORD-1006', date: 'Apr 22, 10:00 AM',account: 'Coinbase',  side: 'Buy',  type: 'Limit',  security: 'GBTC', qty: 20, limitPrice: '$50.00',  filledPrice: undefined,  status: 'Cancelled', expiry: 'Day' },
  { id: 'ORD-1007', date: 'Apr 21, 4:00 PM', account: 'Fidelity',  side: 'Sell', type: 'Market', security: 'BND',  qty: 5,  limitPrice: undefined,  filledPrice: '$73.42',  status: 'Filled',    expiry: 'Day' },
];

const STATUS_STYLE: Record<OrderStatus, { bg: string; color: string }> = {
  Open:      { bg: 'rgba(224,205,114,0.15)', color: '#B89A00' },
  Pending:   { bg: 'rgba(96,96,96,0.12)',    color: '#606060' },
  Filled:    { bg: 'rgba(22,181,72,0.12)',   color: '#16B548' },
  Cancelled: { bg: 'rgba(245,68,29,0.12)',   color: '#F5441D' },
};

const SIDE_STYLE: Record<OrderSide, { color: string }> = {
  Buy:  { color: '#16B548' },
  Sell: { color: '#F5441D' },
};

const STATUSES: (OrderStatus | 'All')[] = ['All', 'Open', 'Pending', 'Filled', 'Cancelled'];
const ACCOUNTS = ['All Accounts', 'Fidelity', 'Robinhood', 'Coinbase'];

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'All'>('All');
  const [accountFilter, setAccountFilter] = useState('All Accounts');

  const filtered = ORDERS.filter((o) => {
    if (statusFilter !== 'All' && o.status !== statusFilter) return false;
    if (accountFilter !== 'All Accounts' && o.account !== accountFilter) return false;
    return true;
  });

  const openCount    = ORDERS.filter((o) => o.status === 'Open').length;
  const pendingCount = ORDERS.filter((o) => o.status === 'Pending').length;
  const filledToday  = ORDERS.filter((o) => o.status === 'Filled' && o.date.startsWith('Apr 25')).length;

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Orders</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Open, pending, and recent order history across all linked accounts.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card-magnifi text-center py-4">
          <p className="text-3xl font-bold text-[#030F12]">{openCount}</p>
          <p className="text-xs mt-1" style={{ color: '#606060' }}>Open Orders</p>
        </div>
        <div className="card-magnifi text-center py-4">
          <p className="text-3xl font-bold" style={{ color: '#606060' }}>{pendingCount}</p>
          <p className="text-xs mt-1" style={{ color: '#606060' }}>Pending</p>
        </div>
        <div className="card-magnifi text-center py-4">
          <p className="text-3xl font-bold" style={{ color: '#16B548' }}>{filledToday}</p>
          <p className="text-xs mt-1" style={{ color: '#606060' }}>Filled Today</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card-magnifi flex flex-wrap gap-3 items-center">
        {/* Status pills */}
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((s) => {
            const style = s === 'All' ? undefined : STATUS_STYLE[s];
            return (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className="rounded-full px-3 py-1 text-xs font-semibold border transition-colors"
                style={
                  statusFilter === s
                    ? { background: s === 'All' ? '#030F12' : style!.bg, color: s === 'All' ? '#E0CD72' : style!.color, borderColor: 'transparent' }
                    : { background: 'transparent', color: '#606060', borderColor: '#E0E0E0' }
                }
              >
                {s}
              </button>
            );
          })}
        </div>
        <div className="ml-auto">
          <select
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value)}
            className="rounded-full border px-3 py-1.5 text-sm outline-none"
            style={{ borderColor: '#E0E0E0', color: '#030F12' }}
          >
            {ACCOUNTS.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
      </div>

      {/* Orders table */}
      <div className="card-magnifi overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '2px solid #F0F0F0' }}>
              {['Order ID', 'Date', 'Account', 'Side', 'Type', 'Security', 'Qty', 'Limit / Stop', 'Filled At', 'Status', 'Expiry'].map((h) => (
                <th key={h} className="pb-2 text-left font-semibold pr-3 whitespace-nowrap" style={{ color: '#606060' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center py-8" style={{ color: '#606060' }}>
                  No orders match current filters.
                </td>
              </tr>
            )}
            {filtered.map((o) => {
              const ss = STATUS_STYLE[o.status];
              const side = SIDE_STYLE[o.side];
              return (
                <tr key={o.id} className="hover:bg-gray-50 transition-colors" style={{ borderBottom: '1px solid #F8F8F8' }}>
                  <td className="py-3 pr-3 font-mono text-xs text-[#030F12]">{o.id}</td>
                  <td className="py-3 pr-3 whitespace-nowrap" style={{ color: '#606060' }}>{o.date}</td>
                  <td className="py-3 pr-3 font-medium text-[#030F12]">{o.account}</td>
                  <td className="py-3 pr-3 font-semibold" style={{ color: side.color }}>{o.side}</td>
                  <td className="py-3 pr-3 text-[#030F12]">{o.type}</td>
                  <td className="py-3 pr-3 font-semibold text-[#030F12]">{o.security}</td>
                  <td className="py-3 pr-3 text-[#030F12]">{o.qty}</td>
                  <td className="py-3 pr-3" style={{ color: '#606060' }}>{o.limitPrice ?? '—'}</td>
                  <td className="py-3 pr-3" style={{ color: '#16B548' }}>{o.filledPrice ?? '—'}</td>
                  <td className="py-3 pr-3">
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: ss.bg, color: ss.color }}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 pr-3 text-xs" style={{ color: '#606060' }}>{o.expiry}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
