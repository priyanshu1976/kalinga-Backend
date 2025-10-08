-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "details" TEXT[] DEFAULT ARRAY[]::TEXT[];
