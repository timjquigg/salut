import {
  getCocktail,
  getAllIngredients,
  getFilterCocktailsStrict,
} from "../../lib/search";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import useSearch from "../../custom_hook/useSearch";
import KeywordForm from "../../components/search/keyword_form";
import FilterForm from "../../components/search/filter_form";
import SearchContainer from "../../components/search/search_container";
import ResultList from "../../components/search/result_list";
import { useSession } from "next-auth/react";
import { getFavoriteByUser } from "../../lib/favourite";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const Result = (props) => {
  const { data: session, status } = useSession();
  const [filterForm, setFilterForm] = useState(true);
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
  } = useSearch();

  return (
    <>
      <SearchContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
        }}
      >
        {filterForm ? (
          <FilterForm
            options={props.ingredients}
            filterKeywords={filterKeywords}
            inputFilterKeywords={inputFilterKeywords}
            onChange={changeFilterHandler}
            onInputChange={changeInputFilterHandler}
            onClick={submitFilterHandler}
          />
        ) : (
          <KeywordForm
            enteredSearch={enteredSearch}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
          />
        )}

        <Button
          variant="contained"
          onClick={() => setFilterForm((prev) => !prev)}
          sx={{
            width: "12%",
            mt: 2,
          }}
        >
          Search by {filterForm ? "Keyword" : "Filter"}
        </Button>
      </SearchContainer>
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
  let data;
  if (keyword.length > 1) {
    const filterKeywords = context.query.keyword.map((el) => el.toLowerCase());
    data = await getFilterCocktailsStrict(filterKeywords);
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
