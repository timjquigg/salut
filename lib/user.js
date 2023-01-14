import prisma from "./prismadb";

async function getUserId(sessionToken) {
  return await prisma.session.findFirst({
    where: {
      sessionToken,
    },
  });
}

module.exports = { getUserId };
