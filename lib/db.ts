import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const databaseUrl =
  process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:./dev.db";

const libsql = createClient({
  url: databaseUrl,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db =
  global.prisma ||
  new PrismaClient({
    adapter: new PrismaLibSql(libsql),
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = db;
