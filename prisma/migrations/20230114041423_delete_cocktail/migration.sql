-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_cocktailId_fkey";

-- DropForeignKey
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_userId_fkey";

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_cocktailId_fkey" FOREIGN KEY ("cocktailId") REFERENCES "Cocktail"("idDrink") ON DELETE CASCADE ON UPDATE CASCADE;
