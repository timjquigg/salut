import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Button } from "@mui/material";
import FavIcon from "./favIcon";
import Image from "next/image";
import Tooltip from "@mui/material/Tooltip";

const ResultList = (props) => {
  console.log(props);
  let results = props.drink.slice(0, props.itemDisplay).map((item) => (
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
          addFavorite={(event) =>
            props.addFavorite(props.session.user.id, item.idDrink)
          }
          removeFavorite={(event) =>
            props.removeFavorite(props.session.user.id, item.idDrink)
          }
          isFavorite={props.favorites.includes(item.idDrink)}
        />
      )}
      <Image
        src={`${item.strDrinkThumb}`}
        alt={item.strDrink}
        width="435"
        height="450"
        object-fit="cover"
        position="relative"
      />
      <Link href={`/cocktail/${item.idDrink}`}>
        <ImageListItemBar title={item.strDrink} subtitle={item.strCategory} />
      </Link>
    </ImageListItem>
  ));

  return (
    <>
      <p>{`Displaying ${
        props.itemDisplay < props.drink.length
          ? props.itemDisplay
          : props.drink.length
      } out of ${props.drink.length} Results`}</p>
      <ImageList
        sx={{
          width: props.drink.length > 3 ? 1375 : props.drink.length * 450,
          height: props.drink.length > 3 ? 1000 : 470,

          p: 3,
        }}
        cols={3}
        gap={10}
      >
        {results}
      </ImageList>
      {props.drink.length > props.itemDisplay ? (
        <Button variant="outlined" size="medium" onClick={props.seeMoreHandler}>
          See More
        </Button>
      ) : (
        ""
      )}
      <Button
        variant="outlined"
        size="medium"
        sx={{ m: 2 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </Button>
    </>
  );
};

export default ResultList;
