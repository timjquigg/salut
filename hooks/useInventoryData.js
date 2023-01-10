import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import { inventoryContext } from "../providers/InventoryProvider";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default function useInventoryData(serverInventory, user) {
  const { data: session, status } = useSession();
  const [startingInventory, setStartingInventory] = useState(serverInventory);

  const { inventory } = useContext(inventoryContext);

  const save = () => {
    const additions = inventory.filter((el) => !startingInventory.includes(el));
    const deletions = startingInventory.filter((el) => !inventory.includes(el));
    const payload = { additions, deletions, user };
    axios.post("api/inventory", payload).then((res) => {
      setStartingInventory(res.data);
    });
  };

  return {
    save,
  };
}
