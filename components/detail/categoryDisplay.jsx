import { Box, Stack, Chip } from "@mui/material";

export default function CategoryDisplay(props) {
  const categories = props.categories;

  const categoryChips = categories.map((category) => {
    return (
      <Chip
        key={category}
        label={category}
        sx={{
          border: "solid",
          borderWidth: "thin",
          backgroundColor: "rgba(200,150,62,0.7)",
        }}
      />
    );
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Stack direction="row" spacing={1}>
        {categoryChips}
      </Stack>
    </Box>
  );
}
