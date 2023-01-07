import React from 'react'
import { getCocktailDetails } from '../../lib/details';
import Image from 'next/image';
import Box from '@mui/material/Box';
import { useSession } from 'next-auth/react';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';


export async function getServerSideProps(context) {
  const id = context.query.id;
  const data = await getCocktailDetails(id);
  return {
    props: {
      data,
    },
  };
}



function Details(props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  // console.log('id:', router.query.id)

  const cocktailName = props.data.strDrink;
  const thumb = props.data.strDrinkThumb;
  const instructions = props.data.strInstructions;

  const getIngredients = (str) => {
    const output = [];
    const data = props.data
    let ingKeys = Object.keys(data).filter(key => key.includes(str));
    
    for (let key of ingKeys) {
      if (data[key] !== null) {
        output.push(data[key])
      }
    }
    return output;
  }

  const ingredients = getIngredients('strIngredient')
  const measurement = getIngredients('strMeasure')

  const addFavorite = async (userId, cocktailId) => {
    const response = await fetch('/api/postFavourite', {
      method: "POST",
      body: [userId, cocktailId]
    })
  }

  // console.log(props.data)
  return (
    <Box sx={{ marginTop: '104px'}}>
      <h1>{ cocktailName }</h1>
      <Image 
        src={thumb}
        alt="Picture of the author"
        width={500}
        height={500}
      />
      {status === "authenticated" && (
      <Box>
        <Button variant="contained" startIcon={<FavoriteBorder />} onClick={() => addFavorite(session.user.id, router.query.id)}>Favorite</Button>
      </Box>
      )}
      <Box sx={{ display: 'flex', gap: '10px'}}>
        <Box>
          {ingredients.map(ingredient => (
            <p key={ingredient}>{ingredient}</p>
          ))}
        </Box>
        <Box>
          {measurement.map(m => (
            <p key={m}>{m}</p>
          ))}
        </Box>
      </Box>

      <p>{ instructions }</p>
    </Box>
  )
}

export default Details