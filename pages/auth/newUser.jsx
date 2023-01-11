import { signIn, getProviders } from "next-auth/react";
import { ButtonGroup, Button, Box, Typography } from "@mui/material";
import { NextLinkComposed } from "../../src/Link";
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";

const Signin = ({ providers, previousPage }) => {
  const { error } = useRouter().query;

  const clickHandler = async (provider) => {
    await signIn(provider, {
      callbackUrl: previousPage,
    });
  };

  const providerButtons = Object.values(providers).map((provider) => {
    return (
      <Button
        key={provider.id}
        onClick={() => clickHandler(provider.id)}
        variant="contained"
      >
        Sign in with {provider.name}
      </Button>
    );
  });

  return (
    <Container maxWidth="xs" sx={{ my: 20 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Welcome New User!
      </Typography>
    </Container>
  );
};

export default Signin;

export async function getServerSideProps(context) {
  const previousPage = context.req.headers.referer;
  const providers = await getProviders();
  return {
    props: {
      providers,
      previousPage,
    },
  };
}
