import React from "react";
import { Box } from "@mui/material";
import { getCocktailsBasedOnInventory } from "../../lib/carousel";
import { getUserId } from "../../lib/user";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import CocktailCard from "../../components/cocktailCard";
import theme from "../../src/theme";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from '@mui/material/Button';
import { NextLinkComposed } from "../../src/Link";
// import { unstable_getServerSession } from "next-auth/next";
// import { authOptions } from "../api/auth/[...nextauth]";

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const data = await getCocktailsBasedOnInventory(getUserId(sessionToken));
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
      items: 7,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
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
        <Box sx={{ display: "flex", justifyContent: "center", backgroundColor: 'rgb(245, 241, 231)' }}>
          <Box sx={{ textAlign: "center", width: "100%", marginTop: '20px' }}>
            <Typography
              sx={{
                fontSize: "30px",
                fontFamily: theme.typography.fontFamily[0],
                color: "#022140",
                margin: "10px",
              }}
            >
              Recommended For You
            </Typography>
            <Typography sx={{marginBottom: '50px'}}>
              Here are some recommended recipes for you based on your inventory items!
            </Typography>
            <Carousel responsive={responsive}>
              {items.map((item, i) => (
                <Item key={i} item={item} />
              ))}
            </Carousel>
          </Box>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', gap: 5, paddingTop: '6vh'}}>
          <Button 
            component={NextLinkComposed}
            to={{
              pathname: '/user/favorites',
            }} 
            variant="outlined" 
            sx={{borderRadius: '20px'}}
          >Go to your favorites</Button>
          <Button 
            component={NextLinkComposed}
            to={{
              pathname: '/user/inventory',
            }} 
            variant="outlined" 
            sx={{borderRadius: '20px'}}
          >Go to your inventory</Button>
        </Box>
      </Box>
    );
  }
}

User.auth = true;

export default User;
