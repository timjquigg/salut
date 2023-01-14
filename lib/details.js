import prisma from "./prismadb";

async function getCocktailDetails(id) {
  const result = await prisma.cocktail.findUnique({
    where: {
      idDrink: id,
    },
    include: {
      Favorite: true,
    },
  });
  console.log("cocktail details:", result);
  return result;
}

module.exports = { getCocktailDetails };
