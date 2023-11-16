import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

const getDesignTokens = () => ({
	palette: {
		primary: {
			main: grey[50],
			opacity80: "rgba(250, 250, 250, 0.60)",
			opacity40: "rgba(250, 250, 250, 0.40)",
			glass: "rgba(250, 250, 250, 0.80)",
		},
		secondary: {
			main: grey[100],
			secondary: grey[50],
		},
		third: {
			main: grey[200],
			secondary: grey[200],
		},
		forth: {
			main: grey[300],
			secondary: grey[300],
		},
		fifth: {
			main: grey[400],
			secondary: grey[400],
			third: grey[200],
		},
		oppositeLighter: {
			main: grey[500],
			opacity40: "rgba(158, 158, 158, 0.40)",
		},
		opposite: {
			main: grey[900],
			secondary: grey[800],
			third: grey[700],
			forth: grey[600],
		},
		divider: grey[400],
		text: {
			oppositeDark: grey[900],
			primary: grey[900],
			secondary: grey[700],
		},
		red: {
			main: red[700],
			secondary: red[400],
			error: "#d32f2f",
		},
	},
});

export const themeCreation = () =>
	createTheme({
		...getDesignTokens(),
		components: {
			MuiDivider: {
				styleOverrides: {
					root: {},
				},
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						backgroundColor: grey[900],
						color: grey[50],
						fontSize: "0.8em",
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						"& .MuiOutlinedInput-root": {
							borderRadius: 10,
							color: grey[900],
						},
						"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline":{
							borderColor: grey[900],
						  }
					},
					
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					input: {
						"&:-webkit-autofill": {
							WebkitBoxShadow: `0 0 0 100px ${grey[50]}  inset`,
							WebkitTextFillColor: grey[900],
							caretColor: "white",
							borderRadius: "0px",
						},
					},
				},
			},
		},
	});
