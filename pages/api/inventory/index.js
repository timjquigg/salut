import {
  deleteFromInventory,
  addToInventory,
  getInventory,
  getIngredients,
} from "../../../lib/inventory";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { userId } = req.query;

    const { ingredents, categories } = await getIngredients();
    // const inventory = await getInventory(userId);

    res.status(200).send({ ingredents, categories });
    return;
  }

  if (req.method === "POST") {
    const { user, additions, deletions } = req.body;
    console.log({ user }, { additions }, { deletions });
    if (additions.length > 0) {
      await addToInventory(user, additions);
    }
    if (deletions.length > 0) {
      await deleteFromInventory(user, deletions);
    }
    const inventory = await getInventory(user);
    // console.log(inventory);
    res.status(200).send(inventory);
    return;
  }
}
