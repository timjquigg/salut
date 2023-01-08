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

  console.log(favoriteId);
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
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken
    }
  });

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: userId.userId
    },
  });

  const cocktailIds = [];
  favorites.map(favorite => cocktailIds.push(favorite.cocktailId))
  // console.log('cocktailIds?:', cocktailIds)


  const recipes = await prisma.cocktail.findMany({
    where: {
      idDrink: { in: cocktailIds }
    }
  })
  // console.log('recipes?:', recipes)
  return recipes;
}


module.exports = { getFavoriteId, getFavorites, getFavoriteByUser};

