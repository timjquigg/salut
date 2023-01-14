const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "POST") {
    const { recipe, title, userId, photo, directions } = req.body;
    const makeIngredientScript = () => {
      let script = {
        strDrink: title,
        strInstructions: directions,
        strDrinkThumb: photo,
        userId: userId,
        strCategory: "Ordinary Drink",
      };
      recipe.forEach((recipe, i) => {
        script[`strIngredient${i + 1}`] = recipe.ingredient;
        script[`strMeasure${i + 1}`] = recipe.measurement;
      });
      // console.log("SCRIPT:", script);
      return script;
    };
    const ingredientScript = makeIngredientScript();

    const newCocktail = await prisma.cocktail.create({
      data: ingredientScript,
    });
    res.status(200).json({ message: "Cocktail created" });
  }

  if (req.method === "DELETE") {
    // NEED TO IMPLEMENT
  }
}

export default Handler;
