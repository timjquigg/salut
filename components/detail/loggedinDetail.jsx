import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Typography, Box } from "@mui/material";
import BottomButtons from "./bottomButtons";
import { useLoggedInDetailData } from "../../hooks/useDetailData";
import CocktailPhoto from "./cocktailPhoto";
import RightSideContainer from "./rightSideContainer";
import CocktailTitle from "./cocktailTitle";
import FavoriteButton from "./favoriteButton";
import CategoryDisplay from "./categoryDisplay";
import { IngredientsWithInventory } from "./ingredients";
import Directions from "./directions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

function LoggedinDetail(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    strDrink: cocktailName,
    strDrinkThumb: thumb,
    strInstructions: instructions,
    Favorite: favorites,
  } = props.data;

  const bigThumbnail = matches ? <></> : <CocktailPhoto thumb={thumb} />;

  const smallThumbnail = matches ? <CocktailPhoto thumb={thumb} /> : <></>;

  const likes = favorites.length;
  const [newLikes, setNewLikes] = useState(likes);

  const { getIngredients } = useLoggedInDetailData({ data: props.data });

  const ingredients = getIngredients(props.data, "strIngredient");
  const measurement = getIngredients(props.data, "strMeasure");

  return (
    <>
      {bigThumbnail}
      <RightSideContainer>
        <Box sx={{ display: "flex", alignItems: "end", gap: { xs: 0, sm: 5 } }}>
          <CocktailTitle cocktailName={cocktailName} />
          <FavoriteButton
            favoriteId={props.favoriteId}
            userId={session.user.id}
            cocktailId={router.query.id}
            setNewLikes={setNewLikes}
          ></FavoriteButton>
        </Box>
        <CategoryDisplay categories={props.categories} />
        {smallThumbnail}
        <Typography
          sx={{ mt: { xs: 1, md: 0 }, display: "flex", alignItems: "center" }}
        >
          {newLikes}
          {newLikes === 1 ? " like" : " likes"}
          <FavoriteIcon sx={{ fontSize: "medium", color: "red" }} />
        </Typography>

        <IngredientsWithInventory
          ingredients={ingredients}
          measurement={measurement}
          userId={session.user.id}
        ></IngredientsWithInventory>
        <Directions instructions={instructions} />
        <BottomButtons cocktailId={router.query.id} />
      </RightSideContainer>
    </>
  );
}

export default LoggedinDetail;
