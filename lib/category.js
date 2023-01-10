const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getAllCategoriesByUser(sessionToken) {
  const userId = await prisma.session.findFirst({
    where: {
      sessionToken: sessionToken,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      userId: userId.userId,
    },
  });

  return categories;
}

module.exports = { getAllCategoriesByUser };
