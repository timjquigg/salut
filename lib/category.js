import prisma from "./prismadb";

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
  return output;
}

async function getCategoriesByFavId(favId) {
  const categoriesOnFavData = await prisma.categoriesOnFavorite.findMany({
    where: {
      favoriteId: favId,
    },
  });
  const categoryIdArr = categoriesOnFavData.map((el) => el.categoryId);
  const categories = await prisma.category.findMany({
    where: { id: { in: categoryIdArr } },
  });
  const categoryArr = categories.map((category) => category.name);
  return categoryArr;
}

/////////////////CLIENT SIDE////////////////

async function getAllCategoriesByUserClient(id) {
  const categories = await prisma.category.findMany({
    where: {
      userId: id,
    },
  });

  return categories;
}

async function getCategoryContentsByUserClient(id) {
  const categories = await prisma.category.findMany({
    where: {
      userId: id,
    },
  });

  const userCategories = await prisma.user.findUnique({
    where: {
      id: id,
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
  return output;
}

module.exports = {
  getAllCategoriesByUser,
  getAllCategoryDrinksByUser,
  getCategoryContentsByUser,
  getCategoriesByFavId,
  getAllCategoriesByUserClient,
  getCategoryContentsByUserClient,
};
