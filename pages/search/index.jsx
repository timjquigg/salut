import { getAllIngredients } from "../../lib/search";
import KeywordForm from "../../components/search/keyword_form";
import FilterForm from "../../components/search/filter_form";
import SearchContainer from "../../components/search/search_container";
import useSearch from "../../custom_hook/useSearch";
import { useState } from "react";
import Button from "@mui/material/Button";
import Image from "next/image";
import Box from "@mui/material/Box";

const Search = (props) => {
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
  } = useSearch();

  return (
    <SearchContainer marginTop={39}>
      <Box
        sx={{
          p: 2.5,
        }}
      >
        <Image
          src={"/salut_logo.png"}
          alt="logo"
          width="330"
          height="90"
          quality={100}
        />
      </Box>

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
