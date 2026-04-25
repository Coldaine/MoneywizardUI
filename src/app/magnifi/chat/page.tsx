'use client';

import { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface Message {
  id: number;
  role: 'user' | 'ai';
  text: string;
}

const pastConversations = [
  { id: 1, title: 'Portfolio review', time: '2 days ago' },
  { id: 2, title: 'NVDA analysis', time: '1 week ago' },
  { id: 3, title: 'Rebalancing strategy', time: '2 weeks ago' },
  { id: 4, title: 'Tax loss harvesting', time: '1 month ago' },
];

const initialMessages: Message[] = [
  { id: 1, role: 'user', text: 'How is my portfolio performing compared to the S&P 500?' },
  {
    id: 2,
    role: 'ai',
    text: 'Your portfolio is up 14.8% year-to-date, outperforming the S&P 500 by 2.3 percentage points. Your strongest performers are NVDA (+87% YTD), AAPL (+18%), and VTI (+11%). Would you like a deeper breakdown?',
  },
  { id: 3, role: 'user', text: 'Yes, show me my top 3 holdings by weight' },
  {
    id: 4,
    role: 'ai',
    text: 'Your top 3 holdings by portfolio weight are: VTI at 5.0% ($12,093), AAPL at 3.5% ($8,471), and NVDA at 3.1% ($7,576). Together they represent 11.6% of your portfolio.',
  },
  { id: 5, role: 'user', text: "What's my biggest risk right now?" },
  {
    id: 6,
    role: 'ai',
    text: 'Your biggest risk is concentration in the technology sector, which represents ~38% of your equity exposure. Consider diversifying into healthcare or consumer staples for better balance.',
  },
];

const suggestedPrompts = [
  'Analyze my portfolio',
  'Find rebalancing opportunities',
  'Explain my risk level',
  'Tax loss harvesting ideas',
];

export default function ChatPage() {
  const [activeConvId, setActiveConvId] = useState(1);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');

  function sendMessage() {
    const text = inputValue.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    const aiMsg: Message = {
      id: Date.now() + 1,
      role: 'ai',
      text: "I'm analyzing your portfolio data. This is a simulated response — in a live environment, I'd provide real-time insights based on your holdings and market conditions.",
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputValue('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') sendMessage();
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-8 overflow-hidden">
      {/* Left panel — chat history */}
      <aside
        className="w-64 shrink-0 flex flex-col border-r"
        style={{ background: '#030F12', borderColor: '#0F2329' }}
      >
        <div className="p-4 border-b" style={{ borderColor: '#0F2329' }}>
          <button
            disabled
            className="w-full rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-4 py-2 text-sm opacity-50 cursor-not-allowed"
          >
            + New Chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-2" title="Mock conversations — messages not loaded in demo">
          {pastConversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveConvId(conv.id)}
              className="w-full text-left px-4 py-3 transition-colors relative"
              style={{
                borderLeft: activeConvId === conv.id ? '3px solid #E0CD72' : '3px solid transparent',
                background: activeConvId === conv.id ? 'rgba(224,205,114,0.08)' : 'transparent',
              }}
            >
              <p
                className="text-sm font-medium truncate"
                style={{ color: activeConvId === conv.id ? '#E0CD72' : '#D1D5DB' }}
              >
                {conv.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: '#606060' }}>
                {conv.time}
              </p>
            </button>
          ))}
        </div>
      </aside>

      {/* Right panel — chat area */}
      <div className="flex-1 flex flex-col bg-[#F4F5F7] min-w-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {messages.map((msg) =>
            msg.role === 'user' ? (
              <div key={msg.id} className="flex justify-end">
                <div
                  className="max-w-[70%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm font-medium leading-relaxed"
                  style={{ background: '#E0CD72', color: '#030F12' }}
                >
                  {msg.text}
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex gap-3 items-start">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5"
                  style={{ background: '#E0CD72', color: '#030F12' }}
                >
                  M
                </div>
                <div
                  className="max-w-[70%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed"
                  style={{ background: '#030F12', color: '#F9FAFB' }}
                >
                  {msg.text}
                </div>
              </div>
            )
          )}
        </div>

        {/* Suggested prompts — shown when only the initial messages exist */}
        {messages.length === initialMessages.length && (
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => setInputValue(prompt)}
                className="px-4 py-1.5 rounded-full text-xs font-medium transition-colors hover:bg-[#E0CD72] hover:text-[#030F12]"
                style={{
                  border: '1.5px solid #E0CD72',
                  color: '#E0CD72',
                  background: 'transparent',
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div
          className="px-6 py-4 border-t flex gap-3 items-center"
          style={{ borderColor: '#E5E7EB', background: '#FFFFFF' }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Magnifi anything about your portfolio..."
            className="flex-1 rounded-full px-5 py-2.5 text-sm border border-gray-200 focus:border-[#E0CD72] focus:ring-2 focus:ring-[#E0CD72] focus:outline-none text-[#030F12] bg-[#F4F5F7]"
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            className="rounded-full bg-[#E0CD72] text-[#030F12] font-semibold px-5 py-2.5 text-sm hover:bg-[#E7C751] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
