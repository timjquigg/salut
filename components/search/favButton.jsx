import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ToggleButton from "@mui/material/ToggleButton";
import { red } from "@mui/material/colors";

const FavIcon = (props) => {
  const [selected, setSelected] = useState(props.isFavorite);

  return (
    <ToggleButton
      sx={{
        outline: "none",
        border: "none",
        background: "none",
        position: "absolute",
        top: "5px",
        right: "5px",
      }}
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      onClick={() => {
        if (!selected) {
          props.addFavorite();
        } else {
          props.removeFavorite();
        }
      }}
    >
      {selected ? (
        <FavoriteIcon sx={{ color: "red" }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </ToggleButton>
  );
};

export default FavIcon;
