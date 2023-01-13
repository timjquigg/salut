import axios from "axios";
import { useContext } from "react";
import { inventoryContext } from "../providers/InventoryProvider";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export function useLoggedInDetailData(data, user, cocktailId, ingredient) {
  const { updateInventory } = useContext(inventoryContext);

  const getIngredients = (data, str) => {
    const output = [];
    // const data = props.data;
    let ingKeys = Object.keys(data).filter((key) => key.includes(str));

    for (let key of ingKeys) {
      if (data[key] !== null) {
        output.push(data[key]);
      }
    }
    return output;
  };

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

  return {
    addFavorite,
    removeFavorite,
    addInventory,
    removeInventory,
    getIngredients,
  };
}

export function useNotLoggedInDetailData(data, str) {
  const getIngredients = (data, str) => {
    const output = [];
    // const data = props.data;
    let ingKeys = Object.keys(data).filter((key) => key.includes(str));

    for (let key of ingKeys) {
      if (data[key] !== null) {
        output.push(data[key]);
      }
    }
    return output;
  };

  return { getIngredients };
}
