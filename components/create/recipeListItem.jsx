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

  const [ingredientError, setIngredientError] = useState(false);
  const [measurementError, setMeasurementError] = useState(false);

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
      {ingredientError ? (
        <Autocomplete
          value={selectedIngredient || null}
          onChange={(event, newValue) => {
            updateIngredient(newValue);
            if (newValue) {
              setIngredientError(false);
            }
          }}
          inputValue={ingredientInput}
          onInputChange={(event, newInputValue) => {
            setIngredientInput(newInputValue);
          }}
          id="controllable-states-demo"
          options={ingredients}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Add an Ingredient"
              required
              error
              helperText="Must Include Ingredient"
            />
          )}
        />
      ) : (
        <Autocomplete
          value={selectedIngredient || null}
          onChange={(event, newValue) => {
            updateIngredient(newValue);
            if (!newValue) {
              setIngredientError(true);
            }
          }}
          inputValue={ingredientInput}
          onInputChange={(event, newInputValue) => {
            setIngredientInput(newInputValue);
          }}
          id="controllable-states-demo"
          options={ingredients}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Add an Ingredient" required />
          )}
        />
      )}
      {measurementError ? (
        <TextField
          required
          error
          helperText="Must Include Measurement"
          label="Measurement"
          value={measurement}
          onChange={(event) => {
            updateMeasurement(event.target.value);
            if (measurement) {
              setMeasurementError(false);
            }
          }}
        />
      ) : (
        <TextField
          required
          label="Measurement"
          value={measurement}
          onChange={(event) => {
            updateMeasurement(event.target.value);
            if (event.target.value === "") {
              setMeasurementError(true);
            }
          }}
        />
      )}
      <Button variant={id > 0 ? "contained" : "disabled"} onClick={handleClick}>
        Remove
      </Button>
    </Box>
  );
}
