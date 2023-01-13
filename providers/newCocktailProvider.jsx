import { createContext, useState } from "react";

export const newCocktailContext = createContext();

export default function NewCocktailProvider(props) {
  const { ingredients, cocktails } = props;
  const ingredientNames = ingredients.map((el) => el.strIngredient);
  const cocktailNames = cocktails.map((el) => el.strDrink);

  const [recipe, setRecipe] = useState([{ ingredient: "", measurement: "" }]);
  const [directions, setDirections] = useState("");
  const [title, setTitle] = useState("");
  const [photo, setPhoto] = useState("");

  const updateRecipe = (id, ingredient, measurement) => {
    setRecipe((prev) => {
      const newRecipe = [...prev];
      newRecipe[id] = { ingredient, measurement };
      return newRecipe;
    });
  };

  const removeRecipeItem = (id) => {
    console.log(id);
    setRecipe((prev) => {
      const newRecipe = [...prev];
      console.log(newRecipe);
      newRecipe.splice(id, 1);
      console.log(newRecipe);
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
  };
  return (
    <newCocktailContext.Provider value={providerData}>
      {props.children}
    </newCocktailContext.Provider>
  );
}
