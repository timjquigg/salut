import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import Tooltip from "@mui/joy/Tooltip";

const ResultList = (props) => {
  const results = props.drink.map((item) => (
    <ImageListItem key={item.idDrink}>
      <IconButton
        onClick={(event) => console.log("apple")}
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
      >
        <FavoriteBorderIcon
          sx={{
            fontSize: 35,
            color: "disabled",
            fontWeight: 0.5,
          }}
        />
        <FavoriteIcon
          sx={{
            fontSize: 35,
            color: "red",
            fontWeight: 0.5,
          }}
        />
      </IconButton>
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
    </>
  );
};

export default ResultList;
