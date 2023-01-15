// import { getCocktailsBasedOnInventory } from "../../lib/carousel";
// import { getUserId } from "../../lib/user";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import CocktailCard from "../../components/cocktailCard";
import theme from "../../src/theme";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "@mui/material/Button";
import { NextLinkComposed } from "../../src/link";
import Image from "next/image";

// export async function getServerSideProps(context) {
//   const sessionToken = context.req.cookies["next-auth.session-token"];
//   const data = await getCocktailsBasedOnInventory(getUserId(sessionToken));
//   return {
//     props: {
//       data,
//     },
//   };
// }

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
      <CocktailCard
        cocktailImage={props.item.strDrinkThumb}
        cocktailName={props.item.strDrink}
        instructions={props.item.strInstructions}
        cocktailId={props.item.idDrink}
      />
    </Box>
  );
}

function User() {
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
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const { data: session } = useSession();
  const [cocktails, setCocktails] = useState([])

  useEffect(() => {
    async function getCreatedCocktails() {
      if (session) {
        const response = await fetch(`/api/carousel?userId=${session.user.id}`);
        const data = await response.json();
        setCocktails(data.cocktails);
        // console.log("Data BUWHAHAHAHA:", data.cocktails);
      }
    }
    getCreatedCocktails();
  }, [session]);

  
  if (session) {
    return (
      <Box
        sx={{
          paddingTop: "104px",
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
        }}
      >
        <Box
          sx={{
            display: "flex",
            ustifyContent: "center",
            gap: { md: 5, xs: 2 },
            // paddingTop: {md: '6vh', xs: '3vh'},
            height: { md: "200px" },
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{}}>
            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/user/cocktails",
              }}
              variant="outlined"
              sx={{ padding: { md: "20px", xs: "20px 8px" } }}
            >
              <Image src={"/cocktail1.png"} width={100} height={100} alt="" />
              <Typography sx={{}}>Cocktails you can make</Typography>
            </Button>
          </Box>
          <Box sx={{}}>
            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/user/favorites",
              }}
              variant="outlined"
              sx={{ padding: "20px" }}
            >
              <Image src={"/cocktail2.png"} width={100} height={100} alt="" />
              <Typography sx={{}}>Go to your favorites</Typography>
            </Button>
          </Box>
          <Box sx={{}}>
            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/user/inventory",
              }}
              variant="outlined"
              sx={{ padding: "20px", marginBottom: { xs: "20px", md: 0 } }}
            >
              <Image src={"/cocktail3.png"} width={100} height={100} alt="" />
              <Typography sx={{}}>Go to your inventory</Typography>
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "rgb(245, 241, 231)",
          }}
        >
          <Box sx={{ textAlign: "center", width: "100%", marginTop: "20px" }}>
            <Typography
              sx={{
                fontSize: "30px",
                fontFamily: theme.typography.fontFamily[0],
                color: "#022140",
                margin: "10px",
              }}
            >
              Picked For You
            </Typography>
            {cocktails.length > 0 ? (
              <>
                <Typography
                  sx={{
                    margin: "10px",
                    marginBottom: { md: "50px", xs: "20px" },
                  }}
                >
                  We picked some recipes for you based on your inventory items!
                </Typography>
                <Carousel responsive={responsive}>
                  {cocktails.map((item, i) => (
                    <Item key={i} item={item} />
                  ))}
                </Carousel>
              </>
            ) : (
              <Typography sx={{ marginBottom: "50px" }}>
                Nothing to show - please add more items to your inventory!
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

User.auth = true;

export default User;
