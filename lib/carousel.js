const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getRandomCocktails() {
  const skip = Math.floor(Math.random() * 100);
  const result = await prisma.cocktail.findMany({
    take: 10,
    skip: skip,
  });

  return result;
}

async function getPopularCocktails() {
  const result = await prisma.favorite.groupBy({
    by: ['cocktailId'],
    _count: {
      cocktailId: true,
    },
    orderBy: {
      _count: {
        cocktailId: 'asc'
      }
    },
    take: 10,
  });
  console.log('popular?:', result)
  const cocktailIds = [];
  result.map(cocktail => cocktailIds.push(cocktail.cocktailId))
  console.log('popular drinks:', cocktailIds)
  const popularCocktails = await prisma.cocktail.findMany({
    where: {
      idDrink: { in: cocktailIds }
    }
  })
  return popularCocktails;
}

module.exports = { getRandomCocktails, getPopularCocktails };