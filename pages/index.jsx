import React from "react";
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";
import theme from "../src/theme";
import Button from "@mui/material/Button";
import { NextLinkComposed } from "../src/link";
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
    <Box>
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

      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: { lg: "left", xs: "center" },
            width: { lg: "50%", xs: "100%" },
            // paddingLeft: { lg: "5vw" },
            backgroundImage: {
              xs: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url("../landing3.jpeg")',
              lg: "none",
            },
            backgroundSize: "cover",
            backgroundPosition: { sm: "center" },
          }}
        >
          <Box
            sx={{
              paddingTop: { sm: "100px", xs: "120px" },
              px: { lg: "5vw" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#022140",
                fontSize: { xl: 70, lg: 60, md: 50, sm: 40, xs: 35 },
                fontFamily: theme.typography.fontFamily[0],
                lineHeight: { md: "80px", xs: "70px" },
              }}
            >
              Cocktail planning made easier
            </Typography>
            <Typography
              sx={{
                color: "#022140",
                lineHeight: { md: "40px", xs: "40px" },
                fontSize: { md: 20, xs: 18 },
                fontFamily: theme.typography.fontFamily[1],
                px: { xs: 3, sm: 3, lg: 0 },
                py: { lg: 5, xs: 3 },
                textAlign: { xs: "left" },
                // backgroundColor: {xs: "rgba(255,255,255,0.5)", lg: "none"}
              }}
            >
              <NightlifeIcon sx={{ mr: 2 }} />
              Want to explore more cocktails based on your favorite ingredient?
              <br />
              <NightlifeIcon sx={{ mr: 2 }} />
              Categorize and organize cocktail ideas/plans for upcoming events?
              <br />
              <NightlifeIcon sx={{ mr: 2 }} />
              Want to save your own cocktail recipes?
              <br />
            </Typography>
          </Box>
          <Box marginTop="30px">
            <InfoChart />
          </Box>
        </Box>
        <Box
          sx={{
            width: { lg: "50%" },
            backgroundImage: 'url("../landing3.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>
    </Box>
  );
}
