import prisma from "../../lib/prismadb";

import { getFavoriteByIdClient } from "../../lib/favorite";
import {
  getAllCategoriesByUserClient,
  getCategoryContentsByUserClient,
} from "../../lib/category";

async function Handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const categoryContents = await getCategoryContentsByUserClient(userId);

    const categoriesByUser = await getAllCategoriesByUserClient(userId);
    const recipes = await getFavoriteByIdClient(userId);
    const categories = categoriesByUser.map((el) => el.name);
    res.status(200).json({ categoryContents, categories, recipes, userId });
  }
  if (req.method === "POST") {
    const newCategory = await prisma.category.create({
      data: {
        name: req.body.category,
        userId: req.body.userId,
      },
    });
    res.status(201).json({ message: "added category" });
  }

  if (req.method === "DELETE") {
    const categoryId = await prisma.category.findFirst({
      where: { userId: req.body.userId, name: req.body.category },
    });
    const deleteCategory = await prisma.category.delete({
      where: { id: categoryId.id },
    });
    res.status(201).json({ message: "delete category" });
  }
}

export default Handler;
