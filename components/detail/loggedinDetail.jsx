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
import {
  FavoriteBorder,
  Favorite,
  Facebook,
  Twitter,
} from "@mui/icons-material";
import theme from "../../src/theme";
import CopyToClipboardButton from "../copyUrl";
import CheckBox from "./checkbox";
import MapContainer from "../maps/mapContainer";
import GetLocation from "../maps/getLocation";
import { locationContext } from "../../providers/locationProvider";
import { useLoggedInDetailData } from "../../hooks/useDetailData";

function LoggedinDetail(props) {
  const { showMap } = useContext(locationContext);
  const [selected, setSelected] = useState(props.favoriteId ? true : false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const inventory = props.inventory;
  const {
    strDrink: cocktailName,
    strDrinkThumb: thumb,
    strInstructions: instructions,
  } = props.data;

  const {
    addFavorite,
    removeFavorite,
    addInventory,
    removeInventory,
    getIngredients,
  } = useLoggedInDetailData({ data: props.data });

  const invUppercase = [];
  inventory.map((inv) => invUppercase.push(inv.toUpperCase()));
  const ingredients = getIngredients(props.data, "strIngredient");
  const measurement = getIngredients(props.data, "strMeasure");

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
                    <Favorite sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorder sx={{ color: "red" }} />
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
                <Facebook sx={{ fill: theme.palette.primary.contrastText }} />
              </Button>
              <Button
                title="Share on Twitter"
                href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com"
                target="_blank"
                rel="noreferrer"
              >
                <Twitter sx={{ fill: theme.palette.primary.contrastText }} />
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
