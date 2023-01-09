import { Typography, Box, Paper } from "@mui/material";
import { getIngredients } from "../../lib/inventory";
import VerticalTabs from "../../components/inventory/verticalTabs";

function Inventory(props) {
  const ingredients = props.ingredients;
  // console.log(ingredients);

  const categories = {};
  for (const ingredient of ingredients) {
    if (categories[ingredient.strType]) {
      categories[ingredient.strType].push(ingredient.strIngredient);
    } else {
      categories[ingredient.strType] = [ingredient.strIngredient];
    }
  }
  // console.log(categories);
  // console.log(Object.keys(categories).length);

  const categoriesList = Object.keys(categories)
    .sort()
    .map((category) => {
      return (
        <tr key={category}>
          <td>{category}</td>
        </tr>
      );
    });

  const ingredientList = ingredients.map((item) => {
    return (
      <tr key={item.idIngredient}>
        <td>{item.strIngredient}</td>
        <td>{item.strType}</td>
      </tr>
    );
  });

  return (
    <Box
      sx={{
        mt: "104px",
        width: "100%",
        display: "flex",
        height: "80vh",
      }}
    >
      <Paper
        sx={{
          width: 1 / 2,
          mx: "auto",
          // height: "100%",
        }}
      >
        <Typography>Ingredients</Typography>
        <VerticalTabs>{categories}</VerticalTabs>
      </Paper>
      <Paper
        sx={{
          width: 2 / 5,
          mx: "auto",
        }}
      >
        <Typography>Inventory</Typography>
      </Paper>
    </Box>
  );
}
Inventory.auth = true;

export async function getServerSideProps(context) {
  const ingredients = await getIngredients();
  return {
    props: {
      ingredients,
    },
  };
}

export default Inventory;
