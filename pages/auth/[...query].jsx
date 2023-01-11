import { signIn, getProviders } from "next-auth/react";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import Image from 'next/image';
import theme from "../../src/theme";

const Signin = ({ providers, query }) => {
  console.log(providers)
  const clickHandler = async (provider) => {
    await signIn(provider, { callbackUrl: "/user" });
  };

  const providerButtons = Object.values(providers).map((provider) => {
    return (
      <Button
        key={provider.id}
        onClick={() => clickHandler(provider.id)}
        variant="contained"
        sx={{backgroundColor: '#fff', borderRadius: '10px', '&:hover': {
          background: "#DCDCDC", }
        }}  
      >
        <Box sx={{width: '100%', display: 'flex', alignItems: 'center'}}>
          {provider.name === "Google" ? 
          <Image src="https://authjs.dev/img/providers/google.svg" width="30" height="30" alt=""/> : 
          <Image src="https://authjs.dev/img/providers/facebook.svg" width="30" height="30" alt=""/>
          }
          <Box sx={{marginLeft: '70px'}}>{query === "signin" ? "Sign in with" : "Sign up with"} {provider.name}</Box>
        </Box>
      </Button>
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
    <Box sx={{margin: 0, padding: 0, width: '100vw', minHeight: '100vh', display: 'flex'}}>
      <Box sx={{width: '50%', backgroundImage: 'url("../signin.jpeg")', backgroundSize: "cover",
          backgroundPosition: "center",}}></Box>
      <Box sx={{width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {query === "signin" && (
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginTop: '150px', fontFamily: theme.typography.fontFamily[0], marginBottom: '70px' }}>
            Sign in Options
          </Typography>
        )}
        {query === "signup" && (
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginTop: '150px', fontFamily: theme.typography.fontFamily[0], marginBottom: '70px' }}>
            Sign up Options
          </Typography>
        )}
        <Box textAlign="center">
          <Stack
            width="400px"
            orientation="vertical"
            sx={{ textAlign: "center" }}
            spacing={2}
          >
            {providerButtons}
          </Stack>
          {error && <SignInError error={error} />}
        </Box>
      </Box>
    </Box>
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
