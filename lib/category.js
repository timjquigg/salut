const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// List of category
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

// Drink category filter
async function getAllCategoryDrinksByUser(userId, category) {
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

// Category list with drink pair by user
async function getCategoryContentsByUser(sessionToken) {
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

  const userCategories = await prisma.user.findUnique({
    where: {
      id: userId.userId,
    },
    include: {
      category: {
        include: {
          favorites: true,
        },
      },
    },
  });
  let categoryFeatureByUser = [];
  userCategories.category.forEach((el) => {
    categoryFeatureByUser = [...categoryFeatureByUser, ...el.favorites];
  });

  const output = [];
  categoryFeatureByUser.forEach((categoryFeature) => {
    categories.forEach((category) => {
      if (category.id === categoryFeature.categoryId) {
        output.push({ name: category.name, favId: categoryFeature.favoriteId });
      }
    });
  });
  // console.log(output);
  // console.log(
  //   output.some(
  //     (el) =>
  //       el.name === "Halloween" &&
  //       el.favId === "9598cc53-25b6-4c2b-a470-343f424dae96"
  //   )
  // );
  return output;
}

// getCategoryContentsByUser("5b9b7f5b-7ff3-4ab9-95f0-a6a27213fbcc").then(
//   (res) => res
// );

module.exports = {
  getAllCategoriesByUser,
  getAllCategoryDrinksByUser,
  getCategoryContentsByUser,
};
