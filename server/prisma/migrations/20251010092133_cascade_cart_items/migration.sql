-- DropForeignKey
ALTER TABLE "public"."cart_items" DROP CONSTRAINT "cart_items_cart_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."cart_items" ADD CONSTRAINT "cart_items_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "public"."cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
