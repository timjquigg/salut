import { Box } from "@mui/system";
import { TabTable } from "./tabTable";

export function TabPanel(props) {
  const { data, value, index, category, ...other } = props;
  // console.log('category:', category)
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
          <TabTable rows={data} category={category} />
        </Box>
      )}
    </div>
  );
}
