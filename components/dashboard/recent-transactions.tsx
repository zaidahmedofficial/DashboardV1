"use client";

import { useState, useMemo } from "react";
import { MoreHoriz, Search } from "@mui/icons-material";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TransactionType, TransactionStatus } from "@prisma/client";

interface RecentTransactionsProps {
  transactions: Array<{
    id: string;
    date: Date;
    amount: number;
    type: TransactionType;
    category: string;
    counterparty: string | null;
    status: TransactionStatus;
  }>;
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<TransactionType | "all">("all");

  const filtered = useMemo(() => {
    let result = transactions;
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (t) =>
          (t.counterparty && t.counterparty.toLowerCase().includes(s)) ||
          t.category.toLowerCase().includes(s)
      );
    }
    if (filterType !== "all") {
      result = result.filter((t) => t.type === filterType);
    }
    return result;
  }, [transactions, search, filterType]);

  const getStatusBadge = (status: TransactionStatus) => {
    const variants: Record<TransactionStatus, "success" | "warning" | "danger"> = {
      PAID: "success",
      PENDING: "warning",
      FAILED: "danger",
    };
    const labels: Record<TransactionStatus, string> = {
      PAID: "Paid",
      PENDING: "Pending",
      FAILED: "Failed",
    };
    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-base font-bold">Recent Transactions</CardTitle>
          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline" />
              <Input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as TransactionType | "all")}
              className="h-10 px-3 rounded-md border border-outline-variant bg-white text-sm focus:border-2 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            >
              <option value="all">All</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-container-low">
              <TableHead>Date</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-on-surface-variant">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-surface-container transition-colors group">
                  <TableCell className="font-body-sm text-body-sm text-on-surface-variant">
                    {formatDate(tx.date)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[18px] text-primary fill" data-icon="payments">
                          payments
                        </span>
                      </div>
                      <span className="font-semibold text-on-surface">{tx.counterparty || tx.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={tx.type === TransactionType.INCOME ? "success" : "outline"}>
                      {tx.category}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`font-mono text-sm font-medium ${tx.type === TransactionType.INCOME ? "text-emerald-600" : "text-rose-600"}`}
                  >
                    {tx.type === TransactionType.INCOME ? "+" : "-"}
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell>{getStatusBadge(tx.status)}</TableCell>
                  <TableCell className="text-right">
                    <button className="text-outline hover:text-on-surface transition-colors">
                      <MoreHoriz className="text-[20px]" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
