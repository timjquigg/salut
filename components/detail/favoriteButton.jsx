import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { ToggleButton } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useLoggedInDetailData } from "../../hooks/useDetailData";
import { styled } from "@mui/material/styles";

export default function FavoriteButton(props) {
  const { favoriteId, userId, cocktailId } = props;
  const [selected, setSelected] = useState(favoriteId ? true : false);

  useEffect(() => {
    if (favoriteId) {
      setSelected(true);
    }
  }, [favoriteId]);

  const StyledToggleButton = styled(ToggleButton)({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "transparent",
      backgroundColor: "transparent",
    },
  });

  const { addFavorite, removeFavorite } = useLoggedInDetailData();
  return (
    <Box>
      <StyledToggleButton
        color="primary"
        value="check"
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        onClick={() => {
          if (!selected) {
            addFavorite(userId, cocktailId);
            props.setNewLikes((prev) => prev + 1);
          } else {
            removeFavorite(userId, cocktailId);
            props.setNewLikes((prev) => prev - 1);
          }
        }}
        sx={{
          border: "none",
          backgroundColor: "none",
          "&:selected": {
            backgroundColor: "none",
          },
        }}
      >
        {selected ? (
          <Favorite sx={{ color: "red", fontSize: 40 }} />
        ) : (
          <FavoriteBorder sx={{ fontSize: 40 }} />
        )}
      </StyledToggleButton>
    </Box>
  );
}
