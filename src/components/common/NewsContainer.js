import { useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";

export default function NewsContainer({
	news,
	isRestOfNewsOdd,
	layoutColumn,
	index,
}) {
	const navigate = useNavigate();
	const isScreenSmall = useMediaQuery("(max-width: 500px)");
	const isScreenMedium = useMediaQuery("(max-width: 1200px)");

	const newsContainerStyles = {
		singleNews: {
			width: "100%",
			backgroundColor: "white",
			height: layoutColumn ? "250px" : "190px",
			borderRadius: "5px",
			display: "flex",
			width: layoutColumn ? "100%" : "auto",
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
			width: "98%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			marginRight: isMobile || isScreenSmall ? "5px" : "10px",
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
		<div
			style={newsContainerStyles.singleNews}
			className={isRestOfNewsOdd && !layoutColumn ? "lastChild" : ""}
		>
			<div style={newsContainerStyles.singleNewsImage}></div>
			<div style={newsContainerStyles.singleNewsText}>
				<div style={newsContainerStyles.singleNewsTextContainer}>
					<h3 style={newsContainerStyles.title}>{news.title}</h3>
				</div>
				<p style={newsContainerStyles.singleNewsContent}>{news.content}</p>
				<div style={newsContainerStyles.readMore}>
					{news.date}
					<p
						style={{ textDecoration: "underline", cursor: "pointer" }}
						// onClick={() => navigate(`/news/${news._id}`)} for database
						onClick={() => navigate(`/news/${news.id}`)}
					>
						Read more
					</p>
				</div>
			</div>
		</div>
	);
}
