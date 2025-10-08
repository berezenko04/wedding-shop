/*
  Warnings:

  - You are about to drop the column `category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sex` to the `products` table without a default value. This is not possible if the table is not empty.

*/

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_category_id_fkey";

-- DropIndex
DROP INDEX "public"."products_category_id_price_idx";

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "category_id",
ADD COLUMN     "sex" "public"."Genders" NOT NULL;

-- DropTable
DROP TABLE "public"."categories";
