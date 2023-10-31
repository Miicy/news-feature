import { Tooltip, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useTheme } from "@emotion/react";

function NewsAdminContainer({ news, index, margin, borderRadius, admin }) {
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);
	const theme = useTheme();

	const maxCharacters = 200;
	const content = news.content;
	const truncatedContent =
		content.length > maxCharacters
			? content.substring(0, maxCharacters) + "..."
			: content;

	const newsContainerStyles = {
		singleNews: {
			display: "grid",
			gridTemplateColumns:
				isMobile || screenSize === "small"
					? "0.2fr 0.8fr 0.5fr 0.5fr 0.2fr"
					: "0.2fr 0.8fr 0.5fr 0.5fr 1fr 1.5fr 0.2fr",
			gap: "5px 10px",
			gridTemplateRows: "1fr",
			margin: margin,
			width: "100%",
			backgroundColor: theme.palette.third.secondary,
			height: "45px",
			borderRadius: borderRadius,
			overflow: "hidden",
		},
		rest: {
			display: "flex",
			justifyContent: "flex-start",
			alignItems: "center",
			fontSize: screenSize === "small" || isMobile ? "0.6em" : "0.9em",
		},
		adminIcon: {
			cursor: "pointer",
			marginRight: screenSize === "small" || isMobile ? "5px" : "10px",
			fontSize: screenSize === "small" || isMobile ? "1.3em" : "1.5em",
		},
	};
	console.log(news);
	return (
		<div style={newsContainerStyles.singleNews}>
			<div style={{ ...newsContainerStyles.rest, marginLeft: "10px" }}>
				{news.id}
			</div>
			<div style={newsContainerStyles.rest}>{news.title}</div>
			<div style={newsContainerStyles.rest}>{news.date}</div>
			<div style={newsContainerStyles.rest}>{news.location}</div>
            {screenSize !== "small" && !isMobile && <div style={newsContainerStyles.rest}>{news.tags}</div>}
            {screenSize !== "small" && !isMobile && (
					<div
						style={{
							...newsContainerStyles.rest,
							fontSize: screenSize === "small" || isMobile ? "0.7em" : "0.8em",
							whiteSpace: "normal",
							textOverflow: "ellipsis",
							overflow: "hidden",
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "flex-start",
							padding: "5px",
						}}
					>
						{truncatedContent}
					</div>
				)}
			{admin && (
				<div style={newsContainerStyles.rest}>
					<Tooltip title={`Edit news`}>
						<EditIcon sx={newsContainerStyles.adminIcon} />
					</Tooltip>
					<Tooltip title={`Delete news`}>
						<DeleteIcon sx={newsContainerStyles.adminIcon} className="hover" />
					</Tooltip>
				</div>
			)}
		</div>
	);
}

export default NewsAdminContainer;
