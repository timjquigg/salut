import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel } from "./tabPanel";
import { Button } from "@mui/material";

export default function VerticalTabs(props) {
  const [value, setValue] = useState(0);
  // const [selected, setSelected] = useState(props.inventory);

  const categories = props.children;
  const inventory = props.inventory;

  const sortedCategories = Object.keys(categories).sort();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const updateSelected = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const tabList = sortedCategories.map((category, index) => {
    return (
      <Tab
        label={category}
        key={index}
        aria-controls={`vertical-tabpanel-${index}`}
      />
    );
  });

  const tabPanels = sortedCategories.map((category, index) => {
    return (
      <TabPanel
        key={index}
        value={value}
        index={index}
        inventory={inventory}
        data={categories[category]}
        // inven={props.inventory}
        updateInventory={props.updateInventory}
      />
    );
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        maxHeight: "90%",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
          // maxHeight: "90%",
        }}
      >
        {tabList}
      </Tabs>
      {tabPanels}
    </Box>
  );
}
