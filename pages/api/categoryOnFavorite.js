import { getAllCategoryDrinksByUser } from "../../lib/category";
import prisma from "../../lib/prismadb";

async function Handler(req, res) {
  if (req.method === "GET") {
    // console.log("req.body on GET", req.query);

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

    res.status(200).json(output);
  }

  if (req.method === "POST") {
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
    res.status(201).json({ message: "cocktail added to category" });
  }

  if (req.method === "DELETE") {
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

    res.status(201).json({ message: "cocktail removed to category" });
  }
}

export default Handler;
