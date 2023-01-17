const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;
const { makeTitleCase } = require("./makeTitleCase");

const prisma = new PrismaClient();

async function main() {
  let drinks = await fs.readFile("prisma/drinksData.json", "utf8");
  drinks = JSON.parse(drinks);
  for (const el of drinks) {
    el.strDrink = makeTitleCase(el.strDrink);
    el.strIngredient1 =
      el.strIngredient1 === null ? null : makeTitleCase(el.strIngredient1);
    el.strIngredient2 =
      el.strIngredient2 === null ? null : makeTitleCase(el.strIngredient2);
    el.strIngredient3 =
      el.strIngredient3 === null ? null : makeTitleCase(el.strIngredient3);
    el.strIngredient4 =
      el.strIngredient4 === null ? null : makeTitleCase(el.strIngredient4);
    el.strIngredient5 =
      el.strIngredient5 === null ? null : makeTitleCase(el.strIngredient5);
    el.strIngredient6 =
      el.strIngredient6 === null ? null : makeTitleCase(el.strIngredient6);
    el.strIngredient7 =
      el.strIngredient7 === null ? null : makeTitleCase(el.strIngredient7);
    el.strIngredient8 =
      el.strIngredient8 === null ? null : makeTitleCase(el.strIngredient8);
    el.strIngredient9 =
      el.strIngredient9 === null ? null : makeTitleCase(el.strIngredient9);
    el.strIngredient10 =
      el.strIngredient10 === null ? null : makeTitleCase(el.strIngredient10);
    el.strIngredient11 =
      el.strIngredient11 === null ? null : makeTitleCase(el.strIngredient11);
    el.strIngredient12 =
      el.strIngredient12 === null ? null : makeTitleCase(el.strIngredient12);
    el.strIngredient13 =
      el.strIngredient13 === null ? null : makeTitleCase(el.strIngredient13);
    el.strIngredient14 =
      el.strIngredient14 === null ? null : makeTitleCase(el.strIngredient14);
    el.strIngredient15 =
      el.strIngredient15 === null ? null : makeTitleCase(el.strIngredient15);

    const drink = await prisma.cocktail.create({
      data: el,
    });
    console.log(`Created cocktail with id: ${drink.idDrink}`);
  }

  let ingredients = await fs.readFile("prisma/ingredientsData.json", "utf8");
  ingredients = JSON.parse(ingredients);
  for (const el of ingredients) {
    el.strIngredient = makeTitleCase(el.strIngredient);
    const ingredient = await prisma.ingredient.create({
      data: el,
    });
    console.log(`Created ingredient with id: ${ingredient.idIngredient}`);
  }
  console.log(`Seeding finished`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
