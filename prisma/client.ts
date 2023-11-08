import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare const global: NodeJS.Global & { prisma: PrismaClient };

if (process.env.NODE_ENV === "production") {
    try {
        prisma = new PrismaClient();
    } catch (error) {
        console.error("Failed to create Prisma client:", error);
    }

    if (!global.prisma) {
        try {
            global.prisma = new PrismaClient();
        } catch (error) {
            console.error("Failed to create global Prisma client:", error);
        }
    }

    prisma = global.prisma;
} else {
    if (!global.prisma) {
        try {
            global.prisma = new PrismaClient();
        } catch (error) {
            console.error("Failed to create global Prisma client:", error);
        }
    }
    prisma = global.prisma;
}

export default prisma;