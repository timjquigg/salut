import { Box } from "@mui/system";
import { TabTable } from "./tabTable";
import { css } from "@emotion/react";

export function TabPanel(props) {
  const { data, value, index, ...other } = props;

  const styles = {
    width: "100%",
    display: "flex",
    alignItems: "center",
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      // css={styles}
    >
      {value === index && (
        <Box>
          <TabTable
            rows={data}
            inventory={props.inventory}
            // selected={props.selected}
            // isSelected={props.isSelected}
            // onClick={props.onClick}
            updateInventory={props.updateInventory}
          />
        </Box>
      )}
    </div>
  );
}
