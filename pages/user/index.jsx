import React from "react";
import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import { getRandomCocktails } from "../../lib/carousel";
import Image from "next/image";
import { NextLinkComposed } from "../../src/Link";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import CocktailCard from "../../components/cocktailCard";
import theme from "../../src/theme";
// import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const data = await getRandomCocktails();
  return {
    props: {
      data,
    },
  };
}

function Item(props) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h2>{props.item.strDrink}</h2> */}
      {/* <p>{props.item.description}</p> */}
      {/* <Image
        src={props.item.strDrinkThumb}
        alt="Picture of the author"
        width={500}
        height={500}
      /> */}
      <CocktailCard 
        cocktailImage={props.item.strDrinkThumb} 
        cocktailName={props.item.strDrink} 
        instructions={props.item.strInstructions}
        cocktailId={props.item.idDrink}
      />
      {/* <Button className="CheckButton">See the recipe</Button> */}
    </Box>
  );
}

function User(props) {
  // console.log(props.data)
  const { data: session } = useSession();
  let items = props.data;
  if (session) {
    return (
      <Box sx={{ marginTop: "104px" }}>
        {/* <Box sx={{ display: "flex" }}>
          <Button
            component={NextLinkComposed}
            to={{
              pathname: "/user/inventory",
            }}
            variant="contained"
            // startIcon={}
            sx={{ margin: "20px" }}
          >
            Go to your Inventory
          </Button>
          <Button
            component={NextLinkComposed}
            to={{
              pathname: "/user/favorites",
            }}
            variant="contained"
            // startIcon={}
            sx={{ margin: "20px" }}
          >
            View your favourites
          </Button>
        </Box> */}

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ textAlign: "center", width: "600px" }}>
            <Typography sx={{ fontSize: "30px", fontFamily: theme.typography.fontFamily[0], color: "#022140", marginBottom: '30px' }}>
              Cocktails of the day
            </Typography>
            <Carousel>
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
