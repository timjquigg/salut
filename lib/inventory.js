const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getIngredients() {
  const ingredients = await prisma.ingredient.findMany({
    select: {
      idIngredient: true,
      strIngredient: true,
      strType: true,
    },
  });
  // console.log(ingredients);
  const categories = {};
  for (const ingredient of ingredients) {
    if (categories[ingredient.strType]) {
      categories[ingredient.strType].push(ingredient.strIngredient);
    } else {
      categories[ingredient.strType] = [ingredient.strIngredient];
    }
  }
  // console.log(categories);
  return { ingredients, categories };
  // return ingredients;
}

async function getInventory(userId) {
  const inventoryFull = await prisma.inventory.findMany({
    where: {
      userId: userId.userId,
    },
  });
  const inventory = inventoryFull.map((el) => el.nameIngredient);
  return inventory;
}

async function deleteFromInventory(user, items) {
  await prisma.inventory.deleteMany({
    where: {
      AND: [
        { userId: user },
        {
          nameIngredient: {
            in: items,
          },
        },
      ],
    },
  });
}

async function addToInventory(user, items) {
  const data = items.map((el) => {
    return { userId: user, nameIngredient: el };
  });
  await prisma.inventory.createMany({
    data,
  });
}

module.exports = {
  getIngredients,
  getInventory,
  deleteFromInventory,
  addToInventory,
};
