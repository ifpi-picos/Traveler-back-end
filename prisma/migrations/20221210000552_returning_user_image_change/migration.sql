/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "users_image_key" ON "users"("image");
