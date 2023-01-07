import theme from "../../src/theme";
import { NextLinkComposed } from "../../src/Link";
import { NavButton } from "./navButton";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        marginTop: "10px",
      }}
    >
      <Toolbar>
        <Box
          component="div"
          sx={{
            flexGrow: 1,
            color: theme.palette.primary.main,
            marginLeft: "20px",
          }}
        >
          <Button
            component={NextLinkComposed}
            to={{
              pathname: "/",
            }}
          >
            <img src="../salut_logo.png" alt="logo" height="40px" />
          </Button>
        </Box>
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
              <Typography
                variant="body"
                sx={{
                  color: theme.palette.primary.contrastText,
                  marginRight: "20px",
                  fontSize: 20,
                  fontFamily: theme.typography.fontFamily[1],
                }}
              >
                Logged in as {session.user.email}
              </Typography>
              <NavButton onClick={() => signOut()}>Sign Out</NavButton>
            </>
          )}
          {status === "unauthenticated" && (
            <>
              <NavButton onClick={() => signIn()}>Sign In</NavButton>
              <NavButton onClick={() => signIn()}>Sign Up</NavButton>
            </>
          )}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
