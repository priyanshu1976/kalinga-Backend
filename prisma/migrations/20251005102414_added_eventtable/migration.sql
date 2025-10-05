-- CreateEnum
CREATE TYPE "public"."EventType" AS ENUM ('JUNIOR', 'PRIMARY', 'SENIOR', 'ALL');

-- CreateTable
CREATE TABLE "public"."Event" (
    "id" SERIAL NOT NULL,
    "type" "public"."EventType" NOT NULL,
    "title" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
