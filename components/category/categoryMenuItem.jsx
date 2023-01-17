import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import CategoryButton from "./categoryButton";
import ListItemText from "@mui/material/ListItemText";

const CategoryMenuItems = (props) => {
  const [selected, setSelected] = useState(
    props.categoryContents.some(
      (el) => el.favId === props.favId && el.name === props.category
    )
  );

  function removeItem(arr, index) {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const addHandler = () => {
    const updateCategory = [...props.categoryContents];
    updateCategory.push({ name: props.category, favId: props.favId });
    props.setCategoryContents(updateCategory);
    setSelected(
      updateCategory.some(
        (el) => el.favId === props.favId && el.name === props.category
      )
    );
  };

  const removeHandler = () => {
    const contentIndex = props.categoryContents.findIndex(
      (el) => el.name === props.category && el.favId === props.favId
    );
    const filteredCategories = removeItem(
      [...props.categoryContents],
      contentIndex
    );
    props.setCategoryContents(filteredCategories);
    setSelected(
      filteredCategories.some(
        (el) => el.favId === props.favId && el.name === props.category
      )
    );
  };

  return (
    <MenuItem
      style={{ whiteSpace: "normal" }}
      key={props.category}
      value={props.value}
    >
      <CategoryButton
        category={props.category}
        favId={props.favId}
        userId={props.userId}
        categoryContents={props.categoryContents}
        selected={selected}
        addSelected={addHandler}
        removeSelected={removeHandler}
      />
      <ListItemText primary={props.category} sx={{ ml: 2, color: "white" }} />
    </MenuItem>
  );
};

export default CategoryMenuItems;
