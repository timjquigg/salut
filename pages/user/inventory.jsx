import { Typography, Box, Paper, Button } from "@mui/material";
import { getIngredients, getInventory } from "../../lib/inventory";
import VerticalTabs from "../../components/inventory/verticalTabs";
import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

function Inventory(props) {
  const { data: session, status } = useSession();
  const { ingredients, categories } = props;
  const [inventory, setInventory] = useState(props.inventory);

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

  const save = () => {
    const additions = inventory.filter((el) => !props.inventory.includes(el));
    const deletions = props.inventory.filter((el) => !inventory.includes(el));
    const payload = { additions, deletions, user: session.user.id };
    axios.post("api/inventory", payload).then((res) => {
      console.log(res);
    });
  };

  return (
    <Box
      textAlign="center"
      sx={{
        mt: "104px",
        width: "100%",
        display: "flex",
        height: "80vh",
      }}
    >
      <Paper
        sx={{
          width: 2 / 5,
          mx: "auto",
          height: "100%",
        }}
      >
        <Typography>Ingredients</Typography>
        <VerticalTabs inventory={inventory} updateInventory={updateInventory}>
          {categories}
        </VerticalTabs>
        <Button
          sx={{ mx: "auto" }}
          onClick={() => {
            save();
          }}
        >
          Save
        </Button>
      </Paper>
    </Box>
  );
}
Inventory.auth = true;

export async function getServerSideProps(context) {
  const { ingredients, categories } = await getIngredients();
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const inventory = await getInventory(sessionToken);
  return {
    props: {
      ingredients,
      categories,
      inventory,
    },
  };
}

export default Inventory;
