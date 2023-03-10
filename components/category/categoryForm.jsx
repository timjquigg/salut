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
import CategoryDeleteButton from "./categoryDeleteButton";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const filter = createFilterOptions();

function CategoryForm(props) {
  const [value, setValue] = useState("");
  const [open, toggleOpen] = useState(false);
  const [deleteOpen, toggleDeleteOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState("");
  // console.log(props.categories);
  const [snackOpen, setSnackOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleSnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const addCategory = async (category, userId) => {
    const response = await fetch("/api/category", {
      method: "POST",
      body: JSON.stringify({ category, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleClose = () => {
    setDialogValue("");
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCategory(dialogValue, props.userId);
    const newCategories = [...props.categories];
    if (newCategories.includes(dialogValue)) {
      // console.log("Returning, not updating state");
      setError(true);
      return;
    }
    newCategories.push(dialogValue);
    props.setCategories(newCategories);
    setSnackOpen(true);
    // console.log("Submitting to update category state");

    handleClose();
  };

  const handleDelete = (category) => {
    const filteredCategories = props.categories.filter((el) => el !== category);
    props.setCategories(filteredCategories);
  };

  const selectCategoryHandler = async (category) => {
    setValue(category);
    const response = await fetch(
      `/api/categoryOnFavorite?userId=${props.userId}&category=${category}`
    );
    const data = await response.json();
    // console.log("Data:", data);
    props.filterCocktail(data);
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (newValue === " + Add a new category") {
            toggleOpen(true);
            setDialogValue("");
          } else if (newValue === " - Delete a category") {
            toggleDeleteOpen(true);
            setDialogValue("");
          } else {
            if (newValue === "All favorites") {
              selectCategoryHandler(newValue);
              props.setIsFiltered(false);
              return;
            }
            selectCategoryHandler(newValue);
            props.setIsFiltered(true);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          // console.log({ options, params, filtered });
          filtered.push("All favorites");
          filtered.push(" + Add a new category");
          filtered.push(" - Delete a category");
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
            {error ? (
              <TextField
                autoFocus
                error
                helperText="This category already exists"
                margin="dense"
                id="name"
                value={dialogValue}
                onChange={(e) => setDialogValue(e.target.value)}
                label="Enter category title"
                type="text"
                variant="standard"
              />
            ) : (
              <TextField
                autoFocus
                margin="dense"
                id="name"
                value={dialogValue}
                onChange={(e) => setDialogValue(e.target.value)}
                label="Enter category title"
                type="text"
                variant="standard"
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              // onClick={() => {
              //   setSnackOpen(true);
              // }}
            >
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message="Category Saved!"
        action={action}
      />

      <Dialog open={deleteOpen}>
        <DialogTitle>Select a Category</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <DialogContentText>
            {props.categories.length !== 0
              ? "Select the category to be deleted"
              : "There are no categories yet"}
          </DialogContentText>
          {props.categories.map((category) => {
            return (
              <CategoryDeleteButton
                key={category}
                category={category}
                handleDelete={handleDelete}
                userId={props.userId}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => toggleDeleteOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default CategoryForm;
