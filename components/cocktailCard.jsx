import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NextLinkComposed } from '../src/Link';

export default function CocktailCard(props) {
  // console.log(props.cocktailImage)
  const imagePath = id => {
    if (id.includes('/public')) {
      const newId = id.replace('/public', '')
      return newId;
    }
    return id
  }
  // console.log('did this work?:', imagePath(props.cocktailImage))
  return (
    <Card sx={{margin: '10px', boxShadow: 'none'}}>
      <Button 
        component={NextLinkComposed} 
        to={{
          pathname: `/cocktail/${props.cocktailId}`,
        }}
      >
        <CardMedia
          component="img"
          height="300"
          src={imagePath(props.cocktailImage)}
          alt=""
          sx={{borderRadius: '5px'}}
        />
      </Button>
      <CardContent sx={{display: 'flex', justifyContent: 'center', background: 'transparent', }}>       
        <Typography component="div" sx={{color: "#022140"}}>
          {props.cocktailName}
        </Typography>
      </CardContent>
    </Card>
  );
}