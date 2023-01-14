-- DropForeignKey
ALTER TABLE "CategoriesOnFavorite" DROP CONSTRAINT "CategoriesOnFavorite_favoriteId_fkey";

-- AddForeignKey
ALTER TABLE "CategoriesOnFavorite" ADD CONSTRAINT "CategoriesOnFavorite_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;
