/*
  Warnings:

  - Added the required column `subtotal` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."orders" ADD COLUMN     "shipment_cost" DOUBLE PRECISION NOT NULL DEFAULT 20,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL;
