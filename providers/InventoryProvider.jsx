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
  const userId = session.user.id;

  useEffect(() => {
    axios.get(`api/inventory/${userId}`).then((res) => {
      setInventory(res.data);
    });
  }, []);
  // Shared State object:

  const updateInventory = (event, name) => {
    const inventoryIndex = inventory.indexOf(name);
    let newInventory = [];

    if (inventoryIndex === -1) {
      newInventory = newInventory.concat(inventory, name);
    } else if (inventoryIndex === 0) {
      newInventory = newInventory.concat(inventory.slice(1));
    } else if (inventoryIndex === inventory.length - 1) {
      newInventory = newInventory.concat(inventory.slice(0, -1));
    } else if (inventoryIndex > 0) {
      newInventory = newInventory.concat(
        inventory.slice(0, inventoryIndex),
        inventory.slice(inventoryIndex + 1)
      );
    }

    setInventory(newInventory);
  };

  const providerData = { inventory, updateInventory };

  return (
    <inventoryContext.Provider value={providerData}>
      {props.children}
    </inventoryContext.Provider>
  );
}
