/*
  Warnings:

  - You are about to drop the column `endCep` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startCep` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `endZipCode` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startZipCode` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "endCep",
DROP COLUMN "startCep",
ADD COLUMN     "endReferencePoint" TEXT,
ADD COLUMN     "endZipCode" TEXT NOT NULL,
ADD COLUMN     "startReferencePoint" TEXT,
ADD COLUMN     "startZipCode" TEXT NOT NULL;
