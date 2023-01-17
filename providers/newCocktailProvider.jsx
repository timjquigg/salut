import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import fetcher from "../lib/fetcher";
import useSWR from "swr";

export const newCocktailContext = createContext();

export default function NewCocktailProvider(props) {
  const [ingredientNames, setIngredientNames] = useState([]);
  const [cocktailNames, setCocktailNames] = useState([]);
  const { data: session, status } = useSession();
  const userId = session.user.id;

  const [recipe, setRecipe] = useState([{ ingredient: "", measurement: "" }]);
  const [directions, setDirections] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");

  // const { data: ingredients } = useSWR(`/api/ingredients`, fetcher);
  const { data } = useSWR("/api/createCocktail", fetcher);

  useEffect(() => {
    if (data) {
      setIngredientNames(
        data.ingredients.ingredients.map((el) => el.strIngredient)
      );
      setCocktailNames(data.cocktails.map((el) => el.strDrink));
    }
    console.log("updated data in provider");
  }, [data, userId]);

  const updateRecipe = (id, ingredient, measurement) => {
    setRecipe((prev) => {
      const newRecipe = [...prev];
      newRecipe[id] = { ingredient, measurement };
      return newRecipe;
    });
  };

  const removeRecipeItem = (id) => {
    // console.log(id);
    setRecipe((prev) => {
      const newRecipe = [...prev];
      // console.log(newRecipe);
      newRecipe.splice(id, 1);
      // console.log(newRecipe);
      return newRecipe;
    });
  };

  const nextId = () => {
    const id = recipe.length;
    return id;
  };

  const providerData = {
    recipe,
    updateRecipe,
    removeRecipeItem,
    nextId,
    title,
    setTitle,
    photo,
    setPhoto,
    directions,
    setDirections,
    ingredients: ingredientNames,
    cocktails: cocktailNames,
    userId,
  };
  return (
    <newCocktailContext.Provider value={providerData}>
      {props.children}
    </newCocktailContext.Provider>
  );
}
