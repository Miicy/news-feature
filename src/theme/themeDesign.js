import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light"
			? {
					primary: {
						main: grey[50],
						opacity80: "rgba(250, 250, 250, 0.60)",
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
						secondary: grey[900],
					},
					divider: grey[400],
					text: {
						oppositeDark: grey[900],
						primary: grey[900],
						secondary: grey[700],
					},
					red: {
						main: red[700],
						error: "#d32f2f",
					},
			  }
			: {
					primary: {
						main: grey[900],
						opacity80: "rgba(33, 33, 33, 0.60)",
						glass: "rgba(33, 33, 33, 0.80)",
					},
					secondary: {
						main: grey[800],
						secondary: grey[100],
					},
					third: {
						main: grey[700],
						secondary: grey[200],
					},
					forth: {
						main: grey[600],
						secondary: grey[300],
					},
					fifth: {
						main: grey[500],
						seondary: grey[400],
						third: grey[200],
					},
					opposite: {
						main: grey[50],
						secondary: grey[900],
					},
					oppositeLighter: {
						main: grey[500],
					},
					divider: grey[400],
					text: {
						oppositeDark: grey[900],
						primary: grey[50],
						secondary: grey[400],
					},
					red: {
						main: red[400],
						error: "#d32f2f",
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
							backgroundColor: mode === "light" ? grey[100] : grey[200],
							color: grey[900],
						},
					},
				},
			},
			MuiOutlinedInput: {
				styleOverrides: {
					input: {
						"&:-webkit-autofill": {
							WebkitBoxShadow: `0 0 0 100px ${
								mode === "light" ? grey[100] : grey[200]
							}  inset`,
							WebkitTextFillColor: mode === "light" ? grey[900] : grey[900],
							caretColor: "#your-caret-color",
							borderRadius: "inherit",
						},
					},
				},
			},
		},
	});
