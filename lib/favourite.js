const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getFavoriteId(sessionToken, cocktailId) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken
    }
  })

  const favoriteId = await prisma.favorite.findFirst({
    where: {
      userId: userId.userId,
      cocktailId: cocktailId,
    },
  });
  console.log(favoriteId)
  return favoriteId;
}

module.exports = { getFavoriteId };