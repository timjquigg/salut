import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { getFavorites } from "../../lib/favourite";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import theme from "../../src/theme";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Favourites = (props) => {

  const results = props.recipes.map((item) => (
    <ImageListItem key={item.idDrink}>
      <IconButton
        onClick={(event) => console.log("apple")}
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
      >
        <FavoriteBorderIcon
          sx={{
            fontSize: 35,
            color: "disabled",
            fontWeight: 0.5,
          }}
        />
      </IconButton>
      <img
        src={`${item.strDrinkThumb}?w=150&fit=crop`}
        alt={item.strDrink}
        loading="lazy"
      />
      <Link href={`/cocktail/${item.idDrink}`}>
        <ImageListItemBar title={item.strDrink} subtitle={item.strCategory} />
      </Link>
    </ImageListItem>
  ));
  return (
    <Box sx={{marginTop: '104px'}}>
      <Box sx={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Typography sx={{fontFamily: theme.typography.fontFamily[0], fontSize: '40px'}}>My Favourite Recipes</Typography>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <Button variant="outlined" {...bindTrigger(popupState)}>
              categories
            </Button>
            <Menu {...bindMenu(popupState)}>
              <MenuItem onClick={popupState.close}>Category 1</MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <ImageList sx={{ width: 1000, height: 1000, }} cols={3} >
          {results}
        </ImageList>
      </Box>
    </ Box>
  );
};

export async function getServerSideProps(context) {
  const sessionToken = context.req.cookies['next-auth.session-token']
  const recipes = await getFavorites(sessionToken);
  return {
    props: {
      recipes
    },
  };
}

export default Favourites;
