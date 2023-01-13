import React from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../src/theme";
import Image from "next/image";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function About() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  let marginT = matches ? 2 : 3;
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
                  lineHeight: { sm: "80px", xs: "40px" },
                  mb: { sm: "10", xs: "6" },
                  textAlign: "center",
                }}
              >
                Making cocktails shouldn't be intimidating
              </Typography>
              <Typography
                sx={{
                  color: "#022140",
                  fontSize: { sm: 20, xs: 15 },
                  fontFamily: theme.typography.fontFamily[1],
                  margin: { xs: 3, sm: 4 },
                  textAlign: "justify",
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
            <Typography
              sx={{
                color: "#022140",
                fontSize: { sm: 30, xs: 15 },
                fontFamily: theme.typography.fontFamily[0],
              }}
            >
              Our Team
            </Typography>
            <Box
              sx={{ marginTop: { lg: "-120px", sm: "-100px", xs: "-120px" } }}
            >
              <Image
                src="/../public/team-nobg.png"
                alt="Picture of the team"
                width={matches ? 350 : 450}
                height={matches ? 350 : 450}
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

      <Box>
        <Typography
          sx={{
            color: "#022140",
            fontSize: { sm: 55, xs: 40 },
            fontFamily: theme.typography.fontFamily[0],
            lineHeight: { sm: "80px", xs: "40px" },
            mb: { sm: "10", xs: "6" },
            textAlign: "center",
            mt: 2,
          }}
        >
          How we started
        </Typography>
        <Typography
          sx={{
            textAlign: "justify",
            color: "#022140",
            fontSize: { sm: 20, xs: 15 },
            fontFamily: theme.typography.fontFamily[1],
            margin: { xs: 3, sm: 4 },
            pl: { sm: 55 },
            pr: { sm: 55 },
          }}
        >
          We started doing this app together as our final project at Lighthouse
          Labs. The planning of what project to make started after the holiday
          season. The three of us meet and talked about how easy it would be if
          there is an app that tells what cocktails you can make with whatever
          you have in your pantry. For example, the leftover liquors for
          Christmas, what cocktails can be made this coming New Year's Eve?
          <br />
          <br />
          We are aware that there are applications that already has the same
          functionality as ours. We however made an app that is less
          initmidating, more enjoyable to use, and pleasing to the eyes.
          <br />
          <br />
          After a week of coding and brainstorming, Salut! was created.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
        <Box
          sx={{
            width: { lg: "50%" },
            // paddingTop: { xs: "100px" },
            paddingRight: { sm: "50px" },
            paddingLeft: { sm: "50px" },
            backgroundImage: {
              xs: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),url("../cheers-bg.jpg")',
              sm: "none",
            },
            backgroundSize: { xs: "cover" },
            backgroundPosition: { xs: "45% 5%" },
          }}
        >
          {" "}
          <Typography
            sx={{
              color: "#022140",
              fontSize: { sm: 55, xs: 40 },
              fontFamily: theme.typography.fontFamily[0],
              lineHeight: { sm: "80px", xs: "40px" },
              mb: { sm: "10", xs: "6" },
              textAlign: "center",
              mt: 2,
            }}
          >
            Our Goal - make cocktail making approachable
          </Typography>
          <Typography
            sx={{
              color: "#022140",
              fontSize: { sm: 20, xs: 15 },
              fontFamily: theme.typography.fontFamily[1],
              margin: { xs: 3, sm: 4 },
              textAlign: "justify",
            }}
          >
            Going back to "Making cocktails shouldn't be intimidating". Our goal
            is to make it accessible for everyone. We primarily target home
            baristas to get ideas on what drinks they can make at home. Based on
            the ingredients they have, they can see what they can make at the
            moment or see what they still need.
            <br />
            <br />
            Although, you could also be just curious what drinks you could make
            with one or two ingredients. Like drinks with Lemons? We can also
            help you with that. We also encourage exploring other cocktails that
            users can make, it could be their next favorite drink!
            <br />
            <br />
            Lastly, we also would like to emphasize the utilization of
            ingredients that has been lying or in the liquor cabinet for so
            long. Not only it limits wastage of liquor as it starts to degrade
            after opening, you would be able to maximize every bottle of alcohol
            and maybe discover a new cocktail!
            <br />
            <br />
            With all that being said, glad to have you with us! We will be
            cheering with you on your next drink.
          </Typography>
        </Box>

        <Box
          sx={{
            width: { lg: "50%" },
            backgroundImage: 'url("../cheers-bg.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
      </Box>
    </>
  );
}

export default About;
