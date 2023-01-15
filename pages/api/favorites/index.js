import prisma from "../../../lib/prismadb";
import { getFavoriteIdClient } from "../../../lib/favorite";
import { getCategoriesByFavId } from "../../../lib/category";

async function handler(req, res) {
  if (req.method === "POST") {
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
    const findFavoriteId = await prisma.favorite.findFirst({
      where: {
        userId: req.body.userId,
        cocktailId: req.body.cocktailId,
      },
    });

    const deleteFavorite = await prisma.favorite.delete({
      where: {
        id: findFavoriteId.id,
      },
    });
    res.status(201).json({ message: "favorite removed!" });
    return;
  }

  if (req.method === "GET") {
    const { cocktailId, userId } = req.query;

    const favoriteId = await getFavoriteIdClient(userId, cocktailId);
    let categories = [];
    if (favoriteId) {
      categories = await getCategoriesByFavId(favoriteId.id);
    }
    res.status(201).send({ favoriteId, categories });
    return;
  }
}

export default handler;
