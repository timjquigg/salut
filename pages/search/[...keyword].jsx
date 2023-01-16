import * as React from "react";
import { useState, useEffect } from "react";
import useSearch from "../../hooks/useSearch";
import KeywordForm from "../../components/search/keywordForm";
import FilterForm from "../../components/search/filterForm";
import SearchContainer from "../../components/search/searchContainer";
import ResultList from "../../components/search/resultList";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import Layout from "../../components/layout";
import useSWR from "swr";
import fetcher from "../../lib/fetcher";

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

const Result = () => {
  const router = useRouter();
  const [value, setValue] = useState(0);
  const [cocktailList, setCocktailList] = useState([]);
  const [ingredientList, setIngredientList] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [numItemDisplay, setNumItemDisplay] = useState(12);
  const [dataLength, setDataLength] = useState(0);
  const { data: session, status } = useSession();
  const keyword = router.query.keyword;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const errorSize = matches ? 350 : 500;
  const queryURL = session
    ? `/api/search?userId=${session.user.id}&keywords=${keyword}&count=${numItemDisplay}`
    : `/api/search?keywords=${keyword}&count=${numItemDisplay}`;
  // const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, isLoading, isValidating } = useSWR(queryURL, fetcher);

  useEffect(() => {
    if (data) {
      setCocktailList(data.drink);
      setIngredientList(data.ingredients);
      setDataLength(data.dataLength);
      if (session) {
        setFavorites(data.favorites);
      }
    }
  }, [data, session]);

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
    <Layout navbarType={2}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
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
                  setNumItemDisplay={setNumItemDisplay}
                />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <FilterForm
                  options={ingredientList}
                  filterKeywords={filterKeywords}
                  inputFilterKeywords={inputFilterKeywords}
                  onChange={changeFilterHandler}
                  onInputChange={changeInputFilterHandler}
                  onClick={submitFilterHandler}
                  setNumItemDisplay={setNumItemDisplay}
                />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <KeywordForm
                  enteredSearch={enteredSearch}
                  changeHandler={changeHandler}
                  submitHandler={submitNonAlcoholicHandler}
                  nonAlcoholic={true}
                  setNumItemDisplay={setNumItemDisplay}
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
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <LocalBarIcon />
            <Typography>Please wait while we get your drinks</Typography>
            <CircularProgress />
          </Box>
          
        ) : cocktailList.length !== 0 ? (
          <>
            <p>{`Displaying ${
              cocktailList.length < dataLength ? cocktailList.length : dataLength
            } out of ${dataLength} Results`}</p>
            
          </>
        ) : (
          <Box sx={{}}>
            <Typography
              sx={{
                fontSize: { sm: "30px", xs: "20px" },
                textAlign: "center",
                mb: -10,
              }}
            >
              No Drinks Found
            </Typography>
            <Image
              src={"/noDrinksFound.svg"}
              alt="No Drinks"
              width={errorSize}
              height={errorSize}
            />
          </Box>
        )}

        {/* {error && <p>Something went wrong...</p>} */}
        {cocktailList.length !== 0 && (
          <ResultList
            drink={cocktailList}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            isLoggedIn={session ? true : false}
            itemDisplay={itemDisplay}
            seeMoreHandler={seeMoreHandler}
            session={session}
            favorites={favorites}
          />
        )}
        {/* {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              p: 2,
            }}
          >
            <LocalBarIcon />
            <Typography>Please wait while we get your drinks</Typography>
            <CircularProgress />
          </Box>
        ) : (
          ""
        )} */}
        {cocktailList.length < dataLength ? (
          <Button
            variant="outlined"
            size="medium"
            onClick={() => {
              setNumItemDisplay((prev) => prev + 12);
            }}
          >
            See More
          </Button>
        ) : (
          ""
        )}
        {cocktailList.length !== 0 && (
          <Button
            variant="outlined"
            size="medium"
            sx={{ m: 2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top
          </Button>
        )}
      </Box>
    </Layout>
  );
};

export default Result;
