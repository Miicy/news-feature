import "./App.css";
import { useEffect, useState } from "react";
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
import backgroundLight from "./media/background-light.svg";
import { selectScreenSize } from "./store/reducers/layoutSlice";
import AdminAddNews from "./pages/AdminAddNews";
import { isMobile } from "react-device-detect";

function App() {
	const [theme, setTheme] = useState(themeCreation());
	const screenSize = useSelector(selectScreenSize);
	const backgroundImage = `url(${backgroundLight})`;

	const appStyles = {
		background: {
			backgroundImage: backgroundImage,
			minHeight: "100vh",
			height: "auto",
			minWidth: "100wh",
			width: "100%",
			transition: "0.2s",
			margin: "0",
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundAttachment: "fixed",
			display: "flex",
			justifyContent: "center",
			alignItems: screenSize === "small" || isMobile ? "flex-start" : "center",
			zIndex: 1,
		},
		pageContainer: {
			margin:
				screenSize === "medium-s"
					? "20px 0"
					: screenSize === "small"
					? "60px 0"
					: "50px 0",
			position: "relative",
			minWidth: "300px",
			width: screenSize === "small" ? "85%" : "88%",
			minHeight:
				screenSize === "medium-s"
					? "1000px"
					: screenSize === "small"
					? "600px"
					: "90vh",
			height: "auto",
			backgroundColor: theme.palette.primary.main,
			borderRadius: "16px",
			border: `1.5px solid ${theme.palette.forth.main}`,
			boxShadow: " 0 10px 30px 10px rgba(0, 0, 0, 0.3)",
			display: "flex",
			flexDirection: "column",
			justifyContent:
				screenSize === "small" || isMobile ? "center" : "flex-start",
			alignItems: "center",
			zIndex: 10,
			transition: "0.2s",
			transition: "minHeight 0.4s ease-in-out",
		},
	};

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<News />} />
					<Route path="/:id" element={<NewsDetailed />} />
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
