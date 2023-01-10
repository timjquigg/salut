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
    // NEED TO IMPLEMENT
    res.status(201).json({ message: "cocktail category set to null" });
  }
}

export default Handler;
