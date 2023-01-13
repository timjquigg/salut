import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { getInventory } from "../../lib/inventory";
import { getUserId } from "../../lib/user";
import { getCocktailsBasedOnInventory } from "../../lib/cocktail";
import theme from "../../src/theme";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Cocktails = (props) => {
  const recipes = props.recipes;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const imagePath = (id) => {
    if (id.includes("/public")) {
      const newId = id.replace("/public", "");
      return newId;
    }
    return id;
  };
  const results = recipes.map((item) => (
    <ImageListItem
      key={item.idDrink}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={`/cocktail/${item.idDrink}`}>
        {/* <Image
          src={`${item.strDrinkThumb}`}
          alt={item.strDrink}
          width="335"
          height="350"
          object-fit="cover"
          position="relative"
        /> */}
        <Image
          src={item.strDrinkThumb}
          alt={item.strDrink}
          width={matches ? "351" : "435"}
          height={matches ? "375" : "450"}
          object-fit="cover"
          position="relative"
        />
      </Link>

      <ImageListItemBar
        title={item.strDrink}
        subtitle={item.strCategory}
        sx={{ marginBottom: "6px" }}
      />
    </ImageListItem>
  ));
  console.log("results:", results);
  return (
    <Box
      sx={{
        marginTop: "104px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: { sm: "30px", xs: "25px" },
          fontFamily: theme.typography.fontFamily[0],
          color: "#022140",
          margin: "10px",
        }}
      >
        Cocktails You Can Make
      </Typography>
      <Typography
        sx={{
          marginBottom: "50px",
          m: { xs: 2 },
          fontSize: { xs: "12px", sm: "18px" },
        }}
      >
        Here are all the cocktails you can make with what you have in your
        inventory.
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {results.length > 0 ? (
          <ImageList
            sx={{ width: "100%", height: "80%" }}
            cols={matches ? 1 : 3}
          >
            {results}
          </ImageList>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: { xs: "80%", s: "90%" },
            }}
          >
            <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
              You don&apos;t have enough items in your inventory to make any
              cocktail at the moment.
              <br />
              <br />
              Please update your inventory, or go to the closest liquor store!
            </Typography>

            <Image
              src={"/../public/noCocktailToShow.svg"}
              alt="No Cocktails"
              width={matches ? 450 : 500}
              height={matches ? 450 : 500}
            />
          </Box>
        )}
      </Box>
      <Button
        variant="outlined"
        size="medium"
        sx={{ m: 2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </Button>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const inventory = await getInventory(getUserId(sessionToken));
  const recipes = await getCocktailsBasedOnInventory(inventory);
  return {
    props: {
      inventory,
      recipes,
    },
  };
}

export default Cocktails;
