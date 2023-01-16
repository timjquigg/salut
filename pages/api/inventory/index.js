import {
  deleteFromInventory,
  addToInventory,
  getInventory,
  getIngredients,
} from "../../../lib/inventory";
import { getCocktailsBasedOnInventory } from "../../../lib/cocktail";
import { ContactSupportOutlined } from "@mui/icons-material";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId, numItemDisplay } = req.query;
    const { ingredients, categories } = await getIngredients();
    const inventory = await getInventory(userId);
    const recipes = await getCocktailsBasedOnInventory(inventory);
    const paginateRecipe = recipes.slice(0, numItemDisplay);
    res.status(200).send({
      categories,
      recipes: paginateRecipe,
      recipeLength: recipes.length,
    });
    return;
  }

  if (req.method === "POST") {
    const { user, additions, deletions } = req.body;
    if (additions.length > 0) {
      const data = await addToInventory(user, additions);
      res.status(200).send(data);
      return;
    }
    const data = await deleteFromInventory(user, deletions);
    res.status(200).send(data);
    return;
  }
}
