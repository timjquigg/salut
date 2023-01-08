import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchContainer from "./search_container";

const KeywordForm = (props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search by Keyword"
        variant="outlined"
        value={props.enteredSearch}
        onChange={props.changeHandler}
        sx={{
          width: "55%",
        }}
      />
      <Button
        variant="contained"
        onClick={props.submitHandler}
        sx={{
          width: "15%",
          m: 2,
        }}
      >
        Search Cocktail
      </Button>
    </>
  );
};

export default KeywordForm;
