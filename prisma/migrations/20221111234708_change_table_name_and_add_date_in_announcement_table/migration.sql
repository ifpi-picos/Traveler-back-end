/*
  Warnings:

  - You are about to drop the `anuncio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "anuncio" DROP CONSTRAINT "anuncio_anuncianteId_fkey";

-- DropTable
DROP TABLE "anuncio";

-- DropTable
DROP TABLE "usuario";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "announcements" (
    "id" SERIAL NOT NULL,
    "advertiserId" INTEGER NOT NULL,
    "vehicle" TEXT NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "socialLink" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_advertiserId_fkey" FOREIGN KEY ("advertiserId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
