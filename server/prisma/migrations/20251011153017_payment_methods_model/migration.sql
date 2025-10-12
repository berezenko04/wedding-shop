/*
  Warnings:

  - You are about to drop the column `userId` on the `shipping_addresses` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `shipping_addresses` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."shipping_addresses" DROP CONSTRAINT "shipping_addresses_userId_fkey";

-- DropIndex
DROP INDEX "public"."shipping_addresses_userId_idx";

-- AlterTable
ALTER TABLE "public"."shipping_addresses" DROP COLUMN "userId",
ADD COLUMN     "user_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "public"."payment_methods" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "method" "public"."PaymentMethods" NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "email" TEXT,
    "card_number" TEXT,
    "card_exp" TEXT,
    "card_cvv" TEXT,
    "card_holder" TEXT,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_methods_user_id_idx" ON "public"."payment_methods"("user_id");

-- CreateIndex
CREATE INDEX "shipping_addresses_user_id_idx" ON "public"."shipping_addresses"("user_id");

-- AddForeignKey
ALTER TABLE "public"."shipping_addresses" ADD CONSTRAINT "shipping_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."payment_methods" ADD CONSTRAINT "payment_methods_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
