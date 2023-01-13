import { Box, Button } from "@mui/material";
import RecipeListItem from "./recipeListItem";
import { useContext } from "react";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function RecipeList(props) {
  const { recipe, updateRecipe } = useContext(newCocktailContext);

  const onClick = () => {
    const id = Math.max(...Object.keys(recipe)) + 1;
    updateRecipe(id, "", "");
  };

  const numIngredients = Object.keys(recipe).length;

  const recipeList = Object.keys(recipe).map((el, index) => {
    return <RecipeListItem key={index} id={index} />;
  });

  return (
    <Box>
      {recipeList}
      <Button
        variant={numIngredients < 15 ? "contained" : "disabled"}
        onClick={onClick}
      >
        Add Item
      </Button>
    </Box>
  );
}
