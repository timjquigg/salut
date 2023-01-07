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
          width: "75%",
        }}
      />
      <Button
        variant="outlined"
        onClick={props.submitHandler}
        sx={{
          width: "25%",
          m: 2,
        }}
      >
        Search by Keyword
      </Button>
    </>
  );
};

export default KeywordForm;
