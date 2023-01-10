const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUserId(sessionToken) {
  return await prisma.session.findFirst({
    where: {
      sessionToken,
    },
  });
}

module.exports = { getUserId };
