import { useTheme } from "@emotion/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

function SearchModal({ filteredNews }) {
	const theme = useTheme();
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);
	const searchModalStyles = {
		container: {
			marginTop: "5px",
			width: "100%",
			minHeight: "100px",
			height: "fit-content",
			position: "absolute",
			backgroundColor: "white",
			zIndex: 99999,
			color: theme.palette.text.secondary,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		inner: {
			width: "95%",
			fontWeight: "350",
		},
		p: {
			fontSize: isMobile || screenSize === "small" ? "0.8em" : "1em",
			width: "100%",
			display: "flex",
			justifyContent: "space-between",
		},
	};

	if (filteredNews.length === 0) {
		return (
		  <div style={searchModalStyles.container}>
			<div style={{...searchModalStyles.inner, textAlign:"center"}}>
			  <p>No matching news found.</p>
			</div>
		  </div>
		);
	  }
	  
	return (
		<div style={searchModalStyles.container}>
			<div style={searchModalStyles.inner}>
				{filteredNews.map((newsItem) => (
					<div
						key={newsItem.id}
						style={searchModalStyles.p}
						className="hover-text"
						onClick={() => {
							navigate(`/news/${newsItem.id}`);
						}}
					>
						<p>
							{newsItem.title.length > 20
								? `${newsItem.title.slice(0, 35)}...`
								: newsItem.title}
						</p>
						
						{isMobile ||
							(screenSize === "small" && (
								<p style={{ fontSize: "0.8em" }}>{newsItem.date}</p>
							))}
					</div>
				))}
			</div>
		</div>
	);
}

export default SearchModal;
