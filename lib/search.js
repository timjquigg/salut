const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getCocktailName(name) {
  const result = await prisma.cocktail.findMany({
    where: {
      strDrink: name,
    },
  });

  // console.log(result);
  return result;
}

// main().then((e) => console.log(e));

module.exports = { getCocktailName };
