import * as React from 'react';
import { useContext } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { getIngredients, getInventory } from "../../lib/inventory";
import { getUserId } from "../../lib/user";
import VerticalTabs from "../../components/inventory/verticalTabs";
import { useSession } from "next-auth/react";
import useInventoryData from "../../hooks/useInventoryData";
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { inventoryContext } from "../../providers/InventoryProvider";


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
        mt: "104px",
        width: "100%",
        display: "flex",
        height: "80vh",
      }}
    >
      <Paper
        sx={{
          width: '40%',
          mx: "auto",
          height: "100%",
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
          width: '40%',
          mx: "auto",
          height: "100%",
        }}
      >
        <Typography sx={{margin: '20px', fontSize: 'large'}}>
          Your Inventory List
        </Typography>
        <Box>
        {inventory.map((item, i) => (
          <Typography key={i}>
            {item}
          </Typography>
        ))}
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
    return {
      props: {
        ingredients,
        categories,
        inventory,
      },
    };
  }
  return { props: {} };
}

export default Inventory;
