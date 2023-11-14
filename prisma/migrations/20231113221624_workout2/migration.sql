/*
  Warnings:

  - You are about to drop the column `laps` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `warmupSeconds` on the `Workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "laps",
DROP COLUMN "warmupSeconds";

-- CreateTable
CREATE TABLE "Lap" (
    "id" SERIAL NOT NULL,
    "lapSeconds" INTEGER,
    "lapDistance" INTEGER,
    "lapBreakInSeconds" INTEGER,
    "lapDescription" TEXT NOT NULL,

    CONSTRAINT "Lap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutLap" (
    "lapId" INTEGER NOT NULL,
    "workoutId" INTEGER NOT NULL,
    "repeats" INTEGER NOT NULL,

    CONSTRAINT "WorkoutLap_pkey" PRIMARY KEY ("lapId","workoutId")
);

-- AddForeignKey
ALTER TABLE "WorkoutLap" ADD CONSTRAINT "WorkoutLap_lapId_fkey" FOREIGN KEY ("lapId") REFERENCES "Lap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutLap" ADD CONSTRAINT "WorkoutLap_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
