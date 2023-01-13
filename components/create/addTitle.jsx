import { useContext } from "react";
import { TextField } from "@mui/material";
import { newCocktailContext } from "../../providers/newCocktailProvider";

export default function AddTitle(props) {
  const { title, setTitle } = useContext(newCocktailContext);

  return (
    <TextField
      label="Recipe Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}
