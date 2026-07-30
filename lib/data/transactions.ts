import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client";

export async function getTransactions(
  userId: string,
  options?: { page?: number; limit?: number; type?: TransactionType; category?: string; search?: string }
) {
  const page = options?.page ?? 1;
  const limit = options?.limit ?? 10;
  const skip = (page - 1) * limit;

  const where: any = { userId };
  if (options?.type) where.type = options.type;
  if (options?.category) where.category = options.category;
  if (options?.search) {
    where.OR = [
      { counterparty: { contains: options.search } },
      { category: { contains: options.search } },
    ];
  }

  const [transactions, total] = await Promise.all([
    db.transaction.findMany({ where, orderBy: { date: "desc" }, skip, take: limit }),
    db.transaction.count({ where }),
  ]);

  return {
    transactions,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getTransaction(userId: string, id: string) {
  return db.transaction.findFirst({ where: { id, userId } });
}

export async function createTransaction(userId: string, data: any) {
  return db.transaction.create({ data: { ...data, userId } });
}

export async function updateTransaction(userId: string, id: string, data: any) {
  return db.transaction.updateMany({
    where: { id, userId },
    data,
  });
}

export async function deleteTransaction(userId: string, id: string) {
  return db.transaction.deleteMany({ where: { id, userId } });
}

export async function getCategories(userId: string) {
  return db.category.findMany({ where: { userId }, orderBy: { name: "asc" } });
}
