/*
  Warnings:

  - You are about to drop the column `card_cvv` on the `payment_methods` table. All the data in the column will be lost.
  - You are about to drop the column `card_exp` on the `payment_methods` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."payment_methods" DROP COLUMN "card_cvv",
DROP COLUMN "card_exp";
