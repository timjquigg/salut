import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../../src/theme";
import SearchIcon from "@mui/icons-material/Search";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import BallotIcon from "@mui/icons-material/Ballot";
import Link from "next/link";

const InfoChart = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        px: {sm: 5, xs: 3},
        display: "flex",
        // justifyContent: "space-evenly",
        mt: props.mt,
        // pl: { sm: 26, xs: 10 },
      }}
    >
      <Link href="/search">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // width: "18%",
            height: "10%",
          }}
        >
          <SearchIcon
            sx={{
              color: "#022140",
              fontSize: { lg: 50, xs: 30 },
              textAlign: "center",
            }}
          />
          <Typography
            sx={{
              color: "#022140",
              fontSize: { sm: 18, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 2,
              textAlign: "center",
            }}
          >
            Search cocktail recipes
          </Typography>
        </Box>
      </Link>
      <Link href="/user/favorites">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // width: "18%",
            height: "10%",
          }}
        >
          <LocalBarIcon
            sx={{
              color: "#022140",
              fontSize: { lg: 50, xs: 30 },
              textAlign: "center",
            }}
          />
          <Typography
            sx={{
              color: "#022140",
              fontSize: { sm: 18, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 2,
              textAlign: "center",
            }}
          >
            Save and categorize cockails
          </Typography>
        </Box>
      </Link>
      <Link href="/user/inventory">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            // width: "18%",
            height: "10%",
          }}
        >
          <BallotIcon
            sx={{
              color: "#022140",
              fontSize: { lg: 50, xs: 30 },
              textAlign: "center",
            }}
          />
          <Typography
            sx={{
              color: "#022140",
              fontSize: { sm: 18, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 2,
              textAlign: "center",
            }}
          >
            Organize your inventory
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default InfoChart;
