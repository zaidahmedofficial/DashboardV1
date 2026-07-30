import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

let prismaClient: PrismaClient;

if (process.env.TURSO_DATABASE_URL) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { PrismaLibSql } = require("@prisma/adapter-libsql");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { createClient } = require("@libsql/client");
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  prismaClient = new PrismaClient({
    adapter: new PrismaLibSql(libsql),
    log: ["error", "warn"],
  });
} else {
  prismaClient = new PrismaClient({
    log: ["error", "warn"],
  });
}

export const db =
  global.prisma || prismaClient;

if (process.env.NODE_ENV !== "production") global.prisma = db;
