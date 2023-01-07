const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "POST") {
    console.log("req.body", req.body);
    const favorite = await prisma.favorite.create({
      data: {
        userId: req.body.userId,
        cocktailId: req.body.cocktailId,
      }
    });
    res.status(201).json({ message: "favorite saved!" });
  }
}

export default Handler;
