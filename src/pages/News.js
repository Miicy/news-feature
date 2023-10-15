import { Breadcrumbs, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import newsData from "../helpers/newsData.json";

function News() {
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
	const isScreenMedium = useMediaQuery("(max-width: 1200px)");
	const [layoutColumn, setLayoutColumn] = useState(true);

	const toggleLayoutColumn = () => {
		if (!isMobile && !isScreenSmall) {
			setLayoutColumn(!layoutColumn);
		}
	};

	useEffect(() => {
		if (isMobile || isScreenSmall) {
			setLayoutColumn(true);
		}
	}, [isMobile, isScreenSmall]);

	const latestNews = newsData[0];
	const restOfNews = newsData.slice(1);

	const isRestOfNewsOdd = restOfNews.length % 2 === 1;

	const newsPageStyles = {
		container: {
			width: "95%",
			height: "100%",
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
		},
		breadcrumbs: {
			marginTop: "15px",
			width: "95%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
		},
		layout: {
			width: "65px",
			height: "32px",
			display: "flex",
			justifyContent: layoutColumn ? "flex-start" : "flex-end",
			alignItems: "center",
			border: "1px solid grey",
			borderRadius: "20px",
			cursor: "pointer",
		},
		layoutCircle: {
			backgroundColor: "grey",
			borderRadius: "20px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		layoutIcon: {
			margin: "5px",
		},
		news: {
			marginTop: "15px",
			width: "95%",
			height: "100%",
			// overflowY:"auto"
		},
		latest: {
			width: "100%",
			height: "400px",
			borderRadius: "10px",
			marginBottom: "15px",
			display: "flex",
			alignItems: "flex-end",
			backgroundColor: "lightgrey",
		},
		textContainer: {
			width: "100%",
			height: "45%",
			backgroundColor: "rgba(255, 255, 255, 0.16)",
			backdropFilter: "blur(5px)",
			borderRadius: " 0 0 10px 10px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-around",
		},
		latestText: {
			width: "90%",
			display: "flex",
			fontSize: (isMobile && isScreenSmall) || isScreenMedium ? "1.3em" : "2em",
			fontWeight: "bold",
		},
		date: {
			fontSize: (isMobile && isScreenSmall) || isScreenMedium ? "0.8em" : "1em",
			width: "90%",
			display: "flex",
			justifyContent: "flex-end",
			fontWeight: "500",
		},
		newsContainer: {
			padding: "15px",
			height: "auto",
			backgroundColor: "grey",
			display: "grid",
			gridTemplateColumns: layoutColumn ? "1fr" : "repeat(2, 1fr)",
			gridTemplateRows: "auto",
			gap: "10px",
			borderRadius: "10px",
			marginBottom: "30px",
		},
		singleNews: {
			width: "100%",
			backgroundColor: "white",
			height: layoutColumn ? "250px" : "190px",
			borderRadius: "5px",
			display: "flex",
			width: layoutColumn ? "100%" : "auto",
			// gridColumn: isRestOfNewsOdd && !layoutColumn  ? "span 2" : "auto",
		},
		singleNewsImage: {
			backgroundColor: "lightgrey",
			minWidth: "100px",
			width: layoutColumn ? "30%" : "40%",
			height: layoutColumn ? "100%" : "100%",
			borderRadius: "5px 0 0 5px",
		},
		singleNewsTextContainer: {
			width: "95%",
			display: "flex",
			justifyContent: "space-between",
		},
		singleNewsText: {
			width: "80%",
			height: "100%",
			paddingLeft: "10px",
		},
		readMore: {
			width: "95%",
			display: "flex",
			justifyContent: "Space-between",
			alignItems: "center",
			marginRight: isMobile || isScreenSmall ? "5px" : "10px",
			cursor: "pointer",
			fontSize: layoutColumn
				? (isMobile && isScreenSmall) || isScreenMedium
					? "0.7em"
					: "0.85em"
				: "0.75em",
		},
		title: {
			fontSize: layoutColumn
				? (isMobile && isScreenSmall) || isScreenMedium
					? "0.9em"
					: "1em"
				: "0.8em",
			minWidth: "100px",
		},
		singleNewsContent: {
			marginLeft: "10px",
			width: "90%",
			height: layoutColumn
				? (isMobile && isScreenSmall) || isScreenMedium
					? "55%"
					: "125px"
				: "45%",
			whiteSpace: "normal",
			textOverflow: "ellipsis",
			overflow: "hidden",
			fontSize: layoutColumn
				? (isMobile && isScreenSmall) || isScreenMedium
					? "0.8em"
					: "1em"
				: "0.8em",
		},
	};
	return (
		<div style={newsPageStyles.container}>
			<div style={newsPageStyles.breadcrumbs}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link color="inherit" href="/">
						Home
					</Link>
					<p color="textPrimary">News</p>
				</Breadcrumbs>
				{!isMobile && !isScreenSmall && (
					<div style={newsPageStyles.layout} onClick={toggleLayoutColumn}>
						{layoutColumn ? (
							<div style={newsPageStyles.layoutCircle}>
								<ViewHeadlineIcon sx={newsPageStyles.layoutIcon} />
							</div>
						) : (
							<div style={newsPageStyles.layoutCircle}>
								<ViewModuleIcon sx={newsPageStyles.layoutIcon} />
							</div>
						)}
					</div>
				)}
			</div>
			<div style={newsPageStyles.news}>
				<div style={newsPageStyles.latest}>
					<div style={newsPageStyles.textContainer}>
						<div style={newsPageStyles.latestText}>{latestNews.title}</div>
						<div style={newsPageStyles.date}>{latestNews.date}</div>
					</div>
				</div>
				<div className="newsContainer"style={newsPageStyles.newsContainer}>
					{restOfNews.map((news) => (
						<div className={isRestOfNewsOdd && !layoutColumn ? "lastChild" : ""} key={news.id} style={newsPageStyles.singleNews}>
							<div style={newsPageStyles.singleNewsImage}></div>
							<div style={newsPageStyles.singleNewsText}>
								<div style={newsPageStyles.singleNewsTextContainer}>
									<h3 style={newsPageStyles.title}>{news.title}</h3>
								</div>
								<p style={newsPageStyles.singleNewsContent}>{news.content}</p>
								<div style={newsPageStyles.readMore}>
									{latestNews.date}
									<p style={{ textDecoration: "underline" }}>Read more</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default News;
