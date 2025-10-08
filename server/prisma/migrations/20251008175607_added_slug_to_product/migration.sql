/*
  Warnings:

  - The values [Male,Female] on the enum `Genders` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `slug` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Genders_new" AS ENUM ('male', 'female');
ALTER TABLE "public"."users" ALTER COLUMN "sex" TYPE "public"."Genders_new" USING ("sex"::text::"public"."Genders_new");
ALTER TABLE "public"."products" ALTER COLUMN "sex" TYPE "public"."Genders_new" USING ("sex"::text::"public"."Genders_new");
ALTER TYPE "public"."Genders" RENAME TO "Genders_old";
ALTER TYPE "public"."Genders_new" RENAME TO "Genders";
DROP TYPE "public"."Genders_old";
COMMIT;

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "slug" TEXT NOT NULL;
