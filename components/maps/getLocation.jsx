import { Button } from "@mui/material";

function GetLocation(props) {
  const handlClick = async () => {
    const position = await getAddress();
    props.onClick(position);
  };

  const getLocation = () => {
    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // console.log({ latitude }, { longitude });
    };

    const error = () => {
      console.log("unable to retrieve your location");
    };

    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      console.log("locating...");
      navigator.geolocation.getCurrentPosition(success, error);
    }
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
    <Button
      onClick={() => {
        handlClick();
      }}
    >
      Get Location
    </Button>
  );
}

export default GetLocation;
