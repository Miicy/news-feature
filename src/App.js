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
import AdminLogin from "./pages/AdminLogin";
import AdminNews from "./pages/AdminNews";

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
							<Route path="/news/:id" element={<NewsDetailed />}/>
							<Route path="/contact" element={<Contact />} />
							<Route path="/admin" element={<AdminLogin />} />
							<Route path="/admin/admin-panel" element={<AdminNews />} />
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
