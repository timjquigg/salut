import { getUserId } from "../../../lib/user";
import { getInventory } from "../../../lib/inventory";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // console.log(req.query);
    const { userId, sessionToken } = req.query;
    if (sessionToken) {
      const inventory = await getInventory(getUserId(sessionToken));
      res.status(200).send(inventory);
      return;
    }
    const inventory = await getInventory(userId);
    res.status(200).send(inventory);
    return;
  }
}
