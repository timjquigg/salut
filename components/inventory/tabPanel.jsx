import { Box } from "@mui/system";
import { TabTable } from "./tabTable";

export function TabPanel(props) {
  const { data, value, index, ...other } = props;

  // const dataList = data.map((ingredient, index) => {
  //   return <Typography key={index}>{ingredient}</Typography>;
  // });

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
