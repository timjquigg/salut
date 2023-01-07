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
  Avatar,
} from "@mui/material";
import StyledAvatar from "./styledAvatar";

function Navbar() {
  const { data: session, status } = useSession();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "black",
        boxShadow: "none",
        paddingTop: "10px",
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
              <NavButton
                onClick={() => signIn(undefined, { callbackUrl: "/user" })}
              >
                Sign In
              </NavButton>
              {/* <NavButton onClick={() => signIn()}>Sign Up</NavButton> */}
            </>
          )}
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
