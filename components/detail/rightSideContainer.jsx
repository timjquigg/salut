import { Box } from "@mui/system";

export default function RightSideContainer(props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
      }}
    >
      {props.children}
    </Box>
  );
}
