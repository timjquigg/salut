import { useContext } from "react";
import { Box } from "@mui/system";
import { Dialog } from "@mui/material";
import { locationContext } from "../../providers/locationProvider";
import Map from "./map";
import StoreDetails from "./storeDetails";

function MapContainer() {
  const { showMap, setShowMap } = useContext(locationContext);
  const handleClose = (value) => {
    setShowMap(false);
  };

  return (
    <Dialog fullWidth={true} maxWidth="md" onClose={handleClose} open={showMap}>
      <Box
        sx={{
          width: "100%",
          height: {md: "60vh", xs: "80vh"},
          display: "flex",
          flexDirection: {md:"row", xs: "column"},
          justifyContent: "space-around",
          padding: "1rem",
        }}
      >
        <Map />
        <StoreDetails />
      </Box>
    </Dialog>
  );
}

export default MapContainer;
