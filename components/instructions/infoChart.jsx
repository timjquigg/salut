import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import theme from "../../src/theme";
import SearchIcon from "@mui/icons-material/Search";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import BallotIcon from "@mui/icons-material/Ballot";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import Link from "next/link";

const InfoChart = (props) => {
  return (
    <Box
      sx={{
        width: "100%",
        // px: {sm: 5, xs: 1},
        display: "flex",
        justifyContent: "center",
        // justifyContent: "space-evenly",
        mt: props.mt,
        // pl: { sm: 26, xs: 10 },
        gap: { lg: 1, md: 3, sm: 5, xs: 1 },
      }}
    >
      <Link href="/search" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: { lg: "150px", md: "120px", xs: "90px" },
            height: { lg: "160px", md: "140px", xs: "110px" },
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            pt: 1,
          }}
        >
          <SearchIcon
            sx={{
              color: "#022140",
              fontSize: { lg: 50, xs: 25 },
              textAlign: "center",
            }}
          />
          <Typography
            sx={{
              color: "#022140",
              fontSize: { md: 18, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 1,
              textAlign: "center",
            }}
          >
            Search cocktail recipes
          </Typography>
        </Box>
      </Link>
      <Link href="/user/favorites" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: { lg: "150px", md: "120px", xs: "90px" },
            height: { lg: "160px", md: "140px", xs: "110px" },
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            pt: 1,
          }}
        >
          <LocalBarIcon
            sx={{
              color: "#022140",
              fontSize: { lg: 50, xs: 25 },
              textAlign: "center",
            }}
          />
          <Typography
            sx={{
              color: "#022140",
              fontSize: { md: 18, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 1,
              textAlign: "center",
            }}
          >
            Save and categorize recipes
          </Typography>
        </Box>
      </Link>
      <Link href="/user/inventory" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: { lg: "150px", md: "120px", xs: "90px" },
            height: { lg: "160px", md: "140px", xs: "110px" },
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            pt: 1,
          }}
        >
          <BallotIcon
            sx={{
              color: "#022140",
              fontSize: { lg: 50, xs: 25 },
              textAlign: "center",
            }}
          />
          <Typography
            sx={{
              color: "#022140",
              fontSize: { md: 18, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 1,
              textAlign: "center",
            }}
          >
            Organize inventory
          </Typography>
        </Box>
      </Link>
      <Link href="/cocktail/create" style={{ textDecoration: "none" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: { lg: "150px", md: "120px", xs: "90px" },
            height: { lg: "160px", md: "140px", xs: "110px" },
            borderRadius: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.4)",
            pt: 1,
          }}
        >
          <NoteAddIcon
            sx={{
              color: "#022140",
              fontSize: { lg: 50, xs: 25 },
              textAlign: "center",
            }}
          />
          <Typography
            sx={{
              color: "#022140",
              fontSize: { md: 18, xs: 13 },
              fontFamily: theme.typography.fontFamily[1],
              p: 1,
              textAlign: "center",
            }}
          >
            Create custom recipes
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default InfoChart;
