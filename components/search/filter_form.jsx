import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SearchContainer from "./search_container";

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
        sx={{
          width: "75%",
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by Filter"
            // placeholder="Favorites"
          />
        )}
      />
      <Button
        variant="outlined"
        onClick={props.onClick}
        sx={{
          width: "25%",
          mt: 2,
        }}
      >
        Filter Cocktails
      </Button>
    </>
  );
};

export default FilterForm;