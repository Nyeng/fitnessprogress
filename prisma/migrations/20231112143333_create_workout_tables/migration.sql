-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('INTERVAL', 'RACE', 'LONG_RUN');

-- CreateTable
CREATE TABLE "Lap" (
    "id" SERIAL NOT NULL,
    "lapSeconds" INTEGER,
    "lapDistance" INTEGER,
    "lapBreakInSeconds" INTEGER,
    "lapDescription" TEXT NOT NULL,
    "workoutId" INTEGER,

    CONSTRAINT "Lap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WorkoutType",
    "description" TEXT NOT NULL,
    "warmupKm" INTEGER NOT NULL,
    "cooldownKm" INTEGER,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Lap" ADD CONSTRAINT "Lap_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
