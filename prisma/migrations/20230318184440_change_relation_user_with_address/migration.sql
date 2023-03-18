-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_id_fkey";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
