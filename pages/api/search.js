import {
  getCocktail,
  getAllIngredients,
  getFilterCocktailsStrict,
  getNonAlcoholicDrinks,
} from "../../lib/search";
import { getFavoriteByUserId } from "../../lib/favorite";

async function Handler(req, res) {
  if (req.method === "GET") {
    const { userId, keywords, count } = req.query;
    console.log("QUERY:", req.query);
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
    const dataLength = data.length;
    const displayedData = data.slice(0, count);

    const ingredientData = await getAllIngredients();

    if (userId) {
      const userFavorites = await getFavoriteByUserId(userId);
      res.status(200).json({
        drink: displayedData,
        ingredients: ingredientData,
        favorites: userFavorites,
        dataLength,
      });
      return;
    }

    res.status(200).json({
      drink: displayedData,
      ingredients: ingredientData,
      dataLength,
    });
  }
}

export default Handler;
