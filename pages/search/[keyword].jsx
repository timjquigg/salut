import { getCocktail, getAllIngredients } from "../../lib/search";
import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import useSearch from "../../custom_hook/useSearch";
import KeywordForm from "../../components/search/keyword_form";
import FilterForm from "../../components/search/filter_form";
import SearchContainer from "../../components/search/search_container";
import ResultList from "../../components/search/result_list";
import { useSession } from "next-auth/react";
import { getFavoriteByUser } from "../../lib/favourite";

const Result = (props) => {
  console.log(props.favorites);

  const { data: session, status } = useSession();
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
  } = useSearch();

  const addFavorite = async (userId, cocktailId) => {
    const response = await fetch("/api/postFavourite", {
      method: "POST",
      body: JSON.stringify({ userId: userId, cocktailId: cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const removeFavorite = async (userId, cocktailId) => {
    const response = await fetch("/api/removeFavourite", {
      method: "DELETE",
      body: JSON.stringify({ userId: userId, cocktailId: cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // USE TO FIX LAYOUT
  // const DUMMY = [
  //   props.drink[0],
  //   props.drink[1],
  //   props.drink[2],
  //   props.drink[3],
  // ];

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
        <KeywordForm
          enteredSearch={enteredSearch}
          changeHandler={changeHandler}
          submitHandler={submitHandler}
        />

        <FilterForm
          options={props.ingredients}
          filterKeywords={filterKeywords}
          inputFilterKeywords={inputFilterKeywords}
          onChange={changeFilterHandler}
          onInputChange={changeInputFilterHandler}
          onClick={submitFilterHandler}
        />
      </SearchContainer>
      <Box
        noValidate
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          position: "relative",
        }}
      >
        <p>{`${props.drink.length} Results`}</p>
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
  const userFavorites = await getFavoriteByUser(sessionToken);
  const ingredientData = await getAllIngredients();
  const data = await getCocktail(keyword);
  return {
    props: {
      drink: data,
      ingredients: ingredientData,
      favorites: userFavorites,
    },
  };
}
export default Result;
