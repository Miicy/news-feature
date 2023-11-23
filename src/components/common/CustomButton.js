import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";

const CustomButton = ({
	color,
	text,
	disabled,
	onClick,
	width,
	borderRadius,
	height,
}) => {
	const theme = useTheme();

	const buttonStyles = {
		boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
		fontWeight: "bold",
		backgroundColor: theme.palette.red.secondary,
		"&:hover": {
			backgroundColor: theme.palette.red.main,
		},
		"&:disabled": {
			backgroundColor: theme.palette.forth.secondary,
			backgroundColor: theme.palette.forth.third,
			cursor: "default",
		},
		width: width,
		borderRadius: borderRadius,
		height: height,
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
