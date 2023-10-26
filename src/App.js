import "./App.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import News from "./pages/News";
import Contact from "./pages/Contact";
import LoadingModal from "./components/other/LoadingModal";
import NotificationContainer from "./components/other/NotificationContainer";
import NewsDetailed from "./pages/NewsDetailed";
import AdminLogin from "./pages/AdminLogin";
import AdminNews from "./pages/AdminNews";
import { themeCreation } from "./theme/themeDesign";
import { selectActiveTheme } from "./store/reducers/userSlice";
import { useSelector } from "react-redux";
import ScreenSizeListener from "./helpers/ScreenSizeListener";

function App() {
	const [theme, setTheme] = useState(themeCreation());
	const themeMode = useSelector(selectActiveTheme);

	useEffect(() => {
		setTheme(themeCreation(themeMode));
		
	}, [themeMode]);

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<div className="pageCover">
					<div className="pageContainer">
						<Routes>
							<Route path="/*" element={<Home />} />
							<Route path="/news" element={<News />} />
							<Route path="/news/:id" element={<NewsDetailed />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/admin" element={<AdminLogin />} />
							<Route path="/admin/admin-panel" element={<AdminNews />} />
						</Routes>
					</div>
				</div>
				<LoadingModal />
				<NotificationContainer />
				<ScreenSizeListener />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
