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

  return (
    <StyledToggleButton
      sx={{ border: "none" }}
      selected={props.selected}
      value={props.category}
      // onChange={() => {
      //   setSelected(!selected);
      // }}
      onClick={() => {
        if (props.selected) {
          deleteDrinkToCategory();
          props.removeSelected();
        } else {
          addDrinkToCategory();
          props.addSelected();
        }
      }}
    >
      {props.selected ? (
        <CheckBoxIcon sx={{ color: "white" }} />
      ) : (
        <CheckBoxOutlineBlankIcon sx={{ color: "white" }} />
      )}
    </StyledToggleButton>
  );
};

export default CategoryButton;
