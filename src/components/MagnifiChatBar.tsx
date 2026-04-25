'use client';

import { useState, type KeyboardEvent } from 'react';

export function MagnifiChatBar() {
  const [inputValue, setInputValue] = useState('');

  function handleSend() {
    if (!inputValue.trim()) return;
    setInputValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexShrink: 0,
      }}
    >
      {/* Input with icon */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            position: 'absolute',
            left: '10px',
            color: '#9CA3AF',
            fontSize: '14px',
            pointerEvents: 'none',
          }}
        >
          🔍
        </span>
        <input
          type="text"
          aria-label="How can I help?"
          placeholder="How can I help?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            paddingLeft: '32px',
            paddingRight: '12px',
            paddingTop: '8px',
            paddingBottom: '8px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            fontSize: '14px',
            color: '#111827',
            backgroundColor: '#F9FAFB',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Bar chart icon button */}
      <button
        type="button"
        aria-label="Open charts"
        title="Charts"
        onClick={() => {}}
        style={{
          padding: '8px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: '#9CA3AF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          flexShrink: 0,
        }}
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="12" width="4" height="9" />
          <rect x="10" y="7" width="4" height="14" />
          <rect x="17" y="3" width="4" height="18" />
        </svg>
      </button>

      {/* Sparkle icon button */}
      <button
        type="button"
        aria-label="Open AI suggestions"
        title="AI Suggestions"
        onClick={() => {}}
        style={{
          padding: '8px',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: '#9CA3AF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
          flexShrink: 0,
        }}
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      {/* Send button */}
      <button
        type="button"
        aria-label="Send message"
        onClick={handleSend}
        title="Send"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '9999px',
          backgroundColor: '#E0CD72',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#374151',
          fontSize: '16px',
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        →
      </button>
    </div>
  );
}
