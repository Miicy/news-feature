import React from "react";
import Gallery from "../components/common/Gallery";
import { selectActiveTheme } from "../store/reducers/userSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../store/reducers/layoutSlice";

function Home() {
	const screenSize = useSelector(selectScreenSize);
	const homeStyles = {
		container: {
			marginTop: "15px",
			width: "95%",
			height: screenSize === "small" || isMobile ? "500px" : "700px",
		},
	};
	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer"></div>
			<div style={homeStyles.container}>
				<Gallery />
			</div>
		</div>
	);
}

export default Home;
