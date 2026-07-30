"use client";

import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils/format";

const SPARKLINE_COLORS = {
  positive: "#10b981",
  negative: "#ef4444",
  neutral: "#2563eb",
};

interface KpiCardsProps {
  totalCash: number;
  revenue: number;
  burn: number;
  runway: number;
  monthlyData: Array<{ name: string; revenue: number; expenses: number }>;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const width = 100;
  const height = 40;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * height;
    return `${x},${y}`;
  });
  const pathD = `M${points.join(" L")}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-12 overflow-visible" preserveAspectRatio="none">
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function KpiCards({ totalCash, revenue, burn, runway, monthlyData }: KpiCardsProps) {
  const revenueValues = monthlyData.map((d) => d.revenue);
  const expenseValues = monthlyData.map((d) => d.expenses);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-outline font-medium">Total Cash Balance</span>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="text-[14px]" />
              <span className="text-xs font-mono">+2.4%</span>
            </div>
          </div>
          <div className="text-2xl font-mono font-semibold text-on-surface mb-2 tracking-tight">
            {formatCurrency(totalCash)}
          </div>
          <Sparkline data={revenueValues} color={SPARKLINE_COLORS.positive} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-outline font-medium">Monthly Revenue</span>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp className="text-[14px]" />
              <span className="text-xs font-mono">+12.1%</span>
            </div>
          </div>
          <div className="text-2xl font-mono font-semibold text-on-surface mb-2 tracking-tight">
            {formatCurrency(revenue)}
          </div>
          <Sparkline data={revenueValues} color={SPARKLINE_COLORS.positive} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-outline font-medium">Monthly Burn</span>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingDown className="text-[14px]" />
              <span className="text-xs font-mono">-5.4%</span>
            </div>
          </div>
          <div className="text-2xl font-mono font-semibold text-on-surface mb-2 tracking-tight">
            {formatCurrency(burn)}
          </div>
          <Sparkline data={expenseValues} color={SPARKLINE_COLORS.negative} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm text-outline font-medium">Runway</span>
            <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <AddIcon className="text-[14px]" />
              <span className="text-xs font-mono">+0.5</span>
            </div>
          </div>
          <div className="text-2xl font-mono font-semibold text-on-surface mb-2 tracking-tight">
            {runway.toFixed(1)} Months
          </div>
          <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${Math.min(100, (runway / 24) * 100)}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
