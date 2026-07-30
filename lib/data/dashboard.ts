import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client";

export async function getDashboardData(userId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const [allTransactions, monthTransactions] = await Promise.all([
    db.transaction.findMany({ where: { userId }, orderBy: { date: "desc" } }),
    db.transaction.findMany({
      where: { userId, date: { gte: sixMonthsAgo } },
      orderBy: { date: "asc" },
    }),
  ]);

  const incomeTotal = allTransactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenseTotal = allTransactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .filter((t) => t.status !== "FAILED")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const monthlyExpenses = allTransactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .filter((t) => t.status !== "FAILED")
    .filter((t) => t.date >= lastMonth)
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalCash = incomeTotal - expenseTotal;
  const runway = monthlyExpenses > 0 ? totalCash / monthlyExpenses : 99;

  const monthlyData: Record<string, { revenue: number; expenses: number }> = {};
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = d.toLocaleString("en-US", { month: "short" });
    monthlyData[key] = { revenue: 0, expenses: 0 };
  }

  for (const t of monthTransactions) {
    const key = t.date.toLocaleString("en-US", { month: "short" });
    if (monthlyData[key]) {
      if (t.type === TransactionType.INCOME) {
        monthlyData[key].revenue += Number(t.amount);
      } else if (t.status !== "FAILED") {
        monthlyData[key].expenses += Number(t.amount);
      }
    }
  }

  const categoryMap: Record<string, number> = {};
  for (const t of monthTransactions) {
    if (t.type === TransactionType.EXPENSE && t.status !== "FAILED") {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
    }
  }

  const categoryData = Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));

  const recentTransactions = allTransactions.slice(0, 10);

  return {
    kpis: {
      totalCash,
      revenue: incomeTotal,
      burn: monthlyExpenses,
      runway: Math.max(0, runway),
    },
    monthlyData: Object.entries(monthlyData).map(([name, values]) => ({
      name,
      ...values,
    })),
    categoryData,
    recentTransactions,
  };
}
