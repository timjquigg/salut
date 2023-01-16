import { Button, Box } from "@mui/material";
import { useContext } from "react";
import { locationContext } from "../../providers/locationProvider";
import { NearMe } from "@mui/icons-material";

const styles = {
  signupButton: {
    background: "#c75d0e",
    borderRadius: "3px",
    border: 0,
    color: "#fff",
    height: "36px",
    padding: "0 20px",
    boxShadow: "0 3px 5px 2px rgba(199, 93, 14, .3)",
  },
};

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
    <Box sx={{ mt: "1rem", display: "flex", alignItems: "center" }}>
      <Button
        style={styles.signupButton}
        onClick={() => {
          handlClick();
        }}
      >
        Find Nearby Liquor Store
        <NearMe />
      </Button>
    </Box>
  );
}

export default GetLocation;
