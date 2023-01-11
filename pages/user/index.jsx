import React from "react";
import { Box } from "@mui/material";
import { Paper, Button } from "@mui/material";
import { getPopularCocktails } from "../../lib/carousel";
import Image from "next/image";
import { NextLinkComposed } from "../../src/Link";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import CocktailCard from "../../components/cocktailCard";
import theme from "../../src/theme";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const data = await getPopularCocktails();
  // console.log('data:', data)
  return {
    props: {
      data,
    },
  };
}

function Item(props) {
  // console.log(props.item.strDrinkThumb)
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CocktailCard
        cocktailImage={props.item.strDrinkThumb}
        cocktailName={props.item.strDrink}
        instructions={props.item.strInstructions}
        cocktailId={props.item.idDrink}
      />
    </Box>
  );
}

function User(props) {
  // console.log(props.data)
  // https://www.transparenttextures.com/patterns/gradient-squares.png
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { data: session } = useSession();
  let items = props.data;
  if (session) {
    return (
      <Box sx={{ marginTop: "104px" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ textAlign: "center", width: "100%" }}>
            <Typography
              sx={{
                fontSize: "30px",
                fontFamily: theme.typography.fontFamily[0],
                color: "#022140",
                marginBottom: "30px",
              }}
            >
              Popular Cocktails
            </Typography>
            <Carousel responsive={responsive}>
              {items.map((item, i) => (
                <Item key={i} item={item} />
              ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
    );
  }
}

User.auth = true;

export default User;
