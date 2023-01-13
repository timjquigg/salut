import React from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../src/theme";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function About() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  const imageStyle = {
    backgroundColor: "transparent",
  };
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
        <Box
          sx={{
            width: { lg: "50%" },
            backgroundImage: 'url("../about.jpeg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: { lg: "50%", xs: "100%" },
            backgroundImage: {
              xs: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url("../about.jpeg")',
              lg: "none",
            },
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Box
            sx={{
              paddingTop: { xs: "100px" },
              paddingRight: { sm: "50px" },
              paddingLeft: { sm: "50px" },
            }}
          >
            <Box sx={{ zIndex: 10, position: "relative" }}>
              <Typography
                sx={{
                  color: "#022140",
                  fontSize: { sm: 55, xs: 40 },
                  fontFamily: theme.typography.fontFamily[0],
                  lineHeight: { sm: "80px", xs: "50px" },
                  mb: 10,
                }}
              >
                Making cocktails shouldn't be intimidating
              </Typography>
              <Typography
                sx={{
                  color: "#022140",
                  fontSize: { sm: 20, xs: 15 },
                  fontFamily: theme.typography.fontFamily[1],
                  margin: { xs: 3, sm: "none" },
                }}
              >
                If you are visiting this page, you are likely a home barista, a
                curious visitor, or just someone who is passionate about mixed
                beverages.
                <br />
                <br />
                Regardless of your need of cocktail recipes. A party, a small
                gathering, a potluck, or just want to make a drink right now; we
                are here to cater to your need.
              </Typography>
            </Box>
            <Box sx={{ marginTop: { lg: "80px", sm: "-100px", xs: "-160px" } }}>
              <Image
                src="/../public/team-nobg.png"
                alt="Picture of the team"
                width={390}
                height={390}
                style={imageStyle}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-80px",
              }}
            >
              <Typography
                sx={{
                  marginRight: "60px",
                  marginLeft: "35px",
                  fontWeight: "bold",
                }}
              >
                Tim
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>Satoe</Typography>
              <Typography
                sx={{
                  marginLeft: "40px",
                  marginRight: "10px",
                  fontWeight: "bold",
                  paddingLeft: "5px",
                }}
              >
                Francisco
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default About;
