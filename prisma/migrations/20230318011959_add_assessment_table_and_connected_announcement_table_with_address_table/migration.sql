/*
  Warnings:

  - You are about to drop the column `endCity` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `endDistrict` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `endReferencePoint` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `endState` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `endStreet` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `endZipCode` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startCity` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startDistrict` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startReferencePoint` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startState` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startStreet` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startZipCode` on the `announcements` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[originAddressId]` on the table `announcements` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[destinationAddressId]` on the table `announcements` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destinationAddressId` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originAddressId` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vacancy` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "referencePoint" TEXT,
ADD COLUMN     "zipCode" TEXT,
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL;

-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "endCity",
DROP COLUMN "endDistrict",
DROP COLUMN "endReferencePoint",
DROP COLUMN "endState",
DROP COLUMN "endStreet",
DROP COLUMN "endZipCode",
DROP COLUMN "startCity",
DROP COLUMN "startDistrict",
DROP COLUMN "startReferencePoint",
DROP COLUMN "startState",
DROP COLUMN "startStreet",
DROP COLUMN "startZipCode",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "destinationAddressId" INTEGER NOT NULL,
ADD COLUMN     "originAddressId" INTEGER NOT NULL,
ADD COLUMN     "vacancy" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Assessment" (
    "description" TEXT,
    "stars" DOUBLE PRECISION NOT NULL,
    "ratedId" INTEGER NOT NULL,
    "raterId" INTEGER NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("ratedId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Assessment_ratedId_key" ON "Assessment"("ratedId");

-- CreateIndex
CREATE UNIQUE INDEX "announcements_originAddressId_key" ON "announcements"("originAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "announcements_destinationAddressId_key" ON "announcements"("destinationAddressId");

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_originAddressId_fkey" FOREIGN KEY ("originAddressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_destinationAddressId_fkey" FOREIGN KEY ("destinationAddressId") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_ratedId_fkey" FOREIGN KEY ("ratedId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_raterId_fkey" FOREIGN KEY ("raterId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
