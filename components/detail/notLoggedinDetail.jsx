import Image from "next/image";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import theme from "../../src/theme";
import { useNotLoggedInDetailData } from "../../hooks/useDetailData";
import PageContainer from "./pageContainer";
import LocationProvider from "../../providers/locationProvider";
import BottomButtons from "./bottomButtons";
import CocktailPhoto from "./cocktailPhoto";
import RightSideContainer from "./rightSideContainer";
import CocktailTitle from "./cockTailTitle";
import Ingredients from "./ingredients";
import Directions from "./directions";

function NotLoggedinDetail(props) {
  const {
    strDrink: cocktailName,
    strDrinkThumb: thumb,
    strInstructions: instructions,
  } = props.data;

  const { getIngredients } = useNotLoggedInDetailData({ data: props.data });

  const ingredients = getIngredients(props.data, "strIngredient");
  const measurement = getIngredients(props.data, "strMeasure");

  return (
    <LocationProvider>
      <PageContainer>
        <CocktailPhoto thumb={thumb} />
        <RightSideContainer>
          <CocktailTitle cocktailName={cocktailName} />
          <Ingredients ingredients={ingredients} measurement={measurement} />
          <Directions instructions={instructions} />
          <BottomButtons />
        </RightSideContainer>
      </PageContainer>
    </LocationProvider>
  );
}

export default NotLoggedinDetail;
