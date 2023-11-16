import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { useTheme } from "@emotion/react";
import useGetAllNews from "../helpers/hooks/getAllNews";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip} from "@mui/material";
import { isMobile } from "react-device-detect";
import NewsAdminContainer from "../components/common/NewsAdminContainer";

function AdminPanel() {
    const navigate = useNavigate();
    const screenSize = useSelector(selectScreenSize);
    const theme = useTheme();
    const allNews = useGetAllNews();

    const adminPanelStyles={
        container: {
			width: "95%",
			minHeight: "30vh",
			height: "auto",
			borderTopLeftRadius: "15px",
			borderTopRightRadius: "15px",
			display: "flex",
			flexDirection: "column",
			alignItems: "stretch",
			border: `1px solid ${theme.palette.fifth.secondary}`,
			overflow: "auto",
			backgroundColor: theme.palette.secondary.secondary,
			marginBottom: "40px",
		},
		addNews: {
			height: isMobile || screenSize === "small" ? "30px" : "60px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: theme.palette.third.secondary,
			borderRadius: "5px",
			cursor: "pointer",
			margin: "10px",
			boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
			border: `1px solid ${theme.palette.fifth.secondary}`,
		},
		addIcon: {
			color: theme.palette.opposite.secondary,
		},
		heading: {
			display: "grid",
			gridTemplateColumns:
				isMobile || screenSize === "small"
					? "0.2fr 0.8fr 0.5fr 0.5fr 0.2fr"
					: "0.2fr 0.8fr 0.5fr 0.5fr 1fr 1.5fr 0.2fr",
			gridTemplateRows: "1fr",
			gap: "5px 10px",
			width: "100%",
			height: "70px",
			backgroundColor: theme.palette.third.secondary,
			borderBottom: `1px solid ${theme.palette.fifth.secondary}`,
			color: theme.palette.opposite.secondary,
			borderTopLeftRadius: "5px",
			borderTopRightRadius: "5px",
			boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
		},
		headingSingle: {
			display: "flex",
			alignItems: "center",
			fontSize: isMobile || screenSize === "small" ? "0.7em" : "1em",
			fontWeight: "bold",
			justifyContent: "flex-start",
			fontWeight: "450",
			cursor: "pointer",
		},
    }

    if (!allNews) return null;
	return (
		<div style={adminPanelStyles.container}>
			<div style={adminPanelStyles.heading}>
				<div
					style={{
						...adminPanelStyles.headingSingle,
						marginLeft: "10px",
					}}
				>
					Num
				</div>
				<div style={adminPanelStyles.headingSingle}>Title</div>
				<div style={adminPanelStyles.headingSingle}>Date</div>
				<div style={adminPanelStyles.headingSingle}>Location</div>
				{screenSize !== "small" && !isMobile && (
					<div style={{ ...adminPanelStyles.headingSingle, cursor: "" }}>
						Tags
					</div>
				)}
				{screenSize !== "small" && !isMobile && (
					<div style={{ ...adminPanelStyles.headingSingle, cursor: "" }}>
						Content
					</div>
				)}
				<div style={adminPanelStyles.headingSingle}></div>
			</div>
			<Tooltip title={`Add News`}>
				<div
					style={adminPanelStyles.addNews}
					className={"hover-button"}
				>
					<AddIcon sx={adminPanelStyles.addIcon} />
				</div>
			</Tooltip>
			{allNews.map((news, index) => (
				<NewsAdminContainer
					key={news.id}
					news={news}
					index={index}
					isRestOfNewsOdd={false}
					margin={"3px 0"}
					borderRadius={"0"}
					readMore={false}
					admin={true}
				/>
			))}
		</div>
	);
}

export default AdminPanel;
