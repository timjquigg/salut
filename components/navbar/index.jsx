import * as React from 'react';
import theme from "../../src/theme";
import { NextLinkComposed } from "../../src/Link";
import { NavButton } from "./navButton";
import { useSession, signIn } from "next-auth/react";
import { Box, AppBar, Toolbar, Button, ButtonGroup } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import StyledAvatar from "./styledAvatar";
import { signOut } from "next-auth/react";

const drawerWidth = 240;

function Navbar(props) {
  const { data: session, status } = useSession();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <img src="../salut_logo.png" alt="logo" height="60px" />
      </Typography>
      <Divider />
      <List>
          <ListItem key={'SearchCocktails'} disablePadding>
            <ListItemButton 
              sx={{ textAlign: 'center' }} 
              component={NextLinkComposed}
              to={{
                pathname: "/search",
              }}
            >
              <ListItemText primary={'SEARCH COCKTAILS'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'about'} disablePadding>
            <ListItemButton 
              sx={{ textAlign: 'center' }} 
              component={NextLinkComposed}
              to={{
                pathname: "/about",
              }}
            >
              <ListItemText primary={'ABOUT'} />
            </ListItemButton>
          </ListItem>
          {status === "authenticated" && (
            <>
            <Divider />
            <ListItem key={'Dashboard'} disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                component={NextLinkComposed}
                to={{
                  pathname: "/user",
                }}
              >
                <ListItemText primary={'DASHBOARD'} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'Inventory'} disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                component={NextLinkComposed}
                to={{
                  pathname: "/user/inventory",
                }}
              >
                <ListItemText primary={'INVENTORY'} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'Favorites'} disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                component={NextLinkComposed}
                to={{
                  pathname: "/user/favorites",
                }}
              >
                <ListItemText primary={'FAVORITES'} />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem key={'signout'} disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <ListItemText primary={'SIGN OUT'} />
              </ListItemButton>
            </ListItem>
            </>
          )}
          {status === "unauthenticated" && (
          <>
            <ListItem key={'signin'} disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                component={NextLinkComposed}
                to={{
                  pathname: "/auth/signin",
                }}
              >
                <ListItemText primary={'SIGN IN'} />
              </ListItemButton>
            </ListItem>
            <ListItem key={'signup'} disablePadding>
              <ListItemButton 
                sx={{ textAlign: 'center' }} 
                component={NextLinkComposed}
                to={{
                  pathname: "/auth/signup",
                }}
              >
                <ListItemText primary={'SIGN UP'} />
              </ListItemButton>
            </ListItem>
          </>
          )}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          paddingTop: "10px",
        }}
      >
        <Toolbar>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              // color: theme.palette.primary.main,
              marginLeft: {sm: '20px'},
            }}
          >
            <Button
              component={NextLinkComposed}
              to={{
                pathname: "/",
              }}
            >
              <img src="../salut_logo.png" alt="logo" height="60px" />
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <ButtonGroup
            variant="string"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <NavButton component={NextLinkComposed} path="/search">
              SEARCH COCKTAILS
            </NavButton>
            <NavButton component={NextLinkComposed} path="/about">
              ABOUT
            </NavButton>
            {status === "authenticated" && (
              <>
                <StyledAvatar
                  component={NextLinkComposed}
                  path="/user"
                  name={session.user.name}
                  image={session.user.image}
                />
              </>
            )}
            {status === "unauthenticated" && (
              <>
                <NavButton component={NextLinkComposed} path="/auth/signin">
                  Sign In
                </NavButton>
                <NavButton component={NextLinkComposed} path="/auth/signup">
                  Sign Up
                </NavButton>
              </>
            )}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Navbar;
