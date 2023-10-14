import { Breadcrumbs, useMediaQuery } from "@mui/material";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import newsData from "../helpers/newsData.json";

function News() {
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
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

	const newsPageStyles = {
		container: {
			width: "90%",
			height: "100%",
			display:"flex",
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
			backgroundColor: "grey",
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
			width: "85%",
			display: "flex",
			fontSize: "2.1em",
			fontWeight: "bold",
		},
		newsContainer: {
			padding: "15px",
			height: "auto",
			backgroundColor: "grey",
			display: "grid",
			gridTemplateColumns: layoutColumn ? "1fr" : "repeat(3, 1fr)",
			gridTemplateRows: "auto",
			gap: "10px",
			borderRadius: "10px",
			marginBottom: "30px",
		},
		singleNews: {
			width: "100%",
			backgroundColor: "red",
			height: "200px",
			borderRadius: "5px",
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
						<div
							style={{
								...newsPageStyles.latestText,
								justifyContent: "flex-end",
								fontSize: "1.2em",
								fontWeight: "500",
							}}
						>
							{latestNews.date}
						</div>
					</div>
				</div>
				<div style={newsPageStyles.newsContainer}>
					{restOfNews.map((news) => (
						<div key={news.id} style={newsPageStyles.singleNews}>
							<h3>{news.title}</h3>
							<p>{news.content}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default News;
