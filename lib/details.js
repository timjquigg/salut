const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getCocktailDetails(id) {
  const result = await prisma.cocktail.findUnique({
    where: {
      idDrink: id
    },
  });
  console.log('cocktail details:', result)
  return result;
}

module.exports = { getCocktailDetails };