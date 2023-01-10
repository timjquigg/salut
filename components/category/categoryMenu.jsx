import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import CategoryButton from "./categoryButton";
import ListItemText from "@mui/material/ListItemText";

const ITEM_HEIGHT = 48;

const CategoryMenu = (props) => {
  // console.log(props);
  const [anchorEl, setAnchorEl] = useState(null);
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
          top: "5px",
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
        {props.categories.map((category, i) => (
          <MenuItem key={category} value={category}>
            <CategoryButton
              category={category}
              favId={props.favId}
              userId={props.userId}
            />
            <ListItemText primary={category} sx={{ ml: 2, color: "white" }} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default CategoryMenu;
