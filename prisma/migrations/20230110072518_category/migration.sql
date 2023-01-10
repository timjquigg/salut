/*
  Warnings:

  - A unique constraint covering the columns `[favoriteId,categoryId]` on the table `CategoriesOnFavorite` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CategoriesOnFavorite_favoriteId_categoryId_key" ON "CategoriesOnFavorite"("favoriteId", "categoryId");
