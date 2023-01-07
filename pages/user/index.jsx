import React from 'react'
import { Box } from '@mui/material'
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { getRandomCocktails } from '../../lib/carousel'
import Image from 'next/image'
import { NextLinkComposed } from "../../src/Link";
import Typography from '@mui/material/Typography'

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
  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h2>{props.item.strDrink}</h2>
      {/* <p>{props.item.description}</p> */}
      <Image 
        src={props.item.strDrinkThumb}
        alt="Picture of the author"
        width={500}
        height={500}
      />

      <Button className="CheckButton">
          See the recipe
      </Button>
    </Paper>
  )
}

function User(props) {
  // console.log(props.data)
  let items = props.data;
  return (
    <Box sx={{marginTop: '104px'}}>
      <Box sx={{display: 'flex'}}>
        <Button
          component={NextLinkComposed}
          to={{
            pathname: "/user/inventory",
          }}
          variant="contained"
          // startIcon={}
          sx={{margin: '20px'}}
        >
          Go to your Inventory
        </Button>
        <Button
          component={NextLinkComposed}
          to={{
            pathname: "/user/favorites",
          }}
          variant="contained"
          // startIcon={}
          sx={{margin: '20px'}}
        >
          View your favourites
        </Button>
      </Box>

      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Box sx={{textAlign: 'center', width: '60vw'}}>
          <Typography sx={{fontSize: '25px', fontWeight: 'bold'}}>Cocktails of the day</Typography>
          <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
          </Carousel>
        </Box>
      </Box>
    </Box>
  )
}

export default User