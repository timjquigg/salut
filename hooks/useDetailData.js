import axios from "axios";
import { useContext } from "react";
import { inventoryContext } from "../providers/InventoryProvider";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default function useDetailData(user, cocktailId, ingredient) {
  const { updateInventory } = useContext(inventoryContext);

  const addFavorite = async (user, cocktailId) => {
    const payload = { cocktailId, userId: user };
    console.log("add:", payload);
    console.log("/api/favorites");
    await axios.post("/api/favorites", payload);
  };

  const removeFavorite = async (user, cocktailId) => {
    const payload = { cocktailId, userId: user };
    console.log("delete:", payload);
    console.log("/api/favorites");
    await axios.delete("/api/favorites", { data: payload });
  };

  const addInventory = async (user, ingredient) => {
    const payload = { user, additions: [ingredient], deletions: [] };
    axios.post("/api/inventory", payload).then(() => {
      updateInventory(ingredient);
    });
  };

  const removeInventory = async (user, ingredient) => {
    const payload = { user, additions: [], deletions: [ingredient] };
    axios.post("/api/inventory", payload).then(() => {
      updateInventory(ingredient);
    });
  };

  return { addFavorite, removeFavorite, addInventory, removeInventory };
}
