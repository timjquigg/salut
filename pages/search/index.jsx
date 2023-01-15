// import { getAllIngredients } from "../../lib/search";
// import { getPopularCocktails } from "../../lib/carousel";
import KeywordForm from "../../components/search/keywordForm";
import FilterForm from "../../components/search/filterForm";
import SearchContainer from "../../components/search/searchContainer";
import useSearch from "../../hooks/useSearch";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import theme from "../../src/theme";
import CocktailCard from "../../components/cocktailCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Item(props) {
  // console.log(props.item.strDrinkThumb)
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CocktailCard
        cocktailImage={props.item.strDrinkThumb}
        cocktailName={props.item.strDrink}
        instructions={props.item.strInstructions}
        cocktailId={props.item.idDrink}
      />
    </Box>
  );
}

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

const Search = () => {
  const [value, setValue] = useState(0);
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getIngredients() {
      const response = await fetch(`/api/ingredients`);
      const data = await response.json();
      // console.log("Data HAHAHA:", data);
      const { recipes, ingredients } = data;
      setIngredients(ingredients);
      setRecipes(recipes);
    }
    getIngredients();
  }, []);

  const {
    enteredSearch,
    changeHandler,
    submitHandler,
    filterKeywords,
    inputFilterKeywords,
    changeFilterHandler,
    changeInputFilterHandler,
    submitFilterHandler,
    submitNonAlcoholicHandler,
  } = useSearch();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // let items = props.recipes;
  let items = recipes;

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <SearchContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100vw",
          }}
        >
          <Typography
            sx={{
              fontFamily: theme.typography.fontFamily[0],
              fontSize: { sm: "40px", xs: "35px" },
              marginTop: { xs: "20px", lg: "none" },
            }}
          >
            Look for recipes
          </Typography>
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
                <Tab label="Search by keywords" {...a11yProps(0)} />
                <Tab label="Search by ingredients" {...a11yProps(1)} />
                <Tab label="Search Non-Alcoholics" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <KeywordForm
                enteredSearch={enteredSearch}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FilterForm
                options={ingredients}
                filterKeywords={filterKeywords}
                inputFilterKeywords={inputFilterKeywords}
                onChange={changeFilterHandler}
                onInputChange={changeInputFilterHandler}
                onClick={submitFilterHandler}
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
      <Box sx={{ backgroundColor: "rgb(245, 241, 231)" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: "100%" }}>
            <Typography
              sx={{
                fontSize: "20px",
                color: "#022140",
                textAlign: "center",
                fontFamily: theme.typography.fontFamily[0],
                margin: "20px",
              }}
            >
              Popular Cocktails
            </Typography>
            <Carousel responsive={responsive}>
              {items.map((item, i) => (
                <Item key={i} item={item} />
              ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// export async function getServerSideProps(context) {
//   const data = await getAllIngredients();
//   const recipes = await getPopularCocktails();
//   return {
//     props: {
//       ingredients: data,
//       recipes,
//     },
//   };
// }

export default Search;
