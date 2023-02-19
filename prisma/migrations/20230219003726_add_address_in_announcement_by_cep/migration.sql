/*
  Warnings:

  - You are about to drop the column `endRoute` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `startRoute` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `endCep` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endCity` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDistrict` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endState` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endStreet` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startCep` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startCity` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDistrict` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startState` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startStreet` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "endRoute",
DROP COLUMN "startRoute",
ADD COLUMN     "endCep" TEXT NOT NULL,
ADD COLUMN     "endCity" TEXT NOT NULL,
ADD COLUMN     "endDistrict" TEXT NOT NULL,
ADD COLUMN     "endState" TEXT NOT NULL,
ADD COLUMN     "endStreet" TEXT NOT NULL,
ADD COLUMN     "startCep" TEXT NOT NULL,
ADD COLUMN     "startCity" TEXT NOT NULL,
ADD COLUMN     "startDistrict" TEXT NOT NULL,
ADD COLUMN     "startState" TEXT NOT NULL,
ADD COLUMN     "startStreet" TEXT NOT NULL;
