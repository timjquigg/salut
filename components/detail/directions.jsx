import { Box, Typography } from "@mui/material";

export default function Directions(props) {
  const instructions = props.instructions;

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
        Directions
      </Typography>
      <p>{instructions}</p>
    </Box>
  );
}
