/*
  Warnings:

  - Made the column `image` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '';
