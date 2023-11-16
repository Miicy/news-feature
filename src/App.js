import "./App.css";
import {useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import News from "./pages/News";
import LoadingModal from "./components/other/LoadingModal";
import NotificationContainer from "./components/other/NotificationContainer";
import NewsDetailed from "./pages/NewsDetailed";
import AdminLogin from "./pages/AdminLogin";
import AdminNews from "./pages/AdminNews";
import { themeCreation } from "./theme/themeDesign";
import { useSelector } from "react-redux";
import ScreenSizeListener from "./helpers/ScreenSizeListener";
import { selectScreenSize } from "./store/reducers/layoutSlice";
import { isMobile } from "react-device-detect";

function App() {
	const [theme, setTheme] = useState(themeCreation());
	const screenSize = useSelector(selectScreenSize);

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/news" element={<News />} />
					<Route path="/news/:id" element={<NewsDetailed />} />
					{!isMobile || screenSize !== "small" ? (
						<>
							<Route path="/admin" element={<AdminLogin />} />
							<Route path="/admin/admin-panel" element={<AdminNews />} />
						</>
					) : null}

				</Routes>
				<LoadingModal />
				<NotificationContainer />
				<ScreenSizeListener />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
