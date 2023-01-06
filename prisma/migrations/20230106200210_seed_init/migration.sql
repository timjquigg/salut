/*
  Warnings:

  - The primary key for the `Cocktail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Cocktail` table. All the data in the column will be lost.
  - The primary key for the `Ingredient` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Ingredient` table. All the data in the column will be lost.
  - The required column `idDrink` was added to the `Cocktail` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `idIngredient` was added to the `Ingredient` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_cocktailId_fkey";

-- AlterTable
ALTER TABLE "Cocktail" DROP CONSTRAINT "Cocktail_pkey",
DROP COLUMN "id",
ADD COLUMN     "idDrink" TEXT NOT NULL,
ADD CONSTRAINT "Cocktail_pkey" PRIMARY KEY ("idDrink");

-- AlterTable
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_pkey",
DROP COLUMN "id",
ADD COLUMN     "idIngredient" TEXT NOT NULL,
ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("idIngredient");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_cocktailId_fkey" FOREIGN KEY ("cocktailId") REFERENCES "Cocktail"("idDrink") ON DELETE RESTRICT ON UPDATE CASCADE;
