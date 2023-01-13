import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Typography, Box, Chip, Stack } from "@mui/material";
import CheckBox from "./checkbox";
import BottomButtons from "./bottomButtons";
import { useLoggedInDetailData } from "../../hooks/useDetailData";
import CocktailPhoto from "./cocktailPhoto";
import RightSideContainer from "./rightSideContainer";
import CocktailTitle from "./cockTailTitle";
import FavoriteButton from "./favoriteButton";
import CategoryDisplay from "./categoryDisplay";
import Ingredients from "./ingredients";
import Inventory from "./inventory";
import Directions from "./directions";

function LoggedinDetail(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const inventory = props.inventory;
  const {
    strDrink: cocktailName,
    strDrinkThumb: thumb,
    strInstructions: instructions,
  } = props.data;

  const {
    addFavorite,
    removeFavorite,
    addInventory,
    removeInventory,
    getIngredients,
  } = useLoggedInDetailData({ data: props.data });

  const invUppercase = [];
  inventory.map((inv) => invUppercase.push(inv.toUpperCase()));
  const ingredients = getIngredients(props.data, "strIngredient");
  const measurement = getIngredients(props.data, "strMeasure");

  return (
    <>
      <Box  sx={{display: {xs: 'none', md: 'block'}}}>
        <CocktailPhoto thumb={thumb} />
      </Box>
      <RightSideContainer>
        <CocktailTitle cocktailName={cocktailName}>
          <FavoriteButton
            favoriteId={props.favoriteId}
            userId={session.user.id}
            cocktailId={router.query.id}
          ></FavoriteButton>
        </CocktailTitle>
        <Box  sx={{display: {xs: 'block', md: 'none'}}}>
          <CocktailPhoto thumb={thumb} />
        </Box>
        <CategoryDisplay categories={props.categories} />

        <Ingredients ingredients={ingredients} measurement={measurement}>
          <Inventory
            ingredients={ingredients}
            inventory={inventory}
            userId={session.user.id}
          ></Inventory>
        </Ingredients>
        <Directions instructions={instructions} />
        <BottomButtons />
      </RightSideContainer>
    </>
  );
}

export default LoggedinDetail;
