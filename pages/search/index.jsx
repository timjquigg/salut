import { getAllIngredients } from "../../lib/search";
import KeywordForm from "../../components/search/keyword_form";
import FilterForm from "../../components/search/filter_form";
import SearchContainer from "../../components/search/search_container";
import useSearch from "../../custom_hook/useSearch";
import { useState } from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import theme from "../../src/theme";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Search = (props) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    enteredSearch,
    changeHandler,
    submitHandler,
    filterKeywords,
    inputFilterKeywords,
    changeFilterHandler,
    changeInputFilterHandler,
    submitFilterHandler,
  } = useSearch();

  return (
    <SearchContainer marginTop={15}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography sx={{fontFamily: theme.typography.fontFamily[0], fontSize: '40px'}}>Look for recipes</Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Search by ingredients" {...a11yProps(0)} />
              <Tab label="Search by keywords" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <FilterForm
              options={props.ingredients}
              filterKeywords={filterKeywords}
              inputFilterKeywords={inputFilterKeywords}
              onChange={changeFilterHandler}
              onInputChange={changeInputFilterHandler}
              onClick={submitFilterHandler}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <KeywordForm
              enteredSearch={enteredSearch}
              changeHandler={changeHandler}
              submitHandler={submitHandler}
            />
          </TabPanel>
        </Box>
      </Box>
    </SearchContainer>
  );
};

export async function getServerSideProps(context) {
  const data = await getAllIngredients();
  return {
    props: {
      ingredients: data,
    },
  };
}

export default Search;
