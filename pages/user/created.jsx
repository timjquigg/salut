import { useState, useEffect } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import Layout from "../../components/layout";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NextLinkComposed } from "../../src/link";
import { LocalBar, Close } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import fetcher from "../../lib/fetcher";
import useSWR from "swr";

const UserCocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [open, toggleOpen] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: session, status } = useSession();

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/cocktail?userId=${session.user.id}`,
    fetcher
  );
  useEffect(() => {
    if (data) {
      setCocktails(data.cocktails);
    }
  }, [data, session]);

  let itemListWidth = matches
    ? 400
    : cocktails.length > 3
    ? 1000
    : cocktails.length * 450;

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
        <Close sx={{ color: "white", fontSize: "50px" }} />
      </IconButton>
      <Link href={`/cocktail/${item.idDrink}`}>
        <Image
          src={item.strDrinkThumb}
          alt={item.strDrink}
          width={435}
          height={450}
          quality={35}
          position="relative"
          layout="intrinsic"
          object-fit="cover"
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
  return (
    <Layout navbarType={2}>
      <Box
        sx={{
          marginTop: "104px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100vw",
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
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  p: 2,
                }}
              >
                <ImageList
                  sx={{ width: { itemListWidth }, height: "80%" }}
                  cols={matches ? 1 : 3}
                  gap={10}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: { xs: "80%", s: "90%" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "18px" },
                  textAlign: "center",
                }}
              >
                You haven&apos;t made any custom cocktail recipe yet.
                <br />
                <br />
                You can create one or just enjoy browsing our collection of
                recipes.
              </Typography>

              <Image
                src={"/noCocktailToShow.svg"}
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
                  pathname: "/cocktail/create",
                }}
              >
                Create recipe
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Layout>
  );
};

UserCocktails.auth = true;

export default UserCocktails;
