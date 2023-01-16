import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSession } from "next-auth/react";
axios.defaults.baseURL = process.env.NEXT_PUBLIC_VERCEL_ENV
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const useSearch = () => {
  const router = useRouter();
  const [enteredSearch, setEnteredSearch] = useState("");
  const [filterKeywords, setFilterKeywords] = useState([]);
  const [inputFilterKeywords, setInputFilterKeywords] = useState();
  const [itemDisplay, setItemDisplay] = useState(12);

  const pathFormatter = (filtersArr) => {
    let url = "/search";
    filtersArr.forEach((filter) => {
      url += `/${filter}`;
    });
    return url;
  };

  const submitHandler = (event) => {
    // console.log(event);
    setEnteredSearch("");
    setItemDisplay(12);
    router.push(`/search/${enteredSearch}`);
  };

  const changeHandler = (event) => {
    // event.preventDefault();
    setEnteredSearch(event.target.value);
  };

  const changeFilterHandler = (event, newValue) => {
    setFilterKeywords(newValue);
  };
  // console.log(filterKeywords);

  const changeInputFilterHandler = (event, newValue) => {
    setInputFilterKeywords(newValue);
    // console.log(inputFilterKeywords);
  };

  const submitFilterHandler = (event) => {
    // event.preventDefault();
    const formatValue = filterKeywords.map((el) => el.strIngredient);
    setItemDisplay(12);
    setFilterKeywords([]);
    router.push(pathFormatter(formatValue));
  };

  const submitNonAlcoholicHandler = (event) => {
    // event.preventDefault();
    const formatValue = filterKeywords.map((el) => el.strIngredient);
    setItemDisplay(12);
    router.push(`${pathFormatter(formatValue)}/Non-Alcoholic/${enteredSearch}`);
  };

  const seeMoreHandler = () => {
    setItemDisplay((prev) => prev + 12);
  };

  const addFavorite = async (userId, cocktailId) => {
    const payload = { cocktailId, userId };
    // console.log("add:", payload);
    // console.log("/api/favorites");
    await axios.post("/api/favorites", payload);
  };

  const removeFavorite = async (userId, cocktailId) => {
    const payload = { cocktailId, userId };
    // console.log("delete:", payload);
    // console.log("/api/favorites");
    await axios.delete("/api/favorites", { data: payload });
  };

  return {
    enteredSearch,
    filterKeywords,
    inputFilterKeywords,
    submitHandler,
    changeHandler,
    changeFilterHandler,
    changeInputFilterHandler,
    submitFilterHandler,
    seeMoreHandler,
    itemDisplay,
    addFavorite,
    removeFavorite,
    submitNonAlcoholicHandler,
  };
};

export default useSearch;
