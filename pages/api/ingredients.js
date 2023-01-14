const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { getAllIngredients } from "../../lib/search";
import { getPopularCocktails } from "../../lib/carousel";

const Handler = async (req, res) => {
  const data = await getAllIngredients();
  const recipes = await getPopularCocktails();
  res.status(200).json({ ingredients: data, recipes });
};
export default Handler;
