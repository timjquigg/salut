import { Box } from "@mui/system";
import { TabTable } from "./tabTable";

export function TabPanel(props) {
  const { data, value, index, ...other } = props;

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
