import { Box, Autocomplete, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function RecipeListItem(props) {
  const id = props.id;
  const { ingredients, updateRecipe, removeRecipeItem, recipe } =
    useContext(newCocktailContext);
  const [selectedIngredient, setSelectedIngredient] = useState(
    recipe[id].ingredient
  );
  const [ingredientInput, setIngredientInput] = useState("");
  const [measurement, setmeasurement] = useState(recipe[id].measurement);

  const handleClick = () => {
    if (id < recipe.length - 1) {
      setSelectedIngredient(recipe[id + 1].ingredient);
    }
    removeRecipeItem(id, selectedIngredient, measurement);
  };

  const updateIngredient = (newValue) => {
    updateRecipe(id, newValue, measurement);
    setSelectedIngredient(newValue);
  };

  const updateMeasurement = (value) => {
    updateRecipe(id, selectedIngredient, value);
    setmeasurement(value);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Autocomplete
        value={selectedIngredient || null}
        onChange={(event, newValue) => {
          updateIngredient(newValue);
        }}
        inputValue={ingredientInput}
        onInputChange={(event, newInputValue) => {
          setIngredientInput(newInputValue);
        }}
        id="controllable-states-demo"
        options={ingredients}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Add an Ingredient" />
        )}
      />
      <TextField
        label="Measurement"
        value={measurement}
        onChange={(event) => updateMeasurement(event.target.value)}
      />
      <Button variant={id > 0 ? "contained" : "disabled"} onClick={handleClick}>
        Remove
      </Button>
    </Box>
  );
}
