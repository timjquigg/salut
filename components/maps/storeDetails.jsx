import { Box, Card, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useContext } from "react";
import { locationContext } from "../../providers/locationProvider";

function StoreDetails() {
  const { stores, currentStore, setCurrentStore } = useContext(locationContext);
  // const [expanded, setExpanded] = useState(false);

  return (
    <Box sx={{ width: "30%" }}>
      {Object.keys(currentStore).length > 0 && (
        // <Box sx={{ width: "30%", maxHeight: "100%", overflow: "hidden" }}>
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
          <Typography paragraph={true}>{currentStore.rating}</Typography>
        </Card>
        // </Box>
      )}
    </Box>
  );
}

export default StoreDetails;
