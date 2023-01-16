import { useContext } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { NextLinkComposed } from "../../src/link";
import { inventoryContext } from "../../providers/InventoryProvider";

const Cocktails = (props) => {
  const { recipes, setNumItemDisplay, dataLength } =
    useContext(inventoryContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  let itemListWidth = matches
    ? 400
    : recipes.length > 3
    ? 1000
    : recipes.length * 450;

  const results = recipes.map((item) => (
    <ImageListItem
      key={item.idDrink}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href={`/cocktail/${item.idDrink}`}>
        <Image
          src={item.strDrinkThumb}
          alt={item.strDrink}
          width={matches ? "340" : "380"}
          height={matches ? "360" : "430"}
          quality={35}
          object-fit="cover"
          position="relative"
        />
      </Link>

      <ImageListItemBar
        title={item.strDrink}
        subtitle={item.strCategory}
        sx={{ marginBottom: "6px" }}
      />
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
      <Typography
        sx={{
          fontSize: { sm: "30px", xs: "25px" },
          fontFamily: theme.typography.fontFamily[0],
          color: "#022140",
          margin: "10px",
        }}
      >
        Cocktails You Can Make
      </Typography>

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {results.length > 0 ? (
          <>
            <Typography
              sx={{
                marginBottom: "50px",
                m: { xs: 2 },
                fontSize: { xs: "15px", sm: "18px" },
                textAlign: "center",
              }}
            >
              Here are all the cocktails you can make with what you have in your
              inventory.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ImageList
                sx={{ width: { itemListWidth }, height: "80%" }}
                cols={matches ? 1 : 3}
              >
                {results}
              </ImageList>
            </Box>
            {recipes.length < dataLength ? (
              <Button
                variant="outlined"
                size="medium"
                onClick={() => {
                  setNumItemDisplay((prev) => prev + 12);
                }}
              >
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
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: { xs: "80%", s: "90%" },
            }}
          >
            <Typography
              sx={{ fontSize: { xs: "15px", sm: "18px" }, textAlign: "center" }}
            >
              You don&apos;t have enough items in your inventory to make any
              cocktail at the moment.
              <br />
              <br />
              Please update your inventory, or go to the closest liquor store!
            </Typography>

            <Image
              src={"/noCocktailToShow.svg"}
              alt="No Cocktails"
              width={matches ? 400 : 500}
              height={matches ? 400 : 500}
            />
            <Button
              variant="outlined"
              size="medium"
              sx={{ m: 2 }}
              component={NextLinkComposed}
              to={{
                pathname: "/user/inventory",
              }}
            >
              Go to inventory
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

Cocktails.auth = true;

export default Cocktails;
