import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export const db =
  global.prisma ||
  new PrismaClient({
    adapter: new PrismaLibSQL(libsql),
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = db;
