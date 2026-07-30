"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/lib/utils/format";
import { TransactionType, TransactionStatus } from "@prisma/client";

interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: TransactionType;
  category: string;
  counterparty: string | null;
  status: TransactionStatus;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<TransactionType | "all">("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState({ date: "", amount: "", type: TransactionType.EXPENSE, category: "", counterparty: "", status: TransactionStatus.PAID });

  const fetchTransactions = useCallback(async () => {
    const params = new URLSearchParams({ page: String(page), limit: String(limit), search, type: filterType });
    const res = await fetch(`/api/transactions?${params}`);
    if (!res.ok) return;
    const data = await res.json();
    setTransactions(data.transactions);
    setTotalPages(data.totalPages);
  }, [page, limit, search, filterType]);

  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  const resetAndOpen = () => { setEditing(null); setForm({ date: new Date().toISOString().slice(0, 10), amount: "", type: TransactionType.EXPENSE, category: "", counterparty: "", status: TransactionStatus.PAID }); setOpen(true); };

  const handleEdit = async () => {
    if (!editing) return;
    await fetch(`/api/transactions/${editing.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }) });
    setOpen(false); fetchTransactions();
  };

  const handleCreate = async () => {
    await fetch("/api/transactions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, amount: parseFloat(form.amount), date: new Date(form.date) }) });
    setOpen(false); fetchTransactions();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;
    await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    fetchTransactions();
  };

  const handleExportCsv = () => {
    const headers = "Date,Entity,Category,Amount,Status\n";
    const rows = transactions.map((t) => `${t.date},${t.counterparty || t.category},${t.category},${t.amount},${t.status}`);
    const csv = headers + rows.join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click();
  };

  const handleImportCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const rows = text.split("\n").slice(1);
      rows.forEach((row) => {
        const [date, counterparty, category, amount, status] = row.split(",");
        if (date && amount) {
          fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ date: new Date(date), amount: parseFloat(amount), type: parseFloat(amount) >= 0 ? TransactionType.INCOME : TransactionType.EXPENSE, category: category || "Other", counterparty: counterparty || null, status: status === "PAID" ? TransactionStatus.PAID : TransactionStatus.PENDING }),
          });
        }
      });
      setTimeout(fetchTransactions, 500);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className="text-headline-md text-headline-md font-bold text-on-surface">Transactions</h2>
            <div className="flex gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Input placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Select value={filterType} onValueChange={(v) => setFilterType(v as TransactionType | "all")}>
                <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="all">All</SelectItem><SelectItem value="INCOME">Income</SelectItem><SelectItem value="EXPENSE">Expense</SelectItem></SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExportCsv}>Export CSV</Button>
              <label className="cursor-pointer">
                <Button variant="outline" asChild><span>Import CSV</span></Button>
                <input type="file" accept=".csv" className="hidden" onChange={handleImportCsv} />
              </label>
              <Button onClick={resetAndOpen}><Plus className="text-[18px]" /> Add</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-surface-container-low">
                <TableHead>Date</TableHead><TableHead>Entity</TableHead><TableHead>Category</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8 text-on-surface-variant">No transactions found</TableCell></TableRow>
              ) : transactions.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-surface-container transition-colors">
                  <TableCell className="text-sm text-on-surface-variant">{formatDate(tx.date)}</TableCell>
                  <TableCell><span className="font-semibold text-on-surface">{tx.counterparty || tx.category}</span></TableCell>
                  <TableCell><Badge variant={tx.type === TransactionType.INCOME ? "success" : "outline"}>{tx.category}</Badge></TableCell>
                  <TableCell className={`font-mono text-sm font-medium ${tx.type === TransactionType.INCOME ? "text-emerald-600" : "text-rose-600"}`}>
                    {tx.type === TransactionType.INCOME ? "+" : "-"}{formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell><Badge variant={tx.status === TransactionStatus.PAID ? "success" : tx.status === TransactionStatus.PENDING ? "warning" : "danger"}>{tx.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => { setEditing(tx); setForm({ date: tx.date.slice(0, 10), amount: String(tx.amount), type: tx.type, category: tx.category, counterparty: tx.counterparty || "", status: tx.status }); setOpen(true); }}>Edit</Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(tx.id)}>Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4">
              <span className="text-sm text-on-surface-variant">Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Transaction" : "Add Transaction"}</DialogTitle><DialogDescription>Fill in the transaction details below.</DialogDescription></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label>Date</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div className="grid gap-2"><Label>Amount</Label><Input type="number" step="0.01" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div>
            <div className="grid gap-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as TransactionType })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                  <SelectItem value={TransactionType.EXPENSE}>Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2"><Label>Category</Label><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
            <div className="grid gap-2"><Label>Counterparty</Label><Input value={form.counterparty} onChange={(e) => setForm({ ...form, counterparty: e.target.value })} /></div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as TransactionStatus })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value={TransactionStatus.PAID}>Paid</SelectItem>
                  <SelectItem value={TransactionStatus.PENDING}>Pending</SelectItem>
                  <SelectItem value={TransactionStatus.FAILED}>Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={editing ? handleEdit : handleCreate}>{editing ? "Save" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <dialog id="add-transaction-dialog" className="hidden" />
    </div>
  );
}
