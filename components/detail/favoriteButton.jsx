import { useState } from "react";
import { Box } from "@mui/system";
import { ToggleButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useLoggedInDetailData } from "../../hooks/useDetailData";

export default function FavoriteButton(props) {
  const { favoriteId, userId, cocktailId } = props;
  const [selected, setSelected] = useState(favoriteId ? true : false);

  const { addFavorite, removeFavorite } = useLoggedInDetailData();
  return (
    <Box>
      <ToggleButton
        color="primary"
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        onClick={() => {
          if (!selected) {
            addFavorite(userId, cocktailId);
          } else {
            removeFavorite(userId, cocktailId);
          }
        }}
      >
        {selected ? (
          <Favorite sx={{ color: "red" }} />
        ) : (
          <FavoriteBorder sx={{ color: "red" }} />
        )}
      </ToggleButton>
    </Box>
  );
}
