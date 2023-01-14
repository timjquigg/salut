import { Box, Typography } from "@mui/material";
import { useLoggedInDetailData } from "../../hooks/useDetailData";
import CheckBox from "./checkbox";

export function IngredientsWithInventory(props) {
  const { ingredients, measurement, userId } = props;
  const { addInventory, removeInventory } = useLoggedInDetailData();

  const lines = (ingredients, measurement, userId) => {
    const result = [];
    for (let i = 0; i < ingredients.length; i++) {
      result.push({
        ingredient: ingredients[i],
        measurement: measurement[i],
        userId: userId,
      });
    }

    return result.map((eachLine, i) => {
      return (
        <Box
          key={i}
          sx={{
            width: { md: "30vw", xs: "80vw" },
            display: "flex",
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            {i === 0 ? (
              <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Ingredients
              </Typography>
            ) : (
              <Typography></Typography>
            )}
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography sx={{ my: 0 }}>{eachLine.ingredient}</Typography>
              <Typography sx={{ my: 0 }}>{eachLine.measurement}</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {i === 0 ? (
              <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Inventory
              </Typography>
            ) : (
              <Typography
                sx={{ fontWeight: "bold", lineHeight: 0, visibility: "hidden" }}
              >
                Inventory
              </Typography>
            )}
            <CheckBox
              ingredient={ingredients[i]}
              addInventory={() =>
                addInventory(eachLine.userId, eachLine.ingredient)
              }
              removeInventory={() =>
                removeInventory(eachLine.userId, eachLine.ingredient)
              }
            />
          </Box>
        </Box>
      );
    });
  };

  const list = lines(ingredients, measurement, userId);

  return (
    <Box sx={{ marginTop: "2rem", display: "flex", gap: { md: 5, xs: 0 } }}>
      <Box>{list}</Box>
      {props.children}
    </Box>
  );
}

export function Ingredients(props) {
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
