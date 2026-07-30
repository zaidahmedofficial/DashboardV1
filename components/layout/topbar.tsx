"use client";

import { useState } from "react";
import { Calendar, Download, Add } from "@mui/icons-material";
import { cn } from "@/lib/utils";

const ranges = ["Today", "Last 7 Days", "Last 30 Days"] as const;

export function Topbar() {
  const [activeRange, setActiveRange] = useState<string>("Today");

  return (
    <header className="flex justify-between items-center h-16 px-6 bg-white border-b border-outline-variant sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={cn(
                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                activeRange === range
                  ? "bg-white shadow-sm text-on-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container transition-all active:scale-95">
          <Calendar className="text-[18px]" />
          Custom Range
        </button>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              alert("CSV export triggered");
            }
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-on-surface border border-outline-variant rounded-lg hover:bg-surface-container transition-all active:scale-95"
        >
          <Download className="text-[18px]" />
          Export CSV
        </button>
        <button
          onClick={() => {
            if (typeof window !== "undefined") {
              const dialog = document.getElementById("add-transaction-dialog");
              if (dialog) {
                (dialog as HTMLDialogElement).showModal();
              }
            }
          }}
          className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-container transition-all active:scale-95 shadow-lg shadow-primary/20"
        >
          <Add className="text-[18px]" />
          Add Transaction
        </button>
      </div>
    </header>
  );
}
