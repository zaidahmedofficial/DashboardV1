"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#6366f1", "#ec4899", "#3b82f6", "#14b8a8", "#f97316", "#eab308", "#6366f1", "#94a3b8"];

export default function ReportsPage() {
  const monthlyData = [
    { name: "Jan", revenue: 42000, expenses: 38000 },
    { name: "Feb", revenue: 48000, expenses: 42000 },
    { name: "Mar", revenue: 45000, expenses: 39000 },
    { name: "Apr", revenue: 55000, expenses: 44000 },
    { name: "May", revenue: 61000, expenses: 47000 },
    { name: "Jun", revenue: 58000, expenses: 46000 },
  ];
  const categoryData = [
    { name: "SaaS Tools", value: 35 },
    { name: "Salaries", value: 30 },
    { name: "Marketing", value: 15 },
    { name: "Rent", value: 10 },
    { name: "Infrastructure", value: 5 },
    { name: "Misc", value: 5 },
  ];
  const totalProfit = monthlyData.reduce((sum, d) => sum + (d.revenue - d.expenses), 0);
  const avgMargin = monthlyData.length > 0 ? (monthlyData.reduce((sum, d) => sum + ((d.revenue - d.expenses) / d.revenue), 0) / monthlyData.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card><CardContent className="p-6"><div className="text-sm text-outline font-medium mb-1">Total Profit</div><div className="text-2xl font-mono font-semibold text-on-surface">${totalProfit.toLocaleString()}</div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm text-outline font-medium mb-1">Avg Margin</div><div className="text-2xl font-mono font-semibold text-on-surface">{avgMargin.toFixed(1)}%</div></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm text-outline font-medium mb-1">Revenue Growth</div><div className="text-2xl font-mono font-semibold text-emerald-600">+12.1%</div></CardContent></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2"><CardHeader className="pb-4"><CardTitle className="text-base font-bold">Monthly Revenue vs Expenses</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={monthlyData}><CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" /><XAxis dataKey="name" tick={{ fontSize: 12, fill: "#737686" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 12, fill: "#737686" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} /><Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, ""]} /><Legend /><Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" /><Bar dataKey="expenses" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Expenses" /></BarChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader className="pb-4"><CardTitle className="text-base font-bold">Expenses by Category</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>{categoryData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card>
      </div>
    </div>
  );
}
