import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Box, Skeleton, Typography } from "@mui/material";
import CategoryForm from "../../components/category/categoryForm";
import CategoryMenu from "../../components/category/categoryMenu";
import { getFavorites, getUserId } from "../../lib/favorite";
import { getAllCategoriesByUser } from "../../lib/category";

function Favorites(props) {
  // console.log(props.recipes);
  const [categories, setCategories] = useState(props.categories);
  const categoryList = (categories) => {
    setCategories(categories);
  };

  // console.log(props.recipes);
  const imagePath = (id) => {
    if (id.includes("/public")) {
      const newId = id.replace("/public", "");
      return newId;
    }
    return id;
  };
  const results = props.recipes.map((item) => (
    <ImageListItem key={item.idDrink}>
      {/* <CategoryDeleteButton category={item.Favorite} idDrink={item.idDrink} /> */}
      <CategoryMenu
        categories={categories}
        favId={item.favId}
        userId={item.userId}
      />
      <img
        src={`${imagePath(item.strDrinkThumb)}?w=150&fit=crop`}
        alt={item.strDrink}
        loading="lazy"
      />
      <Link href={`/cocktail/${item.idDrink}`}>
        <ImageListItemBar title={item.strDrink} subtitle={item.strCategory} />
      </Link>
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
      {/* <MultipleSelectCheckmarks categories={categories} /> */}
      <CategoryForm
        categories={categories}
        setCategories={categoryList}
        userId={props.userId}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ImageList sx={{ width: 1000, height: 1000 }} cols={3}>
          {results}
        </ImageList>
      </Box>
    </Box>
  );
}
Favorites.auth = true;

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  if (sessionToken) {
    const userId = await getUserId(sessionToken);
    const categoriesByUser = await getAllCategoriesByUser(sessionToken);
    const recipes = await getFavorites(sessionToken);
    const categories = categoriesByUser.map((el) => el.name);
    return {
      props: {
        recipes,
        userId,
        categories,
        categoriesByUser,
      },
    };
  }
  return { props: {} };
}

export default Favorites;
