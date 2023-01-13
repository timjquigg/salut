import { Box, Autocomplete, TextField, Button } from "@mui/material";
import { useContext, useState } from "react";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function RecipeListItem(props) {
  const id = props.id;
  const { ingredients, updateRecipe, recipe } = useContext(newCocktailContext);
  const [selectedIngredient, setSelectedIngredient] = useState(
    recipe[id].ingredient
  );
  const [ingredientInput, setIngredientInput] = useState("");
  const [measurement, setmeasurement] = useState(recipe[id].measurement);

  const handleClick = () => {
    updateRecipe(id, selectedIngredient, measurement);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Autocomplete
        value={selectedIngredient || null}
        onChange={(event, newValue) => {
          setSelectedIngredient(newValue);
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
        onChange={(event) => setmeasurement(event.target.value)}
      />
      <Button onClick={handleClick}>Add/Update</Button>
    </Box>
  );
}
