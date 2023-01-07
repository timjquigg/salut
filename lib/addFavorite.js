const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addFavorite(userId, cocktailId) {
  const favorite = await prisma.favorite.create({
    data: {
      userId: userId,
      cocktailId: cocktailId,
    }
  });
  return favorite;
}

module.exports = { addFavorite };