// import * as React from "react";
import { useState, useContext } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Button,
  Typography,
  ToggleButton,
  Box,
  Chip,
  Stack,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import theme from "../../src/theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyToClipboardButton from "../copyUrl";
import CheckBox from "./checkbox";
import MapContainer from "../maps/mapContainer";
import GetLocation from "../maps/getLocation";
import { locationContext } from "../../providers/locationProvider";

import useDetailData from "../../hooks/useDetailData";
// import { inventoryContext } from "../../providers/InventoryProvider";

function LoggedinDetail(props) {
  const { showMap } = useContext(locationContext);
  const [selected, setSelected] = useState(props.favoriteId ? true : false);
  // const { inventory, updateInventory } = useContext(inventoryContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log('id:', router.query.id)
  const inventory = props.inventory;
  // console.log(inventory);

  const cocktailName = props.data.strDrink;
  const thumb = props.data.strDrinkThumb;
  const instructions = props.data.strInstructions;

  const getIngredients = (str) => {
    const output = [];
    const data = props.data;
    let ingKeys = Object.keys(data).filter((key) => key.includes(str));

    for (let key of ingKeys) {
      if (data[key] !== null) {
        output.push(data[key]);
      }
    }
    return output;
  };

  const ingredients = getIngredients("strIngredient");
  const measurement = getIngredients("strMeasure");

  const invUppercase = [];
  inventory.map((inv) => invUppercase.push(inv.toUpperCase()));

  // inventory.map((inv) => invUppercase.push(inv.toUpperCase()));

  const { addFavorite, removeFavorite, addInventory, removeInventory } =
    useDetailData();

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
          paddingTop: "10vh",
        }}
      >
        <Box
          sx={{
            color: theme.palette.primary.contrastText,
            display: "flex",
            justifyContent: "center",
            alignItems: "start",
            gap: "5vw",
            marginLeft: "5vw",
            marginRight: "5vw",
            paddingLeft: "5vw",
            paddingRight: "5vw",
            paddingTop: "10vh",
            paddingBottom: "5vh",
            border: "5px double #C8963E",
          }}
        >
          <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
            <Image
              src={thumb}
              alt="Picture of the author"
              width={500}
              height={500}
              layout="responsive"
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "start",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Typography
                sx={{
                  fontFamily: theme.typography.fontFamily[0],
                  fontSize: "40px",
                }}
              >
                {cocktailName}
              </Typography>

              <Box>
                <ToggleButton
                  color="primary"
                  value="check"
                  selected={selected}
                  onChange={() => {
                    setSelected(!selected);
                  }}
                  onClick={() => {
                    if (!selected) {
                      addFavorite(session.user.id, router.query.id);
                    } else {
                      removeFavorite(session.user.id, router.query.id);
                    }
                  }}
                >
                  {selected ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "red" }} />
                  )}
                </ToggleButton>
              </Box>
            </Box>

            <Box sx={{ display: "flex" }}>
              <Stack direction="row" spacing={1}>
                {props.categories.map((category) => {
                  return (
                    <Chip
                      key={category}
                      label={category}
                      sx={{
                        border: "solid",
                        borderWidth: "thin",
                        backgroundColor: "rgba(200,150,62,0.7)",
                      }}
                    />
                  );
                })}
              </Stack>
            </Box>

            <Box sx={{ marginTop: "2rem", display: "flex", gap: 5 }}>
              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Ingredients
                </Typography>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Box>
                    {ingredients.map((ingredient, i) => (
                      <p key={i}>{ingredient}</p>
                    ))}
                  </Box>
                  <Box>
                    {measurement.map((m, i) => (
                      <p key={i}>{m}</p>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Box>
                <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Your Inventory
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginTop: "0.1rem",
                    alignItems: "center",
                  }}
                >
                  {ingredients.map((ingredient, i) => (
                    <CheckBox
                      key={i}
                      isInventory={invUppercase.includes(
                        ingredient.toUpperCase()
                      )}
                      addInventory={() =>
                        addInventory(session.user.id, ingredient)
                      }
                      removeInventory={() =>
                        removeInventory(session.user.id, ingredient)
                      }
                    />
                  ))}
                </Box>
              </Box>
            </Box>
            <Box sx={{ marginTop: "1rem" }}>
              <Typography sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                Directions
              </Typography>
              <p>{instructions}</p>
            </Box>
            <Box sx={{ display: "flex" }}>
              <CopyToClipboardButton />
              <Button
                title="Share on facebook"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com"
                target="_blank"
                rel="noreferrer"
              >
                <FacebookIcon
                  sx={{ fill: theme.palette.primary.contrastText }}
                />
              </Button>
              <Button
                title="Share on Twitter"
                href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com"
                target="_blank"
                rel="noreferrer"
              >
                <TwitterIcon
                  sx={{ fill: theme.palette.primary.contrastText }}
                />
              </Button>
            </Box>
            <GetLocation />
          </Box>
        </Box>
        {showMap && <MapContainer />}
      </Box>
    </>
  );
}

export default LoggedinDetail;
