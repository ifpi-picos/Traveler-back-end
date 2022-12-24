/*
  Warnings:

  - Added the required column `image` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" ADD COLUMN     "image" TEXT NOT NULL;
