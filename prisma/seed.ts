import "dotenv/config";
import { createClient } from "@libsql/client";
import { db } from "../lib/db";
import { DEFAULT_CATEGORIES } from "../lib/utils/categorize";
import { TransactionType } from "@prisma/client";

async function main() {
  const localDb = createClient({
    url: process.env.DATABASE_URL!,
  });

  const schemaResult = await localDb.execute(
    "SELECT sql FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '_prisma_%'"
  );

  const tursoDb = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  });

  for (const row of schemaResult.rows) {
    const sql = row.sql as string;
    if (sql) {
      await tursoDb.execute(sql);
      console.log(`Synced table: ${sql.substring(0, 60)}...`);
    }
  }

  console.log("Schema synced to Turso");

  const userCount = await db.user.count();
  if (userCount > 0) {
    console.log("Database already seeded, skipping...");
    return;
  }

  const user = await db.user.upsert({
    where: { email: "founder@precisionfintech.com" },
    update: {},
    create: {
      id: "user_1",
      email: "founder@precisionfintech.com",
      name: "Alex Rivera",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC8j79gp4K4Ww4uDyaEcXyYxYeW41nx5O4tnX-YXAeuogr58UoEaA9lhqinGKFWisnV4O0oNgyRt9V3ld-_2-v2PnazwYoP4BizYG23-r3mn4asAL9dUnXm7JqpvbA5El27HF5JjASeIm3aTYRg5AHl78mZTNfIhN4Ousa7QGph5JoOrh95v6YK-0eAizQp7Qgk5rom2bJYijXMnOTTJAC3wsfWZ4nOgXb90vNcWZatTBSQ0D5VMNt6",
    },
  });

  const categoriesToCreate = DEFAULT_CATEGORIES.map((c) => ({
    userId: user.id,
    name: c.name,
    type: c.type,
    icon: c.icon,
    color: c.color,
  }));

  await db.category.createMany({
    data: categoriesToCreate,
    skipDuplicates: true,
  });

  const categories = await db.category.findMany({
    where: { userId: user.id },
  });

  const now = new Date();
  const transactions: Array<{
    userId: string;
    date: Date;
    amount: number;
    type: TransactionType;
    category: string;
    counterparty: string | null;
    status: "PENDING" | "PAID" | "FAILED";
  }> = [];

  const daysAgo = (days: number) =>
    new Date(now.getFullYear(), now.getMonth(), now.getDate() - days);

  const incomeData = [
    { date: daysAgo(1), amount: 12450, counterparty: "Stripe", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(3), amount: 8200, counterparty: "Acme Corp", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(5), amount: 5300, counterparty: "Monthly Subscription", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(8), amount: 15000, counterparty: "Stripe", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(12), amount: 9800, counterparty: "TechStart Inc", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(15), amount: 7500, counterparty: "Monthly Subscription", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(20), amount: 12000, counterparty: "Stripe", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(25), amount: 6800, counterparty: "Acme Corp", category: "Revenue", status: "PAID" as const },
    { date: daysAgo(30), amount: 5000, counterparty: "Monthly Subscription", category: "Revenue", status: "PAID" as const },
  ];

  const expenseData = [
    { date: daysAgo(0), amount: 2140.22, counterparty: "AWS", category: "Infrastructure", status: "PAID" as const },
    { date: daysAgo(1), amount: 850, counterparty: "LinkedIn Ads", category: "Marketing", status: "PAID" as const },
    { date: daysAgo(2), amount: 4500, counterparty: "Urban Properties", category: "Rent", status: "PENDING" as const },
    { date: daysAgo(3), amount: 320, counterparty: "Notion", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(4), amount: 120, counterparty: "Linear", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(5), amount: 45, counterparty: "Figma", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(6), amount: 890, counterparty: "Google Ads", category: "Marketing", status: "PAID" as const },
    { date: daysAgo(8), amount: 1200, counterparty: "AWS", category: "Infrastructure", status: "PAID" as const },
    { date: daysAgo(10), amount: 320, counterparty: "Notion", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(12), amount: 560, counterparty: "Meta Ads", category: "Marketing", status: "PAID" as const },
    { date: daysAgo(15), amount: 180, counterparty: "Linear", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(18), amount: 2100, counterparty: "AWS", category: "Infrastructure", status: "PAID" as const },
    { date: daysAgo(20), amount: 4500, counterparty: "Urban Properties", category: "Rent", status: "PAID" as const },
    { date: daysAgo(22), amount: 75, counterparty: "GitHub", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(25), amount: 320, counterparty: "Notion", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(28), amount: 120, counterparty: "Linear", category: "SaaS Tools", status: "PAID" as const },
    { date: daysAgo(30), amount: 680, counterparty: "Google Ads", category: "Marketing", status: "PAID" as const },
  ];

  for (const item of incomeData) {
    transactions.push({
      userId: user.id,
      date: item.date,
      amount: item.amount,
      type: TransactionType.INCOME,
      category: item.category,
      counterparty: item.counterparty,
      status: item.status,
    });
  }

  for (const item of expenseData) {
    transactions.push({
      userId: user.id,
      date: item.date,
      amount: item.amount,
      type: TransactionType.EXPENSE,
      category: item.category,
      counterparty: item.counterparty,
      status: item.status,
    });
  }

  await db.transaction.createMany({
    data: transactions,
  });

  console.log(`Created ${transactions.length} transactions`);
  console.log(`Created ${categories.length} categories`);
  console.log("Seed complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
