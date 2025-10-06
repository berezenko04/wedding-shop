/*
  Warnings:

  - The values [male,female] on the enum `Genders` will be removed. If these variants are still used in the database, this will fail.
  - The values [ONE,TWO,THREE,FOUR,FIVE] on the enum `Rating` will be removed. If these variants are still used in the database, this will fail.
  - The values [DELIVERED] on the enum `ShipmentStatuses` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "public"."LogLevel" AS ENUM ('Info', 'Warn', 'Error', 'Security');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Genders_new" AS ENUM ('Male', 'Female');
ALTER TABLE "public"."users" ALTER COLUMN "sex" TYPE "public"."Genders_new" USING ("sex"::text::"public"."Genders_new");
ALTER TABLE "public"."categories" ALTER COLUMN "gender" TYPE "public"."Genders_new" USING ("gender"::text::"public"."Genders_new");
ALTER TYPE "public"."Genders" RENAME TO "Genders_old";
ALTER TYPE "public"."Genders_new" RENAME TO "Genders";
DROP TYPE "public"."Genders_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."Rating_new" AS ENUM ('1', '2', '3', '4', '5');
ALTER TABLE "public"."reviews" ALTER COLUMN "rating" TYPE "public"."Rating_new" USING ("rating"::text::"public"."Rating_new");
ALTER TYPE "public"."Rating" RENAME TO "Rating_old";
ALTER TYPE "public"."Rating_new" RENAME TO "Rating";
DROP TYPE "public"."Rating_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ShipmentStatuses_new" AS ENUM ('Delivered');
ALTER TABLE "public"."orders" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."orders" ALTER COLUMN "status" TYPE "public"."ShipmentStatuses_new" USING ("status"::text::"public"."ShipmentStatuses_new");
ALTER TYPE "public"."ShipmentStatuses" RENAME TO "ShipmentStatuses_old";
ALTER TYPE "public"."ShipmentStatuses_new" RENAME TO "ShipmentStatuses";
DROP TYPE "public"."ShipmentStatuses_old";
ALTER TABLE "public"."orders" ALTER COLUMN "status" SET DEFAULT 'Delivered';
COMMIT;

-- AlterTable
ALTER TABLE "public"."orders" ALTER COLUMN "status" SET DEFAULT 'Delivered';

-- CreateTable
CREATE TABLE "public"."logs" (
    "id" UUID NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "level" "public"."LogLevel" NOT NULL,
    "action" TEXT NOT NULL,
    "user_id" UUID,
    "ip" TEXT,
    "user_agent" TEXT,
    "status" TEXT,
    "message" TEXT,
    "metadata" JSONB,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "logs_timestamp_idx" ON "public"."logs"("timestamp");

-- CreateIndex
CREATE INDEX "logs_level_idx" ON "public"."logs"("level");

-- CreateIndex
CREATE INDEX "logs_user_id_idx" ON "public"."logs"("user_id");
