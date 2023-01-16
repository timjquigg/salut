import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Layout from "../../components/layout";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { LocalBar } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import CategoryForm from "../../components/category/categoryForm";
import CategoryMenu from "../../components/category/categoryMenu";
import fetcher from "../../lib/fetcher";
import useSWR from "swr";
import { NextLinkComposed } from "../../src/link";

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryContents, setCategoryContents] = useState([]);
  const [userId, setUserId] = useState("");
  const { data: session, status } = useSession();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const { data, error, isLoading, isValidating } = useSWR(
    `/api/category?userId=${session.user.id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      const { categoryContents, categories, recipes, userId } = data;
      setRecipes(recipes);
      setCategories(categories);
      setCategoryContents(categoryContents);
      setUserId(userId);
    }
  }, [data, session]);

  const categoryList = (categories) => {
    setCategories(categories);
  };

  const filterCocktail = (cocktails) => {
    setRecipes(cocktails);
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
        <Image
          src={item.strDrinkThumb}
          alt={item.strDrink}
          width={matches ? "351" : "435"}
          height={matches ? "375" : "450"}
          object-fit="cover"
          position="relative"
        />
      </Link>
      <CategoryMenu
        categories={categories}
        favId={item.favId}
        userId={item.userId}
        categoryContents={categoryContents}
      />
      <ImageListItemBar
        title={item.strDrink}
        subtitle={item.strCategory}
        sx={{
          marginBottom: "6px",
        }}
      />
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
          Your Favorite Recipes
        </Typography>
        {recipes.length > 0 ? (
          <>
            <CategoryForm
              categories={categories}
              setCategories={categoryList}
              filterCocktail={filterCocktail}
              userId={userId}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ImageList
                sx={{ width: "100%", height: "80%" }}
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
                sx={{ fontSize: { xs: "15px", sm: "18px" }, textAlign: "center" }}
              >
                You haven&apos;t added any recipes to your favorites.
                <br />
                <br />
                Please search for recipes first and add to your favorites! 
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
                  pathname: "/search",
                }}
              >
                Search for recipes
              </Button>
            </Box>
        )}
      </Box>
    </Layout>
  );
};
Favorites.auth = true;

export default Favorites;
