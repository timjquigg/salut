import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import theme from "../../src/theme";
import DoneIcon from "@mui/icons-material/Done";
import InfoChart from "../../components/instructions/infoChart";
import TutorialStepper from "../../components/instructions/tutorialStepper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Instruction() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          sx={{
            width: { lg: "50%", xs: "100%" },
            backgroundImage: 'url("../introbg3.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "25% 75%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              mt: { sm: 18, xs: 14 },
              ml: 5,
            }}
          >
            <Typography
              sx={{
                color: "#022140",
                fontSize: { lg: 50, xs: 25 },
                fontFamily: theme.typography.fontFamily[0],
                lineHeight: { md: "80px", xs: "60px" },
              }}
            >
              Welcome to Salut!
            </Typography>
            <Typography
              sx={{
                color: "#022140",
                fontSize: { md: 20, sm: 15, xs: 15 },
                fontFamily: theme.typography.fontFamily[1],
                pl: 1,
              }}
            >
              Your one stop solution and
              <br />
              source of cocktail recipes.
            </Typography>
          </Box>
          {matches ? (
            <>
              <InfoChart mt={2} />{" "}
              <Button
                variant="contained"
                sx={{
                  color: "#fff",
                  borderRadius: "30px",
                  m: 4,
                }}
                onClick={() => {
                  window.scrollTo({ top: 800, behavior: "smooth" });
                }}
              >
                See tutorial
              </Button>
            </>
          ) : (
            ""
          )}
        </Box>
        <Box
          sx={{
            display: { sm: "flex", xs: "none" },
            flexDirection: "column",
            alignItems: { lg: "end", xs: "center" },
            textAlign: { lg: "justify", xs: "center" },
            width: { lg: "50%", xs: "100%" },
            backgroundSize: "cover",
            backgroundPosition: { sm: "center" },
          }}
        >
          <Box
            sx={{
              paddingTop: { sm: "130px", xs: "120px" },
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "#022140",
                fontSize: { lg: 40, md: 25, sm: 20 },
                fontFamily: theme.typography.fontFamily[0],
                lineHeight: { md: "100px", xs: "50px" },
              }}
            >
              Cocktail planning made easier
            </Typography>
            <Typography
              sx={{
                color: "#022140",
                lineHeight: { md: "40px", xs: "50px" },
                fontSize: { lg: 17, md: 15, xs: 13 },
                fontFamily: theme.typography.fontFamily[1],
              }}
            >
              <DoneIcon sx={{ mr: 2 }} />
              Don&apos;t know what alcoholic beverages to serve for your guests
              ?
              <br />
              <DoneIcon sx={{ mr: 2 }} />
              Want to come up with a drink with what is on hand?
              <br />
              <DoneIcon sx={{ mr: 2 }} />
              Looking for inspiration on what cocktail to make?
              <br />
              <DoneIcon sx={{ mr: 2 }} />
              Categorize and organize cocktail ideas/plans for upcoming events?
              <br />
              <DoneIcon sx={{ mr: 2 }} />
              Want to explore more cocktails based on your favorite ingredient?
              <br />
            </Typography>
          </Box>
          <InfoChart mt={10} />
          <Box
            sx={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              sx={{
                color: "#fff",
                borderRadius: "30px",
                m: 4,
              }}
              onClick={() => {
                window.scrollTo({ top: 800, behavior: "smooth" });
              }}
            >
              See tutorial
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100vh", pt: {sm: "100px", xs: "50px"} }}
      >
        <Typography
          sx={{
            color: "#022140",
            fontSize: { sm: 35, xs: 20 },
            fontFamily: theme.typography.fontFamily[0],
            mt: { xs: "40%", sm: "0%" },
            // lineHeight: "100px",
            mt: 3,
          }}
        >
          Getting started
        </Typography>
        <TutorialStepper />
      </Box>
    </>
  );
}
