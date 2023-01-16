import { Box, Button, Card, Rating, Typography } from "@mui/material";
import { useContext } from "react";
import { locationContext } from "../../providers/locationProvider";

function StoreDetails() {
  const { position, currentStore } = useContext(locationContext);

  function getLabelText() {
    return `${currentStore.rating} Star${currentStore.value !== 1 ? "s" : ""}`;
  }

  const destination = new URLSearchParams(currentStore.name).toString();
  const directionLink = `https://www.google.com/maps/dir/?api=1&destination=${destination}&destination_place_id=${currentStore.place_id}`;

  return (
    <Box sx={{ width: {md: "40%", xs: "100%"} }}>
      {Object.keys(currentStore).length > 0 && (
        <Card sx={{ m: {md: "0.5rem", xs: 0}, padding: "0.5rem" }}>
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
          <Box sx={{display: "flex", flexDirection: "column"}}>
            <Rating
              name="half-rating"
              value={currentStore.rating}
              getLabelText={getLabelText}
              readOnly={true}
            />
            <Button variant="outlined" href={directionLink} target="_blank" sx={{mt: 3}}>
              Get Directions
            </Button>
          </Box>
        </Card>
      )}
    </Box>
  );
}

export default StoreDetails;
