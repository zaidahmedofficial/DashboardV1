import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const databaseUrl =
  process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:./dev.db";

const adapter = new PrismaLibSql({
  url: databaseUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db =
  global.prisma ||
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = db;
