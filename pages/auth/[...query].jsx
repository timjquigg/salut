import { signIn, getProviders } from "next-auth/react";
import {
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from "@mui/material";
import { useRouter } from "next/router";
import { Stack } from "@mui/system";
import Layout from "../../components/layout";
import Image from "next/image";
import theme from "../../src/theme";
import { Fragment, useState } from "react";

const Signin = ({ providers, query }) => {
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");

  const clickHandler = async (provider, email = null) => {
    console.log(provider);
    console.log(email);
    await signIn(provider, { email, callbackUrl: "/user" });
  };

  const emailClickHandler = () => {
    setShowEmail(true);
  };

  const handleChange = (value) => {
    setEmail(value);
  };

  const providerButtons = Object.values(providers).map((provider) => {
    return (
      <Fragment key={provider.id}>
        <Button
          key={provider.id}
          onClick={
            provider.name === "Email"
              ? () => emailClickHandler()
              : () => clickHandler(provider.id)
          }
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            width: { xs: "70%", sm: "100%" },
            "&:hover": {
              background: "#DCDCDC",
            },
          }}
        >
          <Box sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            {provider.name === "Google" && (
              <Image
                src="https://authjs.dev/img/providers/google.svg"
                width="30"
                height="30"
                alt=""
              />
            )}
            {provider.name === "Facebook" && (
              <Image
                src="https://authjs.dev/img/providers/facebook.svg"
                width="30"
                height="30"
                alt=""
              />
            )}
            <Box sx={{ marginLeft: { sm: "5rem", xs: "1rem" } }}>
              {query === "signin" ? "Sign in with " : "Sign up with "}
              {provider.name}
            </Box>
          </Box>
        </Button>
        {provider.name === "Email" && (
          <Dialog open={showEmail} onClose={() => setShowEmail(false)}>
            <DialogTitle>
              {query === "signin" ? "Sign In" : "Sign Up"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please provide an e-mail address to{" "}
                {query === "signin" ? "sign in" : "sign up"} with Salut. You
                will then receive an e-mail with a link to your signed in
                dashboard.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                onChange={() => handleChange(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowEmail(false)}>Cancel</Button>
              <Button onClick={() => clickHandler(provider.id, email)}>
                {query === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Fragment>
    );
  });

  //Error handling:
  const { error } = useRouter().query;

  const errors = {
    Signin: "Try signing with a different account.",
    OAuthSignin: "Try signing with a different account.",
    OAuthCallback: "Try signing with a different account.",
    OAuthCreateAccount: "Try signing with a different account.",
    EmailCreateAccount: "Try signing with a different account.",
    Callback: "Try signing with a different account.",
    OAuthAccountNotLinked:
      "To confirm your identity, sign in with the same account you used originally.",
    EmailSignin: "Check your email address.",
    CredentialsSignin:
      "Sign in failed. Check the details you provided are correct.",
    default: "Unable to sign in.",
  };

  const SignInError = ({ error }) => {
    const errorMessage = error && (errors[error] ?? errors.default);
    return <div>{errorMessage}</div>;
  };

  return (
    <Layout navbarType={1}>
      <Box
        sx={{
          margin: 0,
          padding: 0,
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: { lg: "50%" },
            backgroundImage: 'url("../signin.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
        <Box
          sx={{
            width: { lg: "50%", xs: "100%" },
            backgroundImage: {
              xs: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url("../signin.jpeg")',
              lg: "none",
            },
            backgroundSize: "cover",
            backgroundPosition: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {query === "signin" && (
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                marginTop: "150px",
                fontFamily: theme.typography.fontFamily[0],
                marginBottom: "70px",
              }}
            >
              Sign in Options
            </Typography>
          )}
          {query === "signup" && (
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                textAlign: "center",
                marginTop: "150px",
                fontFamily: theme.typography.fontFamily[0],
                marginBottom: "70px",
              }}
            >
              Sign up Options
            </Typography>
          )}
          <Box textAlign="center">
            <Stack
              orientation="vertical"
              sx={{
                width: { sm: "400px", xs: "380px" },
                textAlign: "center",
                alignItems: "center",
              }}
              spacing={2}
            >
              {providerButtons}
            </Stack>
            {error && <SignInError error={error} />}
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default Signin;

export async function getServerSideProps(context) {
  const query = context.query;
  const providers = await getProviders();
  return {
    props: {
      providers,
      query: query.query[0],
    },
  };
}
