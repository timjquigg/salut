import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { getUserId } from "../../lib/user";
import { getUserCreatedCocktails } from "../../lib/cocktail";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NextLinkComposed } from "../../src/link";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const UserCocktails = (props) => {
  const [cocktails, setCocktails] = useState(props.cocktails);
  const [open, toggleOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const imagePath = (id) => {
    if (id.includes("/public")) {
      const newId = id.replace("/public", "");
      return newId;
    }
    return id;
  };

  const deleteCocktail = async (cocktailId) => {
    const response = await fetch("/api/createCocktail", {
      method: "DELETE",
      body: JSON.stringify({
        cocktailId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const results = cocktails.map((item) => (
    <ImageListItem
      key={item.idDrink}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IconButton
        sx={{ position: "absolute", top: "5px", right: "5px" }}
        onClick={() => {
          toggleOpen(true);
        }}
      >
        <CloseIcon sx={{ color: "white", fontSize: "50px" }} />
      </IconButton>
      <Link href={`/cocktail/${item.idDrink}`}>
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
      <Dialog open={open}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContentText sx={{ p: 3 }}>
          {`You are about to delete this ${item.strDrink}. Once submitted, it cannot be undone. Continue?`}
        </DialogContentText>
        <DialogActions>
          <Button onClick={() => toggleOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              deleteCocktail(item.idDrink);
              const filteredState = cocktails.filter(
                (cocktail) => cocktail.idDrink !== item.idDrink
              );
              setCocktails(filteredState);
              toggleOpen(false);
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </Dialog>
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
        Personal Recipes
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {results.length > 0 ? (
          <>
            <Typography
              sx={{
                marginBottom: "50px",
                m: { xs: 2 },
                fontSize: { xs: "15px", sm: "18px" },
                textAlign: "center",
              }}
            >
              Here are all the cocktail recipes that you have created
            </Typography>
            <Box
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              <ImageList
                sx={{ width: { sm: "90%", sx: "100%" }, height: "80%" }}
                cols={matches ? 1 : 3}
              >
                {results}
              </ImageList>
            </Box>
            <Button
              variant="outlined"
              size="medium"
              sx={{ m: 2 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Back to top
            </Button>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: { xs: "80%", s: "90%" },
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "15px", sm: "18px" }, textAlign: "center" }}
            >
              You haven&apos;t made any custom cocktail recipe yet.
              <br />
              <br />
              You can create one or just enjoy browsing our collection of
              recipes.
            </Typography>

            <Image
              src={"/../public/noCocktailToShow.svg"}
              alt="No Cocktails"
              width={matches ? 400 : 500}
              height={matches ? 400 : 500}
            />
            <Button
              variant="outlined"
              size="medium"
              sx={{ m: 2 }}
              component={NextLinkComposed}
              to={{
                pathname: "/user/inventory",
              }}
            >
              Go to inventory
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const userId = await getUserId(sessionToken);
  const cocktails = await getUserCreatedCocktails(userId.userId);
  // console.log("user:", userId.cocktails);
  return {
    props: {
      cocktails: cocktails,
    },
  };
}

export default UserCocktails;
