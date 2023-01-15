import { getUserCreatedCocktails } from "../../lib/cocktail";

async function Handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;
    const cocktails = await getUserCreatedCocktails(userId);

    res.status(200).json({ cocktails });
  }
}

export default Handler;
