import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Box,
  Button,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSession } from "next-auth/react";
import CategoryForm from "../../components/category/categoryForm";
import CategoryMenu from "../../components/category/categoryMenu";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

const Favorites = () => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryContents, setCategoryContents] = useState([]);
  const [userId, setUserId] = useState("");
  const { data: session, status } = useSession();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    async function getCocktailList() {
      const response = await axios.get(
        `/api/category?userId=${session.user.id}`
      );
      const { categoryContents, categories, recipes, userId } = response.data;
      setRecipes(recipes);
      setCategories(categories);
      setCategoryContents(categoryContents);
      setUserId(userId);
    }
    getCocktailList();
  }, [session]);

  const categoryList = (categories) => {
    setCategories(categories);
  };

  const filterCocktail = (cocktails) => {
    setRecipes(cocktails);
  };

  // const imagePath = (id) => {
  //   if (id.includes("/public")) {
  //     const newId = id.replace("/public", "");
  //     return newId;
  //   }
  //   return id;
  // };

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
      <CategoryForm
        categories={categories}
        setCategories={categoryList}
        filterCocktail={filterCocktail}
        userId={userId}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ImageList sx={{ width: "100%", height: "80%" }} cols={matches ? 1 : 3}>
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
    </Box>
  );
};
Favorites.auth = true;

export default Favorites;
