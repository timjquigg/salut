const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getCocktail(keyword) {
  const ingredientsObj = await prisma.ingredient.findMany({
    where: {
      strType: {
        equals: keyword,
        mode: "insensitive",
      },
    },
    select: {
      strIngredient: true,
    },
  });

  const ingredients = [keyword].concat(
    ingredientsObj.map((el) => el.strIngredient)
  );

  const result = await prisma.cocktail.findMany({
    where: {
      OR: [
        {
          strDrink: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient1: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient2: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient3: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient4: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient5: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient6: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient1: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient7: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient8: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient9: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient10: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient11: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient12: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient13: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient14: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient15: {
            in: ingredients,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return result;
}

async function getAllIngredients() {
  const result = await prisma.ingredient.findMany({});

  return result;
}

async function getFilterCocktails(keyword) {
  const results = await prisma.cocktail.findMany({
    where: {
      OR: [
        {
          strIngredient1: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient2: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient3: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient4: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient5: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient6: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient1: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient7: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient8: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient9: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient10: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient11: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient12: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient13: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient14: {
            in: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient15: {
            in: keyword,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return results;
}

async function getFilterCocktailsStrict(keywords) {
  const results = await prisma.cocktail.findMany({});
  const formatResult = results.map((el) => {
    const ingredientArray = [
      el.strIngredient1,
      el.strIngredient2,
      el.strIngredient3,
      el.strIngredient4,
      el.strIngredient5,
      el.strIngredient6,
      el.strIngredient7,
      el.strIngredient8,
      el.strIngredient9,
      el.strIngredient10,
      el.strIngredient11,
      el.strIngredient12,
      el.strIngredient13,
      el.strIngredient14,
      el.strIngredient15,
    ]
      .filter((el) => el)
      .map((el) => el.toLowerCase());

    return {
      idDrink: el.idDrink,
      strDrink: el.strDrink,
      ingredients: ingredientArray,
      strCategory: el.strCategory,
      strAlcoholic: el.strAlcoholic,
      strDrinkThumb: el.strDrinkThumb,
    };
  });

  return formatResult.filter((drink) => {
    return keywords.every((keyword) => drink.ingredients.includes(keyword));
  });
}

async function getNonAlcoholicDrinks(keyword) {
  const ingredientsObj = await prisma.ingredient.findMany({
    where: {
      strType: {
        equals: keyword,
        mode: "insensitive",
      },
    },
    select: {
      strIngredient: true,
    },
  });

  const ingredients = [keyword].concat(
    ingredientsObj.map((el) => el.strIngredient)
  );

  const result = await prisma.cocktail.findMany({
    where: {
      strAlcoholic: "Non alcoholic",
      OR: [
        {
          strDrink: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          strIngredient1: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient2: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient3: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient4: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient5: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient6: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient1: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient7: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient8: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient9: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient10: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient11: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient12: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient13: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient14: {
            in: ingredients,
            mode: "insensitive",
          },
        },
        {
          strIngredient15: {
            in: ingredients,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return result;
}

module.exports = {
  getCocktail,
  getAllIngredients,
  getFilterCocktails,
  getFilterCocktailsStrict,
  getNonAlcoholicDrinks,
};
