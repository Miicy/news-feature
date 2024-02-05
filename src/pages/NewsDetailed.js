import React, { useEffect, useState } from "react";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import { useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { useSelector } from "react-redux";

function NewsDetailed({ allNews }) {
	const { id } = useParams();
	const screenSize = useSelector(selectScreenSize);
	const [newsDetails, setNewsDetails] = useState(null);

	useEffect(() => {
		if (allNews && id) {
			const news = allNews.find((news) => news.id === parseInt(id, 10));

			if (news) {
				setNewsDetails(news);
			}
		}
	}, [allNews, id]);

	const backgroundImageUrl =
		newsDetails?.coverImage || newsDetails?.image || "";

	const newsDetailedStyles = {
		container: {
			width: "80%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			padding: "10px",
			marginBottom: "50px",
		},
		titleContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: screenSize === "small" || isMobile ? "center" : "flex-start",
			justifyContent: "space-between",
		},
		title: {
			fontSize: screenSize === "small" || isMobile ? "1em" : "2.3em",
			marginLeft: screenSize === "small" || isMobile ? "2px" : "5px",
			fontWeight: "bold",
		},
		location: {
			display: "flex",
			fontSize: screenSize === "small" || isMobile ? "0.8em" : "1.3em",
			marginLeft: "10px",
		},
		image: {
			backgroundImage: backgroundImageUrl
				? `url(${backgroundImageUrl})`
				: "none",
			backgroundSize: "cover",
			backgroundPosition: "center center",
			height: screenSize === "small" || isMobile ? "200px" : "500px",
			width: screenSize === "small" || isMobile ? "100%" : "100%",
		},

		content: {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		contentInner: {
			width: "90%",
			fontSize: screenSize === "small" || isMobile ? "0.9em" : "1.2em",
			margin: screenSize === "small" || isMobile ? "20px 0" : "35px 0",
			minHeight: screenSize === "small" || isMobile ? "200px" : "200px",
			marginLeft: "10px",
			textAlign:"justify",
		},
		bottomContainer: {
			display: "flex",
			width: "100%",
			justifyContent: "space-between",
		},
		date: {
			display: "flex",
			justifyContent: "flex-end",
			marginBottom: "20px",
			fontSize: screenSize === "small" || isMobile ? "0.85em" : "1em",
		},
	};
	if (!allNews) return null;
	if (!newsDetails) return null;

	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer">
				<BreadcrumbsPage
					second={"News"}
					secondUrl={"news"}
					link={newsDetails.title}
				/>
			</div>
			<div style={newsDetailedStyles.container}>
				<div style={newsDetailedStyles.titleContainer}>
					<p style={newsDetailedStyles.title}> {newsDetails.title}</p>
					<p style={newsDetailedStyles.location}>
						Location:{" "}
						<div style={{ fontWeight: "bold" }}>
							&nbsp;{newsDetails.location}
						</div>
					</p>
				</div>
				<div style={newsDetailedStyles.image}></div>
				<div style={newsDetailedStyles.content}>
					<div style={newsDetailedStyles.contentInner} dangerouslySetInnerHTML={{ __html: newsDetails.content }} />
				</div>
				<div style={newsDetailedStyles.bottomContainer}>
					<div style={newsDetailedStyles.tags}>
						{newsDetails.allTags
							? newsDetails.allTags.map((tag, index) => (
									<span key={index} style={newsDetailedStyles.tags}>
										#{tag}&nbsp;
									</span>
							  ))
							: newsDetails.tags
							? newsDetails.tags.map((tag, index) => (
									<span key={index} style={newsDetailedStyles.tags}>
										#{tag}&nbsp;
									</span>
							  ))
							: null}
					</div>
					<div style={newsDetailedStyles.date}>{newsDetails.date}</div>
				</div>
			</div>
		</div>
	);
}

export default NewsDetailed;
