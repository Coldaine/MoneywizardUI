import { DashboardCard } from "@/components/DashboardCard";

export default function AccountsPage() {
  return (
    <div className="flex gap-6">
      <div className="flex-grow space-y-6">
        
        {/* Net Worth Performance Chart */}
        <DashboardCard 
          title="Net Worth"
          headerAction={
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold">$292,397.96</span>
              <span className="text-chart-teal text-sm font-bold">▲ $3,609.86 (1.3%)</span>
            </div>
          }
        >
          <div className="h-40 w-full bg-gray-50 rounded-lg relative overflow-hidden">
            {/* SVG placeholder for the area chart */}
            <svg viewBox="0 0 100 20" className="absolute bottom-0 left-0 w-full h-full preserve-aspect-ratio-none">
              <path 
                d="M0,20 L0,10 L10,8 L20,12 L30,11 L40,10 L50,11 L60,9 L70,8 L80,7 L90,6 L100,5 L100,20 Z" 
                fill="rgba(7, 151, 185, 0.1)"
              />
              <path 
                d="M0,10 L10,8 L20,12 L30,11 L40,10 L50,11 L60,9 L70,8 L80,7 L90,6 L100,5" 
                fill="none" 
                stroke="var(--chart-teal)" 
                strokeWidth="0.5"
              />
            </svg>
          </div>
        </DashboardCard>

        {/* Account Groups */}
        <div className="space-y-6">
          {/* Credit Cards */}
          <div>
            <div className="flex justify-between items-center mb-2 px-2">
              <h2 className="font-bold">Credit Cards</h2>
              <span className="text-secondary font-bold">$6,706.59</span>
            </div>
            <div className="card-monarch p-0 overflow-hidden">
              <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chart-teal rounded-full flex items-center justify-center text-white">🏦</div>
                  <div>
                    <div className="font-semibold text-sm">SoFi Credit Card (...2503)</div>
                    <div className="text-xs text-secondary">Credit Card</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">$6,706.59</div>
                  <div className="text-[10px] text-secondary">3 hours ago</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cash */}
          <div>
            <div className="flex justify-between items-center mb-2 px-2">
              <div className="flex items-center gap-2">
                <h2 className="font-bold">Cash</h2>
                <span className="text-chart-teal text-xs font-bold">▲ $16,032.00 (31.6%)</span>
              </div>
              <span className="text-secondary font-bold">$66,808.47</span>
            </div>
            <div className="card-monarch p-0 overflow-hidden">
              {[
                { name: 'SoFi Checking (...7792)', balance: '$0.00' },
                { name: 'SoFi Savings (...9170)', balance: '$66,808.47' },
              ].map((acc, i) => (
                <div key={i} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer ${i === 0 ? 'border-b border-gray-100' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-chart-teal rounded-full flex items-center justify-center text-white">💰</div>
                    <div>
                      <div className="font-semibold text-sm">{acc.name}</div>
                      <div className="text-xs text-secondary">Checking</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-sm">{acc.balance}</div>
                    <div className="text-[10px] text-secondary">3 hours ago</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Sidebar */}
      <div className="w-80 space-y-6">
        <DashboardCard title="Summary">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Assets</span>
                <span>$299,104.55</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden flex">
                <div className="bg-chart-teal w-4/5"></div>
                <div className="bg-primary w-1/5 opacity-50"></div>
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-[10px] text-secondary">
                  <span>Investments</span>
                  <span className="font-bold">$232,296.08</span>
                </div>
                <div className="flex justify-between text-[10px] text-secondary">
                  <span>Cash</span>
                  <span className="font-bold">$66,808.47</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Liabilities</span>
                <span>$6,706.59</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 w-1/4"></div>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-[10px] text-secondary">
                  <span>Credit Cards</span>
                  <span className="font-bold">$6,706.59</span>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}
