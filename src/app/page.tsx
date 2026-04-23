import { DashboardCard } from "@/components/DashboardCard";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Net Worth Widget */}
        <DashboardCard 
          title="Net Worth" 
          className="col-span-full"
          headerAction={<span className="text-xl font-bold">$292,397.96</span>}
          footer={<button className="text-primary text-sm font-semibold">View all accounts</button>}
        >
          <div className="h-48 w-full bg-gray-50 rounded-lg flex items-end p-2 gap-1">
            {[40, 45, 42, 48, 52, 50, 55, 58, 60, 62, 65, 68].map((h, i) => (
              <div 
                key={i} 
                className="bg-chart-teal/30 hover:bg-chart-teal/50 transition-colors rounded-t flex-1" 
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        </DashboardCard>

        {/* Spending Widget */}
        <DashboardCard 
          title="Spending"
          headerAction={<span className="font-bold">$5,601.11</span>}
        >
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Housing</span>
                <span>$1,385.00</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-4/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Food & Dining</span>
                <span>$702.32</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-chart-teal h-full w-3/5"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span>Auto & Transport</span>
                <span>$450.00</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-accent h-full w-2/5"></div>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Budget Widget */}
        <DashboardCard 
          title="Budget - April"
          headerAction={<span className="text-chart-teal font-bold">$5,390 left</span>}
        >
          <div className="flex flex-col items-center justify-center h-full py-4 text-center">
            <div className="w-24 h-24 rounded-full border-8 border-chart-teal border-t-gray-100 flex items-center justify-center mb-2">
              <span className="text-lg font-bold">68%</span>
            </div>
            <p className="text-sm text-secondary">of budget remaining</p>
          </div>
        </DashboardCard>

        {/* Recent Transactions Widget */}
        <DashboardCard 
          title="Recent Transactions"
          className="lg:col-span-1"
        >
          <div className="space-y-3">
            {[
              { m: 'Starbucks', c: '☕ Food & Dining', a: '-$5.45' },
              { m: 'Shell Oil', c: '⛽ Auto', a: '-$45.00' },
              { m: 'Employer Inc', c: '💰 Income', a: '+$2,500.00', p: true },
            ].map((t, i) => (
              <div key={i} className="flex justify-between items-center text-sm border-b border-gray-50 pb-2">
                <div>
                  <div className="font-semibold">{t.m}</div>
                  <div className="text-xs text-secondary">{t.c}</div>
                </div>
                <div className={t.p ? 'text-chart-teal font-bold' : 'font-bold'}>{t.a}</div>
              </div>
            ))}
          </div>
        </DashboardCard>

      </div>
    </div>
  );
}
