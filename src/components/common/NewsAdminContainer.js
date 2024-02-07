import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { selectScreenSize } from "../../store/reducers/layoutSlice";
import { useTheme } from "@emotion/react";
import {
	DATA_STATE,
	NOTIFICATION_TYPES,
	SERVER_URL,
} from "../../helpers/app.constants";
import {
	displayNotification,
	setDataState,
} from "../../store/reducers/notificationSlice";
import axios from "axios";

function NewsAdminContainer({
	news,
	index,
	margin,
	borderRadius,
	admin,
	columnClicked,
	onDeleteSuccess,
	handleUpdate
}) {
	const screenSize = useSelector(selectScreenSize);
	const theme = useTheme();
	const dispatch = useDispatch();

	const maxCharacters =
		screenSize === "medium" ? 40 : screenSize === "medium-s" ? 20 : 80;
	const content = news.content;
	const title = news.title;
	const truncatedContent =
		content.length > maxCharacters
			? content.substring(0, maxCharacters) + "..."
			: content;

	const truncatedTitle =
		title.length > 30 ? title.substring(0, maxCharacters) + "..." : title;

	const handleDelete = async () => {
		try {
			dispatch(setDataState(DATA_STATE.DATA_STATE_LOADING));
			await axios.delete(`${SERVER_URL}news/${news.id}`);

			const notificationPayload = {
				text: "News deleted!",
				type: NOTIFICATION_TYPES.SUCCESS,
			};
			dispatch(displayNotification(notificationPayload));
			onDeleteSuccess();
		} catch (error) {
			if (
				error.response &&
				error.response.data.error === "Internal server error"
			) {
				const notificationPayload = {
					text: "Server error!",
					type: NOTIFICATION_TYPES.ERROR,
				};
				dispatch(displayNotification(notificationPayload));
			}
		} finally {
			dispatch(setDataState(DATA_STATE.DATA_STATE_OK));
		}
	};

	const handleUpdateClick = () => {
		handleUpdate(news.id, news);
	};
	

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
				{index + 1}
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
				{news.allTags && news.allTags.length > 0 ? (
					<>
						{news.allTags.slice(0, 2).map((tag, index) => (
							<span key={index}>
								#{tag}
								{index !== 1 && <>&nbsp;</>}
							</span>
						))}
						{news.allTags.length > 2 && <span>&nbsp;...</span>}
					</>
				) : (
					news.tags &&
					news.tags.length > 0 && (
						<>
							{news.tags.slice(0, 2).map((tag, index) => (
								<span key={index}>
									#{tag}
									{index !== 1 && <>&nbsp;</>}
								</span>
							))}
							{news.tags.length > 2 && <span>&nbsp;...</span>}
						</>
					)
				)}
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
				dangerouslySetInnerHTML={{ __html: truncatedContent }}
			></div>
			{admin && (
				<div style={newsContainerStyles.rest}>
					<Tooltip title={`Edit news`}>
						<EditIcon
							sx={newsContainerStyles.adminIcon}
							onClick={handleUpdateClick}
							className="hover"
						/>
					</Tooltip>
					<Tooltip title={`Delete news`}>
						<DeleteIcon
							sx={newsContainerStyles.adminIcon}
							onClick={handleDelete}
							className="hover"
						/>
					</Tooltip>
				</div>
			)}
		</div>
	);
}

export default NewsAdminContainer;
