import Image from "next/image";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import theme from "../../src/theme";
import { useNotLoggedInDetailData } from "../../hooks/useDetailData";
import PageContainer from "./pageContainer";
import LocationProvider from "../../providers/locationProvider";
import BottomButtons from "./bottomButtons";
import CocktailPhoto from "./cocktailPhoto";

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
        <Box
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <Typography
              sx={{
                fontFamily: theme.typography.fontFamily[0],
                fontSize: "40px",
              }}
            >
              {cocktailName}
            </Typography>
          </Box>
          <Box sx={{ marginTop: "2rem", display: "flex", gap: 5 }}>
            <Box>
              <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Ingredients
              </Typography>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Box>
                  {ingredients.map((ingredient, i) => (
                    <p key={i}>{ingredient}</p>
                  ))}
                </Box>
                <Box>
                  {measurement.map((m, i) => (
                    <p key={i}>{m}</p>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: "1rem" }}>
            <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              Directions
            </Typography>
            <p>{instructions}</p>
          </Box>
          <BottomButtons />
        </Box>
      </PageContainer>
    </LocationProvider>
  );
}

export default NotLoggedinDetail;
