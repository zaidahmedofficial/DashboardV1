"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: "dashboard" },
  { href: "/dashboard", label: "Income", icon: "payments" },
  { href: "/dashboard", label: "Expenses", icon: "receipt_long" },
  { href: "/transactions", label: "Transactions", icon: "list_alt" },
  { href: "/reports", label: "Reports", icon: "bar_chart" },
];

const bottomNavItems = [
  { href: "/dashboard", label: "Settings", icon: "settings" },
  { href: "/dashboard", label: "Support", icon: "help_outline" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-lowest flex flex-col border-r border-outline-variant">
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-[20px] fill" data-icon="account_balance">account_balance</span>
        </div>
        <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
          Precision Fintech
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "text-primary bg-surface-container font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 pb-6 space-y-1">
        {bottomNavItems.map((item) => {
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className="mt-4 pt-4 border-t border-outline-variant flex items-center gap-3 px-3">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8j79gp4K4Ww4uDyaEcXyYxYeW41nx5O4tnX-YXAeuogr58UoEaA9lhqinGKFWisnV4O0oNgyRt9V3ld-_2-v2PnazwYoP4BizYG23-r3mn4asAL9dUnXm7JqpvbA5El27HF5JjASeIm3aTYRg5AHl78mZTNfIhN4Ousa7QGph5JoOrh95v6YK-0eAizQp7Qgk5rom2bJYijXMnOTTJAC3wsfWZ4nOgXb90vNcWZatTBSQ0D5VMNt6"
            alt="Alex Rivera"
            className="w-10 h-10 rounded-full object-cover border border-outline-variant"
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface">Alex Rivera</span>
            <span className="text-xs text-on-surface-variant">Founder Dashboard</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
