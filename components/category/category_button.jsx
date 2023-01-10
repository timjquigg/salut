import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const CategoryButton = (props) => {
  const [selected, setSelected] = useState(props.hasCategory ? true : false);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const addDrinkToCategory = async () => {
    const response = await fetch("/api/categoryOnFavorite", {
      method: "POST",
      body: JSON.stringify({
        userId: props.userId,
        favId: props.favId,
        category: props.category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const deleteDrinkToCategory = async () => {
    const response = await fetch("/api/categoryOnFavorite", {
      method: "DELETE",
      body: JSON.stringify({
        userId: props.userId,
        favId: props.favId,
        category: props.category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  console.log(selectedCategory);
  return (
    <ToggleButton
      sx={{ border: "none" }}
      selected={
        selected
          ? true
          : selectedCategory.includes(props.category)
          ? true
          : false
      }
      value={"Category"}
      onChange={() => {
        setSelected(!selected);
      }}
      onClick={() => {
        if (selected) {
          deleteDrinkToCategory();
        } else {
          addDrinkToCategory();
        }
      }}
    >
      {selected ? (
        // <Tooltip title="Remove from Category">
        <CheckBoxIcon sx={{ color: "white" }} />
      ) : (
        // </Tooltip>
        // <Tooltip title="Add to Category">
        <CheckBoxOutlineBlankIcon sx={{ color: "white" }} />
        // </Tooltip>
      )}
    </ToggleButton>
  );
};

export default CategoryButton;
