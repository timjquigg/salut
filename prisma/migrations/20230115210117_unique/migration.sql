/*
  Warnings:

  - A unique constraint covering the columns `[userId,nameIngredient]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Inventory_nameIngredient_key";

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_userId_nameIngredient_key" ON "Inventory"("userId", "nameIngredient");
