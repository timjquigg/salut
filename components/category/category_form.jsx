import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

function CategoryForm(props) {
  // const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState("");

  const handleClose = () => {
    setDialogValue();
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const categoryList = [...props.categories, dialogValue];
    props.categoryList(categoryList);
    console.log("Submitting to update category state");
    handleClose();
  };

  const selectCategoryHandler = (category) => {
    // console.log("category selected:", category);
    setValue(category);
  };

  console.log("currentValue:", value);
  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (newValue === " + Add a new category") {
            toggleOpen(true);
            setDialogValue("");
          } else {
            selectCategoryHandler(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // console.log({ options, params, filtered });
          filtered.push(" + Add a new category");
          return filtered;
        }}
        id="free-solo-category-form"
        options={props.categories}
        getOptionLabel={(option) => {
          return option;
        }}
        selectOnFocus
        clearOnBlur
        renderOption={(props, option) => <li {...props}>{option}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label="Search or add a category" />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new Category</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Type your category and press submit to add it to your list!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue}
              onChange={(e) => setDialogValue(e.target.value)}
              label="title"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

const DUMMY_CATEGORY = ["Christmas", "Thanksgiving"];

export default CategoryForm;
