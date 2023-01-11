import { useState, useCallback } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { styled } from "@mui/material/styles";

const StyledToggleButton = styled(ToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "transparent",
    backgroundColor: "transparent",
  },
});

const CategoryButton = (props) => {
  const [selected, setSelected] = useState(
    props.categoryContents.some(
      (el) => el.favId === props.favId && el.name === props.category
    )
      ? true
      : false
  );

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

  function removeItem(arr, index) {
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  return (
    <StyledToggleButton
      sx={{ border: "none" }}
      selected={selected}
      value={props.category}
      // onChange={() => {
      //   setSelected(!selected);
      // }}
      onClick={() => {
        if (selected) {
          deleteDrinkToCategory();
          const contentIndex = props.categoryContents.findIndex(
            (el) => el.name === props.category && el.favId === props.favId
          );
          // console.log("current state:", props.categoryContents);
          const filteredCategories = removeItem(
            [...props.categoryContents],
            contentIndex
          );
          // console.log("FILTERED:", filteredCategories);
          // console.log(props.category, props.favId);
          // setCategoryContent(filteredCategories);
          console.log(
            filteredCategories.some(
              (el) => el.favId === props.favId && el.name === props.category
            )
          );
          setSelected(
            filteredCategories.some(
              (el) => el.favId === props.favId && el.name === props.category
            )
          );
        } else {
          addDrinkToCategory();
          const updateCategory = [...props.categoryContents];
          updateCategory.push({ name: props.category, favId: props.favId });
          // setCategoryContent(updateCategory);
          console.log(
            updateCategory.some(
              (el) => el.favId === props.favId && el.name === props.category
            )
          );
          setSelected(
            updateCategory.some(
              (el) => el.favId === props.favId && el.name === props.category
            )
          );
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
    </StyledToggleButton>
  );
};

export default CategoryButton;
