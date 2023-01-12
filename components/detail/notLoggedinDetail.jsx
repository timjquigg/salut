import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import theme from "../../src/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyToClipboardButton from "../copyUrl";

function NotLoggedinDetail(props) {
  const cocktailName = props.data.strDrink;
  const thumb = props.data.strDrinkThumb;
  const instructions = props.data.strInstructions;

  const getIngredients = (str) => {
    const output = [];
    const data = props.data;
    let ingKeys = Object.keys(data).filter((key) => key.includes(str));

    for (let key of ingKeys) {
      if (data[key] !== null) {
        output.push(data[key]);
      }
    }
    return output;
  };

  const ingredients = getIngredients("strIngredient");
  const measurement = getIngredients("strMeasure");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/stardust.png")',
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
              <FacebookIcon sx={{ fill: theme.palette.primary.contrastText }} />
            </Button>
            <Button
              title="Share on Twitter"
              href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon sx={{ fill: theme.palette.primary.contrastText }} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default NotLoggedinDetail;
