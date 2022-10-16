-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT,
    "senha" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "anuncio" (
    "id" SERIAL NOT NULL,
    "anuncianteId" INTEGER NOT NULL,
    "veiculo" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "linkSocial" TEXT NOT NULL,

    CONSTRAINT "anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "anuncio" ADD CONSTRAINT "anuncio_anuncianteId_fkey" FOREIGN KEY ("anuncianteId") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
