import { TransactionType } from "@prisma/client";

interface CategorizationRule {
  keywords: string[];
  category: string;
  type: TransactionType;
}

const RULES: CategorizationRule[] = [
  { keywords: ["stripe", "paypal", "square", "payment", "subscription", "revenue", "sale", "client", "contract"], category: "Revenue", type: TransactionType.INCOME },
  { keywords: ["salary", "payroll", "wage", "bonus"], category: "Salary", type: TransactionType.INCOME },
  { keywords: ["investment", "equity", "dividend", "interest"], category: "Investments", type: TransactionType.INCOME },
  { keywords: ["aws", "amazon", "cloud", "server", "hosting", "vercel", "netlify"], category: "Infrastructure", type: TransactionType.EXPENSE },
  { keywords: ["salary", "wage", "benefit", "payroll", "contractor"], category: "Salaries", type: TransactionType.EXPENSE },
  { keywords: ["office", "rent", "lease", "property", "apartment"], category: "Rent", type: TransactionType.EXPENSE },
  { keywords: ["marketing", "ads", "advertising", "google", "facebook", "linkedin"], category: "Marketing", type: TransactionType.EXPENSE },
  { keywords: ["software", "saas", "tool", "subscription", "license"], category: "SaaS Tools", type: TransactionType.EXPENSE },
  { keywords: ["travel", "flight", "hotel", "uber", "lyft"], category: "Travel", type: TransactionType.EXPENSE },
  { keywords: ["food", "restaurant", "coffee", "meal", "grubhub"], category: "Food", type: TransactionType.EXPENSE },
  { keywords: ["utilities", "electric", "water", "internet", "phone"], category: "Utilities", type: TransactionType.EXPENSE },
  { keywords: ["legal", "accounting", "consulting"], category: "Professional Services", type: TransactionType.EXPENSE },
];

export function autoCategorize(counterparty: string): {
  category: string;
  type: TransactionType;
} {
  const text = (counterparty || "").toLowerCase();
  for (const rule of RULES) {
    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) {
        return { category: rule.category, type: rule.type };
      }
    }
  }
  return { category: "Other", type: TransactionType.EXPENSE };
}

export const DEFAULT_CATEGORIES: Array<{
  name: string;
  type: TransactionType;
  icon?: string;
  color?: string;
}> = [
  { name: "Revenue", type: TransactionType.INCOME, icon: "payments", color: "#2563eb" },
  { name: "Salary", type: TransactionType.INCOME, icon: "wallet", color: "#10b981" },
  { name: "Investments", type: TransactionType.INCOME, icon: "trending_up", color: "#8b5cf6" },
  { name: "SaaS Tools", type: TransactionType.EXPENSE, icon: "smart_toy", color: "#2563eb" },
  { name: "Salaries", type: TransactionType.EXPENSE, icon: "people", color: "#f59e0b" },
  { name: "Rent", type: TransactionType.EXPENSE, icon: "apartment", color: "#ef4444" },
  { name: "Marketing", type: TransactionType.EXPENSE, icon: "ads_click", color: "#ec4899" },
  { name: "Infrastructure", type: TransactionType.EXPENSE, icon: "cloud", color: "#3b82f6" },
  { name: "Travel", type: TransactionType.EXPENSE, icon: "flight", color: "#14b8a8" },
  { name: "Food", type: TransactionType.EXPENSE, icon: "restaurant", color: "#f97316" },
  { name: "Utilities", type: TransactionType.EXPENSE, icon: "electric_bolt", color: "#eab308" },
  { name: "Professional Services", type: TransactionType.EXPENSE, icon: "work", color: "#6366f1" },
  { name: "Other", type: TransactionType.EXPENSE, icon: "category", color: "#94a3b8" },
];
