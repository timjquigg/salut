import { getCocktail, getAllIngredients } from "../../lib/search";
import * as React from "react";
import Box from "@mui/material/Box";
import useSearch from "../../custom_hook/useSearch";
import KeywordForm from "../../components/search/keyword_form";
import FilterForm from "../../components/search/filter_form";
import SearchContainer from "../../components/search/search_container";
import ResultList from "../../components/search/result_list";

const Result = (props) => {
  console.log(props);
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
        <ResultList drink={props.drink} />
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const ingredientData = await getAllIngredients();
  const keyword = context.query.keyword;
  const data = await getCocktail(keyword);
  return {
    props: {
      drink: data,
      ingredients: ingredientData,
    },
  };
}
export default Result;
