import prisma from "./prismadb";

async function getRandomCocktails() {
  const skip = Math.floor(Math.random() * 100);
  const result = await prisma.cocktail.findMany({
    take: 10,
    skip: skip,
  });

  return result;
}

async function getPopularCocktails() {
  const result = await prisma.favorite.groupBy({
    by: ["cocktailId"],
    _count: {
      cocktailId: true,
    },
    orderBy: {
      _count: {
        cocktailId: "asc",
      },
    },
    take: 10,
  });
  console.log("popular?:", result);
  const cocktailIds = [];
  result.map((cocktail) => cocktailIds.push(cocktail.cocktailId));
  console.log("popular drinks:", cocktailIds);
  const popularCocktails = await prisma.cocktail.findMany({
    where: {
      idDrink: { in: cocktailIds },
    },
  });
  return popularCocktails;
}

async function getCocktailsBasedOnInventory(userId) {
  const skip = Math.floor(Math.random() * 100);
  const inventory = await prisma.inventory.findMany({
    where: {
      userId: userId,
    },
  });
  const inventoryList = [];
  inventory.map((item) => inventoryList.push(item.nameIngredient));
  console.log("inventoryList:", inventoryList);
  const result = await prisma.cocktail.findMany({
    where: {
      OR: [
        {
          strIngredient1: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient2: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient3: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient4: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient5: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient6: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient1: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient7: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient8: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient9: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient10: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient11: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient12: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient13: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient14: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
        {
          strIngredient15: {
            in: inventoryList,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 10,
    skip: skip,
  });

  console.log("result:", result);

  return result;
}

module.exports = {
  getRandomCocktails,
  getPopularCocktails,
  getCocktailsBasedOnInventory,
};
