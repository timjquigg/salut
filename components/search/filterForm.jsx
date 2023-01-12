import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const FilterForm = (props) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Autocomplete
        multiple
        id="tags-outlined"
        options={props.options}
        getOptionLabel={(option) => option.strIngredient}
        value={props.filterKeywords}
        inputValue={props.inputFilterKeywords}
        onChange={props.onChange}
        onInputChange={props.changeInputFilterHandler}
        sx={{
          width: {sm: "50vw", xs: "80vw"},
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by ingredients"
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === "Enter") {
                props.onClick();
              }
            }}
          />
        )}
      />
      <Button
        variant="contained"
        onClick={props.onClick}
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

export default FilterForm;
