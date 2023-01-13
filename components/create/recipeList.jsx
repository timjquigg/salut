import { Box, Button } from "@mui/material";
import RecipeListItem from "./recipeListItem";
import { useContext } from "react";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function RecipeList(props) {
  const { recipe, updateRecipe, nextId } = useContext(newCocktailContext);

  const onClick = () => {
    updateRecipe(nextId(), "", "");
  };

  const numIngredients = recipe.length;

  const recipeList = recipe.map((el, index) => {
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
