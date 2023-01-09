import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { getFavorites } from "../../lib/favourite";
import { getAllCategoriesByUser } from "../../lib/category";
import CategoryForm from "../../components/category/category_form";
import CategoryMenu from "../../components/category/category_menu";
import CategoryDeleteButton from "../../components/category/category_delete";

const Favourites = (props) => {
  const [categories, setCategories] = useState(props.categoryList);
  const categoryList = (categories) => {
    setCategories(categories);
    console.log("categories on favorites", categories);
  };
  // console.log(props.recipes);
  const imagePath = id => {
    if (id.includes('/public')) {
      const newId = id.replace('/public', '')
      return newId;
    }
    return id
  }
  const results = props.recipes.map((item) => (
    <ImageListItem key={item.idDrink}>
      <CategoryDeleteButton category={item.Favorite} idDrink={item.idDrink} />
      <CategoryMenu categories={categories} idDrink={item.idDrink} />
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
      <CategoryForm categories={categories} categoryList={categoryList} />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ImageList sx={{ width: 1000, height: 1000 }} cols={3}>
          {results}
        </ImageList>
      </Box>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const categories = await getAllCategoriesByUser(sessionToken);
  const categoriesArr = categories.map((category) => category.category);
  // const categorySet = new Set(categories.map((category) => category.category));
  const categoryList = [...new Set(categoriesArr)].filter((el) => el);

  const recipes = await getFavorites(sessionToken);
  return {
    props: {
      recipes,
      categoryList,
    },
  };
}

export default Favourites;
