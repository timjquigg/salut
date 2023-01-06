const { PrismaClient } = require("@prisma/client");
const fs = require("fs").promises;

const prisma = new PrismaClient();

async function main() {
  let drinks = await fs.readFile("prisma/drinksData.json", "utf8");
  drinks = JSON.parse(drinks);
  for (const el of drinks) {
    const drink = await prisma.cocktail.create({
      data: el,
    });
    console.log(`Created cocktail with id: ${drink.idDrink}`);
  }

  let ingredients = await fs.readFile("prisma/ingredientsData.json", "utf8");
  ingredients = JSON.parse(ingredients);
  for (const el of ingredients) {
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
