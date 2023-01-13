import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { AddCircle } from "@mui/icons-material";
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
      <Tooltip title="Add an Ingredient">
        <IconButton
          variant={numIngredients < 15 ? "contained" : "disabled"}
          onClick={onClick}
          color="primary"
        >
          <AddCircle />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
