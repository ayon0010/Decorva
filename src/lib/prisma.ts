import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Pass an empty object but type-safe
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        // No need to override, just satisfy TypeScript
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
