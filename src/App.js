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
import backgroundLight from "./media/background-light.svg";
import backgroundDark from "./media/background-dark.svg";
import { selectScreenSize } from "./store/reducers/layoutSlice";

function App() {
	const [theme, setTheme] = useState(themeCreation());
	const themeMode = useSelector(selectActiveTheme);
	const screenSize = useSelector(selectScreenSize);
	const backgroundImage =
		themeMode === "light"
			? `url(${backgroundLight})`
			: `url(${backgroundDark})`;

	useEffect(() => {
		setTheme(themeCreation(themeMode));
	}, [themeMode]);

	const appStyles = {
		background: {
			backgroundImage: backgroundImage,
			minHeight: "100vh",
			height: "auto",
			width: "100%",
			transition: "0.2s",
			margin: "0",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundAttachment: "fixed",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			zIndex: 1,
		},
		pageContainer: {
			marginTop: "50px",
			marginBottom: "50px",
			position: "relative",
			minWidth: "300px",
			width: "80%",
			minHeight:
				screenSize === "medium-s"
					? "800px"
					: screenSize === "small"
					? "500px"
					: "100vh",
			height: "auto",
			backgroundColor: `${theme.palette.primary.main}`,
			borderRadius: "16px",
			border: `1.5px solid ${theme.palette.forth.main}`,
			boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
			display: "flex",
			flexDirection: "column",
			justifyContent: "flex-start",
			alignItems: "center",
			zIndex: 10,
		},
	};

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<div style={appStyles.background}>
					<div style={appStyles.pageContainer}>
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
