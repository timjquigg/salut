import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { NextLinkComposed } from "../../src/link";
import Image from "next/image";

const TutorialStepper = () => {
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
  const steps = [
    {
      label: "Update your inventory",
      description: `When starting, it is encouraged to go to the inventory page and update the inventory.
      Clicking the user icon, a drop down button menu will appear that contains the pages the user have access to.`,
      gif: "/inventoryGIF.gif",
    },
    {
      label: "Search for cocktails",
      description: `On the navigation bar, we can navigate to the search cocktail page by clicking 'Search Cocktails'.
        A form will be shown as well as a list of popular cocktails.
       The search bar has 3 modes: Search by keyword that
        lets you type any keyword/keywords, search by ingredients which will help you in selecting multiple ingredients, and 
        search non-alcoholic drinks which will only show non-alcoholic drinks`,
      gif: "/searchGIF.gif",
    },
    {
      label: "Add recipes to your favorites and categorize them",
      description: `After getting the results of your search. On the top right part of the images, there is a heart icon that
      you can click to add that cocktail as a favorite. Clicking on the image also takes you to the detail page where you can see all
      the information for that cocktail. Selecting a cocktail as favorite will be collected in the favorites page, it can be navigated by clicking
      the "Favorites" in the user menu. There, you can create and delete a category as well as categorize a cocktail. Clicking
      on the category name will filter the cocktails that belongs to that category.`,
      gif: "/favCatGIF.gif",
    },
    {
      label: "Creating a cocktail recipe",
      description: `You can also create a cocktail recipe! Just click the "Add a Recipe" menu. A form will show that needs to be filled
      to create your cocktail. It uses the image URL as its accepted image value. After creating your recipe, you will be redirected
      to your created cocktail page.`,
      gif: "/cocktailmakeGIF.gif",
    },
  ];

  return (
    <Box sx={{ marginTop: "10px", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "90vw" }}>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            width: "100%",
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {steps.map((step, index) => (
            <Step
              key={step.label}
              sx={{
                width: "80%",
                marginTop: "10px",
              }}
            >
              <StepLabel>
                <Typography sx={{ fontSize: { sm: "20px", xs: "12px" } }}>
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography sx={{ fontSize: { sm: "17px", xs: "12px" } }}>
                  {step.description}
                </Typography>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "70%" },
                      height: { xs: "200px", sm: "450px" },
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <Image src={step.gif} alt="my gif" fill />
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
            <Typography sx={{ fontSize: "20px", textAlign: "center" }}>
              You&apos;re all set! Go and see what you can make. Salut!
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  width: { xs: "40%", sm: "15%" },
                  height: { xs: "30%", sm: "45" },
                  marginTop: 3,
                  color: "#fff",
                  borderRadius: "30px",
                  m: 1,
                  fontSize: "70%",
                }}
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                sx={{
                  width: { xs: "40%", sm: "15%" },
                  height: { xs: "30%", sm: "45" },
                  marginTop: 3,
                  color: "#fff",
                  borderRadius: "30px",
                  m: 1,
                  fontSize: "70%",
                }}
                component={NextLinkComposed}
                to={{
                  pathname: "/user",
                }}
              >
                Dashboard
              </Button>
            </Box>
          </Paper>
        )}{" "}
      </Box>
    </Box>
  );
};

export default TutorialStepper;
