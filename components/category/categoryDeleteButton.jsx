import * as React from "react";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

function CategoryDeleteButton(props) {
  const [open, toggleOpen] = useState(false);

  const deleteCategory = async (category, userId = props.userId) => {
    const response = await fetch("/api/category", {
      method: "DELETE",
      body: JSON.stringify({ category, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleDelete = () => {
    deleteCategory(props.category, props.userId);
    props.handleDelete(props.category);
    toggleOpen(false);
  };

  return (
    <>
      <Chip
        sx={{
          m: 1,
        }}
        label={props.category}
        onDelete={() => toggleOpen(true)}
        deleteIcon={<DeleteIcon sx={{ position: "absolute", right: "5px" }} />}
      />

      <Dialog open={open}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContentText sx={{ p: 3 }}>
          {`You are about to delete ${props.category}. Once submitted, it cannot be undone. Continue?`}
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => toggleOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete}>Continue</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CategoryDeleteButton;
