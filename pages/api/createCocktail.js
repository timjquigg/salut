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

      return script;
    };
    const ingredientScript = makeIngredientScript();

    const newCocktail = await prisma.cocktail.create({
      data: ingredientScript,
    });
    res.status(200).json({ message: "Cocktail created" });
  }

  if (req.method === "DELETE") {
    console.log("drinkID", req.body);
    const deleteCocktail = await prisma.cocktail.delete({
      where: {
        idDrink: req.body.cocktailId,
      },
    });
    res.status(200).json({ message: "Cocktail deleted" });
  }
}

export default Handler;
