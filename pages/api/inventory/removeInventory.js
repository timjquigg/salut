const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function removeHandler(req, res) {
  if (req.method === "DELETE") {
    // console.log("req.body", req.body);
    const getIngredient = await prisma.ingredient.findFirst({
      where: {
        strIngredient: {
          contains: req.body.inventory,
            mode: "insensitive",
        }
      }
    })

    const deleteInventory = await prisma.inventory.delete({
      where: {
        nameIngredient: getIngredient.strIngredient
      }
    });
    res.status(201).json({ message: "inventory removed!" });
  }
}


export default removeHandler;