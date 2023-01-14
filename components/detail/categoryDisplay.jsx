import { Box, Stack, Chip } from "@mui/material";

export default function CategoryDisplay(props) {
  const categories = props.categories;

  const categoryChips = categories.map((category) => {
    return (
      <Chip
        key={category}
        label={category}
        sx={{
          border: "solid 1px #c75d0e",
          color: "#c75d0e",
          backgroundColor: "transparent",
          mb: "3px"
        }}
      />
    );
  });

  return (
    <Box sx={{ width: {md: "30vw", xs: "80vw"}, display: "flex", marginBottom: "5px" }}>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {categoryChips}
      </Stack>
    </Box>
  );
}
