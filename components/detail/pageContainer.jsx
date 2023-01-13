import { Box } from "@mui/system";
import MapContainer from "../maps/mapContainer";
import { locationContext } from "../../providers/locationProvider";
import { useContext } from "react";
import theme from "../../src/theme";

export default function PageContainer(props) {
  const { showMap } = useContext(locationContext);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
        paddingTop: "10vh",
      }}
    >
      <Box
        sx={{
          color: theme.palette.primary.contrastText,
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: "5vw",
          marginLeft: "5vw",
          marginRight: "5vw",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingTop: "10vh",
          paddingBottom: "5vh",
          border: "3px double #C8963E",
        }}
      >
        {props.children}
      </Box>
      {showMap && <MapContainer />}
    </Box>
  );
}
