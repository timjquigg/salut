import Image from "next/image";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import theme from "../../src/theme";
import { Facebook, Twitter } from "@mui/icons-material";
import CopyToClipboardButton from "../copyUrl";
import { useNotLoggedInDetailData } from "../../hooks/useDetailData";

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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
        paddingTop: "10vh",
      }}
    >
      <Box
        sx={{
          color: theme.palette.primary.contrastText,
          display: "flex",
          justifyContent: "center",
          alignItems: "start",
          gap: "5vw",
          marginLeft: "5vw",
          marginRight: "5vw",
          paddingLeft: "5vw",
          paddingRight: "5vw",
          paddingTop: "10vh",
          paddingBottom: "5vh",
          border: "5px double #C8963E",
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Image
            src={thumb}
            alt="Picture of the author"
            width={500}
            height={500}
            layout="responsive"
          />
        </Box>
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
          <Box sx={{ display: "flex" }}>
            <CopyToClipboardButton />
            <Button
              title="Share on facebook"
              href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com"
              target="_blank"
              rel="noreferrer"
            >
              <Facebook sx={{ fill: theme.palette.primary.contrastText }} />
            </Button>
            <Button
              title="Share on Twitter"
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com"
              target="_blank"
              rel="noreferrer"
            >
              <Twitter sx={{ fill: theme.palette.primary.contrastText }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NotLoggedinDetail;
