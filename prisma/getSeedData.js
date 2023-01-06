require("dotenv").config();
const fs = require("fs").promises;

const axios = require("axios");

const cocktailUrl = `http://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_API_KEY}`;

const firstLetters = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

async function getDrinks() {
  let drinks = [];
  for (const letter of firstLetters) {
    const drinksLetter = await axios.get(
      `${cocktailUrl}/search.php?f=${letter}`
    );
    drinks = [].concat(drinks, drinksLetter.data.drinks);
  }
  return drinks;
}

async function getIngredients() {
  let ingredients = await axios.get(`${cocktailUrl}/list.php?i=list`);
  let detailedIngredients = [];
  ingredients = ingredients.data.drinks;
  for (const ingredient of ingredients) {
    // console.log(ingredients[0]);
    let ingredientDetails = await axios.get(
      `${cocktailUrl}/search.php?i=${ingredient.strIngredient1}`
    );
    ingredientDetails = ingredientDetails.data.ingredients;
    detailedIngredients = [].concat(detailedIngredients, ingredientDetails);
  }

  return detailedIngredients;
}

getDrinks().then((drinks) => {
  // We now have every cocktail

  fs.writeFile(`.\\drinksData.json`, JSON.stringify(drinks)).then(() => {
    console.log("Successfully wrote the drinks file");
  });
});

getIngredients().then((ingredients) => {
  // We now have all ingredients
  fs.writeFile(`.\\ingredientData.json`, JSON.stringify(ingredients)).then(
    () => {
      console.log("Successfully wrote the ingredients file");
    }
  );
});
