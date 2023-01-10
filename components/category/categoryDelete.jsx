import * as React from "react";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import { alpha } from "@mui/material";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

function CategoryDeleteButton(props) {
  const propsArr = [props];
  const [category, setCategory] = useState(props.category[0].category);

  const deleteCategory = async (cocktailId) => {
    const response = await fetch("/api/category", {
      method: "DELETE",
      body: JSON.stringify({ cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleDelete = (id) => {
    console.info("You clicked the delete icon.");
    deleteCategory(id);
  };

  return (
    <Chip
      sx={{
        width: "50%",
        position: "absolute",
        top: "5px",
        left: "5px",
        backgroundColor: alpha("#f1f1f1", 0.78),
      }}
      label={category || "no category"}
      onDelete={() => handleDelete(props.idDrink)}
      deleteIcon={<DeleteIcon />}
    />
  );
}

export default CategoryDeleteButton;
