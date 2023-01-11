const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function Handler(req, res) {
  if (req.method === "POST") {
    console.log("req.body", req.body);

    const getIngredient = await prisma.ingredient.findFirst({
      where: {
        strIngredient: {
          contains: req.body.inventory,
            mode: "insensitive",
        }
      }
    })
   
    const addInventory = await prisma.inventory.create({
      data: {
        userId: req.body.userId,
        nameIngredient: getIngredient.strIngredient,
      },
    });
    res.status(201).json({ message: "inventory saved!" });
  }
}

export default Handler;
