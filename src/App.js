import "./App.css";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, useNavigate } from "react-router-dom";
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
import { selectAllNews } from "./store/reducers/userSlice";
import useGetAllNews from "./helpers/hooks/getAllNews";

function App() {
	useGetAllNews();
	const allNews = useSelector(selectAllNews);
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);

	useEffect(() => {
		navigate("/news");
	  }, []);

	return (
		<ThemeProvider theme={themeCreation()}>
			<Header />
			<Routes>
				<Route path="/news" element={<News allNews={allNews}/>} />
				<Route path="/news/:id" element={<NewsDetailed allNews={allNews}/>} />
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
		</ThemeProvider>
	);
}

export default App;
