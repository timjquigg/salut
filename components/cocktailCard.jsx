import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { NextLinkComposed } from '../src/Link';

export default function CocktailCard(props) {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          image={props.cocktailImage}
          alt=""
        />
        <CardContent sx={{minHeight: 150}}>
          <Typography gutterBottom variant="h5" component="div">
            {props.cocktailName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.instructions}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
        <Button 
          size="small" 
          color="primary" 
          component={NextLinkComposed} 
          to={{
            pathname: `/cocktail/${props.cocktailId}`,
          }}>
          View recipe
        </Button>
      </CardActions>
    </Card>
  );
}