import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

const ITEM_HEIGHT = 48;
const CategoryMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const addCategory = async (category, cocktailId) => {
    const response = await fetch("/api/category", {
      method: "PUT",
      body: JSON.stringify({ category, cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleClose = (category, id) => {
    addCategory(category, id);
    console.log("handleClose");
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={anchorEl}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        {props.categories.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleClose(option, props.idDrink)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoryMenu;
