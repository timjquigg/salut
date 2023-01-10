/*
  Warnings:

  - You are about to drop the column `favoriteId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_favoriteId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "favoriteId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CategoriesOnFavorite" (
    "id" TEXT NOT NULL,
    "favoriteId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnFavorite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnFavorite" ADD CONSTRAINT "CategoriesOnFavorite_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorite"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnFavorite" ADD CONSTRAINT "CategoriesOnFavorite_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
