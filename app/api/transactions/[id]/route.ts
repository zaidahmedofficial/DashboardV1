import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const transaction = await db.transaction.findFirst({ where: { id, userId: session.user.id } });
  if (!transaction) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

  return NextResponse.json(transaction);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const result = await db.transaction.updateMany({ where: { id, userId: session.user.id }, data: body });
  if (result.count === 0) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;

  const result = await db.transaction.deleteMany({ where: { id, userId: session.user.id } });
  if (result.count === 0) return NextResponse.json({ error: "Transaction not found" }, { status: 404 });

  return NextResponse.json({ success: true });
}
