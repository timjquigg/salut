import { Box, Card, Rating, Typography } from "@mui/material";
import { useContext } from "react";
import { locationContext } from "../../providers/locationProvider";

function StoreDetails() {
  const { stores, currentStore, setCurrentStore } = useContext(locationContext);

  function getLabelText() {
    return `${currentStore.rating} Star${currentStore.value !== 1 ? "s" : ""}`;
  }

  return (
    <Box sx={{ width: "30%" }}>
      {Object.keys(currentStore).length > 0 && (
        <Card sx={{ m: "0.5rem", padding: "0.5rem" }}>
          <Typography
            variant="h6"
            gutterBottom={true}
            sx={{ fontWeight: "bold" }}
          >
            {currentStore.name}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Address:</Typography>
          <Typography paragraph={true}>{currentStore.vicinity}</Typography>
          <Typography sx={{ fontWeight: "bold" }}>Open:</Typography>
          <Typography paragraph={true}>
            {currentStore.opening_hours.open_now ? "Yes" : "No"}
          </Typography>
          <Typography sx={{ fontWeight: "bold" }}>Rating:</Typography>
          <Rating
            name="half-rating"
            value={currentStore.rating}
            getLabelText={getLabelText}
            readOnly={true}
          />
        </Card>
      )}
    </Box>
  );
}

export default StoreDetails;
