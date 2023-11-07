import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare const global: NodeJS.Global & { prisma: PrismaClient };

if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
    
if (!global.prisma) {
    global.prisma = new PrismaClient();
}
prisma = global.prisma;

} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;