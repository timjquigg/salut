import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function AddTitle(props) {
  const { title, setTitle } = useContext(newCocktailContext);
  const [error, setError] = useState(false);
  const handleChange = (value) => {
    props.setHasError(false);
    setTitle(value);
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
          helperText="Recipe Must Have a Title"
          label="Recipe Title"
          value={title}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <TextField
          required
          // error
          label="Recipe Title"
          value={title}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </>
  );
}
