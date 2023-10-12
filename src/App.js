import "./App.css";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { themeCreation } from "./theme/themeDesign";

function App() {
	const [theme] = useState(themeCreation());

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>

				{/* <LoadingModal />
				<NotificationContainer /> */}
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
