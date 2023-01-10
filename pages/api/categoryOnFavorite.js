const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    const findCategoryId = await prisma.category.findFirst({
      where: {
        userId: req.body.userId,
        name: req.body.category,
      },
    });
    const addDrinkToCategory = await prisma.categoriesOnFavorite.create({
      data: {
        favoriteId: req.body.favId,
        categoryId: findCategoryId.id,
      },
    });
    console.log(findCategoryId);
    res.status(201).json({ message: "cocktail added category" });
  }

  if (req.method === "DELETE") {
    // console.log("req.body", req.body);
    const findCategoryId = await prisma.category.findFirst({
      where: {
        userId: req.body.userId,
        name: req.body.category,
      },
    });
    const findCategoryOnFavoriteId =
      await prisma.categoriesOnFavorite.findFirst({
        where: {
          favoriteId: req.body.favId,
          categoryId: findCategoryId.id,
        },
      });
    const deleteCategoryOnFavorite = await prisma.categoriesOnFavorite.delete({
      where: {
        id: findCategoryOnFavoriteId.id,
      },
    });
    // console.log(findCategoryonFavoriteId);

    res.status(201).json({ message: "cocktail removed to category" });
  }
}

export default Handler;
