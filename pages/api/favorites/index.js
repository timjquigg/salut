const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === "POST") {
    console.log("POST");
    console.log("req.body", req.body);
    const favorite = await prisma.favorite.create({
      data: {
        userId: req.body.userId,
        cocktailId: req.body.cocktailId,
      },
    });
    res.status(201).json({ message: "favorite saved!" });
    return;
  }

  if (req.method === "DELETE") {
    console.log("delete");
    console.log("req.body", req.body);
    console.log(req.body.userId, req.body.cocktailId);

    const findFavoriteId = await prisma.favorite.findFirst({
      where: {
        userId: req.body.userId,
        cocktailId: req.body.cocktailId,
      },
    });
    console.log(findFavoriteId);

    const deleteFavorite = await prisma.favorite.delete({
      where: {
        id: findFavoriteId.id,
      },
    });
    res.status(201).json({ message: "favorite removed!" });
    return;
  }
}

export default handler;
