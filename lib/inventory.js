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
  return ingredients;
}

async function getInventory(user) {
  const inventory = await prisma.inventory.findMany({
    where: {
      userId: user,
    },
  });
}

// getIngredients().then((ingredients) => {
//   console.log(ingredients);
// });

module.exports = { getIngredients, getInventory };
