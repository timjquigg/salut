import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import FavIcon from "./favIcon";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageWithFallback from "../../src/imageWithFallback";

const ResultList = (props) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  let itemListWidth = matches
    ? 400
    : props.drink.length > 3
    ? 1000
    : props.drink.length * 450;

  const errorSize = matches ? 350 : 500;

  const imagePath = (id) => {
    if (id.includes("/public")) {
      const newId = id.replace("/public", "");
      return newId;
    }
    return id;
  };

  let results = props.drink.map((item) => (
    <ImageListItem
      key={item.idDrink}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {props.session && (
        <FavIcon
          addFavorite={() =>
            props.addFavorite(props.session.user.id, item.idDrink)
          }
          removeFavorite={() =>
            props.removeFavorite(props.session.user.id, item.idDrink)
          }
          isFavorite={props.favorites.includes(item.idDrink)}
        />
      )}

      <Link href={`/cocktail/${item.idDrink}`}>
        <ImageWithFallback src={item.strDrinkThumb} alt={item.strDrink} />
      </Link>

      <ImageListItemBar
        title={item.strDrink}
        subtitle={item.strCategory}
        sx={{
          backgroundColor: "rgba(110, 110, 110, 0.8)",
          marginBottom: "6px",
        }}
      />
    </ImageListItem>
  ));

  return (
    <>
      <ImageList
        sx={{ width: { itemListWidth }, height: "70%" }}
        cols={matches ? 1 : 3}
        gap={10}
      >
        {results}
      </ImageList>
    </>
  );
};

export default ResultList;
