/*
  Warnings:

  - You are about to drop the column `className` on the `Circular` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Homework` table. All the data in the column will be lost.
  - You are about to drop the column `teacher` on the `Homework` table. All the data in the column will be lost.
  - Added the required column `teacherId` to the `Circular` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Circular` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pdf_url` to the `Homework` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Homework` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Homework` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `className` on the `Homework` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
ALTER TYPE "public"."ClassType" ADD VALUE 'ALL';

-- AlterTable
ALTER TABLE "public"."Circular" DROP COLUMN "className",
ADD COLUMN     "teacherId" TEXT NOT NULL,
ADD COLUMN     "type" "public"."ClassType" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Homework" DROP COLUMN "subject",
DROP COLUMN "teacher",
ADD COLUMN     "pdf_url" TEXT NOT NULL,
ADD COLUMN     "teacherId" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "className",
ADD COLUMN     "className" TEXT NOT NULL;
