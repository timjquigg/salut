import { Typography, Box, Paper, Button } from "@mui/material";
import { getIngredients, getInventory } from "../../lib/inventory";
import { getUserId } from "../../lib/user";
import VerticalTabs from "../../components/inventory/verticalTabs";
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { inventoryContext } from "../../providers/InventoryProvider";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

function Inventory(props) {
  const { data: session, status } = useSession();
  const { ingredients, categories } = props;
  const [startingInventory, setStartingInventory] = useState(props.inventory);

  const { inventory } = useContext(inventoryContext);
  console.log("inventory page", inventory);

  const save = () => {
    console.log(inventory);
    const additions = inventory.filter((el) => !startingInventory.includes(el));
    const deletions = startingInventory.filter((el) => !inventory.includes(el));
    const payload = { additions, deletions, user: session.user.id };
    axios.post("api/inventory", payload).then((res) => {
      setStartingInventory(res.data);
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
        <VerticalTabs>{categories}</VerticalTabs>
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
  const inventory = await getInventory(getUserId(sessionToken));
  return {
    props: {
      ingredients,
      categories,
      inventory,
    },
  };
}

export default Inventory;
