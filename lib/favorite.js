import prisma from "./prismadb";

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

async function getFavoriteByUserId(id) {
  const favoriteList = await prisma.favorite.findMany({
    where: {
      userId: id,
    },
  });
  const output = favoriteList.map((el) => el.cocktailId);
  return output;
}

async function getFavorites(sessionToken) {
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
  return output;
}

async function getUserId(sessionToken) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken,
    },
  });

  return userId.userId;
}

//////////////////CLIENT SIDE/////////////////

async function getFavoriteIdClient(id, cocktailId) {
  const favoriteId = await prisma.favorite.findFirst({
    where: {
      userId: id,
      cocktailId: cocktailId,
    },
  });
  return favoriteId;
}

async function getFavoriteByIdClient(id) {
  const favorites = await prisma.favorite.findMany({
    where: {
      userId: id,
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
  // console.log(output);
  return output;
}

module.exports = {
  getFavoriteId,
  getFavorites,
  getFavoriteByUser,
  getUserId,
  getFavoriteByUserId,
  getFavoriteByIdClient,
  getFavoriteIdClient,
};
