import { DashboardCard } from "@/components/DashboardCard";

const incomePoints = [160, 155, 162, 158, 165, 170, 168, 175, 172, 178, 180, 182,
  185, 183, 188, 190, 187, 192, 195, 193, 198, 200, 197, 204];
const expensePoints = [80, 78, 82, 79, 85, 83, 87, 84, 88, 86, 90, 88,
  91, 89, 93, 92, 94, 91, 95, 93, 96, 94, 97, 96];

const totalPoints = 24;
const svgWidth = 800;
const svgHeight = 200;
const maxVal = 220;

function buildPath(points: number[]): string {
  return points
    .map((v, i) => {
      const x = (i / (totalPoints - 1)) * svgWidth;
      const y = svgHeight - (v / maxVal) * svgHeight;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

function buildAreaPath(points: number[]): string {
  const line = buildPath(points);
  const lastX = svgWidth;
  return `${line} L${lastX},${svgHeight} L0,${svgHeight} Z`;
}

const incomePath = buildPath(incomePoints);
const incomeArea = buildAreaPath(incomePoints);
const expensePath = buildPath(expensePoints);

export default function CashFlowPage() {
  return (
    <div className="space-y-6">
      {/* Header row */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Cash Flow</h1>
        <div className="flex items-center gap-3">
          {/* Period toggle */}
          <div role="tablist" aria-label="View period" className="flex bg-gray-100 rounded-lg p-1 text-sm font-semibold">
            <button role="tab" aria-selected={true} className="bg-white shadow px-4 py-1.5 rounded-md">Monthly</button>
            <button role="tab" aria-selected={false} aria-disabled="true" className="px-4 py-1.5 rounded-md text-secondary hover:text-foreground">Quarterly</button>
            <button role="tab" aria-selected={false} aria-disabled="true" className="px-4 py-1.5 rounded-md text-secondary hover:text-foreground">Yearly</button>
          </div>
        </div>
      </div>

      {/* Main chart card */}
      <DashboardCard
        title=""
        headerAction={
          <div className="flex items-center gap-4">
            {/* Year navigator */}
            <div className="flex items-center gap-2 text-sm font-semibold">
              <button aria-label="Previous year" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-secondary">&#8249;</button>
              <span className="text-secondary">2024</span>
              <span className="font-bold">2025</span>
              <span className="text-secondary">2026</span>
              <button aria-label="Next year" className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-secondary">&#8250;</button>
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 text-xs text-secondary">
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-chart-teal rounded"></span> Income
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-primary rounded"></span> Expenses
              </span>
            </div>
          </div>
        }
      >
        {/* SVG area + line chart */}
        <div className="w-full overflow-hidden rounded-lg" style={{ height: "200px" }}>
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            {/* Income area fill */}
            <path d={incomeArea} fill="rgba(7,151,185,0.1)" />
            {/* Income line */}
            <path d={incomePath} fill="none" stroke="#0797B9" strokeWidth="2.5" strokeLinejoin="round" />
            {/* Expense line */}
            <path d={expensePath} fill="none" stroke="#FF692D" strokeWidth="2" strokeLinejoin="round" strokeDasharray="6,3" />
          </svg>
        </div>
      </DashboardCard>

      {/* Monthly detail */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">April 2026</h2>
          <button className="border border-gray-200 bg-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors">
            Bar Chart
          </button>
        </div>

        {/* 3 summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="card-monarch text-center py-5">
            <p className="text-xs text-secondary uppercase tracking-wider mb-1">Income</p>
            <p className="text-2xl font-bold">$17,804</p>
          </div>
          <div className="card-monarch text-center py-5">
            <p className="text-xs text-secondary uppercase tracking-wider mb-1">Expenses</p>
            <p className="text-2xl font-bold text-primary">$5,601</p>
          </div>
          <div className="card-monarch text-center py-5">
            <p className="text-xs text-secondary uppercase tracking-wider mb-1">Total Savings</p>
            <p className="text-2xl font-bold text-chart-teal">$12,202</p>
          </div>
        </div>

        {/* Income breakdown table */}
        <DashboardCard title="">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 font-bold text-secondary uppercase tracking-wider text-[10px]">Income</th>
                <th className="text-right py-2 font-bold text-secondary uppercase tracking-wider text-[10px]">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-l-4 border-chart-teal">
                <td className="py-3 pl-3"><div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-chart-teal inline-block flex-shrink-0"></span>
                  <span className="font-semibold">Interest</span>
                </div></td>
                <td className="py-3 text-right font-bold pr-2">$17,804</td>
              </tr>
              <tr className="border-l-4 border-green-500">
                <td className="py-3 pl-3"><div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block flex-shrink-0"></span>
                  <span className="font-semibold">Other Income</span>
                </div></td>
                <td className="py-3 text-right font-bold pr-2 text-secondary">$0</td>
              </tr>
            </tbody>
          </table>
        </DashboardCard>
      </div>
    </div>
  );
}
