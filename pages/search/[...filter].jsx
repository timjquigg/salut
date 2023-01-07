import { getFilterCocktailsStrict } from "../../lib/search";
import { getAllIngredients } from "../../lib/search";
import KeywordForm from "../../components/search/keyword_form";
import FilterForm from "../../components/search/filter_form";
import SearchContainer from "../../components/search/search_container";
import Box from "@mui/material/Box";
import ResultList from "../../components/search/result_list";
import useSearch from "../../custom_hook/useSearch";
import { useSession } from "next-auth/react";

const Result = (props) => {
  const { data: session } = useSession();
  console.log("session:", session);
  // console.log(props);
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
    <>
      <SearchContainer
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          mt: 8,
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
        <p>{`${props.drinks.length} Results`}</p>
        <ResultList drink={props.drinks} />
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const ingredientData = await getAllIngredients();
  const filtersParams = context.query.filter.map((el) => el.toLowerCase());
  const drinksData = await getFilterCocktailsStrict(filtersParams);
  return {
    props: {
      drinks: drinksData,
      ingredients: ingredientData,
    },
  };
}
export default Result;
