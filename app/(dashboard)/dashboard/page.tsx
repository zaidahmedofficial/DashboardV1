import { getCurrentUser } from "@/lib/session";
import { getDashboardData } from "@/lib/data/dashboard";
import KpiCards from "@/components/dashboard/kpi-cards";
import CashFlowChart from "@/components/dashboard/cash-flow-chart";
import ExpensesDonut from "@/components/dashboard/expenses-donut";
import PnlBar from "@/components/dashboard/pnl-bar";
import RecentTransactions from "@/components/dashboard/recent-transactions";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const data = await getDashboardData(user.id);

  return (
    <div className="space-y-6">
      <KpiCards
        totalCash={data.kpis.totalCash}
        revenue={data.kpis.revenue}
        burn={data.kpis.burn}
        runway={data.kpis.runway}
        monthlyData={data.monthlyData}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CashFlowChart data={data.monthlyData} className="lg:col-span-2" />
        <ExpensesDonut data={data.categoryData} />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <PnlBar data={data.monthlyData} />
      </div>
      <RecentTransactions transactions={data.recentTransactions} />
    </div>
  );
}
