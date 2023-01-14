const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
import { getUserCreatedCocktails } from "../../lib/cocktail";

async function Handler(req, res) {
  if (req.method === "GET") {
    // console.log("USERID", req.query.userId);
    const { userId } = req.query;
    const cocktails = await getUserCreatedCocktails(userId);

    res.status(200).json({ cocktails });
  }
}

export default Handler;
