const { PrismaClient } = require("@prisma/client");
const { PrismaLibSql } = require("@prisma/adapter-libsql");

async function test() {
  const adapter = new PrismaLibSql({ url: "file:./dev.db" });
  const client = new PrismaClient({
    adapter,
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
