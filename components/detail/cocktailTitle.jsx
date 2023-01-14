import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import theme from "../../src/theme";

export default function CocktailTitle(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        sx={{
          fontFamily: theme.typography.fontFamily[0],
          fontSize: "40px",
        }}
      >
        {props.cocktailName}
      </Typography>
      {props.children}
    </Box>
  );
}
