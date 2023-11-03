import React from "react";
import Gallery from "../components/common/Gallery";
import { selectActiveTheme } from "../store/reducers/userSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import useGetAllNews from "../helpers/hooks/getAllNews";
import BreadcrumbsPage from "../components/common/Breadcrumbs";

function Home() {
	const screenSize = useSelector(selectScreenSize);
	const homeStyles = {
		container: {
			marginTop: "15px",
			width: "95%",
			height: screenSize === "small" || isMobile ? "500px" : "700px",
		},
	};
	const allNews = useGetAllNews();
	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer">
				<BreadcrumbsPage home={true}/>
			</div>
			<div style={homeStyles.container}>
			{allNews ? <Gallery allNews={allNews} /> : ""}
			</div>
		</div>
	);
}

export default Home;
