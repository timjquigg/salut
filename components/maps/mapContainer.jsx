import { useState, useEffect, useContext } from "react";
import { Box } from "@mui/system";
import axios from "axios";
import { Dialog, Typography } from "@mui/material";
import { locationContext } from "../../providers/locationProvider";

function MapContainer() {
  const { showMap, setShowMap } = useContext(locationContext);
  const handleClose = (value) => {
    setShowMap(false);
  };

  return (
    <Dialog fullWidth={true} maxWidth="md" onClose={handleClose} open={showMap}>
      <Box sx={{ width: "100%", height: "60vh" }}>
        <Typography>Map Container</Typography>
      </Box>
    </Dialog>
  );
}

export default MapContainer;
