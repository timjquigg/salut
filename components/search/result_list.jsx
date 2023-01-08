import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import FavIcon from "./favButton";

const ResultList = (props) => {
  console.log(props);
  let results = props.drink.slice(0, props.itemDisplay).map((item) => (
    <ImageListItem key={item.idDrink}>
      <FavIcon
        addFavorite={(event) =>
          props.addFavorite(props.session.user.id, item.idDrink)
        }
        removeFavorite={(event) =>
          props.removeFavorite(props.session.user.id, item.idDrink)
        }
        isFavorite={props.favorites.includes(item.idDrink)}
      />
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
    <>
      <ImageList sx={{ width: 1000, height: 1000 }} cols={3}>
        {results}
      </ImageList>
      {props.drink.length > 13 ? (
        <Button variant="outlined" size="medium" onClick={props.seeMoreHandler}>
          See More
        </Button>
      ) : (
        ""
      )}
    </>
  );
};

export default ResultList;
