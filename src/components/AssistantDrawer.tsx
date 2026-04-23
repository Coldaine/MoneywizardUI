import React, { useState } from 'react';

export const AssistantDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi Patrick! I'm your Magnifi-powered assistant. How can I help with your investments today?" },
    { role: 'user', text: "What are my best performing holdings?" },
    { role: 'assistant', text: "Your top performer this month is **SoFi Robo (...7973)**, up 5.2%. Would you like to see a breakdown of the underlying ETFs or find similar opportunities?" }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', text: input }]);
    setInput('');
    // Mock response delay
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "That's a great question. Let me analyze your portfolio and get back to you in a moment..." }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-primary text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h2 className="font-bold">Magnifi Assistant</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">✕</button>
        </div>
        
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                m.role === 'user' 
                  ? 'bg-primary text-white rounded-br-none' 
                  : 'bg-gray-100 text-foreground rounded-bl-none border border-gray-200'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything about your money..." 
              className="flex-grow bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <button 
              onClick={handleSend}
              className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              ➔
            </button>
          </div>
          <p className="text-[10px] text-secondary mt-2 text-center italic">
            Powered by Magnifi AI • Investment recommendations provided for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
};
