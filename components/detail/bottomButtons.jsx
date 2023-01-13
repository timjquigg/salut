import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { Facebook, Twitter } from "@mui/icons-material";
import theme from "../../src/theme";
import CopyToClipboardButton from "../copyUrl";
import GetLocation from "../maps/getLocation";

export default function BottomButtons() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CopyToClipboardButton />
        <Button
          title="Share on facebook"
          href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fparse.com"
          target="_blank"
          rel="noreferrer"
        >
          <Facebook sx={{ fill: theme.palette.primary.contrastText }} />
        </Button>
        <Button
          title="Share on Twitter"
          href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com"
          target="_blank"
          rel="noreferrer"
        >
          <Twitter sx={{ fill: theme.palette.primary.contrastText }} />
        </Button>
      </Box>
      <GetLocation />
    </>
  );
}
