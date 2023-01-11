import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import CategoryMenuItems from "./categoryMenuItem";

const ITEM_HEIGHT = 48;

const CategoryMenu = (props) => {
  const [categoryContents, setCategoryContents] = useState(
    props.categoryContents
  );
  const [anchorEl, setAnchorEl] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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
          bottom: "7px",
          right: "5px",
        }}
      >
        <MoreVertIcon
          sx={{
            fontSize: "30px",
            backgroundColor: "rgba(0, 0, 0, .2)",
            borderRadius: "100px",
          }}
        />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        multiple
        open={open}
        onClose={() => setAnchorEl(null)}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
        }}
      >
        {props.categories.map((category) => (
          <CategoryMenuItems
            key={category}
            value={category}
            category={category}
            favId={props.favId}
            userId={props.userId}
            categoryContents={categoryContents}
            setCategoryContents={setCategoryContents}
          />
        ))}
      </Menu>
    </div>
  );
};

export default CategoryMenu;
