import { Box, Typography } from "@mui/material";

export default function Ingredients(props) {
  const { ingredients, measurement } = props;

  const ingredientList = ingredients.map((ingredient, i) => {
    return <p key={i}>{ingredient}</p>;
  });

  const measurementList = measurement.map((measurement, i) => {
    return <p key={i}>{measurement}</p>;
  });

  return (
    <Box sx={{ marginTop: "2rem", display: "flex", gap: 5 }}>
      <Box>
        <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
          Ingredients
        </Typography>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Box>{ingredientList}</Box>
          <Box>{measurementList}</Box>
        </Box>
      </Box>
      {props.children}
    </Box>
  );
}
