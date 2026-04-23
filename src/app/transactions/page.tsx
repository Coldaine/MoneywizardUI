import { DashboardCard } from "@/components/DashboardCard";

const transactions = [
  { date: 'Apr 22', merchant: 'Starbucks', category: '☕ Food & Dining', account: 'SoFi Credit Card', amount: '-$5.45', status: 'Reviewed' },
  { date: 'Apr 21', merchant: 'Employer Inc', category: '💰 Income', account: 'SoFi Checking', amount: '+$2,500.00', status: 'New', isIncome: true },
  { date: 'Apr 20', merchant: 'Shell Oil', category: '⛽ Auto & Transport', account: 'SoFi Credit Card', amount: '-$45.00', status: 'Reviewed' },
  { date: 'Apr 19', merchant: 'Amazon', category: '🛍️ Shopping', account: 'SoFi Credit Card', amount: '-$122.30', status: 'Reviewed' },
  { date: 'Apr 18', merchant: 'Netflix', category: '📺 Entertainment', account: 'SoFi Credit Card', amount: '-$15.99', status: 'Reviewed' },
  { date: 'Apr 17', merchant: 'Whole Foods', category: '🛒 Groceries', account: 'SoFi Checking', amount: '-$84.12', status: 'Reviewed' },
  { date: 'Apr 16', merchant: 'Landlord Props', category: '🏠 Housing', account: 'SoFi Checking', amount: '-$1,385.00', status: 'Reviewed' },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4">
          <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors">Date: Last 30 days</button>
          <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors">Filters</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-white border border-gray-200 px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors">Download CSV</button>
          <button className="bg-primary text-white px-3 py-1.5 rounded-md text-sm font-bold hover:bg-primary/90 transition-colors">+ Add Transaction</button>
        </div>
      </div>

      <div className="card-monarch p-0 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-4 font-bold text-secondary uppercase tracking-wider text-[10px]">Date</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider text-[10px]">Merchant</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider text-[10px]">Category</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider text-[10px]">Account</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider text-[10px] text-right">Amount</th>
              <th className="p-4 font-bold text-secondary uppercase tracking-wider text-[10px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group">
                <td className="p-4 text-secondary">{t.date}</td>
                <td className="p-4 font-semibold">{t.merchant}</td>
                <td className="p-4">
                  <span className="bg-gray-100 px-2 py-1 rounded-md text-xs">{t.category}</span>
                </td>
                <td className="p-4 text-secondary">{t.account}</td>
                <td className={`p-4 text-right font-bold ${t.isIncome ? 'text-chart-teal' : ''}`}>
                  {t.amount}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.status === 'New' ? 'bg-primary text-white' : 'bg-gray-200 text-secondary'}`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button className="text-secondary text-sm font-semibold hover:text-primary transition-colors">Show more transactions</button>
      </div>
    </div>
  );
}
