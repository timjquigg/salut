import React from "react";
import { Box, Button, Typography } from "@mui/material";
import theme from "../src/theme";
import Image from "next/image";
import Layout from "../components/layout";
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
    <Layout navbarType={1}>
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
                About Salut
              </Typography>
              <Typography
                sx={{
                  color: "#022140",
                  fontSize: { sm: 20, xs: 15 },
                  fontFamily: theme.typography.fontFamily[1],
                  margin: { xs: 3, sm: 4 },
                  textAlign: "center",
                }}
              >
                If you are visiting this page, you are likely a home barista, a
                curious visitor, or just someone who is passionate about mixed
                beverages.
                <br />
                <br />
                Making cocktails shouldn&apos;t be intimidating. Regardless of
                your need of cocktail recipes. A party, a small gathering, a
                potluck, or just want to make a drink right now; we are here to
                cater to your need.
              </Typography>
            </Box>
            <Typography
              sx={{
                color: "#022140",
                fontSize: { sm: 30, xs: 15 },
                fontFamily: theme.typography.fontFamily[0],
                mt: { xs: "100px", sm: 0 },
                mb: { xs: "-90px" },
              }}
            >
              Our Team
            </Typography>
            <Box sx={{ marginTop: { sm: "-150px", xs: 0 } }}>
              <Image
                src="/team-nobg.png"
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
                  marginRight: "50px",
                  marginLeft: "25px",
                  fontWeight: "bold",
                }}
              >
                Tim
              </Typography>
              <Typography sx={{ fontWeight: "bold" }}>Satoe</Typography>
              <Typography
                sx={{
                  marginLeft: "30px",
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

      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: { xs: "90vw", sm: "70vw", md: "50vw", lg: "45vw" } }}>
          <Typography
            sx={{
              color: "#022140",
              fontSize: { sm: 55, xs: 40 },
              fontFamily: theme.typography.fontFamily[0],
              lineHeight: { sm: "80px", xs: "40px" },
              textAlign: "center",
            }}
          >
            How we started
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "#022140",
              fontSize: { sm: 20, xs: 15 },
              fontFamily: theme.typography.fontFamily[1],
              margin: { xs: 3, sm: 4 },
            }}
          >
            We started doing this app together as our final project at
            Lighthouse Labs. The planning of what project to make started after
            the holiday season. The three of us meet and talked about how easy
            it would be if there is an app that tells what cocktails you can
            make with whatever you have in your pantry. For example, the
            leftover liquors for Christmas, what cocktails can be made this
            coming New Year&apos;s Eve?
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
      </Box>

      <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
        <Box
          sx={{
            width: { lg: "50%", xs: "100%" },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: {
              xs: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url("../cheers-bg.jpg")',
              lg: "none",
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
              mt: 5,
            }}
          >
            Our Goal
          </Typography>
          <Box
            sx={{ width: { xs: "90vw", sm: "80vw", md: "70vw", lg: "50vw" } }}
          >
            <Typography
              sx={{
                color: "#022140",
                fontSize: { sm: 20, xs: 15 },
                fontFamily: theme.typography.fontFamily[1],
                margin: { xs: 3, sm: 4 },
                textAlign: "center",
              }}
            >
              Going back to &apos;Making cocktails shouldn&apos;t be
              intimidating&apos;. Our goal is to make it accessible for
              everyone. We primarily target home baristas to get ideas on what
              drinks they can make at home. Based on the ingredients they have,
              they can see what they can make at the moment or see what they
              still need.
              <br />
              <br />
              Although, you could also be just curious what drinks you could
              make with one or two ingredients. Like drinks with Lemons? We can
              also help you with that. We also encourage exploring other
              cocktails that users can make, it could be their next favorite
              drink!
              <br />
              <br />
              Lastly, we also would like to emphasize the utilization of
              ingredients that has been lying or in the liquor cabinet for so
              long. Not only it limits wastage of liquor as it starts to degrade
              after opening, you would be able to maximize every bottle of
              alcohol and maybe discover a new cocktail!
              <br />
              <br />
              With all that being said, glad to have you with us! We will be
              cheering with you on your next drink.
            </Typography>
          </Box>
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
    </Layout>
  );
}

export default About;
