import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ToggleButton from "@mui/material/ToggleButton";

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
        <FavoriteIcon sx={{ color: "red", fontSize: 45 }} />
      ) : (
        <FavoriteBorderIcon sx={{ fontSize: 45 }} />
      )}
    </ToggleButton>
  );
};

export default FavIcon;
