import { Typography, Box, Paper, Button } from "@mui/material";
import { getIngredients, getInventory } from "../../lib/inventory";
import { getUserId } from "../../lib/user";
import VerticalTabs from "../../components/inventory/verticalTabs";
import { useSession } from "next-auth/react";
import useInventoryData from "../../hooks/useInventoryData";

function Inventory(props) {
  const { categories } = props;
  const { data: session, status } = useSession();
  const { save } = useInventoryData(props.inventory, session.user.id);

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
  if (sessionToken) {
    const inventory = await getInventory(getUserId(sessionToken));
    return {
      props: {
        ingredients,
        categories,
        inventory,
      },
    };
  }
  return { props: {} };
}

export default Inventory;
