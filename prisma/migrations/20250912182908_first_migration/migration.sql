-- CreateEnum
CREATE TYPE "public"."ClassType" AS ENUM ('JUNIOR', 'PRIMARY', 'SENIOR');

-- CreateTable
CREATE TABLE "public"."Circular" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "className" "public"."ClassType" NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Circular_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Timetable" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "className" "public"."ClassType" NOT NULL,
    "section" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timetable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Homework" (
    "id" SERIAL NOT NULL,
    "className" "public"."ClassType" NOT NULL,
    "section" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "teacher" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Homework_pkey" PRIMARY KEY ("id")
);
