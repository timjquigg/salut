import { Box, Typography } from "@mui/material";
import { useLoggedInDetailData } from "../../hooks/useDetailData";
import CheckBox from "./checkbox";

export default function Inventory(props) {
  const { ingredients, inventory, userId } = props;

  const { addInventory, removeInventory } = useLoggedInDetailData();

  const invUppercase = [];
  inventory.map((inv) => invUppercase.push(inv.toUpperCase()));

  const inventoryCheckList = ingredients.map((ingredient, i) => {
    return (
      <CheckBox
        key={i}
        isInventory={invUppercase.includes(ingredient.toUpperCase())}
        addInventory={() => addInventory(userId, ingredient)}
        removeInventory={() => removeInventory(userId, ingredient)}
      />
    );
  });

  return (
    <Box>
      <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
        Inventory
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "0.1rem",
          alignItems: "center",
        }}
      >
        {inventoryCheckList}
      </Box>
    </Box>
  );
}
