const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllCategoriesByUser(sessionToken) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });

  const favorites = await prisma.favorite.findMany({
    where: {
      userId: userId.userId,
    },
  });

  return favorites;
}

module.exports = { getAllCategoriesByUser };
