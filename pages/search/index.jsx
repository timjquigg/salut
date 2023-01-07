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
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <KeywordForm
        enteredSearch={enteredSearch}
        changeHandler={changeHandler}
        submitHandler={submitHandler}
      />

      {/* <TextField
        id="outlined-basic"
        label="Search for a Cocktail"
        variant="outlined"
        value={enteredSearch}
        onChange={changeHandler}
      />
      <Button variant="outlined" onClick={submitHandler}>
        Submit
      </Button> */}
      <FilterForm
        options={props.ingredients}
        filterKeywords={filterKeywords}
        inputFilterKeywords={inputFilterKeywords}
        onChange={changeFilterHandler}
        onInputChange={changeInputFilterHandler}
        onClick={submitFilterHandler}
      />
      {/* <Autocomplete
        multiple
        id="tags-outlined"
        options={props.ingredients}
        getOptionLabel={(option) => option.strIngredient}
        value={filterKeywords}
        inputValue={inputFilterKeywords}
        onChange={changeFilterHandler}
        onInputChange={changeInputFilterHandler}
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            // placeholder="Favorites"
          />
        )}
      />

      <Button variant="outlined" onClick={submitFilterHandler}>
        Submit
      </Button> */}
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
