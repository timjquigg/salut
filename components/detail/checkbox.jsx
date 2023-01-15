import React, { useContext, useEffect, useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { inventoryContext } from "../../providers/InventoryProvider";

function CheckBox(props) {
  const ingredient = props.ingredient;
  const { inventory } = useContext(inventoryContext);
  const [selected, setSelected] = useState();

  useEffect(() => {
    const invUppercase = inventory.map((inv) => inv.toUpperCase());
    setSelected(invUppercase.includes(ingredient.toUpperCase()));
  }, [ingredient, inventory]);

  const add = props.addInventory;
  const remove = props.removeInventory;

  return (
    <ToggleButton
      color="primary"
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      onClick={() => {
        if (!selected) {
          add();
        } else {
          remove();
        }
      }}
      sx={{
        padding: 0,
        border: "none",
        "&.Mui-selected, &.Mui-selected:hover": {
          backgroundColor: "transparent",
        },
      }}
    >
      {selected ? (
        <CheckBoxIcon sx={{ border: "none" }} />
      ) : (
        <CheckBoxOutlineBlankIcon sx={{ border: "none" }} />
      )}
    </ToggleButton>
  );
}

export default CheckBox;
