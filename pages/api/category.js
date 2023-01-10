const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "GET") {
    console.log("req.body", req.body);
    // const favorite = await prisma.favorite.create({
    //   data: {
    //     userId: req.body.userId,
    //     cocktailId: req.body.cocktailId,
    //   },
    // });
    res.status(201).json({ message: "retrieved all categories" });
  }
  if (req.method === "PUT") {
    const favoriteCocktail = await prisma.favorite.findMany({
      where: { cocktailId: req.body.cocktailId },
    });
    const favoriteCategory = await prisma.favorite.update({
      where: { id: favoriteCocktail[0].id },
      data: {
        category: req.body.category,
      },
    });
    res.status(201).json({ message: "cocktail category updates" });
  }
  if (req.method === "DELETE") {
    console.log("req.body", req.body);
    const favoriteCocktail = await prisma.favorite.findMany({
      where: { cocktailId: req.body.cocktailId },
    });
    const favoriteCategory = await prisma.favorite.update({
      where: { id: favoriteCocktail[0].id },
      data: {
        category: null,
      },
    });
    res.status(201).json({ message: "cocktail category set to null" });
  }
}

export default Handler;
