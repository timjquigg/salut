const { PrismaClient, Prisma } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCocktailsBasedOnInventory(inventory) {
  console.log("inventoryList:", inventory);
  const result = await prisma.cocktail.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              strIngredient1: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient1: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient2: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient2: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient3: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient3: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient4: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient4: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient5: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient5: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient6: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient6: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient7: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient7: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient8: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient8: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient9: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient9: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient10: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient10: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient11: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient11: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient12: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient12: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient13: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient13: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient14: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient14: {
                equals: null,
              },
            },
          ],
        },
        {
          OR: [
            {
              strIngredient15: {
                in: inventory,
                mode: "insensitive",
              },
            },
            {
              strIngredient15: {
                equals: null,
              },
            },
          ],
        },
      ],
    },
  });

  console.log("result:", result);

  return result;
}

async function getCocktailNames() {
  const cocktails = await prisma.cocktail.findMany({
    select: {
      strDrink: true,
    },
  });
  return cocktails;
}

module.exports = { getCocktailsBasedOnInventory, getCocktailNames };
