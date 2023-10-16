import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

const CustomLoginButton = ({ buttonText, disabled, onClick, }) => {
  const theme = useTheme();

  const buttonLoginStyles = {
    // backgroundColor: theme.palette.secondary.main,
    backgroundColor: "grey",
    "&:hover": {
      backgroundColor: "darkgrey"
      // color: theme.palette.white.main,
    },
    "&:disabled": {
      backgroundColor: "lightgrey"
      // backgroundColor: theme.palette.primaryLighter.main,
      // border: `solid 1px ${theme.palette.white.opacity20}`,
      // color: theme.palette.white.opacity20,
    },
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="secondary"
      disabled={disabled}
      onClick={onClick}
      sx={buttonLoginStyles}
    >
      {buttonText}
    </Button>
  );
};

export default CustomLoginButton;
