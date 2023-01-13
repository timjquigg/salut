import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function AddDirections(props) {
  const { directions, setDirections } = useContext(newCocktailContext);
  const [error, setError] = useState(false);
  const handleChange = (value) => {
    setDirections(value);
    if (value === "") {
      setError(true);
      return;
    }
    setError(false);
  };

  return (
    <>
      {error ? (
        <TextField
          required
          error
          helperText="Recipe Must Include Directions"
          label="Recipe Directions"
          margin="normal"
          multiline={true}
          rows={2}
          value={directions}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <TextField
          required
          label="Recipe Directions"
          margin="normal"
          multiline={true}
          rows={2}
          value={directions}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </>
  );
}
