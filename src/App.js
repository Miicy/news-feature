import "./App.css";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { themeCreation } from "./theme/themeDesign";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import News from "./pages/News";
import Contact from "./pages/Contact";
import LoadingModal from "./components/other/LoadingModal";
import NotificationContainer from "./components/other/NotificationContainer";
import NewsDetailed from "./pages/NewsDetailed";

function App() {
	const [theme] = useState(themeCreation());

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<div className="pageCover">
					<div className="pageContainer">
						<Routes>
							<Route path="/*" element={<Home />} />
							<Route path="/news" element={<News />} />
							<Route path="/news/:id" component={NewsDetailed} />
							<Route path="/contact" element={<Contact />} />
						</Routes>
					</div>
				</div>
				<LoadingModal />
				<NotificationContainer />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
