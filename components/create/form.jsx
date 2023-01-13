import { Box, TextField } from "@mui/material";
import { useContext } from "react";
import RecipeList from "./recipeList";
import AddTitle from "./addTitle";

export default function Form(props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AddTitle />
      <RecipeList />
    </Box>
  );
}
