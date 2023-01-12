import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { Dialog, Typography } from "@mui/material";
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
      {/* <Typography>Map Container</Typography> */}
      <Box
        sx={{
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: "row",
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
