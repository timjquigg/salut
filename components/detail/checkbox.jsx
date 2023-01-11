import React, { useState } from 'react'
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function CheckBox(props) {
  const [selected, setSelected] = useState(props.isInventory);
  // const clickHandler = (update) => {
  //   setSelected(!selected);
  //   update();
  // }
  console.log(props.isInventory)
  // return (
  //   <Checkbox
  //     checked={selected}
  //     onClick={() => clickHandler(props.update)}
  //   />
  // )
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
    >
      {selected ? (
        <CheckBoxIcon />
      ) : (
        <CheckBoxOutlineBlankIcon />
      )}
    </ToggleButton>
  )
}

export default CheckBox