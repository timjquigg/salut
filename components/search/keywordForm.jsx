import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchContainer from "./searchContainer";
import IconButton from "@mui/material/IconButton";

const KeywordForm = (props) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TextField
        id="outlined-basic"
        label={
          props.nonAlcoholic
            ? "Search Non-Alcoholic Drinks"
            : "Search By Keyword"
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            props.submitHandler();
          }
        }}
        variant="outlined"
        value={props.enteredSearch}
        onChange={props.changeHandler}
        sx={{
          width: { sm: "50vw", xs: "80vw" },
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          props.submitHandler();
          props.setNumItemDisplay(12);
        }}
        sx={{
          width: "200px",
          height: "50px",
          marginTop: 3,
          color: "#fff",
          borderRadius: "30px",
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default KeywordForm;
