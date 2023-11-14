import { PrismaClient, WorkoutType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create unique laps
    const sixMinuteLap = await prisma.lap.create({
        data: {
            lapSeconds: 360,
            lapBreakInSeconds: 60,
            lapDescription: "6 minute repeats"
        }
    });

    // Create a workout with repeated laps
    const workout = await prisma.workout.create({
        data: {
            name: "Six times six minutes interval session",
            type: WorkoutType.INTERVAL,
            description: "Threshold session, keep it steady pace and don't goo too hard, or else you'll struggle.",
            warmupKm: 3,
            workoutLaps: {
                create: {
                    lapId: sixMinuteLap.id,
                    repeats: 6  // Repeating the six-minute lap 6 times
                }
            }
        }
    });

    console.log(`Created workout with ID: ${workout.id}`);
}
main()
    .catch(e => {
        console.error(e);
        throw e;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
