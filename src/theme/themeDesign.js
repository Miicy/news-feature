import { createTheme } from "@mui/material";

const getDesignTokens = (mode) => ({
	palette: {
		primary: {
			main: "#111111",
			opacity96: "rgba(17, 18, 18, 0.96)",
		},
		secondary: {
			main: "#ff6600",
			secondary: "#f25100",
			opacity80: "rgba(255, 102, 0, 0.80)",
		},
	},
});

export const themeCreation = () =>
	createTheme({
		...getDesignTokens(),
		components: {
			MuiDivider: {
				styleOverrides: {
					root: {
            borderColor: "grey",
            height:"45%"
          },
				},
			},
			MuiTooltip: {
				styleOverrides: {
				  tooltip: {
					backgroundColor: "black",
					color: "white",
					fontSize: "1em",
				  },
				},
			  },
		},
	});
