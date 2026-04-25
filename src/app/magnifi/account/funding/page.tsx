'use client';

import { useState } from 'react';

type Step = 'select-bank' | 'enter-amount' | 'confirm' | 'success';

const BANKS = [
  { id: 'chase',   name: 'Chase Checking',   last4: '4821', balance: '$8,420.00',  logo: '🏦' },
  { id: 'bofa',    name: 'Bank of America',   last4: '2293', balance: '$3,142.55',  logo: '🏛️' },
  { id: 'wells',   name: 'Wells Fargo',       last4: '9910', balance: '$12,008.30', logo: '🐴' },
];

const DEST_ACCOUNTS = [
  { id: 'fidelity', name: 'Fidelity Brokerage', last4: '4821', available: '$42,880.00' },
  { id: 'robinhood', name: 'Robinhood',          last4: '7293', available: '$18,620.00' },
];

const QUICK_AMOUNTS = ['$500', '$1,000', '$2,500', '$5,000'];

export default function FundingPage() {
  const [step, setStep] = useState<Step>('select-bank');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [selectedDest, setSelectedDest] = useState<string>(DEST_ACCOUNTS[0].id);
  const [amount, setAmount] = useState('');

  const bank = BANKS.find((b) => b.id === selectedBank);
  const dest = DEST_ACCOUNTS.find((d) => d.id === selectedDest);

  function handleAmountInput(raw: string) {
    const stripped = raw.replace(/[^0-9.]/g, '');
    setAmount(stripped);
  }

  function handleQuickAmount(qa: string) {
    setAmount(qa.replace(/[$,]/g, ''));
  }

  const amtDisplay = amount ? fmt(amount) : '';

  return (
    <div className="space-y-6 max-w-lg">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#030F12]">Fund Account</h1>
        <p className="text-sm mt-0.5" style={{ color: '#606060' }}>Transfer funds from your bank to a linked brokerage account.</p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center gap-2">
        {(['select-bank', 'enter-amount', 'confirm'] as const).map((s, i) => {
          const steps: Step[] = ['select-bank', 'enter-amount', 'confirm', 'success'];
          const idx  = steps.indexOf(step);
          const done = i < idx;
          const active = i === idx;
          return (
            <div key={s} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{
                  background: done || active ? '#E0CD72' : '#F0F0F0',
                  color: done || active ? '#030F12' : '#9CA3AF',
                }}
              >
                {done ? '✓' : i + 1}
              </div>
              <span className="text-xs font-medium hidden sm:inline" style={{ color: active ? '#030F12' : '#9CA3AF' }}>
                {['Select Bank', 'Amount', 'Confirm'][i]}
              </span>
              {i < 2 && <div className="flex-1 h-px w-8" style={{ background: done ? '#E0CD72' : '#E0E0E0' }} />}
            </div>
          );
        })}
      </div>

      {/* Step: Select Bank */}
      {step === 'select-bank' && (
        <div className="space-y-4">
          <h2 className="font-semibold text-[#030F12]">Select source bank account</h2>
          {BANKS.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBank(b.id)}
              className="w-full card-magnifi flex items-center gap-4 text-left transition-all hover:shadow-md"
              style={selectedBank === b.id ? { outline: '2px solid #E0CD72' } : {}}
            >
              <span className="text-3xl" aria-hidden="true">{b.logo}</span>
              <div className="flex-1">
                <p className="font-semibold text-[#030F12]">{b.name}</p>
                <p className="text-sm" style={{ color: '#606060' }}>Checking •••• {b.last4}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-[#030F12]">{b.balance}</p>
                <p className="text-xs" style={{ color: '#606060' }}>Available</p>
              </div>
              {selectedBank === b.id && (
                <span className="text-[#E0CD72] text-xl shrink-0">✓</span>
              )}
            </button>
          ))}
          <button
            onClick={() => selectedBank && setStep('enter-amount')}
            disabled={!selectedBank}
            className="w-full rounded-full bg-[#E0CD72] text-[#030F12] font-semibold py-3 hover:bg-[#E7C751] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step: Enter Amount */}
      {step === 'enter-amount' && (
        <div className="space-y-4">
          <div className="card-magnifi flex items-center gap-3" style={{ background: '#F9F9F9' }}>
            <span className="text-2xl" aria-hidden="true">{bank?.logo}</span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#606060' }}>From</p>
              <p className="font-semibold text-[#030F12]">{bank?.name} •••• {bank?.last4}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#030F12] block mb-1">Destination account</label>
            <div className="space-y-2">
              {DEST_ACCOUNTS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDest(d.id)}
                  className="w-full card-magnifi flex items-center gap-3 text-left"
                  style={selectedDest === d.id ? { outline: '2px solid #E0CD72' } : {}}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm text-[#030F12]">{d.name}</p>
                    <p className="text-xs" style={{ color: '#606060' }}>•••• {d.last4}</p>
                  </div>
                  {selectedDest === d.id && <span className="text-[#E0CD72]">✓</span>}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-[#030F12] block mb-2">Amount</label>
            <input
              type="text"
              inputMode="decimal"
              value={amount ? '$' + amount : ''}
              onChange={(e) => handleAmountInput(e.target.value)}
              placeholder="$0.00"
              className="w-full text-3xl font-bold text-center py-4 rounded-2xl border outline-none"
              style={{ borderColor: '#E0E0E0', color: '#030F12' }}
            />
            <div className="flex gap-2 mt-3 flex-wrap">
              {QUICK_AMOUNTS.map((qa) => (
                <button
                  key={qa}
                  onClick={() => handleQuickAmount(qa)}
                  className="rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors hover:bg-gray-50"
                  style={{ borderColor: '#E0E0E0', color: '#030F12' }}
                >
                  {qa}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep('select-bank')}
              className="flex-1 rounded-full border border-[#030F12] text-[#030F12] font-semibold py-3 hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => parseFloat(amount || '0') > 0 && setStep('confirm')}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 rounded-full bg-[#E0CD72] text-[#030F12] font-semibold py-3 hover:bg-[#E7C751] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Review
            </button>
          </div>
        </div>
      )}

      {/* Step: Confirm */}
      {step === 'confirm' && (
        <div className="space-y-4">
          <div className="card-magnifi space-y-4">
            <h2 className="font-semibold text-[#030F12]">Review transfer</h2>
            <div className="space-y-3 text-sm">
              {[
                { label: 'From',   value: `${bank?.name} •••• ${bank?.last4}` },
                { label: 'To',     value: `${dest?.name} •••• ${dest?.last4}` },
                { label: 'Amount', value: amtDisplay },
                { label: 'ETA',    value: '1–2 business days' },
                { label: 'Fee',    value: 'None' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between">
                  <span style={{ color: '#606060' }}>{label}</span>
                  <span className="font-semibold text-[#030F12]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-center" style={{ color: '#9CA3AF' }}>
            Funds will be available for trading after the transfer clears (1–2 business days).
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => setStep('enter-amount')}
              className="flex-1 rounded-full border border-[#030F12] text-[#030F12] font-semibold py-3 hover:bg-gray-50 transition-colors"
            >
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

      {/* Step: Success */}
      {step === 'success' && (
        <div className="card-magnifi text-center py-10 space-y-4">
          <div className="text-5xl">✅</div>
          <h2 className="text-xl font-bold text-[#030F12]">Transfer Initiated</h2>
          <p className="text-sm" style={{ color: '#606060' }}>
            {amtDisplay} from {bank?.name} will arrive in {dest?.name} within 1–2 business days.
          </p>
          <button
            onClick={() => { setStep('select-bank'); setSelectedBank(null); setAmount(''); }}
            className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-8 py-2.5 hover:bg-[#E7C751] transition-colors"
          >
            Make Another Transfer
          </button>
        </div>
      )}
    </div>
  );
}
