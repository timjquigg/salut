import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

const FilterForm = (props) => {
  return (
    <>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={props.options}
        getOptionLabel={(option) => option.strIngredient}
        value={props.filterKeywords}
        inputValue={props.inputFilterKeywords}
        onChange={props.onChange}
        onInputChange={props.changeInputFilterHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            // placeholder="Favorites"
          />
        )}
      />
      <Button variant="outlined" onClick={props.onClick}>
        Submit
      </Button>
    </>
  );
};

export default FilterForm;
