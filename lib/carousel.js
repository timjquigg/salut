const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getRandomCocktails() {
  const skip = Math.floor(Math.random() * 100);
  const result = await prisma.cocktail.findMany({
    take: 5,
    skip: skip,
  });

  return result;
}

module.exports = { getRandomCocktails };