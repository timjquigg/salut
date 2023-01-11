const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    const newCategory = await prisma.category.create({
      data: {
        name: req.body.category,
        userId: req.body.userId,
      },
    });
    res.status(201).json({ message: "added category" });
  }

  if (req.method === "DELETE") {
    console.log("req.body", req.body);
    const categoryId = await prisma.category.findFirst({
      where: { userId: req.body.userId, name: req.body.category },
    });
    const deleteCategory = await prisma.category.delete({
      where: { id: categoryId.id },
    });
    console.log(categoryId.id);
    res.status(201).json({ message: "delete category" });
  }
}

export default Handler;
