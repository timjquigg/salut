import { createContext, useState } from "react";

export const newCocktailContext = createContext();

export default function NewCocktailProvider(props) {
  const { ingredients, cocktails } = props;
  const ingredientNames = ingredients.map((el) => el.strIngredient);
  const cocktailNames = cocktails.map((el) => el.strDrink);

  const [recipe, setRecipe] = useState({
    0: { ingredient: "", measurement: "" },
  });

  const updateRecipe = (id, ingredient, measurement) => {
    setRecipe((prev) => {
      const newRecipe = { ...prev };
      newRecipe[id] = { ingredient, measurement };
      console.log(newRecipe);
      return newRecipe;
    });
  };

  const providerData = {
    recipe,
    updateRecipe,
    ingredients: ingredientNames,
    cocktails: cocktailNames,
  };
  return (
    <newCocktailContext.Provider value={providerData}>
      {props.children}
    </newCocktailContext.Provider>
  );
}
