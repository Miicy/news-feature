import React from "react";
import Gallery from "../components/common/Gallery";
import {  selectAllNews } from "../store/reducers/userSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import BreadcrumbsPage from "../components/common/Breadcrumbs";

function Home() {
	const allNews = useSelector(selectAllNews);
	const screenSize = useSelector(selectScreenSize);
	const homeStyles = {
		container: {
			width: "100%",
			height: screenSize === "small" || isMobile ? "500px" : "700px",
		},
	};

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
