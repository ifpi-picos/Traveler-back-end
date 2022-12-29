/*
  Warnings:

  - You are about to drop the column `ativo` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "ativo",
ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
