import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import NewsContainer from "../components/common/NewsContainer";
import useGetAllNews from "../helpers/hooks/getAllNews";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import "./pages.css";
import { useNavigate } from "react-router-dom";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";
import SearchInput from "../components/common/SearchInput";

function News() {
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);
	const [layoutColumn, setLayoutColumn] = useState(true);
	const theme = useTheme();

	const allNews = useGetAllNews();
	const [newsLimit, setNewsLimit] = useState(7);

	const toggleLayoutColumn = () => {
		const isSmallScreen = screenSize === "small";
		const isMediumSScreen = screenSize === "medium-s";

		if (!isMobile && !isSmallScreen && !isMediumSScreen) {
			setLayoutColumn((prevLayoutColumn) => !prevLayoutColumn);
		}
	};

	useEffect(() => {
		const isSmallScreen = screenSize === "small";
		const isMediumSScreen = screenSize === "medium-s";

		if (isMobile || isSmallScreen || isMediumSScreen) {
			setLayoutColumn(true);
		}
	}, [screenSize]);

	const latestNews = allNews && allNews.length > 0 ? allNews[0] : null;
	const restOfNews = allNews ? allNews.slice(1) : [];

	const isRestOfNewsOdd = restOfNews.length % 2 === 1;

	//news load
	const loadMoreNews = () => {
		setNewsLimit(newsLimit + 8);
	};

	const newsPageStyles = {
		breadcrumbsContainerMobile: {
			flexDirection: screenSize === "small" || isMobile ? "column" : "row",
			justifyContent:
				screenSize === "small" || isMobile ? "center" : "space-between",
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
			backgroundColor: theme.palette.oppositeLighter.opacity40,
		},
		layoutCircle: {
			backgroundColor: theme.palette.opposite.main,
			borderRadius: "20px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		layoutIcon: {
			margin: "5px",
			color: theme.palette.primary.main,
		},
		news: {
			marginTop: "15px",
			width: "95%",
			height: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
		},
		latest: {
			backgroundImage: latestNews ? `url(${latestNews.image})` : "none",
			backgroundSize: "cover",
			backgroundPosition: "center top",
			position: "absolute",
			top: screenSize === "small" || isMobile ? 250 : 200,
			left: 0,
			width: "100%",
			height: screenSize === "small" || isMobile ? "560px" : "600px",
			display: "flex",
			alignItems: "flex-end",
			backgroundColor: "lightgrey",
			cursor: "pointer",
			zIndex: 1,
		},
		textContainer: {
			width: "100%",
			height: "45%",
			backgroundColor: "rgba(255, 255, 255, 0.36)",
			backdropFilter: "blur(5px)",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "space-around",
		},
		latestText: {
			width: "90%",
			display: "flex",
			fontSize:
				screenSize === "large"
					? "2.2em"
					: screenSize === "medium"
					? "2em"
					: screenSize === "medium-s"
					? "1.7em"
					: "1.3em",
			fontWeight: "bold",
			transsition: " 0.2s",
		},
		date: {
			fontSize:
				screenSize === "large"
					? "1.2em"
					: screenSize === "medium"
					? "1em"
					: screenSize === "medium-s"
					? "0.9em"
					: "0.8em",
			width: "98%",
			display: "flex",
			justifyContent: "flex-end",
			fontWeight: "500",
		},
		newsContainer: {
			marginTop: "650px",
			padding: "15px",
			height: "auto",
			backgroundColor: "rgba(115, 113, 113, 0.45)",
			display: "grid",
			gridTemplateColumns: layoutColumn ? "1fr" : "repeat(2, 1fr)",
			gridTemplateRows: "auto",
			gap: "10px",
			width: isMobile || screenSize === "small" ? "90%" : "80%",
			transsition: "all 0.3s"
		},
		loadMore: {
			width: "100%",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			marginRight: isMobile || screenSize === "small" ? "5px" : "10px",
			cursor: newsLimit < restOfNews.length ? "pointer" : "none",
			fontSize: layoutColumn
				? (isMobile && screenSize === "small") || screenSize === "medium"
					? "0.7em"
					: "0.85em"
				: "0.75em",
			marginBottom: "20px",
			marginTop: "20px",
			textDecoration: newsLimit < restOfNews.length ? "underline" : "none",
			color: `${theme.palette.opposite.main}`,
		},
	};

	if (!allNews) return null;

	console.log(latestNews);

	return (
		<div className="innerPageContainer">
			<div
				className="breadcrumbsContainer"
				style={newsPageStyles.breadcrumbsContainerMobile}
			>
				<BreadcrumbsPage link={"News"} />
				<SearchInput />
				{!isMobile && screenSize !== "small" && (
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
							borderRadius={"5px"}
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
