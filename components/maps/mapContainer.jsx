import { useState, useEffect } from "react";
import { Box } from "@mui/system";
import GetLocation from "./getLocation";
import axios from "axios";

function MapContainer() {
  const [showMap, setShowMap] = useState(false);
  const [position, setPosition] = useState({});

  const handleClick = (location) => {
    setPosition(location);
    console.log("position:", position);
  };

  useEffect(() => {
    console.log("Sending to API");
    const params = new URLSearchParams(position).toString();
    console.log(params);
    axios.get(`api/map?${params}`);
  }, [position]);

  return (
    <Box>
      <GetLocation onClick={handleClick} />
    </Box>
  );
}

export default MapContainer;
