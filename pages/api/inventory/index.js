import {
  deleteFromInventory,
  addToInventory,
  getInventory,
  getIngredients,
} from "../../../lib/inventory";
import { getCocktailsBasedOnInventory } from "../../../lib/cocktail";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    const { ingredents, categories } = await getIngredients();
    const inventory = await getInventory(userId);
    const recipes = await getCocktailsBasedOnInventory(inventory);

    res.status(200).send({ categories, recipes });
    return;
  }

  if (req.method === "POST") {
    const { user, additions, deletions } = req.body;
    if (additions.length > 0) {
      await addToInventory(user, additions);
    }
    if (deletions.length > 0) {
      await deleteFromInventory(user, deletions);
    }
    const inventory = await getInventory(user);
    res.status(200).send(inventory);
    return;
  }
}
