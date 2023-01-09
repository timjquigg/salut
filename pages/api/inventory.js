import { deleteFromInventory, addToInventory } from "../../lib/inventory";

export default async function handler(req, res) {
  const { user, additions, deletions } = req.body;
  if (req.method === "POST") {
    if (additions.length > 0) {
      await addToInventory(user, additions);
    }
    if (deletions.length > 0) {
      await deleteFromInventory(user, deletions);
    }
    return;
  }
}
