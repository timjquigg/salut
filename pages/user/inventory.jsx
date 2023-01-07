import { Typography, Box, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

function Inventory() {
  return (
    <Box
      sx={{
        mt: "104px",
        height: 100,
        width: "100%",
      }}
    >
      <Container
        sx={{
          height: "25%",
          width: 1 / 2,
          display: "inline-block",
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.100",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        <Paper>
          <Typography>Inventory</Typography>
        </Paper>
      </Container>
      <Paper
        sx={{
          height: "25%",
          width: 2 / 5,
          display: "inline-block",
          mx: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.100",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        <Typography>Inventory</Typography>
      </Paper>
    </Box>
  );
}
Inventory.auth = true;

export default Inventory;
