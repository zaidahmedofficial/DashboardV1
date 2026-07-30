# Precision Fintech Dashboard

A production-ready basic finance dashboard built with Next.js 16, TypeScript, Tailwind CSS, and Prisma. Designed for startup founders who need clear, precise financial visibility.

## Tech Stack

- **Framework**: Next.js 16 App Router (TypeScript)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui-inspired components (Radix UI primitives)
- **Charts**: Recharts
- **Database**: SQLite (local) / Turso (production), accessed via Prisma 7 ORM
- **Auth**: NextAuth v4
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A SQLite database (local) or Turso database (production)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd DashboardV1
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
# App
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Local SQLite (default)
DATABASE_URL="file:./dev.db"

# Turso (optional - for production)
# TURSO_DATABASE_URL="libsql://your-db.turso.io"
# TURSO_AUTH_TOKEN="your-turso-token"

# Email (for magic link login)
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
SMTP_FROM=Precision Fintech <noreply@precisionfintech.com>
```

4. Initialize the local database:
```bash
npx prisma db push
```

5. Seed the database with sample data:
```bash
npm run db:seed
```

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

### Authentication
- Email magic link login via NextAuth
- Protected routes (dashboard, transactions, reports)
- Session management

### Dashboard
- **KPI Cards**: Total Cash Balance, Monthly Revenue, Monthly Burn, Runway
- **Cash Flow Chart**: Area chart showing revenue and expenses over time
- **Expenses Donut**: Category-wise expense breakdown
- **P&L Bar Chart**: Monthly profit and loss visualization
- **Recent Transactions**: Searchable and filterable transaction list

### Transactions
- Full CRUD operations (Create, Read, Update, Delete)
- Search by counterparty or category
- Filter by transaction type (Income/Expense)
- Pagination
- CSV Export and Import

### Reports
- Monthly summary cards (Total Profit, Avg Margin, Revenue Growth)
- Revenue vs Expenses bar chart
- Expenses by category pie chart

### Design System
- Precision Fintech inspired design (clean, minimal, modern SaaS)
- Inter + JetBrains Mono typography
- Material Symbols icons
- Responsive layout
- Light mode only (as specified)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run db:seed` - Seed the database with sample data
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open Prisma Studio to view/edit data

## Project Structure

```
├── app/
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── transactions/page.tsx
│   │   └── reports/page.tsx
│   ├── api/auth/[...nextauth]/route.ts
│   ├── api/transactions/route.ts
│   ├── api/transactions/[id]/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── login/page.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── cash-flow-chart.tsx
│   │   ├── expenses-donut.tsx
│   │   ├── kpi-cards.tsx
│   │   ├── pnl-bar.tsx
│   │   └── recent-transactions.tsx
│   ├── layout/
│   │   ├── sidebar.tsx
│   │   └── topbar.tsx
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── table.tsx
│       ├── toast.tsx
│       └── separator.tsx
├── lib/
│   ├── auth.ts
│   ├── db.ts
│   ├── data/
│   │   ├── dashboard.ts
│   │   └── transactions.ts
│   ├── session.ts
│   ├── utils.ts
│   ├── utils/
│   │   ├── categorize.ts
│   │   └── format.ts
│   └── validations/transaction.ts
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── hooks/
│   └── use-toast.ts
├── .env
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Database Schema

### Models
- **User** - NextAuth user accounts
- **Account** - NextAuth OAuth accounts
- **Session** - NextAuth sessions
- **VerificationToken** - NextAuth email verification tokens
- **Category** - Transaction categories with type (income/expense)
- **Transaction** - Financial transactions with date, amount, type, category, counterparty, status

### Enums
- `TransactionType` - INCOME, EXPENSE
- `TransactionStatus` - PENDING, PAID, FAILED

## Auto-Categorization

Transactions are automatically categorized based on counterparty keywords (e.g., "stripe" → Revenue, "aws" → Infrastructure).

## Money Formatting

All monetary values use `Intl.NumberFormat` with USD currency and JetBrains Mono font.

## License

MIT
