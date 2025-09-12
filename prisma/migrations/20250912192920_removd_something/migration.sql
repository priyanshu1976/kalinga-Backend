/*
  Warnings:

  - You are about to drop the column `subject` on the `Circular` table. All the data in the column will be lost.
  - Changed the type of `className` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Circular" DROP COLUMN "subject";

-- AlterTable
ALTER TABLE "public"."Timetable" DROP COLUMN "className",
ADD COLUMN     "className" TEXT NOT NULL;
