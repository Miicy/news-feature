import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					// palette values for light mode
					primary: {
						main: grey[50],
						opacity80: "rgba(250, 250, 250, 0.60)",
					},
					secondary: {
						main: grey[100],
					},
					third: {
						main: grey[200],
					},
					forth: {
						main: grey[300],
					},
					fifth: {
						main: grey[400],
					},
					red: {
						main: red[700],
					},
					oppositeLighter: {
						main: grey[500],
						opacity40: "rgba(158, 158, 158, 0.40)",
					},
					opposite: {
						main: grey[900],
					},
					divider: grey[400],
					text: {
						primary: grey[900],
						secondary: grey[700],
					},
			  }
			: {
					// palette values for dark mode
					primary: {
						main: grey[900],
						opacity80: "rgba(33, 33, 33, 0.60)",
					},
					secondary: {
						main: grey[800],
					},
					third: {
						main: grey[700],
					},
					forth: {
						main: grey[600],
					},
					fifth: {
						main: grey[700],
					},
					red: {
						main: red[400],
					},
					opposite: {
						main: grey[50],
					},
					oppositeLighter: {
						main: grey[500],
					},
					divider: grey[400],
					text: {
						primary: grey[50],
						secondary: grey[400],
					},
			  }),
	},
});

export const themeCreation = (mode) =>
	createTheme({
		...getDesignTokens(mode),
		components: {
			MuiDivider: {
				styleOverrides: {
					root: {},
				},
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						backgroundColor: mode === "light" ? grey[900] : grey[50],
						color: mode === "light" ? grey[50] : grey[900],
						fontSize: "0.8em",
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						"& .MuiOutlinedInput-root": {
							borderRadius: 10,
							fontSize: "0.85em",
						},
						"&:not(.Mui-focused) .MuiOutlinedInput-notchedOutline": {

						},
					},
				},
			},
		},
	});
