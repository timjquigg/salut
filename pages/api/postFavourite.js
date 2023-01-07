const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "POST") {
    console.log('req.body', req.body);
    await prisma.favorite.create({
      data: {
        userId: req.body[0],
        cocktailId: req.body[1],
      }
    });
    res.status(201).json({message: 'favorite saved!'})
  }
  
}

export default Handler