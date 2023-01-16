import React from "react";
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";
import theme from "../src/theme";
import Button from "@mui/material/Button";
import { NextLinkComposed } from "../src/link";
import Layout from "../components/layout";
import InfoChart from "../components/instructions/infoChart";
import NightlifeIcon from "@mui/icons-material/Nightlife";

const styles = {
  signupButton: {
    background: "linear-gradient(45deg, #fe6b79 30%, #ff8e53 90%)",
    borderRadius: "3px",
    border: 0,
    color: "#fff",
    height: "48px",
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  },
};

export default function Home() {
  return (
    <Layout navbarType={1}>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            width: { lg: "50%" },
            backgroundImage: 'url("../landing2.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: { lg: "end", xs: "center" },
            textAlign: { lg: "right", xs: "center" },
            width: { lg: "50%", xs: "100%" },
            paddingRight: { lg: "5vw" },
            backgroundImage: {
              xs: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.2)), url("../landing2.jpeg")',
              lg: "none",
            },
            backgroundSize: "cover",
            backgroundPosition: { sm: "center" },
          }}
        >
          <Box sx={{ paddingTop: { sm: "150px", xs: "120px" } }}>
            <Typography
              sx={{
                color: "#022140",
                fontSize: { xl: 95, lg: 90, md: 85, sm: 80, xs: 50 },
                fontFamily: theme.typography.fontFamily[0],
                lineHeight: { md: "100px", xs: "70px" },
              }}
            >
              Interactive
            </Typography>
            <Typography
              sx={{
                color: "#022140",
                fontSize: { xl: 95, lg: 90, md: 85, sm: 80, xs: 50 },
                fontFamily: theme.typography.fontFamily[0],
                lineHeight: { md: "100px", xs: "70px" },
              }}
            >
              Cocktail
            </Typography>
            <Typography
              sx={{
                color: "#022140",
                fontSize: { xl: 95, lg: 90, md: 85, sm: 80, xs: 50 },
                fontFamily: theme.typography.fontFamily[0],
                lineHeight: { md: "100px", xs: "70px" },
              }}
            >
              Cabinet
            </Typography>
          </Box>
          <Box marginTop="30px">
            <Typography
              sx={{
                color: "#022140",
                fontSize: { xl: 28, lg: 25, xs: 18 },
                fontFamily: theme.typography.fontFamily[1],
                marginTop: { xs: "300px", sm: 0 },
              }}
            >
              You don&apos;t know what to drink tonight?
            </Typography>
            <Typography
              sx={{
                color: "#022140",
                fontSize: { xl: 28, lg: 25, xs: 18 },
                fontFamily: theme.typography.fontFamily[1],
                marginBottom: { sm: 7, xs: 3 },
              }}
            >
              We&apos;ve got your back.
            </Typography>
            <Button
              style={styles.signupButton}
              variant="contained"
              size="large"
              component={NextLinkComposed}
              to={{
                pathname: "auth/signup",
              }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
}
