/*
  Warnings:

  - You are about to drop the `Lap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkoutLap` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `laps` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkoutLap" DROP CONSTRAINT "WorkoutLap_lapId_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutLap" DROP CONSTRAINT "WorkoutLap_workoutId_fkey";

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "laps" JSONB NOT NULL,
ADD COLUMN     "warmupSeconds" INTEGER,
ALTER COLUMN "warmupKm" DROP NOT NULL;

-- DropTable
DROP TABLE "Lap";

-- DropTable
DROP TABLE "WorkoutLap";
