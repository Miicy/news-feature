import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useTheme } from "@emotion/react";

function NewsAdminContainer({
	news,
	index,
	margin,
	borderRadius,
	admin,
	columnClicked,
}) {
	const screenSize = useSelector(selectScreenSize);
	const theme = useTheme();

	const maxCharacters =
		screenSize === "medium" ? 60 : screenSize === "medium-s" ? 35 : 100;
	const content = news.content;
	const title = news.title;
	const truncatedContent =
		content.length > maxCharacters
			? content.substring(0, maxCharacters) + "..."
			: content;

	const truncatedTitle =
		title.length > 30 ? title.substring(0, maxCharacters) + "..." : title;

	const newsContainerStyles = {
		singleNews: {
			display: "grid",
			gridTemplateColumns: "0.2fr 0.8fr 0.5fr 0.5fr 1fr 1.5fr 0.2fr",
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
			alignItems: "center",
			fontSize: "0.9em",
			display: "flex",
			justifyContent: "center",
		},
		adminIcon: {
			cursor: "pointer",
			marginRight: "10px",
			fontSize: "1.5em",
		},
	};
	return (
		<div
			style={{ ...newsContainerStyles.singleNews, cursor: "default" }}
			className="hover-button"
		>
			<div
				style={{
					...newsContainerStyles.rest,
					marginLeft: "10px",
					backgroundColor: columnClicked.num && "#d1d1d1",
				}}
			>
				{news.id}
			</div>
			<div
				style={{
					...newsContainerStyles.rest,
					marginLeft: "20px",
					justifyContent: "flex-start",
					backgroundColor: columnClicked.title && "#d1d1d1",
					paddingLeft: "4px",
				}}
			>
				{truncatedTitle}
			</div>
			<div
				style={{
					...newsContainerStyles.rest,
					backgroundColor: columnClicked.date && "#d1d1d1",
				}}
			>
				{news.date}
			</div>
			<div
				style={{
					...newsContainerStyles.rest,
					justifyContent: "flex-start",
					backgroundColor: columnClicked.location && "#d1d1d1",
					paddingLeft: "4px",
				}}
			>
				{news.location}
			</div>
			<div
				style={{
					...newsContainerStyles.rest,
					justifyContent: "flex-start",
				}}
			>
				{news.tags.slice(0, 2).map((tag, index) => (
					<span key={index}>
						#{tag}
						{index !== 1 && <>&nbsp;</>}
					</span>
				))}
				{news.tags.length > 2 && <span>&nbsp;...</span>}
			</div>

			<div
				style={{
					...newsContainerStyles.rest,
					fontSize: "0.8em",
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
			{admin && (
				<div style={newsContainerStyles.rest}>
					<Tooltip title={`Edit news`}>
						<EditIcon sx={newsContainerStyles.adminIcon} className="hover" />
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
