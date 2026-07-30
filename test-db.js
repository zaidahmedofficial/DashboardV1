const { PrismaClient } = require("@prisma/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");
const { createClient } = require("@libsql/client");

async function test() {
  const libsql = createClient({ url: "file:./dev.db" });
  const client = new PrismaClient({
    adapter: new PrismaLibSql(libsql),
    log: ["error", "warn"],
  });

  try {
    const result = await client.user.count();
    console.log("User count:", result);
  } catch (e) {
    console.error("Error:", e.message);
  } finally {
    await client.$disconnect();
  }
}

test();
