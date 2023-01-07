import { useState } from "react";
import { useRouter } from "next/router";
import { getAllIngredients } from "../../lib/search";
import Box from "@mui/material/Box";
import KeywordForm from "../../components/search/keyword_form";
import FilterForm from "../../components/search/filter_form";

const Search = (props) => {
  const router = useRouter();
  const [enteredSearch, setEnteredSearch] = useState("");
  const [filterKeywords, setFilterKeywords] = useState([]);
  const [inputFilterKeywords, setInputFilterKeywords] = useState();

  const pathFormatter = (filtersArr) => {
    let url = "search";
    filtersArr.forEach((filter) => {
      url += `/${filter}`;
    });
    return url;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    router.push(`search/${enteredSearch}`);
  };

  const changeHandler = (event) => {
    event.preventDefault();
    setEnteredSearch(event.target.value);
  };

  const changeFilterHandler = (event, newValue) => {
    setFilterKeywords(newValue);
  };

  const changeInputFilterHandler = (event, newValue) => {
    console.log(newValue.strIngredient);
    setInputFilterKeywords(newValue);
  };

  const submitFilterHandler = (event) => {
    event.preventDefault();
    const formatValue = filterKeywords.map((el) => el.strIngredient);
    console.log("filtered:", filterKeywords);
    console.log(pathFormatter(formatValue));
    router.push(pathFormatter(formatValue));
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 2,
        mt: 8,
      }}
      noValidate
      autoComplete="off"
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
    </Box>
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
