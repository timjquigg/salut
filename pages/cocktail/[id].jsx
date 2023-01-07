import React from 'react'
import { getCocktailDetails } from '../../lib/details';
import Image from 'next/image';
import Box from '@mui/material/Box';

// export const getStaticPaths = async () => {
//   const res = await fetch('')
//   const data = await res.json();

//   const paths = data.map(cocktail => {
//     return {
//       params: { id: cocktail.id.toString() }
//     }
//   })

//   return {
//     paths: paths,
//     fallback: false
//   }
// }

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

  const cocktailName = props.data.strDrink;
  const thumb = props.data.strDrinkThumb;
  const instructions = props.data.strInstructions;

  const getIngredients = (str) => {
    const output = [];
    const data = props.data
    let ingKeys = Object.keys(data).filter(key => key.includes(str));
    console.log('ingKeys:', ingKeys)
    for (let key of ingKeys) {
      if (data[key] !== null) {
        output.push(data[key])
      }
    }
    return output;
  }

  const ingredients = getIngredients('strIngredient')
  const measurement = getIngredients('strMeasure')

  console.log('keys:', props.data)
  return (
    <Box sx={{ marginTop: '100px'}}>
      <h1>{ cocktailName }</h1>
      <Image 
        src={thumb}
        alt="Picture of the author"
        width={500}
        height={500}
      />
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