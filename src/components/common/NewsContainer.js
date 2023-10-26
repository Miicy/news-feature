import { Tooltip, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectScreenSize } from "../../store/reducers/layoutSlice";

export default function NewsContainer({
	news,
	isRestOfNewsOdd,
	layoutColumn,
	index,
	margin,
	borderRadius,
	readMore = true,
	admin,
}) {
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);

	const newsContainerStyles = {
		singleNews: {
			margin: margin,
			width: "100%",
			backgroundColor: "white",
			height: layoutColumn ? "250px" : "190px",
			borderRadius: borderRadius,
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
			width: admin ? "95%" : "98%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
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
			marginLeft: admin && "10px",
			marginRight: isMobile || screenSize === "small" ? "5px" : "10px",
			fontSize: layoutColumn
				? (isMobile && screenSize === "small") || screenSize === "medium"
					? "0.7em"
					: "0.85em"
				: "0.75em",
		},
		title: {
			fontSize: layoutColumn
				? (isMobile && screenSize === "small") || screenSize === "medium"
					? "0.9em"
					: "1em"
				: "0.8em",
			minWidth: "100px",
		},
		singleNewsContent: {
			marginLeft: "10px",
			width: "90%",
			height: layoutColumn
				? (isMobile && screenSize === "small") || screenSize === "medium"
					? "55%"
					: "125px"
				: "45%",
			whiteSpace: "normal",
			textOverflow: "ellipsis",
			overflow: "hidden",
			fontSize: layoutColumn
				? (isMobile && screenSize === "small") || screenSize === "medium"
					? "0.8em"
					: "1em"
				: "0.8em",
		},
		admin: {
			width: "40px",
			display: "flex",
			alignItems: "space-between",
		},
		adminIcon: {
			cursor: "pointer",
			marginRight:screenSize === "small" && isMobile ? "5px" : "10px",
			fontSize: screenSize === "small" && isMobile ? "0.8em" : "1.5em",
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
					{admin && (
						<div style={newsContainerStyles.admin}>
							<Tooltip title={`Edit news`}>
								<EditIcon sx={newsContainerStyles.adminIcon} />
							</Tooltip>
							<Tooltip title={`Delete news`}>
								<DeleteIcon sx={newsContainerStyles.adminIcon} />
							</Tooltip>
						</div>
					)}
				</div>
				<p style={newsContainerStyles.singleNewsContent}>{news.content}</p>
				<div style={newsContainerStyles.readMore}>
					{news.date}
					{readMore && (
						<p
							style={{ textDecoration: "underline", cursor: "pointer" }}
							// onClick={() => navigate(`/news/${news._id}`)} for database
							onClick={() => navigate(`/news/${news.id}`)}
						>
							Read more
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
