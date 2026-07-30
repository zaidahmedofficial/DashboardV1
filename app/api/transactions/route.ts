import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { TransactionType } from "@prisma/client";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const type = searchParams.get("type") as TransactionType | null;

  const where: any = { userId: session.user.id };
  if (type) where.type = type;
  if (search) {
    where.OR = [{ counterparty: { contains: search } }, { category: { contains: search } }];
  }

  const skip = (page - 1) * limit;
  const [transactions, total] = await Promise.all([
    db.transaction.findMany({ where, orderBy: { date: "desc" }, skip, take: limit }),
    db.transaction.count({ where }),
  ]);

  return NextResponse.json({ transactions, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const transaction = await db.transaction.create({ data: { ...body, userId: session.user.id } });
  return NextResponse.json(transaction, { status: 201 });
}
