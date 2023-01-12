import React from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../src/theme";
import Image from "next/image";

function About() {
  const imageStyle = {
    backgroundColor: 'transparent'
  };
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Box
        sx={{
          width: {lg: '50%'},
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
          width: {lg: '50%', xs: '100%'},
          backgroundImage: {xs: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url("../about.jpeg")', lg: 'none'},
          backgroundSize: "cover",
          backgroundPosition: 'center',
        }}
      >
        <Box sx={{ paddingTop: {xs: "100px"}, paddingRight: {sm: "50px"}, paddingLeft: {sm: "50px"} }}>
          <Box sx={{ zIndex: 10, position: "relative"}}>
            <Typography
              sx={{
                color: "#022140",
                fontSize: {sm: 70, xs: 50},
                fontFamily: theme.typography.fontFamily[0],
                lineHeight: "100px",
              }}
            >
              About Salut
            </Typography>
            <Typography
              sx={{
                color: "#022140",
                fontSize: {sm: 20, xs: 18},
                fontFamily: theme.typography.fontFamily[1],
                margin: {xs: 5, sm: 'none'}
              }}
            >
              If youre visiting this page, youre likely here because youre
              searching for a random sentence. Sometimes a random word just isnt
              enough, and that is where the random sentence generator comes into
              play. By inputting the desired number, you can make a list of as
              many random sentences as you want or need. Producing random
              sentences can be helpful in a number of different ways.
            </Typography>
          </Box>
          <Box sx={{ marginTop: {lg: "-80px", sm: "-100px", xs: "-160px"} }}>
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
                marginRight: "65px",
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
                marginRight: "15px",
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
  );
}

export default About;
