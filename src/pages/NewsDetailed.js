import React, { useEffect, useState } from "react";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import { useParams } from "react-router-dom";
import useGetAllNews from "../helpers/hooks/getAllNews";
import { isMobile } from "react-device-detect";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { useSelector } from "react-redux";

function NewsDetailed() {
	const { id } = useParams();
	const allNews = useGetAllNews();
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

	const newsDetailedStyles = {
		container: {
			width: "95%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
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
		location:{
			display:"flex",
			fontSize: screenSize === "small" || isMobile ? "0.8em" : "1.3em",
			marginLeft:"10px"
		},
		image: {
			backgroundImage: newsDetails ? `url(${newsDetails.image})` : "none",
			backgroundSize: "cover",
			backgroundPosition: "center center",
			height: screenSize === "small" || isMobile ? "200px" : "500px",
			width: screenSize === "small" || isMobile ? "100%" : "100%",
		},

		content: {
			fontSize: screenSize === "small" || isMobile ? "0.9em" : "1.2em",
			margin: screenSize === "small" || isMobile ? "20px 0" : "35px 0",
			minHeight: screenSize === "small" || isMobile ? "200px" : "200px",
			marginLeft:"10px"
		},
		bottomContainer:{
			display:"flex",
			width:"100%",
			justifyContent:"space-between",

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
					 Location: <div style={{fontWeight: "bold"}}>&nbsp;{newsDetails.location}</div>
					</p>
				</div>
				<div style={newsDetailedStyles.image}></div>
				<p style={newsDetailedStyles.content}>{newsDetails.content}</p>
				<div style={newsDetailedStyles.bottomContainer}>
				<div style={newsDetailedStyles.tags}>
					{newsDetails.tags.map((tag, index) => (
						<span key={index} style={newsDetailedStyles.tags}>
							#{tag}&nbsp;
						</span>
					))}
				</div>
				<div style={newsDetailedStyles.date}>{newsDetails.date}</div>
				
				</div>
				
			</div>
		</div>
	);
}

export default NewsDetailed;
