import { Button, Box } from "@mui/material";
import { useContext } from "react";
import { locationContext } from "../../providers/locationProvider";
import LiquorIcon from '@mui/icons-material/Liquor';
import NearMeIcon from '@mui/icons-material/NearMe';
import { NearMe } from "@mui/icons-material";

const styles = {
  signupButton: {
    background: "linear-gradient(45deg, #fe6b79 30%, #ff8e53 90%)",
    borderRadius: "3px",
    border: 0,
    color: "#fff",
    height: "48px",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
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
