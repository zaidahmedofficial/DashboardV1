"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ExpensesDonutProps {
  data: Array<{ name: string; value: number }>;
}

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#6366f1", "#ec4899", "#3b82f6", "#14b8a8", "#f97316", "#eab308", "#6366f1", "#94a3b8"];

export default function ExpensesDonut({ data }: ExpensesDonutProps) {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-bold">Expenses by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 w-full space-y-2">
          {data.map((entry, index) => {
            const percent = total > 0 ? ((entry.value / total) * 100).toFixed(0) : 0;
            return (
              <div key={entry.name} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-sm text-on-surface-variant">{entry.name}</span>
                </div>
                <span className="text-sm font-mono text-on-surface font-medium">{percent}%</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
