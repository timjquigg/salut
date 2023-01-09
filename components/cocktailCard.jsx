import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NextLinkComposed } from '../src/Link';

export default function CocktailCard(props) {
  return (
    <Card sx={{margin: '30px', boxShadow: 'none'}}>
      <Button 
        component={NextLinkComposed} 
        to={{
          pathname: `/cocktail/${props.cocktailId}`,
        }}
      >
        <CardMedia
          component="img"
          height="500"
          image={props.cocktailImage}
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