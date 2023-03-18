/*
  Warnings:

  - A unique constraint covering the columns `[addressId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_id_fkey";

-- AlterTable
CREATE SEQUENCE addresses_id_seq;
ALTER TABLE "addresses" ALTER COLUMN "id" SET DEFAULT nextval('addresses_id_seq');
ALTER SEQUENCE addresses_id_seq OWNED BY "addresses"."id";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "addressId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "users_addressId_key" ON "users"("addressId");

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("addressId") ON DELETE RESTRICT ON UPDATE CASCADE;
