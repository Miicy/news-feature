import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import NewsContainer from "../components/common/NewsContainer";
import useGetAllNews from "../helpers/hooks/getAllNews";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import "./pages.css";
import { useNavigate } from "react-router-dom";

function News() {
	const navigate = useNavigate();
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
	const isScreenMediumSmaller = useMediaQuery("(max-width: 800px)");
	const isScreenMedium = useMediaQuery("(max-width: 1200px)");
	const [layoutColumn, setLayoutColumn] = useState(true);

	const allNews = useGetAllNews();

	//load more limit
	const [newsLimit, setNewsLimit] = useState(7);

	//news layout
	const toggleLayoutColumn = () => {
		if (!isScreenMediumSmaller && !isMobile && !isScreenSmall) {
			setLayoutColumn(!layoutColumn);
		}
	};

	useEffect(() => {
		if (isMobile || isScreenSmall || isScreenMediumSmaller) {
			setLayoutColumn(true);
		}
	}, [isMobile, isScreenSmall, isScreenMediumSmaller]);

	const latestNews = allNews && allNews.length > 0 ? allNews[0] : null;
	const restOfNews = allNews ? allNews.slice(1) : [];

	const isRestOfNewsOdd = restOfNews.length % 2 === 1;

	//news load
	const loadMoreNews = () => {
		setNewsLimit(newsLimit + 8);
	};

	const newsPageStyles = {
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
		},
		latest: {
			width: "100%",
			height: "420px",
			borderRadius: "10px",
			marginBottom: "15px",
			display: "flex",
			alignItems: "flex-end",
			backgroundColor: "lightgrey",
			cursor: "pointer",
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
			width: "98%",
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
		},
		loadMore: {
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			marginRight: isMobile || isScreenSmall ? "5px" : "10px",
			cursor: newsLimit < restOfNews.length ? "pointer" : "none",
			fontSize: layoutColumn
				? (isMobile && isScreenSmall) || isScreenMedium
					? "0.7em"
					: "0.85em"
				: "0.75em",
			marginBottom: "20px",
			marginTop: "20px",
			textDecoration: newsLimit < restOfNews.length ? "underline" : "none",
		},
	};

	if (!allNews) return null;

	console.log(latestNews);

	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer">
				<BreadcrumbsPage link={"News"} />
				{!isScreenMediumSmaller && !isMobile && !isScreenSmall && (
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
				<div
					style={newsPageStyles.latest}
					onClick={() => {
						navigate(`/news/${latestNews.id}`);
					}}
				>
					<div style={newsPageStyles.textContainer}>
						<div style={newsPageStyles.latestText}>{latestNews.title}</div>
						<div style={newsPageStyles.date}>{latestNews.date}</div>
					</div>
				</div>
				<div className="newsContainer" style={newsPageStyles.newsContainer}>
					{restOfNews.slice(0, newsLimit).map((news, index) => (
						<NewsContainer
							key={news.id}
							news={news}
							isRestOfNewsOdd={isRestOfNewsOdd}
							layoutColumn={layoutColumn}
							index={index}
						/>
					))}
				</div>

				<div style={newsPageStyles.loadMore} onClick={loadMoreNews}>
					{newsLimit < restOfNews.length ? "Load More" : "No more News"}
				</div>
			</div>
		</div>
	);
}

export default News;
