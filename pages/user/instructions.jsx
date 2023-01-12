import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { NextLinkComposed } from "../../src/Link";
import theme from "../../src/theme";
import DoneIcon from "@mui/icons-material/Done";
import SearchIcon from "@mui/icons-material/Search";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import BallotIcon from "@mui/icons-material/Ballot";
import Image from "next/image";

const steps = [
  {
    label: "Update your inventory",
    description: `When starting, it is encouraged to go to the inventory page and update the inventory.
    Clicking the user icon, a drop down button menu will appear that contains the pages the user have access to.`,
  },
  {
    label: "Search for cocktails",
    description: `On the navigation bar, we can navigate to the search cocktail page by clicking 'Search Cocktails'.
      A form will be shown as well as a list of popular cocktails.
     The search bar has 3 modes: Search by keyword that
      lets you type any keyword/keywords, search by ingredients which will help you in selecting multiple ingredients, and 
      search non-alcoholic drinks which will only show non-alcoholic drinks`,
  },
  {
    label: "Add recipes to your favorites",
    description: `After getting the results of your search. On the top right part of the images, there is a heart icon that
    you can click to add that cocktail as a favorite. Clicking on the image also takes you to the detail page where you can see all
    the information for that cocktail.`,
  },
  {
    label: "Categorizing your favorites",
    description: `Selecting a cocktail as favorite will be collected in the favorites page, it can be navigated by clicking
    the "Favorites" in the user menu. There, you can create and delete a category as well as categorize a cocktail. Clicking
    on the category name will filter the cocktails that belongs to that category.`,
  },
];

export default function Instruction() {
  // console.log("aha", window.innerHeight);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: { md: "100vh", sm: "50vh" },
          width: "100vw",
        }}
      >
        <Box
          component="img"
          sx={{
            height: { md: "100vh", sm: "50vh" },
            width: "100%",
          }}
          alt="introBg"
          src="../introBg.jpg"
        />
        <Box
          sx={{
            position: "absolute",
            color: "white",
            fontSize: 35,
            fontFamily: theme.typography.fontFamily[0],
            lineHeight: "100px",
            left: "8%",
            top: { md: "9%", xs: "9.5%" },
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: 50, xs: 25 },
              fontFamily: theme.typography.fontFamily[0],
              lineHeight: { md: "100px", xs: "60px" },
            }}
          >
            Welcome to Salut!
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: { md: 20, sm: 15, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
            }}
          >
            Your one stop solution and
            <br />
            source of cocktail recipes.
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: 35, md: 25, sm: 20 },
              fontFamily: theme.typography.fontFamily[0],
              lineHeight: { md: "100px", xs: "50px" },
            }}
          >
            Cocktail planning made easier
          </Typography>
          <Typography
            sx={{
              color: { sm: "white", xs: "black" },
              fontSize: { lg: 17, md: 15, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 1,
              display: { xs: "none", sm: "block", md: "block", lg: "block" },
            }}
          >
            <DoneIcon sx={{ mr: 2 }} />
            Don't know what alcoholic beverages to serve for your guests?
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
          </Typography>

          <Button
            variant="contained"
            sx={{
              fontSize: { sm: "50%", xs: "26%" },
              width: "40%",
              height: "20%",
              marginTop: 0,
              color: "#fff",
              borderRadius: "30px",
              position: {
                md: "relative",
                lg: "relative",
                xs: "absolute",
              },
              top: { xs: "100%" },
            }}
            onClick={() => {
              window.scrollTo({ top: 1000, behavior: "smooth" });
            }}
          >
            See tutorial
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "10%",
            position: "absolute",
            bottom: { sm: "0%" },
            top: { xs: "38%", sm: "65%" },
            left: { sm: "-20px" },
            backgroundImage:
              'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "18%",
              height: "10%",
            }}
          >
            <SearchIcon
              sx={{
                color: { sm: "white", xs: "black" },
                fontSize: { lg: 60, xs: 40 },
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                color: { sm: "white", xs: "black" },
                fontSize: { sm: 18, xs: 13 },
                fontFamily: theme.typography.fontFamily[1],
                p: 2,
                textAlign: "center",
              }}
            >
              Search cocktail recipes
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "18%",
              height: "10%",
            }}
          >
            <LocalBarIcon
              sx={{
                color: { sm: "white", xs: "black" },
                fontSize: { lg: 60, xs: 40 },
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                color: { sm: "white", xs: "black" },
                fontSize: { sm: 18, xs: 13 },
                fontFamily: theme.typography.fontFamily[1],
                p: 2,
                textAlign: "center",
              }}
            >
              Save and categorize cockails
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "18%",
              height: "10%",
            }}
          >
            <BallotIcon
              sx={{
                color: { sm: "white", xs: "black" },
                fontSize: { lg: 60, xs: 40 },
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                color: { sm: "white", xs: "black" },
                fontSize: { sm: 18, xs: 13 },
                fontFamily: theme.typography.fontFamily[1],
                p: 2,
                textAlign: "center",
              }}
            >
              Organize your inventory
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          color: "black",
          fontSize: { sm: 55, xs: 20 },
          fontFamily: theme.typography.fontFamily[0],
          mt: { xs: "40%", sm: "0%" },
          // lineHeight: "100px",
          m: 3,
        }}
      >
        Getting started
      </Typography>
      <Box
        sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}
      >
        <Box sx={{ width: "90vw" }}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              width: "100%",
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {steps.map((step, index) => (
              <Step
                key={step.label}
                sx={{
                  width: "100%",
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  backgroundImage:
                    'url("https://www.transparenttextures.com/patterns/inspiration-geometry.png")',
                }}
              >
                <StepLabel>
                  <Typography sx={{ fontSize: { sm: "30px", xs: "12px" } }}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography sx={{ fontSize: { sm: "30px", xs: "12px" } }}>
                    {step.description}
                  </Typography>
                  <Box
                    sx={{
                      mb: 15,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: "100%", sm: "70%" },
                        height: { xs: "200px", sm: "500px" },
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src="/../public/gif.gif"
                        alt="my gif"
                        fill
                        // height={220}
                        // width={200}
                      />
                    </Box>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography sx={{ fontSize: "25px", textAlign: "center" }}>
                You're all set! Go look and make some cocktails. Salut!
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    width: "170px",
                    height: "50px",
                    marginTop: 3,
                    color: "#fff",
                    borderRadius: "30px",
                    m: 1,
                  }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    width: "170px",
                    height: "50px",
                    marginTop: 3,
                    color: "#fff",
                    borderRadius: "30px",
                    m: 1,
                  }}
                  component={NextLinkComposed}
                  to={{
                    pathname: "/user",
                  }}
                >
                  Go to Dashboard
                </Button>
              </Box>
            </Paper>
          )}{" "}
        </Box>
      </Box>
    </>
  );
}
