// import { getCocktailsBasedOnInventory } from "../../lib/carousel";
// import { getUserId } from "../../lib/user";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Layout from "../../components/layout";
import { useSession } from "next-auth/react";
import CocktailCard from "../../components/cocktailCard";
import theme from "../../src/theme";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Button from "@mui/material/Button";
import { NextLinkComposed } from "../../src/link";
import Image from "next/image";
import { LocalBar } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import fetcher from "../../lib/fetcher";
import useSWR from "swr";

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
  const [cocktails, setCocktails] = useState([]);

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/carousel?userId=${session.user.id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setCocktails(data.cocktails);
    }
  }, [data, session]);

  if (session) {
    return (
      <Layout navbarType={2}>
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
              gap: { lg: 3, xs: 2 },
              // paddingTop: {md: '6vh', xs: '3vh'},
              height: { md: "200px" },
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "center",
              alignItems: "center",
              px: 3,
            }}
          >
            <Box sx={{}}>
              <Button
                component={NextLinkComposed}
                to={{
                  pathname: "/user/cocktails",
                }}
                variant="outlined"
                sx={{ width: {md: "17vw", sm: "40vw", xs: "80vw"}, height: {md: "100px", sm: "100px", xs: "90px"}, textAlign: "center" }}
              >
                <Image src={"/cocktail1.png"} width={50} height={50} alt="" />
                <Typography sx={{}}>Cocktails you can make</Typography>
              </Button>
            </Box>
            <Box>
              <Button
                component={NextLinkComposed}
                to={{
                  pathname: "/user/inventory",
                }}
                variant="outlined"
                sx={{ width: {md: "17vw", sm: "40vw", xs: "80vw"}, height: {md: "100px", sm: "100px", xs: "90px"}, textAlign: "center" }}
              >
                <Image src={"/cocktail2.png"} width={50} height={50} alt="" />
                <Typography>Go to your inventory</Typography>
              </Button>
            </Box>
            <Box>
              <Button
                component={NextLinkComposed}
                to={{
                  pathname: "/user/favorites",
                }}
                variant="outlined"
                sx={{ width: {md: "17vw", sm: "40vw", xs: "80vw"}, height: {md: "100px", sm: "100px", xs: "90px"}, textAlign: "center" }}
              >
                <Image src={"/cocktail3.png"} width={50} height={50} alt="" />
                <Typography>Go to your favorites</Typography>
              </Button>
            </Box>
            <Box>
              <Button
                component={NextLinkComposed}
                to={{
                  pathname: "/cocktail/create",
                }}
                variant="outlined"
                sx={{ width: {md: "17vw", sm: "40vw", xs: "80vw"}, height: {md: "100px", sm: "100px", xs: "90px"}, textAlign: "center" }}
              >
                <Image src={"/cocktail4.png"} width={50} height={50} alt="" />
                <Typography>Create your own recipe</Typography>
              </Button>
            </Box>
            <Box>
              <Button
                component={NextLinkComposed}
                to={{
                  pathname: "/user/created",
                }}
                variant="outlined"
                sx={{ width: {md: "17vw", sm: "40vw", xs: "80vw"}, height: {md: "100px", sm: "100px", xs: "90px"}, marginBottom: { xs: "20px", md: 0 }, textAlign: "center" }}
              >
                <Image src={"/cocktail5.png"} width={50} height={50} alt="" />
                <Typography>your custom recipes</Typography>
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
              ) : isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 2,
                  }}
                >
                  <LocalBar />
                  <Typography>Please wait while we get your drinks</Typography>
                  <CircularProgress />
                </Box>
              ) : (
                <Typography sx={{ marginBottom: "50px" }}>
                  Nothing to show - please add more items to your inventory!
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Layout>
    );
  }
}

User.auth = true;

export default User;
