import * as React from "react";
import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { getFavorites } from "../../lib/favourite";
<<<<<<< HEAD
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import theme from "../../src/theme";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Favourites = (props) => {
=======
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
>>>>>>> 0eab1e388d4a0621902ac104ebcd1ae559e03410
  const results = props.recipes.map((item) => (
    <ImageListItem key={item.idDrink}>
      <CategoryDeleteButton category={item.Favorite} idDrink={item.idDrink} />
      <CategoryMenu categories={categories} idDrink={item.idDrink} />
      <img
        src={`${item.strDrinkThumb}?w=150&fit=crop`}
        alt={item.strDrink}
        loading="lazy"
      />
      <Link href={`/cocktail/${item.idDrink}`}>
        <ImageListItemBar title={item.strDrink} subtitle={item.strCategory} />
      </Link>
    </ImageListItem>
  ));
  return (
<<<<<<< HEAD
    <Box sx={{ marginTop: "104px" }}>
      <Box
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontFamily: theme.typography.fontFamily[0], fontSize: "40px" }}
        >
          My Favourite Recipes
        </Typography>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <Button variant="outlined" {...bindTrigger(popupState)}>
                categories
              </Button>
              <Menu {...bindMenu(popupState)}>
                <MenuItem onClick={popupState.close}>Category 1</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </Box>
=======
    <Box
      sx={{
        marginTop: "104px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CategoryForm categories={categories} categoryList={categoryList} />
>>>>>>> 0eab1e388d4a0621902ac104ebcd1ae559e03410
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
<<<<<<< HEAD
=======
  const categories = await getAllCategoriesByUser(sessionToken);
  const categoriesArr = categories.map((category) => category.category);
  // const categorySet = new Set(categories.map((category) => category.category));
  const categoryList = [...new Set(categoriesArr)].filter((el) => el);

>>>>>>> 0eab1e388d4a0621902ac104ebcd1ae559e03410
  const recipes = await getFavorites(sessionToken);
  return {
    props: {
      recipes,
<<<<<<< HEAD
=======
      categoryList,
>>>>>>> 0eab1e388d4a0621902ac104ebcd1ae559e03410
    },
  };
}

export default Favourites;
