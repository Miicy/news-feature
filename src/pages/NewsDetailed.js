import React, { useEffect, useState } from "react";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import { useParams } from "react-router-dom";
import useGetAllNews from "../helpers/hooks/getAllNews";
import { useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";

function NewsDetailed() {
	const { id } = useParams();
	const allNews = useGetAllNews();

	const isScreenSmall = useMediaQuery("(max-width: 500px)");

	const [newsDetails, setNewsDetails] = useState(null);

	useEffect(() => {
		if (allNews && id) {
			const news = allNews.find((news) => news.id === parseInt(id, 10));

			if (news) {
				setNewsDetails(news);
			}
		}
	}, [allNews, id]);

	const newsDetailedStyles = {
		container: {
			marginTop: "5px",
			width: "95%",
			height: "100%",
			// backgroundColor: "yellow",
			display: "flex",
			flexDirection: "column",
		},
		titleContainer: {
			display: "flex",
			flexDirection: "column",
			alignItems: isScreenSmall || isMobile ? "center" : "flex-start",
		},
		title: {
			fontSize: isScreenSmall || isMobile ? "1em" : "2em",
			marginLeft: isScreenSmall || isMobile ? "2px" : "5px",
			fontWeight: "bold",
		},
		image: {
			backgroundColor: "grey",
			height: isScreenSmall || isMobile ? "200px" : "400px",
			width: isScreenSmall || isMobile ? "85%" : "100%",
			borderRadius: "10px",
		},

		content: {
			fontSize: isScreenSmall || isMobile ? "0.9em" : "1.2em",
			margin: isScreenSmall || isMobile ? "20px 0" : "35px 0",
			minHeight:isScreenSmall || isMobile ? "200px" : "200px",
		},
		date:{
			width: "100%",
			display: "flex",
			justifyContent: "flex-end",
			marginBottom:"20px",
			fontSize: isScreenSmall || isMobile ? "0.85em" : "1em",
		}
	};
	if (!allNews) return null;
	if (!newsDetails) return null;

	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer">
				<BreadcrumbsPage second={"News"} link={newsDetails.title} />
			</div>
			<div style={newsDetailedStyles.container}>
				<div style={newsDetailedStyles.titleContainer}>
					<p style={newsDetailedStyles.title}> {newsDetails.title}</p>
					<div style={newsDetailedStyles.image}></div>
				</div>
				<p style={newsDetailedStyles.content}>{newsDetails.content}</p>
				<div style={newsDetailedStyles.date}>{newsDetails.date}</div>
			</div>
		</div>
	);
}

export default NewsDetailed;
