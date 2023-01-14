const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import {
  getCocktail,
  getAllIngredients,
  getFilterCocktailsStrict,
  getNonAlcoholicDrinks,
} from "../../lib/search";
import { getFavoriteByUserId } from "../../lib/favorite";

async function Handler(req, res) {
  if (req.method === "GET") {
    const { userId, keywords } = req.query;

    const keywordArray = keywords.split(",");
    let data;
    if (keywordArray.length > 1 && !keywordArray.includes("Non-Alcoholic")) {
      const filterKeywords = keywordArray.map((el) => el.toLowerCase());
      data = await getFilterCocktailsStrict(filterKeywords);
    } else if (
      keywords.includes("Non-Alcoholic") &&
      keywordArray.length === 2
    ) {
      const filterKeywords = keywordArray.map((el) => el.toLowerCase());
      data = await getNonAlcoholicDrinks(filterKeywords[1] || []);
    } else {
      data = await getCocktail(keywordArray[0]);
    }

    const ingredientData = await getAllIngredients();
    console.log(ingredientData);

    if (userId) {
      const userFavorites = await getFavoriteByUserId(userId);
      res.status(200).json({
        drink: data,
        ingredients: ingredientData,
        favorites: userFavorites,
      });
    }

    res.status(200).json({ drink: data, ingredients: ingredientData });
  }
}

export default Handler;
