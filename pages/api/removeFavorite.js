const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function removeHandler(req, res) {
  if (req.method === "DELETE") {
    // console.log("req.body", req.body);

    const findFavoriteId = await prisma.favorite.findFirst({
      where: {
        userId: req.body.userId,
        cocktailId: req.body.cocktailId,
      }
    });
    console.log(findFavoriteId)
    
    const deleteFavorite = await prisma.favorite.delete({
      where: {
        id: findFavoriteId.id
      }
    });
    res.status(201).json({ message: "favorite removed!" });
  }
}


export default removeHandler;