'use client';

import { useState } from 'react';

type Step = 'select-accounts' | 'enter-amount' | 'confirm' | 'success';
type TransferType = 'cash' | 'shares';

const LINKED_ACCOUNTS = [
  { id: 'fidelity',  name: 'Fidelity Brokerage',  last4: '4821', cash: '$42,880.00', logo: '🏦' },
  { id: 'robinhood', name: 'Robinhood',            last4: '7293', cash: '$18,620.00', logo: '📈' },
  { id: 'coinbase',  name: 'Coinbase',             last4: '1847', cash: '$1,840.00',  logo: '🪙' },
];

const QUICK_AMOUNTS = ['$500', '$1,000', '$2,500', '$5,000'];

export default function TransferPage() {
  const [step, setStep] = useState<Step>('select-accounts');
  const [fromId, setFromId] = useState<string | null>(null);
  const [toId,   setToId]   = useState<string | null>(null);
  const [transferType, setTransferType] = useState<TransferType>('cash');
  const [amount, setAmount] = useState('');

  const fromAcct = LINKED_ACCOUNTS.find((a) => a.id === fromId);
  const toAcct   = LINKED_ACCOUNTS.find((a) => a.id === toId);

  const fromOptions = LINKED_ACCOUNTS.filter((a) => a.id !== toId);
  const toOptions   = LINKED_ACCOUNTS.filter((a) => a.id !== fromId);

  const amtDisplay = amount ? '$' + parseFloat(amount || '0').toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '';

  const STEPS: Step[] = ['select-accounts', 'enter-amount', 'confirm', 'success'];
  const stepIdx = STEPS.indexOf(step);

  function canContinueStep1() { return !!fromId && !!toId && fromId !== toId; }
  function canContinueStep2() { return !!amount && parseFloat(amount) > 0; }

  return (
    <div className="space-y-6 max-w-lg">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Transfer</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Move cash or positions between your linked brokerage accounts.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-2">
        {(['select-accounts', 'enter-amount', 'confirm'] as const).map((s, i) => {
          const done   = i < stepIdx;
          const active = i === stepIdx;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ background: done || active ? '#E0CD72' : '#F0F0F0', color: done || active ? '#030F12' : '#9CA3AF' }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span className="text-xs font-medium hidden sm:inline" style={{ color: active ? '#030F12' : '#9CA3AF' }}>
                {['Accounts', 'Amount', 'Confirm'][i]}
              </span>
              {i < 2 && <div className="w-8 h-px" style={{ background: done ? '#E0CD72' : '#E0E0E0' }} />}
            </div>
          );
        })}
      </div>

      {/* Step 1: Select accounts */}
      {step === 'select-accounts' && (
        <div className="space-y-5">
          <div>
            <h2 className="font-semibold text-[#030F12] mb-2">From</h2>
            <div className="space-y-2">
              {fromOptions.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setFromId(a.id)}
                  className="w-full card-magnifi flex items-center gap-3 text-left transition-all hover:shadow-md"
                  style={fromId === a.id ? { outline: '2px solid #E0CD72' } : {}}
                >
                  <span className="text-2xl" aria-hidden="true">{a.logo}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#030F12]">{a.name}</p>
                    <p className="text-xs" style={{ color: '#606060' }}>•••• {a.last4}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[#030F12]">{a.cash}</p>
                    <p className="text-xs" style={{ color: '#606060' }}>Cash</p>
                  </div>
                  {fromId === a.id && <span className="text-[#E0CD72] text-lg">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: '#E0E0E0' }} />
            <span className="text-xl" aria-hidden="true">⇅</span>
            <div className="flex-1 h-px" style={{ background: '#E0E0E0' }} />
          </div>

          <div>
            <h2 className="font-semibold text-[#030F12] mb-2">To</h2>
            <div className="space-y-2">
              {toOptions.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setToId(a.id)}
                  className="w-full card-magnifi flex items-center gap-3 text-left transition-all hover:shadow-md"
                  style={toId === a.id ? { outline: '2px solid #E0CD72' } : {}}
                >
                  <span className="text-2xl" aria-hidden="true">{a.logo}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#030F12]">{a.name}</p>
                    <p className="text-xs" style={{ color: '#606060' }}>•••• {a.last4}</p>
                  </div>
                  {toId === a.id && <span className="text-[#E0CD72] text-lg">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => canContinueStep1() && setStep('enter-amount')}
            disabled={!canContinueStep1()}
            className="w-full rounded-full bg-[#E0CD72] text-[#030F12] font-semibold py-3 hover:bg-[#E7C751] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Enter amount */}
      {step === 'enter-amount' && (
        <div className="space-y-5">
          {/* Transfer type toggle */}
          <div className="flex gap-1 rounded-xl p-1 w-fit" style={{ background: '#F4F4F5' }}>
            {(['cash', 'shares'] as TransferType[]).map((t) => (
              <button
                key={t}
                onClick={() => setTransferType(t)}
                className="rounded-lg px-5 py-1.5 text-sm font-semibold capitalize transition-colors"
                style={
                  transferType === t
                    ? { background: '#fff', color: '#030F12', boxShadow: '0 1px 4px #00000014' }
                    : { color: '#606060' }
                }
              >
                {t === 'cash' ? 'Cash ($)' : 'Shares'}
              </button>
            ))}
          </div>

          {/* Route display */}
          <div className="card-magnifi flex items-center gap-2" style={{ background: '#F9F9F9' }}>
            <span className="text-xl" aria-hidden="true">{fromAcct?.logo}</span>
            <span className="font-medium text-sm text-[#030F12]">{fromAcct?.name}</span>
            <span className="mx-2 text-[#9CA3AF]">→</span>
            <span className="text-xl" aria-hidden="true">{toAcct?.logo}</span>
            <span className="font-medium text-sm text-[#030F12]">{toAcct?.name}</span>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#030F12] block mb-2">
              {transferType === 'cash' ? 'Amount (USD)' : 'Quantity (shares)'}
            </label>
            <input
              type="text"
              inputMode="decimal"
              value={transferType === 'cash' && amount ? '$' + amount : amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder={transferType === 'cash' ? '$0.00' : '0 shares'}
              className="w-full text-3xl font-bold text-center py-4 rounded-2xl border outline-none"
              style={{ borderColor: '#E0E0E0', color: '#030F12' }}
            />
            {transferType === 'cash' && (
              <div className="flex gap-2 mt-3 flex-wrap">
                {QUICK_AMOUNTS.map((qa) => (
                  <button
                    key={qa}
                    onClick={() => setAmount(qa.replace(/[$,]/g, ''))}
                    className="rounded-full border px-4 py-1.5 text-sm font-semibold hover:bg-gray-50 transition-colors"
                    style={{ borderColor: '#E0E0E0', color: '#030F12' }}
                  >
                    {qa}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setStep('select-accounts')} className="flex-1 rounded-full border border-[#030F12] text-[#030F12] font-semibold py-3 hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button
              onClick={() => canContinueStep2() && setStep('confirm')}
              disabled={!canContinueStep2()}
              className="flex-1 rounded-full bg-[#E0CD72] text-[#030F12] font-semibold py-3 hover:bg-[#E7C751] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 'confirm' && (
        <div className="space-y-4">
          <div className="card-magnifi space-y-4">
            <h2 className="font-semibold text-[#030F12]">Review transfer</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'From',   value: `${fromAcct?.name} •••• ${fromAcct?.last4}` },
                { label: 'To',     value: `${toAcct?.name} •••• ${toAcct?.last4}`   },
                { label: 'Amount', value: transferType === 'cash' ? amtDisplay : `${amount} shares` },
                { label: 'Type',   value: transferType === 'cash' ? 'Cash transfer' : 'In-kind transfer' },
                { label: 'ETA',    value: '1–3 business days' },
                { label: 'Fee',    value: 'None' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span style={{ color: '#606060' }}>{label}</span>
                  <span className="font-semibold text-[#030F12]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setStep('enter-amount')} className="flex-1 rounded-full border border-[#030F12] text-[#030F12] font-semibold py-3 hover:bg-gray-50 transition-colors">
              Back
            </button>
            <button
              onClick={() => setStep('success')}
              className="flex-1 rounded-full bg-[#E0CD72] text-[#030F12] font-semibold py-3 hover:bg-[#E7C751] transition-colors"
            >
              Confirm Transfer
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 'success' && (
        <div className="card-magnifi text-center py-10 space-y-4">
          <div className="text-5xl">✅</div>
          <h2 className="text-xl font-bold text-[#030F12]">Transfer Initiated</h2>
          <p className="text-sm" style={{ color: '#606060' }}>
            {transferType === 'cash' ? amtDisplay : `${amount} shares`} from {fromAcct?.name} will arrive in {toAcct?.name} within 1–3 business days.
          </p>
          <button
            onClick={() => { setStep('select-accounts'); setFromId(null); setToId(null); setAmount(''); }}
            className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-8 py-2.5 hover:bg-[#E7C751] transition-colors"
          >
            New Transfer
          </button>
        </div>
      )}
    </div>
  );
}
