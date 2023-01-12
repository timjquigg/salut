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
      \n The search bar has 3 modes: Search by keyword that
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
          height: "100vh",
        }}
      >
        <Box
          component="img"
          sx={{
            height: "100vh",
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
            top: "20%",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: 55,
              fontFamily: theme.typography.fontFamily[0],
              lineHeight: "100px",
            }}
          >
            Welcome to Salut!
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: 20,
              fontFamily: theme.typography.fontFamily[1],
            }}
          >
            Your one stop solution and source of cocktail recipes.
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: 35,
              fontFamily: theme.typography.fontFamily[0],
              lineHeight: "100px",
            }}
          >
            Cocktail planning made easier
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: 20,
              fontFamily: theme.typography.fontFamily[1],
            }}
          >
            <DoneIcon sx={{ mr: 2 }} />
            Don't know what alcoholic beverages to serve for your guests?
            <br />
            <DoneIcon sx={{ mr: 2 }} />
            Wants to come up with a drink with what is on hand?
            <br />
            <DoneIcon sx={{ mr: 2 }} />
            Looking for inspiration on what cocktail to make?
            <br />
            <DoneIcon sx={{ mr: 2 }} />
            Categorize and organize cocktail ideas/plans for upcoming events?
            <br />
          </Typography>
          <Typography
            sx={{
              color: "white",
              fontSize: 30,
              fontFamily: theme.typography.fontFamily[0],
              mt: 3,
            }}
          >
            We've got you covered!
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: "200px",
              height: "50px",
              marginTop: 3,
              color: "#fff",
              borderRadius: "30px",
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
            m: 4,
            position: "absolute",
            bottom: "1px",
            left: "80px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "200px",
              height: "200px",

              m: 1,
            }}
          >
            <SearchIcon
              sx={{
                color: "white",
                fontSize: 80,
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: theme.typography.fontFamily[1],
                p: 3,
                textAlign: "center",
              }}
            >
              Search cocktail recipes by keywords or ingredients
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "200px",
              height: "200px",

              m: 1,
            }}
          >
            <LocalBarIcon
              sx={{
                color: "white",
                fontSize: 80,
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: theme.typography.fontFamily[1],
                p: 3,
                textAlign: "center",
              }}
            >
              Save and categorize Cockails
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "200px",
              height: "200px",

              m: 1,
            }}
          >
            <BallotIcon
              sx={{
                color: "white",
                fontSize: 80,
                textAlign: "center",
              }}
            />
            <Typography
              sx={{
                color: "white",
                fontSize: 18,
                fontFamily: theme.typography.fontFamily[1],
                p: 3,
                textAlign: "center",
              }}
            >
              Save ingredients to see what else you need for a recipe
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{
          color: "black",
          fontSize: 55,
          fontFamily: theme.typography.fontFamily[0],
          lineHeight: "100px",
          m: 5,
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
              marginTop: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography sx={{ fontSize: "30px" }}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography sx={{ fontSize: "20px" }}>
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
                    <Image
                      src="/../public/gif.gif"
                      alt="my gif"
                      height={500}
                      width={700}
                    />
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
          )}
        </Box>
      </Box>
    </>
  );
}
