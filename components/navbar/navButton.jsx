import { Button } from "@mui/material";
import theme from "../../src/theme";

export function NavButton(props) {
  return (
    <Button
      component={props.component}
      to={{
        pathname: props.path,
      }}
      onClick={props.onClick}
      sx={{
        color: theme.palette.primary.contrastText,
        marginRight: "20px",
        fontSize: 20,
        fontFamily: theme.typography.fontFamily[1],
      }}
    >
      {props.children}
    </Button>
  );
}
