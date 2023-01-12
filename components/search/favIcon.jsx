import { useState, useRef, useEffect } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ToggleButton from "@mui/material/ToggleButton";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const StyledToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "transparent",
    backgroundColor: "transparent",
    borderRadius: "100px",
  },
});

const FavIcon = (props) => {
  const [selected, setSelected] = useState(props.isFavorite);

  return (
    <StyledToggleButton
      value="Like"
      sx={{
        // outline: "none",
        border: "none",
        backgroundColor: "none",
        position: "absolute",
        top: "5px",
        right: "5px",
        "&:selected": {
          backgroundColor: "none",
        },
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
        // <Tooltip
        //   title="Remove from Favorite"
        // >
        <FavoriteIcon sx={{ color: "red", fontSize: 45 }} />
      ) : (
        // </Tooltip>
        // <Tooltip title="Add to Favorite">
        <FavoriteBorderIcon sx={{ fontSize: 45 }} />
        // </Tooltip>
      )}
    </StyledToggleButton>
  );
};

export default FavIcon;
