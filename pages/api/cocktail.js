import { getCocktailsBasedOnInventory } from "../../lib/cocktail";

async function Handler(req, res) {
  if (req.method === "GET") {
    const inventory = req.query;
    const cocktails = await getCocktailsBasedOnInventory(inventory);
    return cocktails;
  }
}
