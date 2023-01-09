import * as React from "react";
import { useState } from "react";
import { getCocktailDetails } from "../../lib/details";
import { getFavoriteId } from "../../lib/favourite";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

import ToggleButton from '@mui/material/ToggleButton';
import theme from "../../src/theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import CopyToClipboardButton from "../../components/copyUrl";
import AddIcon from '@mui/icons-material/Add';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


export async function getServerSideProps(context) {
  const cocktailId = context.query.id;
  const sessionToken = context.req.cookies["next-auth.session-token"];
  const data = await getCocktailDetails(cocktailId);
  const favoriteId = await getFavoriteId(sessionToken, cocktailId);
  console.log(context.req.cookies["next-auth.session-token"]);
  return {
    props: {
      data,
      favoriteId,
    },
  };
}

function Details(props) {
  const [selected, setSelected] = useState(props.favoriteId ? true : false);
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log('id:', router.query.id)

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

  const addFavorite = async (userId, cocktailId) => {
    const response = await fetch("/api/postFavourite", {
      method: "POST",
      body: JSON.stringify({ userId: userId, cocktailId: cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const removeFavorite = async (userId, cocktailId) => {
    const response = await fetch("/api/removeFavourite", {
      method: "DELETE",
      body: JSON.stringify({ userId: userId, cocktailId: cocktailId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  // console.log(props.data)
  // mini squares https://www.transparenttextures.com/patterns/grid-me.png
  // rocky wall https://www.transparenttextures.com/patterns/rocky-wall.png
  // splash https://www.transparenttextures.com/patterns/stardust.png
  return (

    <Box sx={{minHeight: '100vh', backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")', paddingTop: '10vh' }}>
      <Box sx={{
        color: theme.palette.primary.contrastText,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'start', 
        gap: '5vw', 
        marginLeft: '5vw', 
        marginRight: '5vw', 
        paddingLeft: '5vw', 
        paddingRight: '5vw', 
        paddingTop: '10vh',
        paddingBottom: '5vh',
        border: '5px double #C8963E',
      }}>
        
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          <Image 
            src={thumb}
            alt="Picture of the author"
            width={500}
            height={500}
            layout="responsive"
          />
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <Button variant="outlined" {...bindTrigger(popupState)} sx={{width: '200px'}}>
                  add category
                  <AddIcon />
                </Button>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={popupState.close}>Category 1</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </Box>
        <Box sx={{width:'100%', height: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start'}}>
          <Box sx={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <Typography sx={{fontFamily: theme.typography.fontFamily[0], fontSize: '40px'}}>{ cocktailName }</Typography>
            {status === "authenticated" && (
              <Box>
                <ToggleButton
                  color='primary'
                  value="check"
                  selected={selected}
                  onChange={() => {
                  setSelected(!selected);
                  }}
                  onClick={() => {
                    if (!selected) {
                      addFavorite(session.user.id, router.query.id)
                    } else {
                      removeFavorite(session.user.id, router.query.id)
                    }
                  }}
                >
                  {selected ? (
                    <Favorite sx={{ color: "red" }}/>
                  ) : (
                    <FavoriteBorder sx={{ color: "red" }}/>
                  )}
                </ToggleButton>
              </Box>
            )}
          </Box>
          <Box sx={{marginTop: '2rem'}}>
            <Typography sx={{fontWeight: 'bold', fontSize: '1rem'}}>Ingredients</Typography>
            <Box sx={{ display: 'flex', gap: '10px'}}>
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
          <Box sx={{marginTop: '1rem'}}>
            <Typography sx={{fontWeight: 'bold', fontSize: '1rem'}}>Directions</Typography>
            <p>{instructions}</p>
          </Box>
          <Box sx={{display: 'flex'}}>
            <CopyToClipboardButton />
            <Button title="Share on facebook"
                    href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com" target="_blank"
                    rel="noreferrer"
                    >
              <FacebookIcon sx={{fill: theme.palette.primary.contrastText}}/>
            </Button>
            <Button title="Share on Twitter"
                    href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com" target="_blank"
                    rel="noreferrer"
                    >
              <TwitterIcon sx={{fill: theme.palette.primary.contrastText}}/>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Details;
