import prisma from "./prismadb";
import { getCocktailsBasedOnInventory } from "./cocktail";

async function getIngredients() {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      idIngredient: true,
      strIngredient: true,
      strType: true,
    },
  });

  const categories = {};
  for (const ingredient of ingredients) {
    if (categories[ingredient.strType]) {
      categories[ingredient.strType].push(ingredient.strIngredient);
    } else {
      categories[ingredient.strType] = [ingredient.strIngredient];
    }
  }
  return { ingredients, categories };
}

async function getInventory(userId) {
  const inventoryFull = await prisma.inventory.findMany({
    where: {
      userId: userId,
    },
  });
  const inventory = inventoryFull.map((el) => el.nameIngredient);
  return inventory;
}

async function deleteFromInventory(user, item) {
  const inventoryID = await prisma.inventory.findFirst({
    where: {
      userId: user,
      nameIngredient: item,
    },
  });

  await prisma.inventory.delete({
    where: { id: inventoryID.id },
  });
  const inventory = await getInventory(user);
  const recipes = await getCocktailsBasedOnInventory(inventory);
  return { inventory, recipes };
}

async function addToInventory(user, item) {
  await prisma.inventory.create({
    data: {
      userId: user,
      nameIngredient: item,
    },
  });
  const inventory = await getInventory(user);
  const recipes = await getCocktailsBasedOnInventory(inventory);
  return { inventory, recipes };
}

module.exports = {
  getIngredients,
  getInventory,
  deleteFromInventory,
  addToInventory,
};
