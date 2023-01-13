import * as React from 'react';
import { useContext } from "react";
import { Typography, Box, Paper, Button, Divider } from "@mui/material";
import { getIngredients, getInventory } from "../../lib/inventory";
import { getUserId } from "../../lib/user";
import VerticalTabs from "../../components/inventory/verticalTabs";
import { useSession } from "next-auth/react";
import useInventoryData from "../../hooks/useInventoryData";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { inventoryContext } from "../../providers/InventoryProvider";
import { getCocktailsBasedOnInventory } from '../../lib/cocktail';
import { NextLinkComposed } from "../../src/Link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function Inventory(props) {
  const [open, setOpen] = React.useState(false);
  const { categories } = props;
  const { data: session, status } = useSession();
  const { save } = useInventoryData(props.inventory, session.user.id);
  const { inventory } = useContext(inventoryContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Box
      textAlign="center"
      sx={{
        pt: "104px",
        width: "100%",
        display: "flex",
        height: {md: "100vh"},
        backgroundImage: 'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
        flexDirection: {xs: 'column', md: 'row'}
      }}
    >
      <Paper
        sx={{
          width: {md: '40%', sm: '80%', xs: '90%'},
          mx: "auto",
          height: {md: '90%', xs: '80vh'},
        }}
      >
        {/* <Typography>Ingredients</Typography> */}
        <VerticalTabs>{categories}</VerticalTabs>
        <Button
          variant="contained"
          sx={{ mx: "auto", marginTop: '20px', color: '#fff', width: '150px', borderRadius: '20px' }}
          onClick={() => {
            save();
            setOpen(true);
          }}
        >
          Save
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Inventory Saved!"
          action={action}
        />
      </Paper>
      <Paper
        sx={{
          width: {md: '40%', sm: '80%', xs: '90%'},
          mx: "auto",
          height: {md: '90%', xs: '90vh'},
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          my: {xs: '30px', md: 0},
        }}
      >
        <Typography sx={{margin: '20px', fontSize: 'large'}}>
          Your Inventory List
        <Divider sx={{mt: '15px'}} />
        </Typography>
        <Tabs
          orientation="vertical"
          variant="scrollable"
        >
        {inventory.map((item, i) => (
          <Typography key={i}>
            {item}
          </Typography>
        ))}
        </Tabs>
        <Box sx={{my: '15px'}}>
          <Button
            component={NextLinkComposed}
            to={{
              pathname: '/user/cocktails',
            }} 
            variant="contained" 
            sx={{borderRadius: '20px', color: '#fff',}}
          >
            What can I make?
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
Inventory.auth = true;

export async function getServerSideProps(context) {
  const { ingredients, categories } = await getIngredients();
  const sessionToken = context.req.cookies["next-auth.session-token"];
  if (sessionToken) {
    const inventory = await getInventory(getUserId(sessionToken));
    const cocktailId = await getCocktailsBasedOnInventory(inventory);
    return {
      props: {
        ingredients,
        categories,
        inventory,
        cocktailId,
      },
    };
  }
  return { props: {} };
}

export default Inventory;
