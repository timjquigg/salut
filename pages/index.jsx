import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" gutterBottom>
          Salut!
        </Typography>
      </Box>
    </Container>
  );
}
