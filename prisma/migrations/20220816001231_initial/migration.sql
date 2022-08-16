-- CreateTable
CREATE TABLE "Avocado" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Avocado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atributes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "shape" TEXT NOT NULL,
    "hardiness" TEXT NOT NULL,
    "taste" TEXT NOT NULL,
    "avocadoId" INTEGER NOT NULL,

    CONSTRAINT "Atributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Atributes_avocadoId_key" ON "Atributes"("avocadoId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Atributes" ADD CONSTRAINT "Atributes_avocadoId_fkey" FOREIGN KEY ("avocadoId") REFERENCES "Avocado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
