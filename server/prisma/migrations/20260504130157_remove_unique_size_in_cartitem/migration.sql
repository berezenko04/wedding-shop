-- DropIndex
DROP INDEX "cart_items_cart_id_product_id_size_key";

-- CreateIndex
CREATE INDEX "cart_items_cart_id_product_id_size_idx" ON "cart_items"("cart_id", "product_id", "size");
