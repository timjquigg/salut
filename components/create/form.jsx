import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import RecipeList from "./recipeList";
import AddTitle from "./addTitle";
import AddPhoto from "./addPhoto";
import CocktailTitle from "../detail/cockTailTitle";
import AddDirections from "./addDirections";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function Form(props) {
  const { title, recipe, photo, directions } = useContext(newCocktailContext);
  const error = {
    title: false,
    recipe: false,
    photo: false,
    directions: false,
  };
  const onClick = () => {
    let hasError = false;
    if (!title) {
      error.title = true;
      console.log("Missing Cocktail Title");
      hasError = true;
    }
    if (!recipe[0].ingredient || !recipe[0].measurement) {
      console.log("Missing Ingredient or Amount");
      error.recipe = true;
      hasError = true;
    }
    if (!photo) {
      error.photo = true;
      console.log("Missing photo link");
      hasError = true;
    }
    if (!directions) {
      error.directions = true;
      console.log("Missing instructions");
      hasError = true;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CocktailTitle cocktailName="Create a Recipe" />
      <AddTitle />
      <RecipeList />
      <AddPhoto />
      <AddDirections />
      <Button variant="contained" onClick={onClick}>
        Submit
      </Button>
    </Box>
  );
}
