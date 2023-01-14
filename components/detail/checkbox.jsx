import React, { useState } from 'react'
import ToggleButton from '@mui/material/ToggleButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function CheckBox(props) {
  const [selected, setSelected] = useState(props.isInventory);
  const add = props.addInventory;
  const remove = props.removeInventory;

  return (
    <ToggleButton
      color='primary'
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
        border: 'none',
        "&.Mui-selected, &.Mui-selected:hover": {
          backgroundColor: 'transparent'
        }
      }}
    >
      {selected ? (
        <CheckBoxIcon sx={{border: 'none'}}/>
      ) : (
        <CheckBoxOutlineBlankIcon sx={{border: 'none'}}/>
      )}
    </ToggleButton>
  )
}

export default CheckBox