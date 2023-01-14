import { getCocktailsBasedOnInventory } from "../../lib/carousel";

async function Handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const cocktails = await getCocktailsBasedOnInventory(userId);
    // console.log("COCKTAILS:", cocktails);
    res.status(200).json({ cocktails });
  }
}

export default Handler;
