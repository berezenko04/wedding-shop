/*
  Warnings:

  - Changed the type of `shipping_method` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `payment_method` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."PaymentMethods" AS ENUM ('Paypal', 'Card', 'Amazon');

-- CreateEnum
CREATE TYPE "public"."ShippingMethods" AS ENUM ('courier', 'dhl', 'pickup');

-- AlterTable
ALTER TABLE "public"."orders" DROP COLUMN "shipping_method",
ADD COLUMN     "shipping_method" "public"."ShippingMethods" NOT NULL,
DROP COLUMN "payment_method",
ADD COLUMN     "payment_method" "public"."PaymentMethods" NOT NULL;
