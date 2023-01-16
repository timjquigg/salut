import { useContext, useState } from "react";
import { TextField } from "@mui/material";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function AddPhoto(props) {
  const { photo, setPhoto } = useContext(newCocktailContext);
  const [error, setError] = useState(false);
  const handleChange = (value) => {
    props.setHasError(false);
    props.setHasPhotoError(false);
    setPhoto(value);
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
          helperText="Must Include Photo Link"
          label="Image URL"
          margin="normal"
          placeholder="https://"
          value={photo}
          onChange={(e) => handleChange(e.target.value)}
        />
      ) : (
        <TextField
          required
          label="Image URL"
          margin="normal"
          placeholder="https://"
          value={photo}
          onChange={(e) => handleChange(e.target.value)}
        />
      )}
    </>
  );
}
