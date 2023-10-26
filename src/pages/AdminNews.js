import React from "react";
import BreadcrumbsPage from "../components/common/Breadcrumbs";
import { Tooltip, useMediaQuery } from "@mui/material";
import { isMobile } from "react-device-detect";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import useGetAllNews from "../helpers/hooks/getAllNews";
import NewsContainer from "../components/common/NewsContainer";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { useSelector } from "react-redux";

function AdminNews() {
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);

	const allNews = useGetAllNews();

	const adminNewsStyles = {
		allNews: {
			marginTop: isMobile && screenSize === "small" ? "10px" : "20px",
			marginBottom: isMobile && screenSize === "small" ? "10px" : "20px",
			width: "95%",
			minHeight: "30vh",
			height: "auto",
			borderRadius: "15px",
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
		},
		addNews: {
			width: "100%",
			height: isMobile && screenSize === "small" ? "40px" : "60px",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: "lightGrey",
			borderRadius: "15px 15px 0px 0px",
			cursor: "pointer",
			marginBottom: "5px",
		},
		addIcon: {},
	};
	if (!allNews) return null;

	return (
		<div className="innerPageContainer">
			<div className="breadcrumbsContainer">
				<BreadcrumbsPage second={"Admin"} link={"Admin News"} />
			</div>
			<div style={adminNewsStyles.allNews}>
				<Tooltip title={`Add News`}>
					<div
						style={adminNewsStyles.addNews}
						onClick={() => navigate("/admin/admin-panel/add-news")}
					>
						<AddIcon sx={adminNewsStyles.addIcon} className="hover" />
					</div>
				</Tooltip>
				{allNews.map((news, index) => (
				<NewsContainer
					key={news.id}
					news={news}
					index={index}
					isRestOfNewsOdd={false}
					layoutColumn={true}
					margin={"2px 0"}
					borderRadius={"0"}
					readMore={false}
					admin={true}
				/>
			))}
			</div>
			
		</div>
	);
}

export default AdminNews;
