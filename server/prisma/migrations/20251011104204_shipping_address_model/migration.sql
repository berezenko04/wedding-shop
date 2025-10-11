-- CreateTable
CREATE TABLE "public"."shipping_addresses" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "address" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL,

    CONSTRAINT "shipping_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shipping_addresses_userId_idx" ON "public"."shipping_addresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "shipping_addresses_userId_primary_key" ON "public"."shipping_addresses"("userId", "primary");

-- AddForeignKey
ALTER TABLE "public"."shipping_addresses" ADD CONSTRAINT "shipping_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
