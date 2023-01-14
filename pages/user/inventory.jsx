import { useState } from "react";
import { useContext } from "react";
import { Typography, Box, Paper, Button, Divider } from "@mui/material";
import { getIngredients, getInventory } from "../../lib/inventory";
import { getUserId } from "../../lib/user";
import VerticalTabs from "../../components/inventory/verticalTabs";
import { useSession } from "next-auth/react";
import useInventoryData from "../../hooks/useInventoryData";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { inventoryContext } from "../../providers/InventoryProvider";
import { NextLinkComposed } from "../../src/link";
import Tabs from "@mui/material/Tabs";
import theme from "../../src/theme";

function Inventory(props) {
  const [open, setOpen] = useState(false);
  const { categories } = props;
  const { data: session, status } = useSession();
  const { save } = useInventoryData(props.inventory, session.user.id);
  const { inventory } = useContext(inventoryContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Box
      textAlign="center"
      sx={{
        pt: "90px",
        width: "100%",
        display: "flex",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
        flexDirection: "column",
      }}
    >
      <Typography
        sx={{
          fontSize: { sm: "30px", xs: "25px" },
          fontFamily: theme.typography.fontFamily[0],
          color: "#022140",
          margin: "10px",
        }}
      >
        Your Inventory
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          height: { md: "85vh" },
        }}
      >
        <Paper
          sx={{
            width: { md: "40%", sm: "80%", xs: "90%" },
            mx: "auto",
            height: { md: "90%", xs: "80vh" },
          }}
        >
          <VerticalTabs>{categories}</VerticalTabs>
          <Button
            variant="contained"
            sx={{
              mx: "auto",
              marginTop: "20px",
              color: "#fff",
              width: "150px",
              borderRadius: "20px",
            }}
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
            width: { md: "40%", sm: "80%", xs: "90%" },
            mx: "auto",
            height: { md: "90%", xs: "90vh" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            my: { xs: "30px", md: 0 },
          }}
        >
          <Typography sx={{ margin: "20px", fontSize: "large" }}>
            Your Inventory List
            <Divider sx={{ mt: "15px" }} />
          </Typography>
          <Tabs orientation="vertical" variant="scrollable">
            {inventory.map((item, i) => (
              <Typography key={i}>{item}</Typography>
            ))}
          </Tabs>
          <Box sx={{ my: "15px" }}>
            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/user/cocktails",
              }}
              variant="contained"
              sx={{ borderRadius: "20px", color: "#fff" }}
            >
              What can I make?
            </Button>
          </Box>
        </Paper>
      </Box>
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
