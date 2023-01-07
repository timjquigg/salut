import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const KeywordForm = (props) => {
  return (
    <>
      <TextField
        id="outlined-basic"
        label="Search for a Cocktail"
        variant="outlined"
        value={props.enteredSearch}
        onChange={props.changeHandler}
      />
      <Button variant="outlined" onClick={props.submitHandler}>
        Submit
      </Button>
    </>
  );
};

export default KeywordForm;
