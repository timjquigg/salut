import { getCocktail } from "../../lib/search";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Box from "@mui/material/Box";

const result = (props) => {
  console.log(props);

  const DUMMY = [
    props.drink[0],
    props.drink[1],
    props.drink[2],
    props.drink[3],
    props.drink[4],
    props.drink[5],
  ];
  return (
    <>
      <Box
        noValidate
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          mt: 8,
          position: "relative",
        }}
      >
        <ImageList sx={{ width: 1000, height: 1000, mt: "104px" }} cols={3}>
          {DUMMY.map((item) => (
            <ImageListItem key={item.idDrink}>
              <img
                src={`${item.strDrinkThumb}?w=150&fit=crop&auto=format`}
                // srcSet={`${item.strDrinkThumb}?w=150&fit=crop&auto=format&dpr=2 2x`}
                alt={item.strDrink}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.strDrink}
                subtitle={item.strCategory}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    <FavoriteIcon />
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const keyword = context.query.keyword;
  const data = await getCocktail(keyword);
  return {
    props: {
      drink: data,
    },
  };
}
export default result;
