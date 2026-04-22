import { isDatabaseEnabled, prisma } from "./prisma";

export async function getDatabaseHealth() {
  if (!isDatabaseEnabled()) {
    return {
      enabled: false,
      healthy: true,
      provider: "file-store",
      message: "DATABASE_URL not set. Using file-backed store.",
    };
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      enabled: true,
      healthy: true,
      provider: "postgres",
      message: "Database reachable.",
    };
  } catch (error) {
    return {
      enabled: true,
      healthy: false,
      provider: "postgres",
      message: error instanceof Error ? error.message : "Database check failed.",
    };
  }
}
