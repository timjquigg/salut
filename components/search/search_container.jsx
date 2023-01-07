import Box from "@mui/material/Box";

const SearchContainer = (props) => {
  return (
    <Box
      noValidate
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        mt: 8,
      }}
    >
      {props.children}
    </Box>
  );
};

export default SearchContainer;
