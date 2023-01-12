import { Button, Box } from "@mui/material";
import { useContext } from "react";
import { locationContext } from "../../providers/locationProvider";

function GetLocation() {
  const { position, setPosition, setShowMap, getStoreData } =
    useContext(locationContext);

  const handlClick = async () => {
    const location = await getAddress();
    getStoreData(location);
  };

  function getCoordinates() {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function getAddress() {
    const position = await getCoordinates();
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    return { latitude, longitude };
  }

  return (
    <Box sx={{ mt: "1rem" }}>
      <Button
        variant="contained"
        onClick={() => {
          handlClick();
        }}
      >
        Find Nearby Liquor Store
      </Button>
    </Box>
  );
}

export default GetLocation;
