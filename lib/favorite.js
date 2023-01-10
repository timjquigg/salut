const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getFavoriteId(sessionToken, cocktailId) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });

  const favoriteId = await prisma.favorite.findFirst({
    where: {
      userId: userId.userId,
      cocktailId: cocktailId,
    },
  });

  // console.log(favoriteId);
  return favoriteId;
}

async function getFavoriteByUser(sessionToken) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });

  const favoriteList = await prisma.favorite.findMany({
    where: {
      userId: userId.userId,
    },
  });
  const output = favoriteList.map((el) => el.cocktailId);
  return output;
}

async function getFavorites(sessionToken) {
  // 18d9fe06-4d94-466c-8808-0fb562583d0b
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken,
    },
  });

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: userId.userId,
    },
  });

  const cocktailIds = [];
  favorites.map((favorite) => cocktailIds.push(favorite.cocktailId));

  const recipes = await prisma.cocktail.findMany({
    where: {
      idDrink: { in: cocktailIds },
    },
  });
  // Merge two result together to get favorite.id and necessary drink info
  const output = [];
  recipes.forEach((recipe) => {
    favorites.forEach((favorite) => {
      if (recipe.idDrink === favorite.cocktailId) {
        output.push({
          idDrink: recipe.idDrink,
          strDrink: recipe.strDrink,
          strCategory: recipe.strCategory,
          strDrinkThumb: recipe.strDrinkThumb,
          favId: favorite.id,
          userId: favorite.userId,
        });
      }
    });
  });
  console.log(output);
  return output;
}

getFavorites("18d9fe06-4d94-466c-8808-0fb562583d0b").then((res) => res);

async function getUserId(sessionToken) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken,
    },
  });

  return userId.userId;
}

module.exports = { getFavoriteId, getFavorites, getFavoriteByUser, getUserId };
