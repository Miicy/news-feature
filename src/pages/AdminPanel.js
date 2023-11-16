import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectScreenSize } from "../store/reducers/layoutSlice";
import { useTheme } from "@emotion/react";
import useGetAllNews from "../helpers/hooks/getAllNews";
import { isMobile } from "react-device-detect";
import NewsAdminContainer from "../components/common/NewsAdminContainer";

function AdminPanel() {
	const navigate = useNavigate();
	const screenSize = useSelector(selectScreenSize);
	const theme = useTheme();
	const allNews = useGetAllNews();

	const [allNewsArray, setAllNewsArray] = useState([]);

	const [columnClicked, setColumnClicked] = useState({
		num: true,
		title: false,
		date: false,
		location: false,
	});

	const [sortOrder, setSortOrder] = useState("asc");
	const [sortColumn, setSortColumn] = useState("");

	useEffect(() => {
		if (allNews !== null) {
			const newsArray = Object.values(allNews);
			setAllNewsArray(newsArray);
		}
	}, [allNews]);

	const handleColumnClick = (column) => {
		let newSortOrder = sortOrder;
		if (sortColumn === column) {
			newSortOrder = sortOrder === "asc" ? "desc" : "asc";
		} else {
			newSortOrder = "asc";
		}

		const updatedColumns = Object.keys(columnClicked).reduce((acc, key) => {
			acc[key] = key === column;
			return acc;
		}, {});

		setColumnClicked(updatedColumns);
		setSortColumn(column);
		setSortOrder(newSortOrder);
	};

	let sortedNews = [];

	if (allNewsArray.length > 0) {
		sortedNews = [...allNewsArray].sort((a, b) => {
			if (sortColumn === "num") {
				if (sortOrder === "asc") {
					return a.id - b.id;
				} else {
					return b.id - a.id;
				}
			} else if (sortColumn === "title") {
				const titleA = a.title.toLowerCase();
				const titleB = b.title.toLowerCase();
				return sortOrder === "asc"
					? titleA.localeCompare(titleB)
					: titleB.localeCompare(titleA);
			} else if (sortColumn === "date") {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
			} else if (sortColumn === "location") {
				const locationA = a.location.toLowerCase();
				const locationB = b.location.toLowerCase();
				return sortOrder === "asc"
					? locationA.localeCompare(locationB)
					: locationB.localeCompare(locationA);
			}

			return 0; // Default return if no specific sorting is applied
		});
	}

	const toggleSortOrder = () => {
		setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
	};

	const adminPanelStyles = {
		container: {
			width: "100%",
			minHeight: "99.7vh",
			display: "flex",
			flexDirection: "column",
			alignItems: "stretch",
			overflow: "auto",
			backgroundColor: theme.palette.secondary.secondary,
			marginBottom: "40px",
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
			backgroundColor: theme.palette.opposite.secondary,
			borderBottom: `1px solid ${theme.palette.fifth.secondary}`,
			color: theme.palette.primary.main,
			boxShadow: "0px -1px 12px 1px rgba(0,0,0,0.15) inset",
		},
		headingSingle: {
			display: "flex",
			alignItems: "center",
			fontSize: isMobile || screenSize === "small" ? "0.7em" : "1em",
			justifyContent: "center",
			fontWeight: "450",
		},
	};

	if (!allNews) return null;

	return (
		<div style={adminPanelStyles.container}>
			<div style={adminPanelStyles.heading}>
				<div
					style={{
						...adminPanelStyles.headingSingle,
						marginLeft: "10px",
					}}
					className="hover"
					onClick={() => {
						handleColumnClick("num");
						setSortColumn("num");
					}}
				>
					Num
				</div>
				<div
					style={adminPanelStyles.headingSingle}
					className="hover"
					onClick={() => {
						setSortColumn("title");
						handleColumnClick("title");
					}}
				>
					Title
				</div>
				<div
					style={adminPanelStyles.headingSingle}
					className="hover"
					onClick={() => {
						setSortColumn("date");
						handleColumnClick("date");
					}}
				>
					Date
				</div>
				<div
					style={{
						...adminPanelStyles.headingSingle,
						justifyContent: "flex-start",
					}}
					className="hover"
					onClick={() => {
						setSortColumn("location");
						handleColumnClick("location");
					}}
				>
					Location
				</div>

				<div
					style={{
						...adminPanelStyles.headingSingle,
						justifyContent: "flex-start",
					}}
				>
					Tags
				</div>
				<div
					style={{
						...adminPanelStyles.headingSingle,
						justifyContent: "flex-start",
					}}
				>
					Content
				</div>
				<div style={adminPanelStyles.headingSingle}></div>
			</div>
			{sortedNews.map((news, index) => (
				<NewsAdminContainer
					columnClicked={columnClicked}
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
