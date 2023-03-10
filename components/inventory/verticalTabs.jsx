import { useState, useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel } from "./tabPanel";
import { inventoryContext } from "../../providers/InventoryProvider";

export default function VerticalTabs(props) {
  const [value, setValue] = useState(0);

  const { categories } = useContext(inventoryContext);

  const sortedCategories = Object.keys(categories).sort();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        data={categories[category]}
        category={category}
      />
    );
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "90%",
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
        }}
      >
        {tabList}
      </Tabs>
      {tabPanels}
    </Box>
  );
}
