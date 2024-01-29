import { Tooltip } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import {
	setDataState,
	displayNotification,
} from "../../store/reducers/notificationSlice";
import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../../helpers/app.constants";
import { useEffect, useState } from "react";

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
	const dispatch = useDispatch();
	const screenSize = useSelector(selectScreenSize);
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		if (showContent && news) {
		  dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
		}
	  }, [showContent, news, dispatch]);

	  const backgroundImageUrl = news?.coverImage || news?.image || '';

	const newsContainerStyles = {
		singleNews: {
			margin: margin,
			backgroundColor: "white",
			height: layoutColumn ? "250px" : "190px",
			borderRadius: borderRadius,
			display: "flex",
			width: layoutColumn ? "100%" : "auto",
		},
		singleNewsImage: {
			backgroundImage: backgroundImageUrl ? `url(${backgroundImageUrl})` : "none",
			backgroundSize: "cover",
			backgroundPosition: "center top",
			minWidth: "100px",
			width: layoutColumn ? "30%" : "40%",
			height: layoutColumn ? "100%" : "100%",
			borderRadius: "5px 0 0 5px",
			animation: "myAnim 2s ease 0s 1 normal forwards",
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
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
		},
		readMore: {
			width: "95%",
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
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
			marginRight: screenSize === "small" && isMobile ? "5px" : "10px",
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
				<div style={newsContainerStyles.singleNewsContent}>{news.content}</div>
				<div style={newsContainerStyles.readMore}>
					{news.date}
					{readMore && (
						<p
							style={{ textDecoration: "underline", cursor: "pointer" }}
							// onClick={() => navigate(`/${news._id}`)} for database
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
