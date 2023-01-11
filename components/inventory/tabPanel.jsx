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
    >
      {value === index && (
        <Box>
          <TabTable rows={data} />
        </Box>
      )}
    </div>
  );
}
