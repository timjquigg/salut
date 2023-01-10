import { useState } from "react";
import { useRouter } from "next/router";

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
    event.preventDefault();
    setEnteredSearch("");
    setItemDisplay(12);
    router.push(`/search/${enteredSearch}`);
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
    setItemDisplay(12);
    router.push(pathFormatter(formatValue));
  };

  const seeMoreHandler = () => {
    setItemDisplay((prev) => prev + 12);
  };

  const addFavorite = async (userId, cocktailId) => {
    const response = await fetch("/api/postFavorite", {
      method: "POST",
      body: JSON.stringify({ userId: userId, cocktailId: cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const removeFavorite = async (userId, cocktailId) => {
    const response = await fetch("/api/removeFavorite", {
      method: "DELETE",
      body: JSON.stringify({ userId: userId, cocktailId: cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
  };
};

export default useSearch;
