import { createContext, useEffect, useState } from "react";
// import { getInventory } from "../lib/inventory";
import { useSession } from "next-auth/react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

// Create a Context
export const inventoryContext = createContext();

// Create Component Wrapper
export default function InventoryProvider(props) {
  const { data: session, status } = useSession();
  const [inventory, setInventory] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const userId = session.user.id;

  useEffect(() => {
    const params = new URLSearchParams({ userId });
    Promise.all([
      axios.get(`api/inventory/${userId}`),
      axios.get(`api/inventory?${params}`),
    ]).then((all) => {
      setInventory(all[0].data);
      setCategories(all[1].data.categories);
      setRecipes(all[1].data.recipes);
    });
  }, [userId]);
  // Shared State object:

  const updateInventory = (name) => {
    if (inventory.includes(name)) {
      const payload = { user: userId, additions: [], deletions: name };
      axios.post("api/inventory", payload).then((res) => {
        setInventory(res.data);
      });
      return;
    }
    const payload = { user: userId, additions: [name], deletions: [] };
    axios.post("api/inventory", payload).then((res) => {
      setInventory(res.data);
    });
    return;
  };

  const providerData = { inventory, updateInventory, categories, recipes };

  return (
    <inventoryContext.Provider value={providerData}>
      {props.children}
    </inventoryContext.Provider>
  );
}
