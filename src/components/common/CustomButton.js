import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

const CustomButton = ({ color,text, disabled, onClick, width, borderRadius }) => {
	const theme = useTheme();

	const buttonStyles = {
		boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
		border: `1px solid ${theme.palette.fifth.main}`,
		backgroundColor: theme.palette.third.secondary,
		"&:hover": {
			backgroundColor: theme.palette.forth.secondary,
		},
		"&:disabled": {
			backgroundColor: "lightgrey",
			color: "white",
			cursor: "default",
		},
		width: width,
		borderRadius: borderRadius,
    color: color,
	};

	return (
		<Button
			color="opposite"
			type="submit"
			variant="contained"
			disabled={disabled}
			onClick={onClick}
			sx={buttonStyles}
		>
			{text}
		</Button>
	);
};

export default CustomButton;
