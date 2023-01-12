import {
  getCocktail,
  getAllIngredients,
  getFilterCocktailsStrict,
  getNonAlcoholicDrinks,
} from "../../lib/search";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import useSearch from "../../custom_hook/useSearch";
import KeywordForm from "../../components/search/keywordForm";
import FilterForm from "../../components/search/filterForm";
import SearchContainer from "../../components/search/searchContainer";
import ResultList from "../../components/search/resultList";
import { useSession } from "next-auth/react";
import { getFavoriteByUser } from "../../lib/favorite";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import theme from "../../src/theme";
import { Paper } from "@mui/material";

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
          <Box>{children}</Box>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Result = (props) => {
  const { data: session, status } = useSession();
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
    itemDisplay,
    seeMoreHandler,
    addFavorite,
    removeFavorite,
    submitNonAlcoholicHandler,
  } = useSearch();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
        }}
      >
        <SearchContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100vw",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                >
                  <Tab label="Search by ingredients" {...a11yProps(0)} />
                  <Tab label="Search by keywords" {...a11yProps(1)} />
                  <Tab label="Search Non-Alcoholics" {...a11yProps(2)} />
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
              <TabPanel value={value} index={2}>
                <KeywordForm
                  enteredSearch={enteredSearch}
                  changeHandler={changeHandler}
                  submitHandler={submitNonAlcoholicHandler}
                  nonAlcoholic={true}
                />
              </TabPanel>
            </Box>
          </Box>
        </SearchContainer>
      </Box>
      <Box
        noValidate
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          position: "relative",
        }}
      >
        <ResultList
          drink={props.drink}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          isLoggedIn={session ? true : false}
          itemDisplay={itemDisplay}
          seeMoreHandler={seeMoreHandler}
          session={session}
          favorites={props.favorites}
        />
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const keyword = context.query.keyword;
  // console.log("KW", keyword.includes("Non-Alcoholic"));
  let data;
  if (keyword.length > 1 && !keyword.includes("Non-Alcoholic")) {
    const filterKeywords = context.query.keyword.map((el) => el.toLowerCase());
    data = await getFilterCocktailsStrict(filterKeywords);
  } else if (keyword.includes("Non-Alcoholic") && keyword.length === 2) {
    const filterKeywords = context.query.keyword.map((el) => el.toLowerCase());
    data = await getNonAlcoholicDrinks(filterKeywords[1] || []);
  } else {
    data = await getCocktail(keyword[0]);
  }
  const ingredientData = await getAllIngredients();

  if (sessionToken) {
    const userFavorites = await getFavoriteByUser(sessionToken);
    return {
      props: {
        drink: data,
        ingredients: ingredientData,
        favorites: userFavorites,
      },
    };
  }

  return {
    props: {
      drink: data,
      ingredients: ingredientData,
    },
  };
}
export default Result;
