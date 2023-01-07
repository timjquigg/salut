import React from 'react'
import { Box } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { getRandomCocktails } from '../../lib/carousel'
import Image from 'next/image'

export async function getServerSideProps(context) {
  const data = await getRandomCocktails();
  return {
    props: {
      data,
    },
  };
}

function Item(props)
{
  console.log(props)
  return (
    <Paper>
      <h2>{props.item.strDrink}</h2>
      {/* <p>{props.item.description}</p> */}
      <Image 
        src={props.item.strDrinkThumb}
        alt="Picture of the author"
        width={500}
        height={500}
      />

      <Button className="CheckButton">
          Check it out!
      </Button>
    </Paper>
  )
}

function User(props) {
  console.log(props.data)
  var items = props.data;
  return (
    <Box sx={{marginTop: '200px'}}>
      <Carousel>
        {
            items.map( (item, i) => <Item key={i} item={item} /> )
        }
      </Carousel>
    </Box>
  )
}

export default User