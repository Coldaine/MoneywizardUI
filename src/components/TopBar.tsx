import React from 'react';

export const TopBar = ({ title = "Dashboard" }: { title?: string }) => {
  return (
    <header className="topbar-monarch justify-between">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search (⌘K)" 
            className="bg-gray-100 border-none rounded-md px-3 py-1.5 text-sm w-64 focus:ring-1 focus:ring-primary outline-none"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">🔔</button>
          <button className="p-2 hover:bg-gray-100 rounded-full">⚙️</button>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center font-bold text-xs">P</div>
        </div>
      </div>
    </header>
  );
};
