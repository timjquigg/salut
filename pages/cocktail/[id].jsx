import { useState } from "react";
import { getCocktailDetails } from "../../lib/details";
import { getFavoriteId } from "../../lib/favourite";
import Image from "next/image";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import ToggleButton from '@mui/material/ToggleButton';

export async function getServerSideProps(context) {
  const cocktailId = context.query.id;
  const sessionToken = context.req.cookies['next-auth.session-token']
  const data = await getCocktailDetails(cocktailId);
  const favoriteId = await getFavoriteId(sessionToken, cocktailId)
  console.log(context.req.cookies['next-auth.session-token'])
  return {
    props: {
      data,
      favoriteId
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
  return (
    <Box sx={{ marginTop: '104px'}}>
      <h1>{ cocktailName }</h1>
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
            <FavoriteBorder />
          </ToggleButton>
        </Box>
      )}
      <Image 
        src={thumb}
        alt="Picture of the author"
        width={500}
        height={500}
      />
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

      <p>{instructions}</p>
    </Box>
  );
}

export default Details;
