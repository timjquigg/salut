import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Facebook, Twitter } from "@mui/icons-material";
import theme from "../../src/theme";
import CopyToClipboardButton from "../copyUrl";
import GetLocation from "../maps/getLocation";

export default function BottomButtons(props) {
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=https://salut-production.up.railway.app/cocktail/${props.cocktailId}`
  const twitter = `https://twitter.com/intent/tweet?url=https://salut-production.up.railway.app/cocktail/${props.cocktailId}`

  return (
    <Box sx={{ display: "flex", flexDirection: "column"}}>
      <GetLocation />
      <Box sx={{ display: "flex", mt: "15px" }}>
        <CopyToClipboardButton/>
        <Button
          title="Share on facebook"
          href={facebook}
          target="_blank"
          rel="noreferrer"
        >
          <Facebook sx={{ fill: theme.palette.primary.contrastText }} />
        </Button>
        <Button
          title="Share on Twitter"
          href={twitter}
          target="_blank"
          rel="noreferrer"
        >
          <Twitter sx={{ fill: theme.palette.primary.contrastText }} />
        </Button>
      </Box>
    </Box>
  );
}
