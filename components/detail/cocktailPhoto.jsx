import { Box } from "@mui/system";
import Image from "next/image";

export default function CocktailPhoto(props) {
  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <Image
        src={props.thumb}
        alt="Picture of the author"
        width={500}
        height={500}
        layout="responsive"
      />
    </Box>
  );
}
