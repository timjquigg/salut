import { Box, Button } from "@mui/material";
import { useContext, useState } from "react";
import RecipeList from "./recipeList";
import AddTitle from "./addTitle";
import AddPhoto from "./addPhoto";
import AddDirections from "./addDirections";
import { newCocktailContext } from "../../providers/newCocktailProvider";
import { useRouter } from "next/router";
import CocktailTitle from "../detail/cocktailTitle";
import Alert from "@mui/material/Alert";

export default function Form(props) {
  const router = useRouter();
  const [hasError, setHasError] = useState(false);
  const [hasPhotoError, setHasPhotoError] = useState(false);
  const [isExistingName, setIsExistingName] = useState(false);
  const { title, recipe, photo, directions, userId } =
    useContext(newCocktailContext);

  const error = {
    title: false,
    recipe: false,
    photo: false,
    directions: false,
  };

  function isValidUrl(string) {
    try {
      const isValid = new URL(string);
      return isValid.protocol === "https:" ? true : false;
    } catch (err) {
      return false;
    }
  }

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
    // return router.push("/user/created");
    return response;
  };

  const onClick = () => {
    let hasError = false;
    if (!title) {
      error.title = true;
      // console.log("Missing Cocktail Title");
      hasError = true;
    }

    recipe.forEach((recipe) => {
      if (!recipe.ingredient || !recipe.measurement) {
        // console.log("Missing ingredient/measurement");
        error.recipe = true;
      }
    });

    if (!photo) {
      error.photo = true;
      // console.log("Missing photo link");
      hasError = true;
    }

    if (!isValidUrl(photo)) {
      error.photo = true;
      setHasPhotoError(true);
      // console.log("Invalid image source");
    }
    if (!directions) {
      error.directions = true;
      // console.log("Missing instructions");
      hasError = true;
    }

    if (Object.values(error).includes(true)) {
      setHasError(true);
      // console.log("there's an error");
      return;
    }
    // console.log("Submitting");
    submitCocktail(userId, title, recipe, photo, directions).then((res) => {
      if (res.ok) {
        router.push("/user/created");
      }
      setIsExistingName(true);
    });
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
      <AddTitle setHasError={setHasError} />
      <RecipeList setHasError={setHasError} />
      <AddPhoto setHasError={setHasError} setHasPhotoError={setHasPhotoError} />
      <AddDirections setHasError={setHasError} />
      {isExistingName && (
        <Alert severity="error">Recipe title already taken.</Alert>
      )}
      {hasError && (
        <Alert severity="error">
          Error, cannot submit recipe. Please check if the forms are complete.
        </Alert>
      )}
      {hasPhotoError && <Alert severity="error">Invalid Image URL.</Alert>}
      <Button variant="contained" onClick={onClick} sx={{ color: "#fff" }}>
        Submit
      </Button>
    </Box>
  );
}
