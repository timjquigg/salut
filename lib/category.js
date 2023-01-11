const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllCategoriesByUser(sessionToken) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      userId: userId.userId,
    },
  });

  return categories;
}

async function getAllCategoryDrinksByUser(userId, category) {
  // const userId = await prisma.session.findFirst({
  //   where: {
  //     sessionToken: sessionToken,
  //   },
  // });
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      category: {
        where: {
          name: category,
        },
        include: {
          favorites: true,
        },
      },
    },
  });
  const favDrinkID = userData.category[0]?.favorites.map((fav) => {
    return fav.favoriteId;
  });

  const favData = await prisma.favorite.findMany({
    where: { id: { in: favDrinkID } },
  });
  const mapFavData = favData.map((data) => data.cocktailId);

  const drinksData = await prisma.cocktail.findMany({
    where: { idDrink: { in: mapFavData } },
  });

  // console.log(drinksData);

  return drinksData;
}

getAllCategoryDrinksByUser("18d9fe06-4d94-466c-8808-0fb562583d0b").then(
  (res) => res
);

module.exports = { getAllCategoriesByUser, getAllCategoryDrinksByUser };
