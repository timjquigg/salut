import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import RecipeList from "./recipeList";
import AddTitle from "./addTitle";
import AddPhoto from "./addPhoto";
import AddDirections from "./addDirections";
import { newCocktailContext } from "../../providers/newCocktailProvider";
import { useRouter } from "next/router";

export default function Form(props) {
  const router = useRouter();
  const { title, recipe, photo, directions, userId } =
    useContext(newCocktailContext);
  const error = {
    title: false,
    recipe: false,
    photo: false,
    directions: false,
  };

  const submitCocktail = async (userId, title, recipe, photo, directions) => {
    const response = await fetch("/api/createCocktail", {
      method: "POST",
      body: JSON.stringify({
        userId,
        title,
        recipe,
        photo,
        directions,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return router.push("/user/created");
  };

  const onClick = () => {
    let hasError = false;
    if (!title) {
      error.title = true;
      console.log("Missing Cocktail Title");
      hasError = true;
    }

    recipe.forEach((recipe) => {
      if (!recipe.ingredient || !recipe.measurement) {
        console.log("Missing ingredient/measurement");
        error.recipe = true;
      }
    });

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

    if (Object.values(error).includes(true)) {
      console.log("there's an error");
      return;
    }
    console.log("Submitting");
    submitCocktail(userId, title, recipe, photo, directions);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: { xs: "90vw", sm: "auto" },
        mt: { md: "-50px" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CocktailTitle cocktailName="Create a Recipe" />
      </Box>
      <AddTitle />
      <RecipeList />
      <AddPhoto />
      <AddDirections />
      <Button variant="contained" onClick={onClick} sx={{ color: "#fff" }}>
        Submit
      </Button>
    </Box>
  );
}
