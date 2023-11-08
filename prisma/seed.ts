import { PrismaClient } from "@prisma/client";

const seedData = [
    {
        userId: 2,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        name: "AnnaTest",
        accessToken: "adsløkasdla",
        refreshToken: "adsadsasaks"
    }
];

async function seed() {
    const prisma = new PrismaClient();

    try {
        for (const user of seedData) {
            await prisma.user.create({
                data: {
                    ...user,
                    createdAt: new Date(user.createdAt),
                    updatedAt: new Date(user.updatedAt)
                }
            });
        }
    } catch (error) {
        console.error("Error seeding data:", error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();