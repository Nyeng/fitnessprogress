/*
  Warnings:

  - You are about to drop the column `workoutId` on the `Lap` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Lap" DROP CONSTRAINT "Lap_workoutId_fkey";

-- AlterTable
ALTER TABLE "Lap" DROP COLUMN "workoutId";

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
