import { getAllCategoryDrinksByUser } from "../../lib/category";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "GET") {
    console.log("req.body on PUT", req.query);

    const filteredDrinks = await getAllCategoryDrinksByUser(
      req.query.userId,
      req.query.category
    );

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: req.query.userId,
      },
    });

    const output = [];
    filteredDrinks.forEach((recipe) => {
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

    console.log("output:", output);
    res.status(200).json(output);
  }

  if (req.method === "POST") {
    // console.log("req.body", req.body);
    const findCategoryId = await prisma.category.findFirst({
      where: {
        userId: req.body.userId,
        name: req.body.category,
      },
    });
    const addDrinkToCategory = await prisma.categoriesOnFavorite.create({
      data: {
        favoriteId: req.body.favId,
        categoryId: findCategoryId.id,
      },
    });
    console.log(findCategoryId);
    res.status(201).json({ message: "cocktail added to category" });
  }

  if (req.method === "DELETE") {
    // console.log("req.body", req.body);
    const findCategoryId = await prisma.category.findFirst({
      where: {
        userId: req.body.userId,
        name: req.body.category,
      },
    });
    const findCategoryOnFavoriteId =
      await prisma.categoriesOnFavorite.findFirst({
        where: {
          favoriteId: req.body.favId,
          categoryId: findCategoryId.id,
        },
      });
    const deleteCategoryOnFavorite = await prisma.categoriesOnFavorite.delete({
      where: {
        id: findCategoryOnFavoriteId.id,
      },
    });
    // console.log(findCategoryonFavoriteId);

    res.status(201).json({ message: "cocktail removed to category" });
  }
}

export default Handler;
