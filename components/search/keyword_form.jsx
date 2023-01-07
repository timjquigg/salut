import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const KeywordForm = (props) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
        }}
      >
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
      </Box>
    </>
  );
};

export default KeywordForm;
